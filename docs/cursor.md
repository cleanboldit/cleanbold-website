# Cursor Rules — Project Reference

## Project

**Next.js 15 + Payload CMS 3 + MongoDB + Cloudflare R2**

TypeScript · App Router · CSS Modules · Framer Motion · pnpm

## Structure (concise)

```
src/
  payload.config.ts    # CMS config — all plugins, globals, collections here
  payload-types.ts     # GENERATED — never edit manually
  app/
    (frontend)/        # Public site (layout, page, [slug], components/)
    (payload)/         # Admin panel (/admin)
    api/               # Custom routes
  collections/
    Pages.ts           # Block-based page builder — 11 block types
    Media.ts / Users.ts
  globals/
    Header.ts / Footer.ts / SiteSettings.ts
  lib/payload.ts       # Payload singleton
```

## Block → Component Map

| Block | Component folder |
|---|---|
| `hero` | `Hero/` |
| `coreOfferings` | `OurWork/` |
| `projects` | `Projects/` |
| `featuredClients` | `FeaturedClients/` |
| `whyBrandsChoose` | `WhyBrandsChoose/` |
| `studioSection` | `StudioSection/` |
| `pageHero` | `PageHero/` |
| `serviceCards` | `ServiceCards/` |
| `industries` | `Industries/` |
| `highlightCard` | `HighlightCard/` |
| `CTASection` | `CTASection/` |

All blocks flow through `BlockRenderer.tsx`.

## Dev Commands

```bash
pnpm dev                     # localhost:3000
pnpm payload generate:types  # After schema change — always run this
pnpm test:int                # Vitest
pnpm test:e2e                # Playwright
```

## Conventions

- One component per folder: `ComponentName.tsx` + `ComponentName.module.css`
- Adding a block: `Pages.ts` field → new component folder → `BlockRenderer.tsx` entry
- Homepage slug = `"home"` → served at `/`; all others at `/[slug]`
- After any Payload schema change → run `pnpm payload generate:types`
- Never edit `payload-types.ts` — it is auto-generated

## Env Vars Required

```
DATABASE_URI        PAYLOAD_SECRET
S3_BUCKET_NAME      S3_ENDPOINT     S3_PUBLIC_URL
S3_ACCESS_KEY_TOKEN S3_SECRET_KEY   S3_REGION
```

## code-review-graph (MCP — Active)

Graph is built at `.code-review-graph/graph.db` (85 nodes, 352 edges).
Config is in `.cursor/mcp.json`.

**Rule**: Before reading files or grepping, call `get_minimal_context_tool(task="...")`.
This returns the minimal relevant context in ~100 tokens.

Graph tools:
- `get_minimal_context_tool` — always start here
- `detect_changes_tool` — code review with risk scores
- `get_impact_radius_tool` — blast radius of a file/function change
- `query_graph_tool` — callers, callees, imports, tests
- `semantic_search_nodes_tool` — find by name or keyword

Target: ≤5 tool calls per task. Use `detail_level="minimal"` by default.

## Bug / Feature Instructions for AI

When reporting a bug or feature, include:

```
File: src/app/(frontend)/components/ComponentName/ComponentName.tsx
Issue: <one sentence>
Expected: <one sentence>
```

The graph will trace dependencies automatically — no need to paste full file contents.
