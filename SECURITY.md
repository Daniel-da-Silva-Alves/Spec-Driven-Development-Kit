# Security Policy

## Reporting a Vulnerability

If you find a security vulnerability in SDDK, please report it responsibly:

1. **Do NOT open a public issue.**
2. Email: **[your-email@example.com]** *(replace with your actual contact)*
3. Include: description, steps to reproduce, and potential impact.

You should receive a response within 48 hours.

## Scope

SDDK is an AI agent plugin — it does not handle user data, authentication, or network requests directly. However, the CLI (`bin/cli.js`) performs file system operations, so vulnerabilities related to path traversal or arbitrary file writes are in scope.
