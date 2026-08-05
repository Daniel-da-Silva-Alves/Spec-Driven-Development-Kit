// The structured run report emitted by every `sddk run`.
// Implements SDD §6 and FR-008 of orc-1-agent-sdk-runner.

export type RunResult = "verified" | "aborted" | "failed";
export type StageName = "sdd" | "planning" | "dev" | "review";

export interface VerifierVerdict {
  verdict: "PASS" | "FAIL";
  violations: string[];
}

export interface StageReport {
  stage: StageName;
  attempts: number;
  outcome: "ok" | "failed";
  verifier: VerifierVerdict | null;
  tokens: number;
  durationMs: number;
}

export interface RunReport {
  workItem: string;
  result: RunResult;
  startedAt: string;
  finishedAt: string;
  stages: StageReport[];
  worktree: { branch: string; merged: boolean };
}

export interface BuildReportInput {
  workItem: string;
  startedAt: string;
  finishedAt: string;
  stages: StageReport[];
  branch: string;
  merged: boolean;
}

/**
 * Derive the overall result from the stage outcomes and merge state:
 * merged → verified; not merged with a failed stage → aborted; otherwise failed.
 */
export function buildReport(input: BuildReportInput): RunReport {
  const anyFailed = input.stages.some((s) => s.outcome === "failed");
  const result: RunResult = input.merged
    ? "verified"
    : anyFailed
    ? "aborted"
    : "failed";
  return {
    workItem: input.workItem,
    result,
    startedAt: input.startedAt,
    finishedAt: input.finishedAt,
    stages: input.stages,
    worktree: { branch: input.branch, merged: input.merged },
  };
}

/** Pretty JSON for writing to `.specs/features/{item}/runs/<runid>.json`. */
export function serializeReport(report: RunReport): string {
  return JSON.stringify(report, null, 2) + "\n";
}
