import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { buildReport, serializeReport } from "../dist/report.js";

const base = {
  workItem: "orc-1-agent-sdk-runner",
  startedAt: "2026-08-05T00:00:00Z",
  finishedAt: "2026-08-05T00:01:00Z",
  branch: "sddk/run/orc-1-abc",
};

describe("report.buildReport", () => {
  it("marks verified when the worktree merged", () => {
    const r = buildReport({ ...base, stages: [], merged: true });
    assert.equal(r.result, "verified");
    assert.equal(r.worktree.merged, true);
  });

  it("marks aborted when a stage failed and nothing merged", () => {
    const stages = [
      {
        stage: "dev",
        attempts: 3,
        outcome: "failed",
        verifier: { verdict: "FAIL", violations: ["FR-005 unmet"] },
        tokens: 0,
        durationMs: 0,
      },
    ];
    assert.equal(buildReport({ ...base, stages, merged: false }).result, "aborted");
  });
});

describe("report.serializeReport", () => {
  it("emits pretty JSON ending in a newline", () => {
    const s = serializeReport(buildReport({ ...base, stages: [], merged: true }));
    assert.match(s, /"result": "verified"/);
    assert.ok(s.endsWith("\n"));
  });
});
