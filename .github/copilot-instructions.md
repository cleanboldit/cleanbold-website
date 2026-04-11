# GitHub Copilot Instructions

## Project

Next.js 15 · Payload CMS 3 · MongoDB · Cloudflare R2 · TypeScript · pnpm

## Source Layout (key paths only)

| Path | Purpose |
|---|---|
| `src/payload.config.ts` | All CMS config — collections, globals, plugins |
| `src/payload-types.ts` | **GENERATED** — do not edit |
| `src/app/(frontend)/` | Public site (layout, page, components) |
| `src/app/(payload)/` | Payload admin panel |
| `src/collections/Pages.ts` | Block-based page builder (11 block types) |
| `src/globals/Header.ts` | Nav config |
| `src/globals/Footer.ts` | Footer config |
| `src/globals/SiteSettings.ts` | SEO & site-wide settings |
| `src/lib/payload.ts` | Payload singleton |

## Block System

Pages are composed from blocks defined in `Pages.ts`. Each maps to a component:

`hero` · `coreOfferings` · `projects` · `featuredClients` · `whyBrandsChoose`
`studioSection` · `pageHero` · `serviceCards` · `industries` · `highlightCard` · `CTASection`

`BlockRenderer.tsx` dispatches block type → component. When adding a block:
1. Add block config to `Pages.ts`
2. Create `src/app/(frontend)/components/BlockName/` with `.tsx` + `.module.css`
3. Register in `BlockRenderer.tsx`
4. Run `pnpm payload generate:types`

## Conventions

- Components: one folder per component, `Name.tsx` + `Name.module.css`
- No global CSS unless truly global — use CSS Modules
- Homepage slug = `"home"`; all other pages at `/[slug]`
- Always run `pnpm payload generate:types` after any Payload schema change
- Never hardcode secrets — use `.env` variables

## Required Env Vars

`DATABASE_URI` · `PAYLOAD_SECRET` · `S3_BUCKET_NAME` · `S3_ENDPOINT`
`S3_PUBLIC_URL` · `S3_ACCESS_KEY_TOKEN` · `S3_SECRET_KEY` · `S3_REGION`

## code-review-graph Integration

This project has a structural knowledge graph (`.code-review-graph/graph.db`).
When using an MCP-capable tool, prefer graph tools over file scanning:

- `get_minimal_context_tool(task="...")` — best first call, ~100 tokens
- `detect_changes_tool` — risk-scored review of uncommitted changes
- `get_impact_radius_tool` — which files/functions are affected by a change
- `query_graph_tool` — trace callers, callees, imports, test coverage

## Bug / Feature Prompt Template

To minimize token usage, use this format when asking for help:

```
# Task
<bug fix | feature | refactor>

# Location
File: src/path/to/file.tsx  [line N if known]

# Description
<One sentence>

# Expected vs Actual (bugs only)
Expected: ...
Actual: ...
```

The graph traces blast radius automatically — no need to paste full files.
