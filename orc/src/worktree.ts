// Git worktree isolation for the Dev stage.
// Implements SDD §5 and FR-004 / FR-006 of orc-1-agent-sdk-runner.

import { execFileSync } from "node:child_process";
import { join } from "node:path";
import { tmpdir } from "node:os";

export interface Worktree {
  path: string;
  branch: string;
}

function git(cwd: string, args: string[]): string {
  return execFileSync("git", args, { cwd, encoding: "utf-8" }).trim();
}

/**
 * Create an isolated worktree + branch for a run, based off the current HEAD.
 * The worktree lives outside the repo (default: OS temp) so it never appears as
 * untracked files in the base working tree.
 */
export function createWorktree(
  baseDir: string,
  workItem: string,
  runId: string,
  worktreeRoot: string = join(tmpdir(), "sddk-worktrees")
): Worktree {
  const branch = `sddk/run/${workItem}-${runId}`;
  const path = join(worktreeRoot, `${workItem}-${runId}`);
  git(baseDir, ["worktree", "add", "-b", branch, path, "HEAD"]);
  return { path, branch };
}

/** Merge a run branch back into the current branch of baseDir (no-ff for a clear merge point). */
export function mergeWorktree(baseDir: string, worktree: Worktree): void {
  git(baseDir, ["merge", "--no-ff", "-m", `Merge ${worktree.branch}`, worktree.branch]);
}

/**
 * Remove the worktree and (optionally) delete its branch. Called on SUCCESS after
 * a merge. On abort the caller leaves the worktree/branch intact for inspection.
 */
export function removeWorktree(baseDir: string, worktree: Worktree, deleteBranch = true): void {
  git(baseDir, ["worktree", "remove", "--force", worktree.path]);
  if (deleteBranch) {
    try {
      git(baseDir, ["branch", "-D", worktree.branch]);
    } catch {
      // branch may already be gone; ignore
    }
  }
}
