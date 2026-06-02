#!/usr/bin/env node

/**
 * SDDK CLI — Spec-Driven Development Kit Installer
 *
 * Installs the SDDK plugin for AI coding agents (Gemini, Claude, etc.)
 * into the appropriate plugin directory.
 *
 * Usage:
 *   sddk install [--global]    Install the plugin
 *   sddk uninstall [--global]  Remove the plugin
 *   sddk --version             Show version
 *   sddk --help                Show help
 *
 * Zero dependencies — uses only Node.js built-in modules.
 */

"use strict";

const fs = require("fs");
const path = require("path");
const os = require("os");

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const PACKAGE = require(path.join(__dirname, "..", "package.json"));
const VERSION = PACKAGE.version;
const PLUGIN_SOURCE = path.join(__dirname, "..", "sddk");
const PLUGIN_DIR_NAME = "sddk";

// Target directories for plugin installation
const GLOBAL_PLUGIN_DIR = path.join(
  os.homedir(),
  ".gemini",
  "config",
  "plugins",
  PLUGIN_DIR_NAME
);

const LOCAL_PLUGIN_DIR = path.join(
  process.cwd(),
  ".gemini",
  "plugins",
  PLUGIN_DIR_NAME
);

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
    `    ${color.cyan}sddk install${color.reset}              Install plugin in current project`
  );
  log(
    `    ${color.cyan}sddk install --global${color.reset}     Install plugin globally (all projects)`
  );
  log(
    `    ${color.cyan}sddk uninstall${color.reset}            Remove plugin from current project`
  );
  log(
    `    ${color.cyan}sddk uninstall --global${color.reset}   Remove plugin globally`
  );
  log(
    `    ${color.cyan}sddk status${color.reset}               Check installation status`
  );
  log(`    ${color.cyan}sddk --version${color.reset}            Show version`);
  log(`    ${color.cyan}sddk --help${color.reset}               Show this help`);
  log("");
  log(`${color.bold}  EXAMPLES${color.reset}`);
  log("");
  log(
    `    ${color.dim}# Install globally via npm${color.reset}`
  );
  log(`    ${color.white}npm install -g @daniel-da-silva-alves/sddk${color.reset}`);
  log(`    ${color.white}sddk install --global${color.reset}`);
  log("");
  log(
    `    ${color.dim}# Install per-project via npx (no permanent install)${color.reset}`
  );
  log(`    ${color.white}npx @daniel-da-silva-alves/sddk install${color.reset}`);
  log("");
  log(
    `    ${color.dim}# Install per-project as devDependency${color.reset}`
  );
  log(`    ${color.white}npm install --save-dev @daniel-da-silva-alves/sddk${color.reset}`);
  log(`    ${color.white}npx sddk install${color.reset}`);
  log("");
  log(`${color.bold}  PLUGIN DIRECTORIES${color.reset}`);
  log("");
  log(
    `    ${color.dim}Global:${color.reset}    ~/.gemini/config/plugins/sddk/`
  );
  log(
    `    ${color.dim}Per-project:${color.reset} ./.gemini/plugins/sddk/`
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

function install(isGlobal) {
  const targetDir = isGlobal ? GLOBAL_PLUGIN_DIR : LOCAL_PLUGIN_DIR;
  const modeLabel = isGlobal ? "global" : "per-project";

  log("");
  log(
    `${color.bold}${color.magenta}  SDDK${color.reset} ${color.dim}v${VERSION}${color.reset}`
  );
  log("");

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

  // Check if already installed
  if (fs.existsSync(targetDir)) {
    logInfo(`Plugin already installed at: ${color.dim}${targetDir}${color.reset}`);
    logStep("Updating to latest version...");
    removeDirRecursive(targetDir);
  }

  // Install
  logStep(`Installing ${color.bold}${modeLabel}${color.reset}...`);
  logStep(`Target: ${color.dim}${targetDir}${color.reset}`);

  try {
    copyDirRecursive(PLUGIN_SOURCE, targetDir);
    const fileCount = countFiles(targetDir);

    log("");
    logSuccess(
      `${color.bold}SDDK plugin installed successfully!${color.reset} (${fileCount} files)`
    );
    log("");

    if (isGlobal) {
      logInfo("The plugin is now available in ALL your projects.");
      logInfo(
        'Restart your IDE and ask your agent: "What skills do you have?"'
      );
    } else {
      logInfo("The plugin is now available in THIS project only.");
      logInfo(
        `Installed to: ${color.dim}${path.relative(process.cwd(), targetDir)}${color.reset}`
      );
      logInfo(
        'Restart your IDE and ask your agent: "What skills do you have?"'
      );
    }

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

function uninstall(isGlobal) {
  const targetDir = isGlobal ? GLOBAL_PLUGIN_DIR : LOCAL_PLUGIN_DIR;
  const modeLabel = isGlobal ? "global" : "per-project";

  log("");
  log(
    `${color.bold}${color.magenta}  SDDK${color.reset} ${color.dim}v${VERSION}${color.reset}`
  );
  log("");

  if (!fs.existsSync(targetDir)) {
    logInfo(
      `No ${modeLabel} installation found at: ${color.dim}${targetDir}${color.reset}`
    );
    log("");
    return;
  }

  logStep(`Removing ${color.bold}${modeLabel}${color.reset} installation...`);
  logStep(`Target: ${color.dim}${targetDir}${color.reset}`);

  try {
    removeDirRecursive(targetDir);
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

  const globalExists = fs.existsSync(GLOBAL_PLUGIN_DIR);
  const localExists = fs.existsSync(LOCAL_PLUGIN_DIR);

  log(`${color.bold}  Installation Status${color.reset}`);
  log("");

  // Global
  if (globalExists) {
    const fileCount = countFiles(GLOBAL_PLUGIN_DIR);
    logSuccess(
      `Global:      ${color.green}installed${color.reset} (${fileCount} files)`
    );
    log(
      `             ${color.dim}${GLOBAL_PLUGIN_DIR}${color.reset}`
    );
  } else {
    log(
      `${color.dim}○${color.reset} Global:      ${color.dim}not installed${color.reset}`
    );
    log(
      `             ${color.dim}${GLOBAL_PLUGIN_DIR}${color.reset}`
    );
  }

  log("");

  // Local
  if (localExists) {
    const fileCount = countFiles(LOCAL_PLUGIN_DIR);
    logSuccess(
      `Per-project: ${color.green}installed${color.reset} (${fileCount} files)`
    );
    log(
      `             ${color.dim}${LOCAL_PLUGIN_DIR}${color.reset}`
    );
  } else {
    log(
      `${color.dim}○${color.reset} Per-project: ${color.dim}not installed${color.reset}`
    );
    log(
      `             ${color.dim}${LOCAL_PLUGIN_DIR}${color.reset}`
    );
  }

  log("");

  if (!globalExists && !localExists) {
    logInfo(
      `Run ${color.cyan}sddk install${color.reset} or ${color.cyan}sddk install --global${color.reset} to get started.`
    );
    log("");
  }
}

// ---------------------------------------------------------------------------
// CLI Argument Parser
// ---------------------------------------------------------------------------

function main() {
  const args = process.argv.slice(2);

  // Flags
  const hasGlobal = args.includes("--global") || args.includes("-g");
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
      install(hasGlobal);
      break;

    case "uninstall":
    case "remove":
      uninstall(hasGlobal);
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
