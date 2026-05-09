# Implementation Plan

## Inputs Reviewed

- `README.md` defines the OneHealth DataSpace lifecycle dashboard goal, required copy, service URLs, responsive behavior, and asset usage.
- `AGENTS.md` confirms the repository-wide implementation rules: rebuild `src/app/layout.tsx`, `src/app/page.tsx`, and `src/app/globals.css`; use the App Router, TypeScript, Tailwind CSS, `public/logo.png`, and `public/favicon.ico`; avoid restoring starter SVG assets.
- `mockups/ohds_diagram-v2.png` is a visual reference only. The implementation should keep the five-action lifecycle and simplify the visual density.

## Feature Plan

1. Recreate the app shell.
   - Add `src/app/layout.tsx` with metadata, favicon configuration, global styles, and useful default document language.
   - Add `src/app/globals.css` with Tailwind import, accessible defaults, and polished dashboard styling tokens.

2. Build the lifecycle dashboard.
   - Add `src/app/page.tsx` as a client component because lifecycle selection is local interactive state.
   - Model the five services in typed data with titles, subtitles, descriptions, URLs, and visual accent colors.
   - Render `SHARE` as the central primary action with `public/logo.png`.
   - Render `COMPUTE`, `ANALYZE`, `STORE`, and `DELIVER` in a circular desktop layout around `SHARE`.
   - Add subtle visual flow indicators without recreating the dense reference diagram.

3. Add local details and links.
   - Clicking any lifecycle area updates a local detail panel.
   - Detail panel includes service summary, operational bullet points, and an external link that opens in a new tab with `rel="noreferrer"`.
   - Ensure buttons and links have visible focus states and remain keyboard reachable.

4. Make it responsive and robust.
   - Use a desktop circular layout, then switch to a simple responsive grid or stacked layout for tablet and mobile with `SHARE` first.
   - Preserve readable text, stable touch targets, and no clipped labels across viewport sizes.

5. Verify and review.
   - Run `pnpm lint`.
   - Run `pnpm build`.
   - Run `pnpm dev` and inspect desktop and mobile behavior.
   - Review the resulting UI and make small improvements if needed.

## Commit Plan

- Commit `PLAN.md` as planning documentation.
- Commit the app shell and dashboard implementation as the main feature.
- Commit any review-driven polish separately if changes are needed after verification.
