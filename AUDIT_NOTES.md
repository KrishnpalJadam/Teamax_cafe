# TeaMax implementation notes

## Completed
- Reworked the home page to follow the supplied TeaMax mockup: hero, benefit ribbon, menu cards, franchise panel, statistics band, why-choose section, partner story, 4-step process, FAQ and final CTA.
- Added responsive breakpoints for desktop, tablet and mobile.
- Updated shared header to use the local TeaMax logo and mockup-style navigation/CTA.
- Added a shared mockup design system so Our Story, Menu, Franchise, Stores and Blog pages use the same cream/yellow/teal visual language and typography scale.
- Corrected the old yellow design token that was incorrectly set to teal.
- Added canonical metadata fallbacks, Open Graph/Twitter metadata, JSON-LD entity/page schemas, FAQ schema, sitemap, robots rules, AI crawler access and `public/llms.txt`.
- Replaced localhost production URL fallbacks with the TeaMax production-domain fallback while keeping `NEXT_PUBLIC_SITE_URL` configurable.

## Verification note
The project dependencies were not available in the execution environment and the package registry was not reachable from the build environment, so a full `next build` could not be executed here. The final archive contains the source project without `node_modules`; run `npm install` followed by `npm run build` in the deployment/development environment.
