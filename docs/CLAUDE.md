# CLAUDE.md — Project Context

## Stack

**Next.js 15** + **Payload CMS 3** + **MongoDB** + **Cloudflare R2 (S3)** + **TypeScript**

- Frontend: Next.js App Router, React 19, CSS Modules, Framer Motion
- CMS: Payload 3 (self-hosted, same process as Next.js)
- DB: MongoDB via `@payloadcms/db-mongodb`
- Storage: Cloudflare R2 via `@payloadcms/storage-s3`
- Package manager: pnpm

## Directory Map

```
src/
  payload.config.ts        # CMS config — plugins, collections, globals
  payload-types.ts         # Auto-generated types (do not edit)
  app/
    (frontend)/            # Public site — layout, page, [slug], components/
    (payload)/             # Admin UI — /admin route group
    api/                   # Custom API routes
  collections/
    Pages.ts               # Block-based page builder (11 block types)
    Media.ts               # Uploads
    Users.ts               # Auth
  globals/
    Header.ts              # Nav logo + links
    Footer.ts              # Footer links + columns
    SiteSettings.ts        # SEO defaults
  lib/payload.ts           # Payload client singleton
```

## Page Block System

Pages use a `layout` blocks field. Each block maps to a React component:

| Block slug | Component | Purpose |
|---|---|---|
| `hero` | `Hero` | Video bg + CTA buttons |
| `coreOfferings` | `OurWork` | Services grid |
| `projects` | `Projects` | Portfolio items |
| `featuredClients` | `FeaturedClients` | Logo marquee |
| `whyBrandsChoose` | `WhyBrandsChoose` | 3-col comparison |
| `studioSection` | `StudioSection` | Studio showcase |
| `pageHero` | `PageHero` | Page header + bento images |
| `serviceCards` | `ServiceCards` | Service cards |
| `industries` | `Industries` | Industry showcase |
| `highlightCard` | `HighlightCard` | Featured callout |
| `CTASection` | `CTASection` | Call to action |

`BlockRenderer.tsx` maps block slugs → components.

## Key Commands

```bash
pnpm dev                      # Start dev server (port 3000)
pnpm build                    # Production build
pnpm payload generate:types   # Regenerate payload-types.ts after schema changes
pnpm payload generate:importmap
pnpm test:int                 # Vitest unit tests
pnpm test:e2e                 # Playwright E2E tests
```

## Environment Variables

`.env` (never commit):
```
DATABASE_URI=         # MongoDB connection string
PAYLOAD_SECRET=       # Random secret for Payload auth
S3_BUCKET_NAME=
S3_ENDPOINT=          # Cloudflare R2 endpoint
S3_PUBLIC_URL=
S3_ACCESS_KEY_TOKEN=
S3_SECRET_KEY=
S3_REGION=
```

## Code Conventions

- **Components**: each in its own folder with `Component.tsx` + `Component.module.css`
- **New block**: create collection field in `Pages.ts` → create `ComponentName/` folder → add to `BlockRenderer.tsx`
- **Types**: run `pnpm payload generate:types` after any schema change
- **Globals**: accessed via `getPayload()` → `payload.findGlobal({ slug })`
- **Routing**: homepage slug is `"home"` served at `/`; all others at `/[slug]`

## code-review-graph MCP Tools (Token-Efficient)

This project has a knowledge graph at `.code-review-graph/graph.db`.

**Always call `get_minimal_context_tool(task="...")` first** — ~100 tokens, gives risk + suggested next tools.

Workflow:
1. `get_minimal_context_tool(task="<your task>")` — start here
2. `detect_changes_tool(detail_level="minimal")` — for reviews
3. `get_impact_radius_tool` — blast radius of a change
4. `query_graph_tool` — trace callers / callees / imports / tests
5. `get_affected_flows_tool` — which execution paths are hit

Target: ≤5 tool calls, ≤800 tokens of graph context per task.

Use `detail_level="minimal"` on all calls unless you need more.
Fall back to file reads **only** when the graph doesn't cover it.

## Security Notes

- Never hardcode secrets — use env vars only
- All media stored in R2; local `media/` dir is not committed
- Payload access control: `read: () => true` on public collections; admin routes require auth
