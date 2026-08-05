import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  parseFrontmatter,
  statusOf,
  nextStatus,
  withStatus,
  ANCHORS,
} from "../dist/specs.js";

describe("specs.parseFrontmatter", () => {
  it("tolerates CRLF and inline comments on the status line", () => {
    const content =
      "---\r\ntype: srs\r\nstatus: implemented            # implemented -> verified\r\nwork_item: orc-1\r\n---\r\n\r\n# body";
    assert.equal(statusOf(content), "implemented");
    assert.equal(parseFrontmatter(content).work_item, "orc-1");
  });

  it("returns empty status when there is no frontmatter", () => {
    assert.equal(statusOf("# just a heading\n"), "");
  });
});

describe("specs.nextStatus", () => {
  it("advances draft -> approved -> implemented -> verified", () => {
    assert.equal(nextStatus("draft"), "approved");
    assert.equal(nextStatus("approved"), "implemented");
    assert.equal(nextStatus("implemented"), "verified");
  });

  it("is terminal at verified and null for unknown", () => {
    assert.equal(nextStatus("verified"), null);
    // @ts-ignore — exercising the unknown-value guard
    assert.equal(nextStatus("bogus"), null);
  });
});

describe("specs.withStatus", () => {
  it("rewrites only the frontmatter status line", () => {
    const content = "---\ntype: srs\nstatus: draft\n---\n\nstatus: draft in prose\n";
    const out = withStatus(content, "approved");
    assert.match(out, /^status: approved$/m);
    assert.match(out, /status: draft in prose/); // body untouched
  });
});

describe("specs.ANCHORS", () => {
  it("maps each work type to its anchor document", () => {
    assert.equal(ANCHORS.features, "srs.md");
    assert.equal(ANCHORS.fix, "bug-report.md");
  });
});
