// The deterministic pipeline state machine + per-stage verification loop.
// Implements SDD §3 and FR-005 / FR-006 of orc-1-agent-sdk-runner.

import type { StageName, StageReport, VerifierVerdict } from "./report.js";

/** Only these stages go through the verification loop. */
const VERIFIED_STAGES: ReadonlySet<StageName> = new Set<StageName>(["dev", "review"]);

export interface StageContext {
  /** 1-based attempt number for this stage. */
  attempt: number;
  /** Verifier violations from the previous failed attempt (empty on the first). */
  feedback: string[];
}

export interface StageRunResult {
  tokens: number;
  durationMs: number;
}

export type StageRunner = (stage: StageName, ctx: StageContext) => Promise<StageRunResult>;
export type VerifierFn = (stage: StageName) => Promise<VerifierVerdict>;

export interface PipelineOptions {
  stages: StageName[];
  runStage: StageRunner;
  verify: VerifierFn;
  /** Max attempts per verified stage before aborting. Default 3 (FR-005). */
  cap?: number;
}

export interface PipelineOutcome {
  stages: StageReport[];
  /** true → every stage passed (caller merges); false → aborted (caller does NOT merge). */
  passed: boolean;
}

/**
 * Run stages in order. `dev`/`review` are verified: on FAIL the loop retries with
 * the violations as feedback, up to `cap`. On exhaustion it stops immediately and
 * returns `passed: false` so the caller aborts without merging. Ordering and
 * retries live here (deterministic), not in the model.
 */
export async function runPipeline(opts: PipelineOptions): Promise<PipelineOutcome> {
  const cap = opts.cap ?? 3;
  const reports: StageReport[] = [];

  for (const stage of opts.stages) {
    let feedback: string[] = [];
    let verifier: VerifierVerdict | null = null;
    let last: StageRunResult = { tokens: 0, durationMs: 0 };
    let passed = false;
    let attempt = 0;

    while (attempt < cap) {
      attempt++;
      last = await opts.runStage(stage, { attempt, feedback });

      if (!VERIFIED_STAGES.has(stage)) {
        passed = true;
        break;
      }

      verifier = await opts.verify(stage);
      if (verifier.verdict === "PASS") {
        passed = true;
        break;
      }
      feedback = verifier.violations;
    }

    reports.push({
      stage,
      attempts: attempt,
      outcome: passed ? "ok" : "failed",
      verifier,
      tokens: last.tokens,
      durationMs: last.durationMs,
    });

    if (!passed) return { stages: reports, passed: false };
  }

  return { stages: reports, passed: true };
}
