#!/usr/bin/env node

/**
 * SDDK CLI — Spec-Driven Development Kit Installer
 *
 * Installs the SDDK plugin for AI coding agents.
 * Supports multiple IDEs: Gemini (Antigravity), Claude Code, or both.
 *
 * Usage:
 *   sddk install               Install the plugin (interactive IDE selection)
 *   sddk uninstall              Remove the plugin (interactive IDE selection)
 *   sddk status                 Check installation status (all IDEs)
 *   sddk --version              Show version
 *   sddk --help                 Show help
 *
 * Zero dependencies — uses only Node.js built-in modules.
 */

"use strict";

const fs = require("fs");
const path = require("path");
const os = require("os");
const readline = require("readline");

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const PACKAGE = require(path.join(__dirname, "..", "package.json"));
const VERSION = PACKAGE.version;
const PLUGIN_SOURCE = path.join(__dirname, "..", "sddk");
const SKILLS_SOURCE = path.join(PLUGIN_SOURCE, "skills");
const CLAUDE_MD_SOURCE = path.join(PLUGIN_SOURCE, "CLAUDE.md");

// CLAUDE.md injection markers (used to identify SDDK block)
const SDDK_BLOCK_START = "<!-- SDDK:START";
const SDDK_BLOCK_END = "<!-- SDDK:END -->";

// Claude Code global instruction file
const CLAUDE_MD_PATH = path.join(os.homedir(), ".claude", "CLAUDE.md");

// IDE target definitions
const TARGETS = {
  gemini: {
    name: "Gemini (Antigravity)",
    shortName: "Gemini",
    dir: path.join(os.homedir(), ".gemini", "config", "plugins", "sddk"),
    displayPath: "~/.gemini/config/plugins/sddk/",
    // Gemini: copy entire sddk/ directory (with plugin.json)
    copyStrategy: "full",
  },
  claude: {
    name: "Claude Code",
    shortName: "Claude",
    dir: path.join(os.homedir(), ".claude", "skills"),
    displayPath: "~/.claude/skills/",
    // Claude: copy only sddk/skills/* directly into ~/.claude/skills/
    copyStrategy: "skills-only",
  },
};

// Skills that SDDK ships (directory names inside sddk/skills/)
const SKILL_NAMES = [
  "software-requirements-specification",
  "system-design-document",
  "implementation-planning",
  "fullstack-development",
  "code-review",
];

// ANSI color helpers (works on all modern terminals)
const color = {
  reset: "\x1b[0m",
  bold: "\x1b[1m",
  dim: "\x1b[2m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  magenta: "\x1b[35m",
  cyan: "\x1b[36m",
  red: "\x1b[31m",
  white: "\x1b[37m",
};

// ---------------------------------------------------------------------------
// Utility Functions
// ---------------------------------------------------------------------------

function log(message) {
  console.log(message);
}

function logSuccess(message) {
  log(`${color.green}✔${color.reset} ${message}`);
}

function logError(message) {
  log(`${color.red}✖${color.reset} ${message}`);
}

function logInfo(message) {
  log(`${color.cyan}ℹ${color.reset} ${message}`);
}

function logStep(message) {
  log(`${color.blue}→${color.reset} ${message}`);
}

/**
 * Recursively copies a directory from src to dest.
 * Creates dest and any intermediate directories as needed.
 */
function copyDirRecursive(src, dest) {
  if (!fs.existsSync(src)) {
    throw new Error(`Source directory not found: ${src}`);
  }

  fs.mkdirSync(dest, { recursive: true });

  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDirRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

/**
 * Recursively removes a directory.
 */
function removeDirRecursive(dirPath) {
  if (fs.existsSync(dirPath)) {
    fs.rmSync(dirPath, { recursive: true, force: true });
  }
}

/**
 * Counts files recursively in a directory.
 */
function countFiles(dirPath) {
  let count = 0;
  if (!fs.existsSync(dirPath)) return 0;

  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.isDirectory()) {
      count += countFiles(path.join(dirPath, entry.name));
    } else {
      count++;
    }
  }
  return count;
}

// ---------------------------------------------------------------------------
// CLAUDE.md Injection (Claude Code pipeline awareness)
// ---------------------------------------------------------------------------

/**
 * Reads the CLAUDE.md template from sddk/CLAUDE.md and replaces
 * the {version} placeholder with the current SDDK version.
 */
function getClaudeMdBlock() {
  if (!fs.existsSync(CLAUDE_MD_SOURCE)) {
    return null;
  }
  const template = fs.readFileSync(CLAUDE_MD_SOURCE, "utf-8");
  return template.replace(/\{version\}/g, VERSION);
}

/**
 * Injects the SDDK block into ~/.claude/CLAUDE.md.
 * If the file does not exist, creates it.
 * If the file exists and already has an SDDK block, replaces it.
 * If the file exists without an SDDK block, appends it.
 */
function injectClaudeMd() {
  const block = getClaudeMdBlock();
  if (!block) {
    logInfo(`${color.dim}CLAUDE.md template not found — skipping injection.${color.reset}`);
    return false;
  }

  const claudeDir = path.dirname(CLAUDE_MD_PATH);
  fs.mkdirSync(claudeDir, { recursive: true });

  if (!fs.existsSync(CLAUDE_MD_PATH)) {
    // File does not exist — create with SDDK block
    fs.writeFileSync(CLAUDE_MD_PATH, block, "utf-8");
    logSuccess(`CLAUDE.md created: ${color.dim}~/.claude/CLAUDE.md${color.reset}`);
    return true;
  }

  // File exists — check for existing SDDK block
  let content = fs.readFileSync(CLAUDE_MD_PATH, "utf-8");

  const startIdx = content.indexOf(SDDK_BLOCK_START);
  const endIdx = content.indexOf(SDDK_BLOCK_END);

  if (startIdx !== -1 && endIdx !== -1) {
    // Replace existing SDDK block
    const before = content.substring(0, startIdx);
    const after = content.substring(endIdx + SDDK_BLOCK_END.length);
    content = before + block + after;
    fs.writeFileSync(CLAUDE_MD_PATH, content, "utf-8");
    logSuccess(`CLAUDE.md updated: ${color.dim}~/.claude/CLAUDE.md${color.reset}`);
    return true;
  }

  // No existing block — append
  const separator = content.endsWith("\n") ? "\n" : "\n\n";
  content = content + separator + block;
  fs.writeFileSync(CLAUDE_MD_PATH, content, "utf-8");
  logSuccess(`CLAUDE.md updated: ${color.dim}~/.claude/CLAUDE.md${color.reset}`);
  return true;
}

/**
 * Removes the SDDK block from ~/.claude/CLAUDE.md.
 * If the file becomes empty after removal, deletes it.
 */
function removeClaudeMd() {
  if (!fs.existsSync(CLAUDE_MD_PATH)) {
    return false;
  }

  let content = fs.readFileSync(CLAUDE_MD_PATH, "utf-8");

  const startIdx = content.indexOf(SDDK_BLOCK_START);
  const endIdx = content.indexOf(SDDK_BLOCK_END);

  if (startIdx === -1 || endIdx === -1) {
    return false;
  }

  const before = content.substring(0, startIdx);
  const after = content.substring(endIdx + SDDK_BLOCK_END.length);
  content = (before + after).trim();

  if (content.length === 0) {
    // File is empty — remove it
    fs.unlinkSync(CLAUDE_MD_PATH);
    logSuccess(`CLAUDE.md removed: ${color.dim}~/.claude/CLAUDE.md${color.reset}`);
  } else {
    fs.writeFileSync(CLAUDE_MD_PATH, content + "\n", "utf-8");
    logSuccess(`CLAUDE.md cleaned: ${color.dim}SDDK block removed${color.reset}`);
  }
  return true;
}

/**
 * Checks if the SDDK block is present in ~/.claude/CLAUDE.md.
 */
function isClaudeMdInjected() {
  if (!fs.existsSync(CLAUDE_MD_PATH)) {
    return false;
  }
  const content = fs.readFileSync(CLAUDE_MD_PATH, "utf-8");
  return content.includes(SDDK_BLOCK_START) && content.includes(SDDK_BLOCK_END);
}

/**
 * Prompts the user with a question and returns their answer.
 * Uses readline for interactive terminal input.
 */
function prompt(question) {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer.trim());
    });
  });
}

/**
 * Displays the IDE selection menu and returns the chosen target keys.
 * Returns an array of target keys: ["gemini"], ["claude"], or ["gemini", "claude"].
 */
async function selectTargets(action) {
  log("");
  log(`${color.bold}  Select your IDE:${color.reset}`);
  log("");
  log(`    ${color.cyan}1${color.reset}  Gemini ${color.dim}(Antigravity / Google AI IDE)${color.reset}`);
  log(`    ${color.cyan}2${color.reset}  Claude Code ${color.dim}(Anthropic)${color.reset}`);
  log(`    ${color.cyan}3${color.reset}  Both ${color.dim}(install for Gemini + Claude Code)${color.reset}`);
  log("");

  const answer = await prompt(`${color.blue}→${color.reset} Choose an option ${color.dim}[1/2/3]${color.reset}: `);

  switch (answer) {
    case "1":
      return ["gemini"];
    case "2":
      return ["claude"];
    case "3":
      return ["gemini", "claude"];
    default:
      logError(`Invalid option: "${answer}". Please choose 1, 2, or 3.`);
      process.exit(1);
  }
}

// ---------------------------------------------------------------------------
// Installation Logic per Target
// ---------------------------------------------------------------------------

/**
 * Installs SDDK for a specific IDE target.
 *
 * Gemini strategy ("full"):
 *   Copies the entire sddk/ directory (with plugin.json) to
 *   ~/.gemini/config/plugins/sddk/
 *
 * Claude Code strategy ("skills-only"):
 *   Copies each skill directory directly into ~/.claude/skills/
 *   (no plugin.json, no intermediate sddk/ folder)
 */
function installForTarget(targetKey) {
  const target = TARGETS[targetKey];

  log("");
  logStep(`Installing for ${color.bold}${target.name}${color.reset}...`);
  logStep(`Target: ${color.dim}${target.displayPath}${color.reset}`);

  if (target.copyStrategy === "full") {
    // Gemini: copy entire sddk/ directory
    if (fs.existsSync(target.dir)) {
      logInfo(`Already installed — updating to v${VERSION}...`);
      removeDirRecursive(target.dir);
    }
    copyDirRecursive(PLUGIN_SOURCE, target.dir);
  } else if (target.copyStrategy === "skills-only") {
    // Claude Code: copy each skill individually into ~/.claude/skills/
    fs.mkdirSync(target.dir, { recursive: true });

    for (const skillName of SKILL_NAMES) {
      const skillSrc = path.join(SKILLS_SOURCE, skillName);
      const skillDest = path.join(target.dir, skillName);

      if (fs.existsSync(skillDest)) {
        removeDirRecursive(skillDest);
      }
      copyDirRecursive(skillSrc, skillDest);
    }

    // Inject pipeline awareness into ~/.claude/CLAUDE.md
    injectClaudeMd();
  }

  const fileCount = countFilesForTarget(targetKey);
  logSuccess(
    `${color.bold}${target.shortName}${color.reset}: installed ${color.green}${fileCount} files${color.reset}`
  );
}

/**
 * Counts installed files for a target.
 */
function countFilesForTarget(targetKey) {
  const target = TARGETS[targetKey];

  if (target.copyStrategy === "full") {
    return countFiles(target.dir);
  }

  // Claude: count across all skill directories
  let total = 0;
  for (const skillName of SKILL_NAMES) {
    total += countFiles(path.join(target.dir, skillName));
  }
  return total;
}

/**
 * Checks if SDDK is installed for a specific target.
 */
function isInstalledForTarget(targetKey) {
  const target = TARGETS[targetKey];

  if (target.copyStrategy === "full") {
    return fs.existsSync(target.dir);
  }

  // Claude: check if at least one SDDK skill exists
  for (const skillName of SKILL_NAMES) {
    const skillDir = path.join(target.dir, skillName);
    if (fs.existsSync(path.join(skillDir, "SKILL.md"))) {
      return true;
    }
  }
  return false;
}

/**
 * Uninstalls SDDK for a specific target.
 */
function uninstallForTarget(targetKey) {
  const target = TARGETS[targetKey];

  log("");
  logStep(`Removing from ${color.bold}${target.name}${color.reset}...`);

  if (!isInstalledForTarget(targetKey)) {
    logInfo(
      `Not installed at: ${color.dim}${target.displayPath}${color.reset}`
    );
    return;
  }

  if (target.copyStrategy === "full") {
    removeDirRecursive(target.dir);
  } else {
    // Claude: remove only SDDK skill directories (leave other skills untouched)
    for (const skillName of SKILL_NAMES) {
      removeDirRecursive(path.join(target.dir, skillName));
    }

    // Remove SDDK block from ~/.claude/CLAUDE.md
    removeClaudeMd();
  }

  logSuccess(
    `${color.bold}${target.shortName}${color.reset}: removed successfully`
  );
}

// ---------------------------------------------------------------------------
// Commands
// ---------------------------------------------------------------------------

function showHelp() {
  log("");
  log(
    `${color.bold}${color.magenta}  SDDK${color.reset} ${color.dim}— Spec-Driven Development Kit${color.reset}`
  );
  log(
    `${color.dim}  An AI agent plugin for disciplined software engineering${color.reset}`
  );
  log("");
  log(`${color.bold}  USAGE${color.reset}`);
  log("");
  log(
    `    ${color.cyan}sddk install${color.reset}               Install the plugin (select your IDE)`
  );
  log(
    `    ${color.cyan}sddk uninstall${color.reset}             Remove the plugin (select your IDE)`
  );
  log(
    `    ${color.cyan}sddk status${color.reset}                Check installation status (all IDEs)`
  );
  log(`    ${color.cyan}sddk --version${color.reset}             Show version`);
  log(`    ${color.cyan}sddk --help${color.reset}                Show this help`);
  log("");
  log(`${color.bold}  EXAMPLES${color.reset}`);
  log("");
  log(
    `    ${color.dim}# Install via npm (recommended)${color.reset}`
  );
  log(`    ${color.white}npm install -g @daniel-da-silva-alves/sddk${color.reset}`);
  log(`    ${color.white}sddk install${color.reset}`);
  log("");
  log(
    `    ${color.dim}# Install via npx (no permanent install)${color.reset}`
  );
  log(`    ${color.white}npx @daniel-da-silva-alves/sddk install${color.reset}`);
  log("");
  log(`${color.bold}  SUPPORTED IDEs${color.reset}`);
  log("");
  log(
    `    ${color.cyan}1${color.reset}  Gemini ${color.dim}→ ~/.gemini/config/plugins/sddk/${color.reset}`
  );
  log(
    `    ${color.cyan}2${color.reset}  Claude Code ${color.dim}→ ~/.claude/skills/${color.reset}`
  );
  log("");
  log(
    `  ${color.dim}v${VERSION} — https://github.com/Daniel-da-Silva-Alves/Spec-Driven-Development-Kit${color.reset}`
  );
  log("");
}

function showVersion() {
  log(VERSION);
}

async function install() {
  log("");
  log(
    `${color.bold}${color.magenta}  SDDK${color.reset} ${color.dim}v${VERSION}${color.reset}`
  );

  // Validate source exists
  if (!fs.existsSync(PLUGIN_SOURCE)) {
    logError(
      `Plugin source directory not found: ${PLUGIN_SOURCE}`
    );
    logInfo(
      "This usually means the npm package is corrupted. Try reinstalling:"
    );
    log(`    npm install -g @daniel-da-silva-alves/sddk`);
    process.exit(1);
  }

  // Interactive IDE selection
  const targets = await selectTargets("install");

  try {
    for (const targetKey of targets) {
      installForTarget(targetKey);
    }

    log("");
    logSuccess(
      `${color.bold}SDDK plugin installed successfully!${color.reset}`
    );
    log("");

    logInfo("The plugin is now available in ALL your projects.");
    logInfo(
      'Restart your IDE and ask your agent: "What skills do you have?"'
    );

    log("");
    log(
      `${color.dim}  Tip: Run ${color.cyan}sddk status${color.reset}${color.dim} to check your installation anytime.${color.reset}`
    );
    log("");
  } catch (err) {
    logError(`Installation failed: ${err.message}`);
    process.exit(1);
  }
}

async function uninstall() {
  log("");
  log(
    `${color.bold}${color.magenta}  SDDK${color.reset} ${color.dim}v${VERSION}${color.reset}`
  );

  // Interactive IDE selection
  const targets = await selectTargets("uninstall");

  try {
    for (const targetKey of targets) {
      uninstallForTarget(targetKey);
    }

    log("");
    logSuccess(
      `${color.bold}SDDK plugin removed successfully!${color.reset}`
    );
    logInfo("Restart your IDE for changes to take effect.");
    log("");
  } catch (err) {
    logError(`Uninstall failed: ${err.message}`);
    process.exit(1);
  }
}

function status() {
  log("");
  log(
    `${color.bold}${color.magenta}  SDDK${color.reset} ${color.dim}v${VERSION}${color.reset}`
  );
  log("");

  log(`${color.bold}  Installation Status${color.reset}`);
  log("");

  let anyInstalled = false;

  for (const [targetKey, target] of Object.entries(TARGETS)) {
    const installed = isInstalledForTarget(targetKey);

    if (installed) {
      anyInstalled = true;
      const fileCount = countFilesForTarget(targetKey);
      logSuccess(
        `${target.name}: ${color.green}installed${color.reset} (${fileCount} files)`
      );
      log(
        `        ${color.dim}${target.displayPath}${color.reset}`
      );

      // Show CLAUDE.md status for Claude Code
      if (targetKey === "claude") {
        if (isClaudeMdInjected()) {
          logSuccess(
            `CLAUDE.md: ${color.green}pipeline awareness injected${color.reset}`
          );
        } else {
          log(
            `${color.yellow}⚠${color.reset} CLAUDE.md: ${color.yellow}SDDK block not found${color.reset} ${color.dim}(run sddk install to fix)${color.reset}`
          );
        }
        log(
          `        ${color.dim}~/.claude/CLAUDE.md${color.reset}`
        );
      }
    } else {
      log(
        `${color.dim}○${color.reset} ${target.name}: ${color.dim}not installed${color.reset}`
      );
      log(
        `        ${color.dim}${target.displayPath}${color.reset}`
      );
    }
    log("");
  }

  if (!anyInstalled) {
    logInfo(
      `Run ${color.cyan}sddk install${color.reset} to get started.`
    );
    log("");
  }
}

// ---------------------------------------------------------------------------
// CLI Argument Parser
// ---------------------------------------------------------------------------

async function main() {
  const args = process.argv.slice(2);

  // Flags
  const hasVersion = args.includes("--version") || args.includes("-v");
  const hasHelp =
    args.includes("--help") || args.includes("-h") || args.length === 0;

  // Get command (first non-flag argument)
  const command = args.find((arg) => !arg.startsWith("-"));

  // Handle flags first
  if (hasVersion) {
    showVersion();
    return;
  }

  if (!command && hasHelp) {
    showHelp();
    return;
  }

  // Handle commands
  switch (command) {
    case "install":
      await install();
      break;

    case "uninstall":
    case "remove":
      await uninstall();
      break;

    case "status":
      status();
      break;

    case "help":
      showHelp();
      break;

    default:
      logError(`Unknown command: ${command}`);
      log("");
      log(`Run ${color.cyan}sddk --help${color.reset} for usage information.`);
      log("");
      process.exit(1);
  }
}

main();
