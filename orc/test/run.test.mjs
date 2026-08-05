import { describe, it, after } from "node:test";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import {
  mkdtempSync,
  mkdirSync,
  writeFileSync,
  readFileSync,
  existsSync,
  rmSync,
} from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { orchestrate } from "../dist/run.js";

function git(cwd, args) {
  return execFileSync("git", args, { cwd, encoding: "utf-8" });
}

function makeRepo(status) {
  const base = mkdtempSync(join(tmpdir(), "sddk-run-"));
  git(base, ["init", "-b", "main"]);
  git(base, ["config", "user.email", "t@example.com"]);
  git(base, ["config", "user.name", "Test"]);
  const dir = join(base, ".specs", "features", "demo");
  mkdirSync(dir, { recursive: true });
  writeFileSync(
    join(dir, "srs.md"),
    `---\ntype: srs\nstatus: ${status}\nwork_item: demo\n---\n\n# SRS\n`
  );
  git(base, ["add", "-A"]);
  git(base, ["commit", "-m", "init"]);
  return base;
}

const noop = async () => ({ tokens: 0, durationMs: 0 });
const clock = () => "2026-08-05T00:00:00Z";
const readStatus = (base) =>
  readFileSync(join(base, ".specs/features/demo/srs.md"), "utf-8");

describe("run.orchestrate", () => {
  const wtRoot = mkdtempSync(join(tmpdir(), "sddk-run-wt-"));
  const repos = [];
  const repo = (status) => {
    const b = makeRepo(status);
    repos.push(b);
    return b;
  };
  after(() => {
    for (const r of [...repos, wtRoot]) {
      try {
        rmSync(r, { recursive: true, force: true });
      } catch {
        /* best effort */
      }
    }
  });

  it("blocks a run when the spec is not approved (exit 2, status untouched)", async () => {
    const base = repo("draft");
    const { report, exitCode } = await orchestrate({
      baseDir: base,
      workItem: "demo",
      runId: "r1",
      now: clock,
      runStage: noop,
      verify: async () => ({ verdict: "PASS", violations: [] }),
      worktreeRoot: wtRoot,
    });
    assert.equal(exitCode, 2);
    assert.equal(report.result, "failed");
    assert.match(readStatus(base), /status: draft/);
  });

  it("runs, merges, and advances status to verified on full pass (exit 0)", async () => {
    const base = repo("approved");
    const { report, exitCode } = await orchestrate({
      baseDir: base,
      workItem: "demo",
      runId: "r2",
      now: clock,
      runStage: noop,
      verify: async () => ({ verdict: "PASS", violations: [] }),
      worktreeRoot: wtRoot,
    });
    assert.equal(exitCode, 0);
    assert.equal(report.result, "verified");
    assert.equal(report.worktree.merged, true);
    assert.match(readStatus(base), /status: verified/);
    assert.ok(existsSync(join(base, ".specs/features/demo/runs/r2.json")));
  });

  it("aborts without merging when verification fails (exit 1, status unchanged)", async () => {
    const base = repo("approved");
    const { report, exitCode } = await orchestrate({
      baseDir: base,
      workItem: "demo",
      runId: "r3",
      now: clock,
      runStage: noop,
      verify: async () => ({ verdict: "FAIL", violations: ["FR unmet"] }),
      worktreeRoot: wtRoot,
    });
    assert.equal(exitCode, 1);
    assert.equal(report.result, "aborted");
    assert.equal(report.worktree.merged, false);
    assert.match(readStatus(base), /status: approved/);
  });
});
