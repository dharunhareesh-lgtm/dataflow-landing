# DataFlow — AI-Driven Data Automation SaaS Landing Page

Frontend Battle 3.0 · IIT Bhubaneswar submission.

## Tech Stack

- **Next.js 15** (App Router, React 19)
- **TypeScript** (strict mode)
- **Tailwind CSS 3**
- **No runtime animation libraries** — CSS transitions & Web Animations API only

## Design System

| Token | Value |
|---|---|
| Arctic Powder | `#F1F6F4` |
| Mystic Mint | `#D9E8E2` |
| Forsythia | `#FFC801` |
| Deep Saffron | `#FF9932` |
| Nocturnal Expedition | `#114C5A` |
| Oceanic Noir | `#172B36` |

Headings & metrics → **JetBrains Mono**  
Body & UI → **Inter**

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Key Features

### Dynamic Pricing Matrix
- Config lives entirely in `lib/pricing.ts` — zero hardcoded prices in components
- Supports INR, USD, EUR with locale-aware `Intl.NumberFormat`
- Monthly / Annual toggle applies 20% discount
- Only `<PriceNode>` re-renders on currency/cycle change (React.memo)

### Bento Grid ↔ Accordion
- Desktop (≥769px): CSS Grid bento layout
- Mobile (<769px): native CSS `grid-template-rows` accordion
- Active card index is shared state — persists across viewport resize

### Performance
- Scroll reveal via `IntersectionObserver` (no layout thrash)
- `useReducer` prevents unnecessary re-renders in Pricing
- All animations: CSS transitions (150–400ms) only
- Fonts loaded via Google Fonts with `display=swap`

### SEO
- Semantic HTML: `<header>`, `<main>`, `<section>`, `<article>`, `<figure>`, `<nav>`, `<footer>`
- Full `<Metadata>` with Open Graph & Twitter Card
- `aria-label` / `aria-labelledby` on every section and interactive element
- `alt` described via `aria-label` on decorative SVG regions

## Build

```bash
npm run build
npm start
```
