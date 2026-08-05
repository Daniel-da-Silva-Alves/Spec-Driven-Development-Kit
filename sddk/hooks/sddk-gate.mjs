#!/usr/bin/env node

/**
 * SDDK pipeline gate (Claude Code hook).
 *
 * Modes:
 *   stop       — Stop hook. BLOCKS (exit 2) if any work item is 'implemented'
 *                but not yet 'verified' (i.e. code shipped without Code Review).
 *   pre-write  — PreToolUse (Write|Edit) hook. ADVISORY only (never blocks):
 *                nudges when the active work item's spec is still 'draft'.
 *
 * Design: FAIL-OPEN. Any missing file, parse error, or ambiguity results in
 * exit 0 (allow). The gate must never block legitimate work due to uncertainty.
 * Zero dependencies — Node built-ins only.
 */

import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join } from "node:path";

const MODE = process.argv[2];
const PROJECT_DIR = process.env.CLAUDE_PROJECT_DIR || process.cwd();
const SPECS = join(PROJECT_DIR, ".specs");

// Anchor document filename per work type (the spec document that owns `status`).
const ANCHORS = {
  features: "srs.md",
  fix: "bug-report.md",
  refact: "refact-spec.md",
  chore: "chore-spec.md",
};

function allow() {
  process.exit(0);
}

function block(message) {
  process.stderr.write(message + "\n");
  process.exit(2);
}

function advise(message) {
  process.stderr.write(message + "\n");
  process.exit(0);
}

function parseFrontmatter(text) {
  const m = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!m) return {};
  const fm = {};
  for (const line of m[1].split(/\r?\n/)) {
    const i = line.indexOf(":");
    if (i <= 0) continue;
    let value = line.slice(i + 1).trim();
    // Strip an inline YAML comment on unquoted scalars, e.g. `status: draft  # note`.
    if (!value.startsWith('"') && !value.startsWith("'")) {
      value = value.replace(/\s+#.*$/, "").trim();
    }
    value = value.replace(/^["']|["']$/g, "");
    fm[line.slice(0, i).trim()] = value;
  }
  return fm;
}

function collectAnchors() {
  const out = [];
  for (const [type, file] of Object.entries(ANCHORS)) {
    const dir = join(SPECS, type);
    if (!existsSync(dir)) continue;
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      if (!entry.isDirectory()) continue;
      const path = join(dir, entry.name, file);
      if (!existsSync(path)) continue;
      const fm = parseFrontmatter(readFileSync(path, "utf-8"));
      out.push({
        type,
        name: entry.name,
        status: fm.status || "",
        timestamp: fm.timestamp || "",
      });
    }
  }
  return out;
}

async function readStdin() {
  try {
    const chunks = [];
    for await (const chunk of process.stdin) chunks.push(chunk);
    return JSON.parse(Buffer.concat(chunks).toString("utf-8"));
  } catch {
    return null;
  }
}

async function main() {
  if (!existsSync(SPECS)) allow(); // not an SDDK project
  const anchors = collectAnchors();
  if (anchors.length === 0) allow();

  if (MODE === "stop") {
    const pending = anchors.filter((a) => a.status === "implemented");
    if (pending.length === 0) allow();
    const list = pending.map((a) => `  - ${a.type}/${a.name}`).join("\n");
    block(
      `SDDK gate: ${pending.length} work item(s) are 'implemented' but not 'verified':\n` +
        `${list}\n` +
        `Run Code Review (/sddk:code-review) so the sddk:verifier can validate them before finishing.`
    );
  }

  if (MODE === "pre-write") {
    const input = await readStdin();
    const filePath =
      (input && input.tool_input && (input.tool_input.file_path || input.tool_input.path)) || "";
    // Editing the .specs/ bundle itself is always fine.
    if (filePath && filePath.replace(/\\/g, "/").includes("/.specs/")) allow();
    // "Active" work item = most recently stamped anchor (best-effort heuristic).
    const active = anchors
      .filter((a) => a.timestamp)
      .sort((a, b) => (a.timestamp < b.timestamp ? 1 : -1))[0];
    if (active && active.status === "draft") {
      advise(
        `SDDK reminder: the active work item '${active.type}/${active.name}' is still 'draft' ` +
          `(spec not approved). Consider completing SRS/SDD approval before implementing. [advisory — not blocking]`
      );
    }
    allow();
  }

  allow(); // unknown mode
}

main().catch(() => process.exit(0));
