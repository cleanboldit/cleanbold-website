# Frontend performance: media and CDN

This document supports the loading UX work in the frontend (skeletons, hero poster, `next/image` tuning). It focuses on **content** and **CDN** choices that matter more than small UI tweaks.

## Hero background video (large MP4)

**Symptom:** A 50–100MB MP4 can take minutes on first view because the browser must download a large buffer before smooth playback.

**Best fix (content):**

- Keep the clip **short** (a few seconds for a loop).
- Export **720p or 1080p max**, H.264, reasonable bitrate (often **2–8 Mbps** for a web background).
- Target file size roughly **5–15MB** (lower is better). Replace the file in Payload; no code change required.

**Technical aids (already in the app):** optional CMS poster image, solid fallback color, `preload="metadata"`, fade-in when `canplay`.

**Adaptive streaming:** HLS/DASH or a hosted player (e.g. Cloudflare Stream) is optional and a larger change than re-encoding a single loop.

## Cloudflare R2 and caching

**Cache Reserve** (dashboard) helps with **origin cache fill / billing** for cacheable objects. It does **not** reduce the bytes transferred for a huge first-time download.

**What helps repeat visits:**

- Set **long `Cache-Control`** on public media objects (R2 custom metadata, or a Worker in front of R2) so the **CDN edge** can cache MP4/images.
- Ensure **HTTP Range** requests work for MP4 (R2 typically supports this), which improves buffering and seeking.

**`next/image`:** Configure `NEXT_PUBLIC_IMAGE_REMOTE_HOSTS` (or `NEXT_PUBLIC_MEDIA_HOSTNAME`) in `.env` so remote media hostnames are allowed for optimization. See [.env.example](../.env.example).

## Payload API latency

Route-level `loading.tsx` and Suspense boundaries around header/footer/page blocks improve **perceived** speed when MongoDB or Payload work is slow. They do not replace indexing or lean queries if the API itself is the bottleneck.

## CMS freshness on production (Netlify)

**Approach in this repo:** CMS reads go through Next [`unstable_cache`](https://nextjs.org/docs/app/api-reference/functions/unstable_cache) with tags (`cms:pages`, `cms:globals`, per-collection tags). Saving in Payload runs **hooks** that call `revalidateTag` / `revalidatePath` so the next visitor gets fresh HTML without redeploying.

**Also available:** `POST /api/revalidate` with header `x-revalidate-secret: <REVALIDATE_SECRET>` and optional JSON `{ "scope": "all" | "pages" | "globals", "slug": "optional-slug" }` for Netlify Build Hooks or external automation. Set `REVALIDATE_SECRET` in the environment (see [.env.example](../.env.example)).

**Checklist:**

1. **Same database** — Production `DATABASE_URI` / `MONGODB_URI` must match the project you edit in admin.
2. **`NEXT_PUBLIC_SITE_URL`** — Set to your live site origin (`https://…`) so metadata canonicals, Open Graph URLs, `sitemap.xml`, and `robots.txt` are correct.

Media files (R2 URLs) still depend on CDN/object cache headers when the URL stays the same.

## SEO surface

- **Metadata:** [`src/lib/metadata.ts`](../src/lib/metadata.ts) maps Payload page `meta` (SEO plugin) to Next `Metadata` (title, description, Open Graph, Twitter card, canonical).
- **`robots.txt` / `sitemap.xml`:** [`src/app/robots.ts`](../src/app/robots.ts) and [`src/app/sitemap.ts`](../src/app/sitemap.ts) list published `pages`; sitemap invalidates with the same `cms:pages` tag as page data.

## Error UI

- [`src/app/(frontend)/error.tsx`](../src/app/(frontend)/error.tsx) — branded error boundary (same visual language as the 404 page).
