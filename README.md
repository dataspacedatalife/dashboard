# OneHealth DataSpace Dashboard

Public-facing operational dashboard for the OneHealth DataSpace (OHDS). The application should present the OHDS service lifecycle as a clear, clickable interface that routes users to the main platform services.

## Project Purpose

Build a polished OneHealth DataSpace dashboard that communicates a complete operational lifecycle for One Health data:

- Share trusted and interoperable data.
- Run scalable compute and AI workflows.
- Analyze data into useful insights.
- Store data securely and at scale.
- Deliver results as services and applications.

The result should feel like an institutional operational dashboard for research, health data, HPC, AI, and data spaces. It should not feel like a scientific poster, static presentation slide, or generic marketing landing page.

## Current State

This repository is currently a clean Next.js project prepared for implementation:

- `src/app` is intentionally empty and should be rebuilt during implementation.
- Project assets are prepared in `public/`.
- `mockups/ohds_diagram-v2.png` is available as the visual reference for the dashboard concept.
- The starter SVG assets have been removed and should not be restored.

## Required Design

Create a simplified lifecycle dashboard based on `mockups/ohds_diagram-v2.png`.

The dashboard must show five main clickable lifecycle areas:

- `SHARE` in the center.
- `COMPUTE` at the top.
- `ANALYZE` on the right.
- `STORE` at the bottom.
- `DELIVER` on the left.

Use a centered circular layout on desktop. `SHARE` should be the primary central action and should include the official OneHealth DataSpace logo.

Use subtle lifecycle arrows or visual flow between `COMPUTE`, `ANALYZE`, `STORE`, and `DELIVER`. Keep the design clean, spacious, and easy to understand within a few seconds.

Do not recreate the dense reference diagram. Remove the outer dotted governance ring, small internal icons, and heavy text density from the mockup. Preserve only the main lifecycle idea and the five actions.

## Required Copy

The slogan area must use this copy exactly:

```text
MORE THAN DATA
A complete operational lifecycle for One Health data.
```

Fix the typo from the reference image. The slogan must be `MORE THAN DATA`, not `MORE THANT DATA`.

Suggested supporting text for the central action:

```text
Secure, trusted, interoperable data sharing
```

Suggested short subtitles for the outer lifecycle actions:

- `COMPUTE`: Run scalable AI and computing workflows
- `ANALYZE`: Transform data into insights
- `STORE`: Store data securely and at scale
- `DELIVER`: Expose results as services and applications

## Required Interactions

Each of the five lifecycle areas must be clearly clickable.

- Clicking a lifecycle area should open a local detail side panel or equivalent local detail view.
- The detail panel should include the relevant external service link.
- External service links must open in a new browser tab.
- Links and buttons must be accessible through keyboard navigation.

## Service URLs

Use these URLs for the external service links:

| Area | URL |
| --- | --- |
| `SHARE` | `https://xdatashare.srv.cesga.es` |
| `STORE` | `https://store.dataspace.cesga.es` |
| `COMPUTE` | `https://hpc.dataspace.cesga.es` |
| `ANALYZE` | `https://bigdata.dataspace.cesga.es` |
| `DELIVER` | `https://cloud.srv.cesga.es` |

## Responsive Requirements

Desktop should use the circular lifecycle layout:

- `SHARE` centered.
- `COMPUTE`, `ANALYZE`, `STORE`, and `DELIVER` arranged around it.
- Subtle flow indicators should connect the outer lifecycle actions.

Tablet and mobile layouts should adapt into a stacked or grid layout:

- `SHARE` first.
- `COMPUTE`, `ANALYZE`, `STORE`, and `DELIVER` shown as stacked cards or a `2x2` grid where space allows.
- Slogan area at the bottom.
- No text overlap, clipped labels, or unusable touch targets.

## Assets

Use the prepared assets as follows:

- `/logo.png`: primary OHDS logo for the dashboard and central `SHARE` action.
- `/favicon.ico`: favicon and app metadata icon.
- `mockups/ohds_diagram-v2.png`: visual reference only. Do not render this image as the final dashboard.
- `/ohds_logo_300px.png`, `/ohds_logo_627px.png`, `/ohds_logo_800px.png`: optional logo variants. Use only if the implementation needs a different size or format.

Do not delete the mockup or logo variants unless explicitly requested.

## Development

Install dependencies with `pnpm`, then use:

```bash
pnpm dev
pnpm lint
pnpm build
```

`pnpm dev` starts the local Next.js development server. `pnpm lint` and `pnpm build` should pass before implementation work is considered complete.
