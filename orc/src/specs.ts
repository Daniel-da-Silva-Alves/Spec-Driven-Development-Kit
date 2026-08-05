// Reading and advancing the OKF status of a work item's anchor spec.
// Implements SDD §7 (precondition) and FR-002 / FR-007 of orc-1-agent-sdk-runner.

export type WorkType = "features" | "fix" | "refact" | "chore";
export type Status =
  | "draft"
  | "approved"
  | "implemented"
  | "verified"
  | "superseded";

/** Anchor document filename per work type (the spec doc that owns `status`). */
export const ANCHORS: Record<WorkType, string> = {
  features: "srs.md",
  fix: "bug-report.md",
  refact: "refact-spec.md",
  chore: "chore-spec.md",
};

/**
 * Parse YAML frontmatter into a flat string map. Tolerates CRLF line endings
 * and inline comments on unquoted scalars (e.g. `status: draft  # note`) — the
 * same shape the SDDK templates ship, and the same rule the gate hook uses.
 */
export function parseFrontmatter(text: string): Record<string, string> {
  const match = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return {};
  const fm: Record<string, string> = {};
  for (const line of match[1].split(/\r?\n/)) {
    const i = line.indexOf(":");
    if (i <= 0) continue;
    let value = line.slice(i + 1).trim();
    if (!value.startsWith('"') && !value.startsWith("'")) {
      value = value.replace(/\s+#.*$/, "").trim();
    }
    value = value.replace(/^["']|["']$/g, "");
    fm[line.slice(0, i).trim()] = value;
  }
  return fm;
}

/** The `status` value declared in a document's frontmatter, or "" if absent. */
export function statusOf(content: string): Status | "" {
  return (parseFrontmatter(content).status as Status) || "";
}

const ORDER: Status[] = ["draft", "approved", "implemented", "verified"];

/** The next lifecycle status after `current`, or null if terminal/unknown. */
export function nextStatus(current: Status): Status | null {
  const i = ORDER.indexOf(current);
  if (i === -1 || i === ORDER.length - 1) return null;
  return ORDER[i + 1];
}

/** Rewrite the frontmatter `status:` line in `content` to `status`. */
export function withStatus(content: string, status: Status): string {
  return content.replace(/^(\s*status:).*$/m, `$1 ${status}`);
}
