# AGENTS.md

## Scope

These instructions apply to the whole repository.

This repo is prepared for building the OneHealth DataSpace operational dashboard from a clean Next.js app state. Preserve the user's cleanup and keep edits focused on the dashboard implementation.

## Implementation Rules

- Use Next.js App Router, TypeScript, Tailwind CSS, and the existing `src/app` structure.
- Recreate `src/app/layout.tsx`, `src/app/page.tsx`, and `src/app/globals.css` from scratch during implementation.
- Use `public/logo.png` as the primary OneHealth DataSpace logo.
- Use `public/favicon.ico` for app metadata.
- Do not restore deleted starter SVG assets.
- Keep the page as a polished operational dashboard, not a scientific poster, static slide, or generic marketing landing page.
- If lifecycle icons are needed, add `lucide-react` and use it consistently.
- Keep implementation small and direct unless the dashboard grows enough to justify extracted components.

## Dashboard Requirements

- Build five clickable lifecycle areas: `SHARE`, `COMPUTE`, `ANALYZE`, `STORE`, and `DELIVER`.
- Use a circular lifecycle layout on desktop.
- Use a stacked or `2x2` responsive layout on tablet and mobile.
- Clicking a lifecycle area should show local details in a side panel or equivalent detail view.
- External service links must open in a new tab.
- Use the exact slogan copy:

```text
MORE THAN DATA
A complete operational lifecycle for One Health data.
```

## Accessibility and UI Quality

- Use semantic buttons and links.
- Provide visible keyboard focus states.
- Use useful image alt text.
- Ensure all interactive areas are reachable by keyboard.
- Avoid text overlap, clipped labels, and layout shifts across desktop and mobile.
- Keep visual density low enough that the lifecycle is understandable at a glance.

## Assets

- Use `public/logo.png` for the main OHDS logo.
- Use `public/favicon.ico` for metadata.
- Treat `mockups/ohds_diagram-v2.png` as visual reference only.
- Keep `public/ohds_logo_300px.png`, `public/ohds_logo_627px.png`, and `public/ohds_logo_800px.png` as optional variants unless the implementation chooses one deliberately.
- Do not delete provided mockups or logo variants unless explicitly asked.

## Service URLs

- `SHARE`: `https://xdatashare.srv.cesga.es`
- `STORE`: `https://store.dataspace.cesga.es`
- `COMPUTE`: `https://hpc.dataspace.cesga.es`
- `ANALYZE`: `https://bigdata.dataspace.cesga.es`
- `DELIVER`: `https://cloud.srv.cesga.es`

## Verification

Run these before considering implementation complete:

```bash
pnpm lint
pnpm build
```

For substantial UI work, also run the app locally with `pnpm dev` and inspect desktop and mobile viewport behavior.

## Repo Safety

- Do not revert user cleanup.
- Do not revert unrelated user changes.
- Do not delete provided mockups or logo variants unless explicitly requested.
- Prefer small, focused edits.
- Avoid unrelated refactors and metadata churn.
- If the worktree is dirty, identify which changes are yours before summarizing or committing.
