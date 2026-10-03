# TeaMax Café Website

Next.js static website for TeaMax Café.

## Design update
The project now follows the supplied TeaMax home-page mockup direction:
- Warm Cream canvas: `#FFF8EE`
- TeaMax Yellow: `#FFED82`
- Deep Teal: `#263C3D`
- Bold, compact sans-serif typography
- Rounded cards, pill buttons, generous whitespace and responsive layouts
- Home page sections redesigned around the supplied mockup
- Shared visual overrides applied to inner pages

## SEO / AEO / GEO code setup
- Page-level metadata and canonical URLs
- Open Graph and Twitter metadata
- `robots.txt` metadata route
- `sitemap.xml` metadata route
- Organization / Café / Website / WebPage / Breadcrumb JSON-LD
- FAQ JSON-LD and visible FAQ content for answer-oriented search
- Social `sameAs` entity signals
- AI/search crawler access rules for GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot and Google-Extended
- `public/llms.txt` for machine-readable brand/page context
- Local, semantic HTML and descriptive image alt text
- Responsive image handling with `next/image` on the redesigned home page

## Environment
Set the real production URL before deployment:

`NEXT_PUBLIC_SITE_URL=https://www.teamaxcafe.in`

The code falls back to `https://www.teamaxcafe.in` if the environment variable is not supplied.

## Build

```bash
npm install
npm run build
npm run start
```

The project uses `output: "export"` and unoptimized local images for static hosting.
