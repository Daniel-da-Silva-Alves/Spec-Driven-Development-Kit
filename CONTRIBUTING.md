# Contributing to SDDK

Thank you for your interest in contributing to the **Spec-Driven Development Kit**! This document provides guidelines and instructions for contributing.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How to Contribute](#how-to-contribute)
- [Reporting Bugs](#reporting-bugs)
- [Suggesting Features](#suggesting-features)
- [Pull Requests](#pull-requests)
- [Commit Convention](#commit-convention)
- [Project Structure](#project-structure)

## Code of Conduct

Be respectful and constructive. Harassment or abusive behavior will not be tolerated. If you experience or witness unacceptable behavior, please report it by opening an issue.

## How to Contribute

### Reporting Bugs

Before creating a bug report, please check existing issues to avoid duplicates. When filing a bug report, use the [Bug Report template](.github/ISSUE_TEMPLATE/bug_report.md) and include:

- A clear, descriptive title
- Steps to reproduce the issue
- Expected vs. actual behavior
- Your environment (OS, Node.js version, AI agent used)
- Any relevant logs or screenshots

### Suggesting Features

Feature requests are welcome! Use the [Feature Request template](.github/ISSUE_TEMPLATE/feature_request.md) and include:

- A clear description of the problem your feature would solve
- The proposed solution
- Alternative approaches you've considered
- Which SDDK skill(s) would be affected

### Pull Requests

1. **Fork** the repository
2. **Create a branch** from `main`:
   ```bash
   git checkout -b feat/your-feature-name
   ```
3. **Make your changes** following the project conventions
4. **Test your changes**:
   ```bash
   node bin/cli.js --help
   node bin/cli.js --version
   ```
5. **Commit** using [Conventional Commits](#commit-convention)
6. **Push** and open a Pull Request using the [PR template](.github/PULL_REQUEST_TEMPLATE.md)

## Commit Convention

This project follows [Conventional Commits](https://www.conventionalcommits.org/). Every commit message should be structured as:

```
<type>(<scope>): <description>

[optional body]

[optional footer(s)]
```

### Types

| Type | Description |
|:---|:---|
| `feat` | A new feature |
| `fix` | A bug fix |
| `docs` | Documentation only changes |
| `style` | Formatting, missing semicolons, etc. (no code change) |
| `refactor` | Code change that neither fixes a bug nor adds a feature |
| `perf` | Performance improvement |
| `test` | Adding or correcting tests |
| `chore` | Build process, auxiliary tools, or maintenance |

### Scopes

| Scope | Description |
|:---|:---|
| `srs` | Software Requirements Specification skill |
| `sdd` | System Design Document skill |
| `planning` | Implementation Planning skill |
| `dev` | Fullstack Development skill |
| `review` | Code Review skill |
| `cli` | CLI installer |
| `ci` | CI/CD workflows |

### Examples

```
feat(srs): add support for user story format
fix(cli): handle spaces in Windows paths
docs: update installation instructions in README
chore(ci): add npm provenance to publish workflow
```

## Project Structure

```
Spec-Driven-Development-Kit/
├── bin/
│   └── cli.js              # CLI installer (zero dependencies)
├── sddk/
│   ├── plugin.json          # Plugin manifest
│   └── skills/
│       ├── software-requirements-specification/
│       ├── system-design-document/
│       ├── implementation-planning/
│       ├── fullstack-development/
│       └── code-review/
├── docs/                    # Project documentation assets
├── .github/                 # GitHub templates and workflows
├── package.json             # npm package configuration
└── README.md                # Project documentation
```

### Key guidelines for skill modifications

- Every skill must have a `SKILL.md` file at its root
- Reference files go in a `references/` subdirectory
- Follow the existing naming conventions (kebab-case for files and directories)
- Update `plugin.json` if adding or removing skills
- Test your changes by installing the plugin locally with `sddk install`

## Questions?

If you have questions about contributing, feel free to open a [Discussion](https://github.com/Daniel-da-Silva-Alves/Spec-Driven-Development-Kit/discussions) or an issue.

Thank you for helping make SDDK better! 🚀
