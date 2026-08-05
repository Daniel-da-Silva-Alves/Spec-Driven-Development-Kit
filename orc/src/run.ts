// Orchestration entry: precondition gate -> pipeline -> worktree merge/abort ->
// status advancement -> run report.
// Implements SDD §3/§7 and FR-002/FR-006/FR-007/FR-008 of orc-1-agent-sdk-runner.

import { writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import { resolveAnchor, withStatus } from "./specs.js";
import { createWorktree, mergeWorktree, removeWorktree } from "./worktree.js";
import { runPipeline, type StageRunner, type VerifierFn } from "./pipeline.js";
import { buildReport, serializeReport, type RunReport, type StageName } from "./report.js";

export interface OrchestrateOptions {
  baseDir: string;
  workItem: string;
  runId: string;
  /** Injected clock so orchestration stays deterministic and testable (no Date.now in logic). */
  now: () => string;
  fromStage?: StageName;
  runStage: StageRunner;
  verify: VerifierFn;
  cap?: number;
  worktreeRoot?: string;
}

export interface OrchestrateResult {
  report: RunReport;
  exitCode: number;
}

const ALL_STAGES: StageName[] = ["sdd", "planning", "dev", "review"];

function writeReport(
  baseDir: string,
  type: string,
  workItem: string,
  runId: string,
  report: RunReport
): void {
  const dir = join(baseDir, ".specs", type, workItem, "runs");
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, `${runId}.json`), serializeReport(report), "utf-8");
}

export async function orchestrate(opts: OrchestrateOptions): Promise<OrchestrateResult> {
  const startedAt = opts.now();
  const anchor = resolveAnchor(opts.baseDir, opts.workItem);
  if (!anchor) {
    throw new Error(`Work item not found under .specs/: ${opts.workItem}`);
  }

  // Precondition gate (FR-002): only an approved (or already-implemented) spec may run headless.
  if (anchor.status !== "approved" && anchor.status !== "implemented") {
    const report = buildReport({
      workItem: opts.workItem,
      startedAt,
      finishedAt: opts.now(),
      stages: [],
      branch: "",
      merged: false,
    });
    writeReport(opts.baseDir, anchor.type, opts.workItem, opts.runId, report);
    return { report, exitCode: 2 };
  }

  const from = opts.fromStage ?? "sdd";
  const start = Math.max(0, ALL_STAGES.indexOf(from));
  const stages = ALL_STAGES.slice(start);

  const wt = createWorktree(opts.baseDir, opts.workItem, opts.runId, opts.worktreeRoot);
  const outcome = await runPipeline({
    stages,
    runStage: opts.runStage,
    verify: opts.verify,
    cap: opts.cap,
  });

  let merged = false;
  if (outcome.passed) {
    mergeWorktree(opts.baseDir, wt);
    removeWorktree(opts.baseDir, wt);
    merged = true;
    // Advance the anchor to the terminal status (FR-007).
    writeFileSync(anchor.path, withStatus(anchor.content, "verified"), "utf-8");
  }
  // On abort: leave the worktree/branch intact for inspection (SDD §5).

  const report = buildReport({
    workItem: opts.workItem,
    startedAt,
    finishedAt: opts.now(),
    stages: outcome.stages,
    branch: wt.branch,
    merged,
  });
  writeReport(opts.baseDir, anchor.type, opts.workItem, opts.runId, report);

  return { report, exitCode: merged ? 0 : 1 };
}
