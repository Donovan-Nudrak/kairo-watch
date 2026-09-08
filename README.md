# KAIRO Chrono 01

Frontend-only promotional landing for a fictional titanium automatic watch. There is no backend, no payment flow, and no analytics. Product copy, finishes, and pricing live in a typed catalog; the reservation form validates an email in the browser and never leaves the client.

The page is a single-route React app. Layout, type, and motion are implemented with traditional CSS plus Framer Motion — not a UI kit.

## Stack

| Layer | Choice |
| --- | --- |
| Runtime | React 19 + TypeScript |
| Bundler | Vite 8 (`@vitejs/plugin-react`) |
| Styling | One global stylesheet (`src/index.css`), CSS custom properties |
| Motion | Framer Motion 13 |
| Icons | Lucide React |
| Lint | Oxlint (`react`, `typescript`, `oxc` plugins) |

Node packages are ESM (`"type": "module"`). Typecheck uses project references (`tsconfig.json` → `tsconfig.app.json` + `tsconfig.node.json`). Production build is `tsc -b && vite build`.

## Run

```bash
npm install
npm run dev      # Vite, --host, http://localhost:5173
npm run build    # typecheck + production bundle
npm run preview  # serve dist/
npm run lint     # oxlint
```

## Architecture

```
src/
  App.tsx                 # page composition + finish / modal state
  main.tsx                # StrictMode mount, CSS import
  data/watch.ts           # catalog: finishes, specs, image paths
  lib/motion.ts           # shared variants, easing, viewport config
  hooks/usePointerLight.ts
  components/             # one section or shell piece per file
public/images/            # campaign PNGs + JPG fallbacks
```

`App` is the only state owner:

- `finishId` (`obsidian` | `titanium` | `arctic`) drives Editions accents and the reservation modal.
- `modalOpen` is lifted so Header, Editions, and Closing can open the same dialog.
- `visibilitychange` toggles `html.is-hidden`, which pauses CSS orbit animations while the tab is backgrounded.

There is no router, store, or data fetching.

### Page order

1. `ScrollProgress` — `useScroll()` → `scaleX` on a fixed bar
2. `Header` — island chrome after 18px scroll; mobile menu as a modal overlay
3. `Hero` — transparent product PNG over CSS/SVG orbit rings
4. `EditorialStatement` — philosophy copy
5. `SpecsGrid` — four spec cards, staggered `whileInView`
6. `CraftSection` — construction image + points
7. `FinishSelector` — finish radios + shared `layoutId` indicator
8. `ClosingSection` — full-bleed closer
9. `Footer`
10. `ReservationModal` — portaled to `document.body`

In-page navigation uses hash anchors (`#timepiece`, `#engineering`, `#editions`) with `scroll-padding-top` so the sticky header does not cover section titles.

## How it works

### Catalog

`src/data/watch.ts` is the source of truth. Finishes expose `accent` (CSS color), `reference`, and copy. `IMAGES` maps each slot to a PNG in `/images/` plus a JPG fallback. Changing product facts does not require touching layout components.

### Visual system

Tokens live on `:root` in `src/index.css`:

- Surfaces: `#080909`, `#111313`
- Type: `#F2F0EA`, muted `#959B9B`
- Accent: `#73E7EE`, titanium `#B5BAB9`
- Typefaces: Manrope (UI), Instrument Serif (display contrast), Space Mono (specs / labels), loaded from Google Fonts in `index.html`
- Radii: `--radius-sm` 12px through `--radius-xl` 48px, pills at 999px

`--finish-accent` is set on the Editions section when the selected finish changes, so swatches, washes, and highlights stay in sync without per-finish class explosion.

### Motion

Shared curves and variants are in `src/lib/motion.ts` (`easePremium` = `cubic-bezier(0.22, 1, 0.36, 1)`). Section reveals use `whileInView` with `viewOnce` (`once: true`, `amount: 0.2`). Components that animate read `useReducedMotion()` and skip or flatten those sequences.

Hero orbit rings are CSS `animation`, not JS. They pause when:

- `document.hidden` → `html.is-hidden`
- `prefers-reduced-motion: reduce` (animations/transitions collapsed in CSS)

There is no scroll parallax. Images and copy stay locked to document flow.

### Spotlight

`usePointerLight` writes `--spot-x` / `--spot-y` on pointer-capable cards. A `::after` radial gradient follows the cursor. It is disabled for `pointer: coarse`, `hover: none`, and reduced motion.

### Images

`CampaignImage` loads the PNG first. On error it swaps to the JPG. If that also fails, it renders a CSS placeholder with the same `alt` as `aria-label`. The hero image is `loading="eager"` + `fetchPriority="high"`; everything else is lazy.

### Reservation modal

The dialog is a React portal with focus restore, Escape to close, and Tab trapping. Submit runs a client regex on the email, then flips to a local success state. Nothing is posted. The UI states this explicitly.

## Accessibility notes

- Section headings are labelled with `aria-labelledby`
- Finish list is a `radiogroup`
- Modal and mobile nav are `aria-modal` dialogs
- `:focus-visible` uses the cyan accent
- Reduced-motion users get static layout plus shortened Framer transitions

## Out of scope

This is not a storefront. There is no cart, auth, CMS, i18n, or image CDN. Deploy it as a static Vite build to any host that serves `dist/`.
