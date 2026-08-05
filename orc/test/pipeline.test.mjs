import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { runPipeline } from "../dist/pipeline.js";

const noop = async () => ({ tokens: 0, durationMs: 0 });

describe("pipeline.runPipeline", () => {
  it("passes when every verified stage passes on the first try", async () => {
    const out = await runPipeline({
      stages: ["sdd", "planning", "dev", "review"],
      runStage: noop,
      verify: async () => ({ verdict: "PASS", violations: [] }),
    });
    assert.equal(out.passed, true);
    assert.equal(out.stages.length, 4);
    assert.ok(out.stages.every((s) => s.attempts === 1 && s.outcome === "ok"));
  });

  it("retries up to the cap and aborts when the verifier keeps failing", async () => {
    let devRuns = 0;
    const out = await runPipeline({
      stages: ["sdd", "dev", "review"],
      runStage: async (stage) => {
        if (stage === "dev") devRuns++;
        return { tokens: 0, durationMs: 0 };
      },
      verify: async () => ({ verdict: "FAIL", violations: ["FR-005 unmet"] }),
      cap: 3,
    });
    assert.equal(out.passed, false);
    assert.equal(devRuns, 3); // retried exactly `cap` times
    const dev = out.stages.find((s) => s.stage === "dev");
    assert.equal(dev.attempts, 3);
    assert.equal(dev.outcome, "failed");
    assert.equal(out.stages.at(-1).stage, "dev"); // stopped at dev; review never ran
  });

  it("passes on a later attempt once the verifier flips to PASS", async () => {
    let n = 0;
    const out = await runPipeline({
      stages: ["dev"],
      runStage: noop,
      verify: async () => (++n < 2 ? { verdict: "FAIL", violations: ["x"] } : { verdict: "PASS", violations: [] }),
    });
    assert.equal(out.passed, true);
    assert.equal(out.stages[0].attempts, 2);
  });

  it("never verifies non-dev/review stages", async () => {
    let verifyCalls = 0;
    await runPipeline({
      stages: ["sdd", "planning"],
      runStage: noop,
      verify: async () => {
        verifyCalls++;
        return { verdict: "PASS", violations: [] };
      },
    });
    assert.equal(verifyCalls, 0);
  });
});
