#!/usr/bin/env node

/**
 * SDDK CLI — Spec-Driven Development Kit Installer
 *
 * Installs the SDDK plugin for AI coding agents (Gemini, Claude, etc.)
 * into the global plugin directory (~/.gemini/config/plugins/sddk/).
 *
 * Usage:
 *   sddk install               Install the plugin
 *   sddk uninstall              Remove the plugin
 *   sddk status                 Check installation status
 *   sddk --version              Show version
 *   sddk --help                 Show help
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

// Target directory for plugin installation (global only)
// Note: Local project plugins (.gemini/plugins/) are NOT auto-detected
// by Gemini agents. Only the global config directory works.
const PLUGIN_DIR = path.join(
  os.homedir(),
  ".gemini",
  "config",
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
    `    ${color.cyan}sddk install${color.reset}               Install the plugin`
  );
  log(
    `    ${color.cyan}sddk uninstall${color.reset}             Remove the plugin`
  );
  log(
    `    ${color.cyan}sddk status${color.reset}                Check installation status`
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
  log(`${color.bold}  PLUGIN DIRECTORY${color.reset}`);
  log("");
  log(
    `    ${color.dim}Install path:${color.reset} ~/.gemini/config/plugins/sddk/`
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

function install() {
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
  if (fs.existsSync(PLUGIN_DIR)) {
    logInfo(`Plugin already installed at: ${color.dim}${PLUGIN_DIR}${color.reset}`);
    logStep("Updating to latest version...");
    removeDirRecursive(PLUGIN_DIR);
  }

  // Install
  logStep("Installing...");
  logStep(`Target: ${color.dim}${PLUGIN_DIR}${color.reset}`);

  try {
    copyDirRecursive(PLUGIN_SOURCE, PLUGIN_DIR);
    const fileCount = countFiles(PLUGIN_DIR);

    log("");
    logSuccess(
      `${color.bold}SDDK plugin installed successfully!${color.reset} (${fileCount} files)`
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

function uninstall() {
  log("");
  log(
    `${color.bold}${color.magenta}  SDDK${color.reset} ${color.dim}v${VERSION}${color.reset}`
  );
  log("");

  if (!fs.existsSync(PLUGIN_DIR)) {
    logInfo(
      `No installation found at: ${color.dim}${PLUGIN_DIR}${color.reset}`
    );
    log("");
    return;
  }

  logStep("Removing installation...");
  logStep(`Target: ${color.dim}${PLUGIN_DIR}${color.reset}`);

  try {
    removeDirRecursive(PLUGIN_DIR);
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

  const exists = fs.existsSync(PLUGIN_DIR);

  log(`${color.bold}  Installation Status${color.reset}`);
  log("");

  if (exists) {
    const fileCount = countFiles(PLUGIN_DIR);
    logSuccess(
      `Status: ${color.green}installed${color.reset} (${fileCount} files)`
    );
    log(
      `        ${color.dim}${PLUGIN_DIR}${color.reset}`
    );
  } else {
    log(
      `${color.dim}○${color.reset} Status: ${color.dim}not installed${color.reset}`
    );
    log(
      `        ${color.dim}${PLUGIN_DIR}${color.reset}`
    );
  }

  log("");

  if (!exists) {
    logInfo(
      `Run ${color.cyan}sddk install${color.reset} to get started.`
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
      install();
      break;

    case "uninstall":
    case "remove":
      uninstall();
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
