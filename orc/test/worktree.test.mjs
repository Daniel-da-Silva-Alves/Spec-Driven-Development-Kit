import { describe, it, before, after } from "node:test";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { mkdtempSync, writeFileSync, existsSync, rmSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { createWorktree, mergeWorktree, removeWorktree } from "../dist/worktree.js";

function git(cwd, args) {
  return execFileSync("git", args, { cwd, encoding: "utf-8" });
}

describe("worktree lifecycle (against a temp git repo)", () => {
  let base;
  let wtRoot;

  before(() => {
    base = mkdtempSync(join(tmpdir(), "sddk-base-"));
    wtRoot = mkdtempSync(join(tmpdir(), "sddk-wtroot-"));
    git(base, ["init", "-b", "main"]);
    git(base, ["config", "user.email", "test@example.com"]);
    git(base, ["config", "user.name", "Test"]);
    writeFileSync(join(base, "a.txt"), "hello\n");
    git(base, ["add", "-A"]);
    git(base, ["commit", "-m", "init"]);
  });

  after(() => {
    try {
      rmSync(base, { recursive: true, force: true });
      rmSync(wtRoot, { recursive: true, force: true });
    } catch {
      /* best effort */
    }
  });

  it("creates an isolated worktree, merges its commit back, then cleans up", () => {
    const wt = createWorktree(base, "orc-1", "run1", wtRoot);
    assert.ok(existsSync(wt.path), "worktree path should exist");
    assert.equal(wt.branch, "sddk/run/orc-1-run1");
    assert.ok(!existsSync(join(base, "b.txt")), "base untouched before merge");

    // Simulate the Dev stage committing inside the worktree.
    writeFileSync(join(wt.path, "b.txt"), "world\n");
    git(wt.path, ["add", "-A"]);
    git(wt.path, ["commit", "-m", "dev: add b"]);

    mergeWorktree(base, wt);
    assert.ok(existsSync(join(base, "b.txt")), "merged change is on the base branch");

    removeWorktree(base, wt);
    assert.ok(!existsSync(wt.path), "worktree removed after success");
  });
});
