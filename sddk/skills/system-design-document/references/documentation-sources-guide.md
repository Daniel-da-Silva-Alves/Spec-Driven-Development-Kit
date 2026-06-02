# Technical Documentation Sources Configuration Guide

## Purpose

During development (Skill 4) and code review (Skill 5), the agent needs to consult technical documentation for the stack's technologies. This guide defines how to configure documentation sources for each technology, ensuring the agent uses **the correct version** and **the most reliable source**.

## Lookup Hierarchy

When needing technical documentation, the agent follows this priority order:

```
1. 📁 Local project docs          (docs/, README, ARCHITECTURE.md)
    ↓ if not found
2. 🔌 Technology MCP/Skill        (if it exists and matches the version)
    ↓ if it doesn't exist
3. 🌐 Pre-configured official URL (registered in the SDD, pinned to version)
    ↓ if it doesn't cover the case
4. 🔍 Web search as fallback      (search directed at the official site)
```

### Why this order?

| Priority | Source | Justification |
|:---:|:---|:---|
| 1 | **Local docs** | Most specific to the project, custom standards, internal conventions |
| 2 | **MCP/Skill** | Curated, reliable, token-efficient, works offline |
| 3 | **Official URL** | Canonical source of the technology, pinned to the correct version |
| 4 | **Web search** | Universal fallback, but noisy and may bring the wrong version |

---

## How to Conduct the Sources Interview

During Phase 2.5 of the SDD, after defining the stack, ask for each technology:

### Standard question (via ask_question):

```
For technology {name} v{version}, which documentation source should we use?
```

**Options:**
1. **Official URL** — provide the official documentation URL pinned to the version
2. **MCP available** — specify which MCP server provides docs for this technology
3. **Local skill** — the project has a custom skill for this technology
4. **Docs in project** — there's a `docs/` folder or wiki with internal documentation

### Technologies with known MCPs:

| Technology | MCP Available | Notes |
|:---|:---|:---|
| Multiple libs | Context7 | Covers many popular libraries via `context7` |
| PostgreSQL | postgres-mcp | Schema awareness |
| GitHub | github-mcp | Issues, PRs, repos |
| Filesystem | filesystem-mcp | Native to Antigravity |

> [!NOTE]
> MCP availability changes frequently. Ask the user if they have MCPs configured in their project.

---

## SDD Section Format

Section "10. Technical Documentation Sources" in the SDD should follow this format:

```markdown
## 10. Technical Documentation Sources

### 10.1 Source Configuration

| Technology | Version | Primary Source | Official URL | MCP/Skill |
|:---|:---|:---|:---|:---|
| Next.js | 15.2 | Official URL | https://nextjs.org/docs | — |
| React | 19.1 | Official URL | https://react.dev/reference | — |
| Prisma | 6.3 | MCP | https://prisma.io/docs | context7 |
| Tailwind CSS | 4.0 | Official URL | https://tailwindcss.com/docs | — |
| PostgreSQL | 16 | MCP | https://www.postgresql.org/docs/16/ | postgres-mcp |
| TypeScript | 5.7 | Official URL | https://www.typescriptlang.org/docs/ | — |

### 10.2 Local Project Documentation

| Path | Content |
|:---|:---|
| `docs/api.md` | Internal API documentation |
| `docs/conventions.md` | Project code conventions |
| `ARCHITECTURE.md` | General system architecture |

### 10.3 Lookup Rule

Priority order for documentation lookup during development:
1. Local project documentation (paths listed in 10.2)
2. MCP/Skill (if listed in the MCP/Skill column in 10.1)
3. Official URL (use `read_url_content` on the URL listed in 10.1)
4. Web search (use `search_web` with query: "{technology} {version} {topic} site:{official domain}")
```

---

## Agent Instructions (Dev and CodeReview)

When the agent needs to consult documentation during development:

### Step 1: Read section 10 of the SDD
Open `.specs/features/{feature}/sdd.md` and read section "10. Technical Documentation Sources"

### Step 2: Follow the hierarchy
1. **Local docs?** → `view_file` on the path listed in 10.2
2. **MCP/Skill?** → Use the tool/skill configured in 10.1
3. **Official URL?** → `read_url_content("{url-from-table-10.1}/specific-topic")`
4. **None?** → `search_web("{technology} {version} {topic} site:{domain}")`

### Step 3: Validate the version
> [!WARNING]
> Before using any documentation information, verify it matches the version listed in table 10.1. Documentation from the wrong version may generate incompatible code.

### Practical lookup example:

```
Microtask: "Implement user creation server action"
Stack: Next.js 15.2

1. Local docs? → No docs about server actions
2. MCP/Skill? → No Next.js MCP
3. Official URL? → read_url_content("https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations")
4. If URL doesn't cover → search_web("Next.js 15 server actions mutations site:nextjs.org")
```
