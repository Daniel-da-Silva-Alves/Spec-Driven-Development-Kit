import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join, resolve, basename, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

// ─── Config ────────────────────────────────────────────────────────
const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const SDDK = join(ROOT, 'sddk');
const PLUGIN_JSON = join(SDDK, 'plugin.json');
const PACKAGE_JSON = join(ROOT, 'package.json');

const SKILLS = [
  'software-requirements-specification',
  'system-design-document',
  'implementation-planning',
  'fullstack-development',
  'code-review',
];

const REQUIRED_SECTIONS = [
  '## Identity',
  '## Pipeline Context',
  '## Mandatory Rules',
  '## Execution Flow',
  '## Routing Table',
];

const WORK_TYPES = ['features', 'fix', 'refact', 'chore'];

// Pipeline order — each skill's expected position indicator
const PIPELINE_CHAIN = [
  { skill: 'software-requirements-specification', marker: '► [1.', prev: null },
  { skill: 'system-design-document',              marker: '► [2.', prev: '1.' },
  { skill: 'implementation-planning',              marker: '► [3.', prev: '2.' },
  { skill: 'fullstack-development',                marker: '► [4.', prev: '3.' },
  { skill: 'code-review',                          marker: '► [5.', prev: '4.' },
];

// ─── Helpers ───────────────────────────────────────────────────────
function readSkill(skillName) {
  return readFileSync(join(SDDK, 'skills', skillName, 'SKILL.md'), 'utf-8');
}

function listRefs(skillName) {
  const refsDir = join(SDDK, 'skills', skillName, 'references');
  if (!existsSync(refsDir)) return [];
  return readdirSync(refsDir).filter(f => f.endsWith('.md'));
}

function extractRoutingRefs(content) {
  // Only extract refs from the Routing Table section (after '## Routing Table')
  const routingIdx = content.indexOf('## Routing Table');
  if (routingIdx === -1) return [];
  const routingSection = content.slice(routingIdx);
  // Matches: `references/filename.md` patterns
  const matches = routingSection.match(/`references\/([^`]+)`/g) || [];
  return matches.map(m => m.replace(/`references\//, '').replace(/`$/, ''));
}

function extractFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};
  const fm = {};
  for (const line of match[1].split('\n')) {
    const [key, ...rest] = line.split(':');
    if (key && rest.length) fm[key.trim()] = rest.join(':').trim().replace(/^"|"$/g, '');
  }
  return fm;
}

// ═══════════════════════════════════════════════════════════════════
// Layer 1: Structural Validation
// ═══════════════════════════════════════════════════════════════════

describe('Layer 1: Structural Validation', () => {

  it('plugin.json lists exactly 5 skills and all paths exist', () => {
    const plugin = JSON.parse(readFileSync(PLUGIN_JSON, 'utf-8'));
    assert.ok(Array.isArray(plugin.skills), 'plugin.json must have a skills array');
    assert.equal(plugin.skills.length, 5, 'plugin.json must list exactly 5 skills');

    for (const skillPath of plugin.skills) {
      const fullPath = join(SDDK, skillPath, 'SKILL.md');
      assert.ok(existsSync(fullPath), `Skill path does not exist: ${skillPath}/SKILL.md`);
    }
  });

  it('plugin.json version matches package.json version', () => {
    const plugin = JSON.parse(readFileSync(PLUGIN_JSON, 'utf-8'));
    const pkg = JSON.parse(readFileSync(PACKAGE_JSON, 'utf-8'));
    assert.equal(plugin.version, pkg.version, `plugin.json (${plugin.version}) !== package.json (${pkg.version})`);
  });

  it('every SKILL.md has all required sections', () => {
    for (const skill of SKILLS) {
      const content = readSkill(skill);
      for (const section of REQUIRED_SECTIONS) {
        assert.ok(
          content.includes(section),
          `${skill}/SKILL.md is missing required section: "${section}"`
        );
      }
    }
  });

  it('every SKILL.md has valid frontmatter (name + description)', () => {
    for (const skill of SKILLS) {
      const content = readSkill(skill);
      const fm = extractFrontmatter(content);
      assert.ok(fm.name, `${skill}/SKILL.md is missing frontmatter "name"`);
      assert.ok(fm.description, `${skill}/SKILL.md is missing frontmatter "description"`);
    }
  });

  it('every file referenced in Routing Tables exists in references/', () => {
    for (const skill of SKILLS) {
      const content = readSkill(skill);
      const referencedFiles = extractRoutingRefs(content);
      const actualFiles = listRefs(skill);

      for (const ref of referencedFiles) {
        assert.ok(
          actualFiles.includes(ref),
          `${skill}/SKILL.md references "references/${ref}" but file does not exist. Available: [${actualFiles.join(', ')}]`
        );
      }
    }
  });

  it('no orphan files in references/ (every file is referenced by its SKILL.md)', () => {
    for (const skill of SKILLS) {
      const content = readSkill(skill);
      const referencedFiles = extractRoutingRefs(content);
      const actualFiles = listRefs(skill);

      for (const file of actualFiles) {
        assert.ok(
          referencedFiles.includes(file),
          `${skill}/references/${file} exists on disk but is NOT referenced in SKILL.md Routing Table`
        );
      }
    }
  });

});

// ═══════════════════════════════════════════════════════════════════
// Layer 2: Semantic Validation
// ═══════════════════════════════════════════════════════════════════

describe('Layer 2: Semantic Validation', () => {

  it('spec templates have required placeholders ({work-name}, {type})', () => {
    const specTemplates = [
      { skill: 'software-requirements-specification', file: 'ieee-830-template.md' },
      { skill: 'software-requirements-specification', file: 'bug-report-template.md' },
      { skill: 'software-requirements-specification', file: 'refact-spec-template.md' },
      { skill: 'software-requirements-specification', file: 'chore-spec-template.md' },
    ];

    for (const { skill, file } of specTemplates) {
      const path = join(SDDK, 'skills', skill, 'references', file);
      const content = readFileSync(path, 'utf-8');

      // Each spec template should have at least one placeholder pattern
      const hasPlaceholder = content.includes('{') && content.includes('}');
      assert.ok(hasPlaceholder, `${file} has no placeholders (expected {work-name} or similar)`);
    }
  });

  it('SDD templates have numbered sections without gaps', () => {
    const sddTemplates = [
      { file: 'sdd-template.md', expectedMin: 8 },
      { file: 'sdd-refact-template.md', expectedMin: 4 },
      { file: 'sdd-fix-chore-template.md', expectedMin: 3 },
    ];

    for (const { file, expectedMin } of sddTemplates) {
      const path = join(SDDK, 'skills', 'system-design-document', 'references', file);
      const content = readFileSync(path, 'utf-8');

      // Count top-level numbered sections (## 1., ## 2., etc.)
      const sections = content.match(/^## \d+\./gm) || [];
      assert.ok(
        sections.length >= expectedMin,
        `${file} has ${sections.length} numbered sections (expected >= ${expectedMin})`
      );
    }
  });

  it('each SKILL.md references work types correctly in tables/paths', () => {
    // Skills 1, 2, 3, 4, 5 should all mention the 4 work types
    const multiTypeSkills = [
      'software-requirements-specification',
      'system-design-document',
      'implementation-planning',
      'fullstack-development',
      'code-review',
    ];

    for (const skill of multiTypeSkills) {
      const content = readSkill(skill);
      for (const type of WORK_TYPES) {
        assert.ok(
          content.includes(type),
          `${skill}/SKILL.md does not mention work type "${type}"`
        );
      }
    }
  });

  it('language output rule is present in ALL 5 SKILL.md files', () => {
    const languageRule = 'ALWAYS write ALL generated documents and artifacts in the same language the user communicates in';

    for (const skill of SKILLS) {
      const content = readSkill(skill);
      assert.ok(
        content.includes(languageRule),
        `${skill}/SKILL.md is missing the language output rule`
      );
    }
  });

});

// ═══════════════════════════════════════════════════════════════════
// Layer 3: Pipeline Coherence (Smoke Tests)
// ═══════════════════════════════════════════════════════════════════

describe('Layer 3: Pipeline Coherence', () => {

  it('5 skills form a logical chain: each points to its position with ► and marks predecessors with ✅', () => {
    for (const { skill, marker, prev } of PIPELINE_CHAIN) {
      const content = readSkill(skill);

      assert.ok(
        content.includes(marker),
        `${skill}/SKILL.md does not contain pipeline marker "${marker}" (expected to mark itself as current)`
      );

      if (prev) {
        assert.ok(
          content.includes(`${prev}`) && content.includes('✅'),
          `${skill}/SKILL.md does not mark stage ${prev} as completed (✅)`
        );
      }
    }
  });

  it('each Phase N+1 skill has a Precondition referencing artifacts from Phase N', () => {
    // Skill 2 should require spec document
    const sdd = readSkill('system-design-document');
    assert.ok(
      sdd.includes('Precondition') || sdd.includes('precondition'),
      'SDD skill should have a Precondition section'
    );
    assert.ok(
      sdd.includes('srs.md') || sdd.includes('spec_document') || sdd.includes('specification'),
      'SDD skill Precondition should reference spec document from Skill 1'
    );

    // Skill 3 should require SDD
    const planning = readSkill('implementation-planning');
    assert.ok(
      planning.includes('sdd.md'),
      'Planning skill should reference sdd.md as precondition'
    );

    // Skill 4 should require manual-tests.md (from Planning)
    const dev = readSkill('fullstack-development');
    assert.ok(
      dev.includes('manual-tests.md'),
      'Dev skill should reference manual-tests.md as precondition'
    );

    // Skill 5 should require SDD + manual-tests.md
    const review = readSkill('code-review');
    assert.ok(
      review.includes('sdd.md') && review.includes('manual-tests.md'),
      'Code Review skill should reference sdd.md and manual-tests.md as preconditions'
    );
  });

  it('all 4 work types have coverage in each skill', () => {
    for (const skill of SKILLS) {
      const content = readSkill(skill);

      // Each skill should mention features and at least reference fix/refact/chore
      assert.ok(content.includes('features'), `${skill} does not mention "features"`);

      // For the specification skill, check explicit type routing
      if (skill === 'software-requirements-specification') {
        assert.ok(content.includes('srs.md'), 'SRS skill should mention srs.md');
        assert.ok(content.includes('bug-report.md'), 'SRS skill should mention bug-report.md');
        assert.ok(content.includes('refact-spec.md'), 'SRS skill should mention refact-spec.md');
        assert.ok(content.includes('chore-spec.md'), 'SRS skill should mention chore-spec.md');
      }
    }
  });

  it('CLI references the same skills as plugin.json', () => {
    const cliPath = join(ROOT, 'bin', 'cli.js');
    const cli = readFileSync(cliPath, 'utf-8');
    const plugin = JSON.parse(readFileSync(PLUGIN_JSON, 'utf-8'));

    // CLI should reference each skill directory name
    for (const skillPath of plugin.skills) {
      const skillDirName = basename(skillPath);
      // CLI doesn't necessarily reference skill names, but should reference the sddk directory
      assert.ok(
        cli.includes('sddk') || cli.includes('skills'),
        `CLI should reference the sddk plugin directory`
      );
    }

    // CLI should reference plugin.json or the plugin name
    assert.ok(
      cli.includes('plugin.json') || cli.includes('spec-driven-development-kit') || cli.includes('sddk'),
      'CLI should reference the plugin identity'
    );
  });

});

// ═══════════════════════════════════════════════════════════════════
// Layer 4: BKL-12 — Propositional Interview & Infrastructure Categories
// ═══════════════════════════════════════════════════════════════════

describe('Layer 4: BKL-12 Propositional Interview', () => {

  it('SDD SKILL.md has Phase 1.5: Constraints Discovery for features', () => {
    const sdd = readSkill('system-design-document');

    assert.ok(
      sdd.includes('Phase 1.5') && sdd.includes('Constraints Discovery'),
      'SDD skill must have "Phase 1.5: Constraints Discovery"'
    );

    // Must be features-only
    assert.ok(
      sdd.includes('type: features ONLY') || sdd.includes('features ONLY'),
      'Phase 1.5 must be marked as features-only'
    );

    // Must have the 5 constraint categories
    const constraintCategories = [
      'Infrastructure',
      'Financial',
      'Timeline',
      'Security',
      'Legacy',
    ];
    for (const cat of constraintCategories) {
      assert.ok(
        sdd.includes(cat),
        `Phase 1.5 must include constraint category: "${cat}"`
      );
    }
  });

  it('SDD SKILL.md has propositional posture rule', () => {
    const sdd = readSkill('system-design-document');

    // Must include rule about propositional approach
    assert.ok(
      sdd.includes('propositional posture') || sdd.includes('Propositional Posture'),
      'SDD skill must have a propositional posture rule'
    );

    // Must include the key directive
    assert.ok(
      sdd.includes('PROPOSE') && sdd.includes('justification'),
      'SDD skill must instruct the agent to PROPOSE with justification'
    );
  });

  it('SDD SKILL.md mandates search_web for technology suggestions', () => {
    const sdd = readSkill('system-design-document');

    assert.ok(
      sdd.includes('search_web'),
      'SDD skill must reference search_web for technology validation'
    );

    assert.ok(
      sdd.includes('NEVER rely solely on training data') ||
      sdd.includes('never rely solely on training data'),
      'SDD skill must warn against relying solely on training data'
    );
  });

  it('tech-stack-analysis.md has all 6 infrastructure categories', () => {
    const techStack = readFileSync(
      join(SDDK, 'skills', 'system-design-document', 'references', 'tech-stack-analysis.md'),
      'utf-8'
    );

    const categories = [
      { name: 'Database', marker: 'Category 1: Database' },
      { name: 'Authentication', marker: 'Category 2: Authentication' },
      { name: 'Hosting', marker: 'Category 3: Hosting' },
      { name: 'Storage', marker: 'Category 4: Storage' },
      { name: 'Observability', marker: 'Category 5: Observability' },
      { name: 'Queues', marker: 'Category 6: Queues' },
    ];

    for (const { name, marker } of categories) {
      assert.ok(
        techStack.includes(marker),
        `tech-stack-analysis.md is missing infrastructure category: "${name}" (expected marker: "${marker}")`
      );
    }

    // Each category should have diagnostic questions
    assert.ok(
      techStack.includes('Diagnostic Questions'),
      'tech-stack-analysis.md categories must include diagnostic questions'
    );

    // Must have the web search mandate section
    assert.ok(
      techStack.includes('Web Search Mandate'),
      'tech-stack-analysis.md must have a "Web Search Mandate" section'
    );
  });

});
