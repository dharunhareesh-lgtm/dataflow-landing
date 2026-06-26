# DataFlow — AI-Driven Data Automation SaaS Landing Page

Frontend Battle 3.0 · IIT Bhubaneswar Submission

## Live Demo

* Live Site: https://dataflow-landing-sage.vercel.app/
* Repository: https://github.com/dharunhareesh-lgtm/dataflow-landing

---

## Tech Stack

* Next.js 15 (App Router, React 19)
* TypeScript (Strict Mode)
* Tailwind CSS 3
* Native CSS animations only
* Web Animations API
* No runtime animation libraries

---

## Design System

| Token                | Value     |
| -------------------- | --------- |
| Arctic Powder        | `#F1F6F4` |
| Mystic Mint          | `#D9E8E2` |
| Forsythia            | `#FFC801` |
| Deep Saffron         | `#FF9932` |
| Nocturnal Expedition | `#114C5A` |
| Oceanic Noir         | `#172B36` |

Typography:

* Headings & Metrics → JetBrains Mono
* Body & UI → Inter

---

## Getting Started

```bash
npm install
npm run dev
```

Open:

```text
http://localhost:3000
```

Production:

```bash
npm run build
npm start
```

---

## Features

### Dynamic Pricing Matrix

* Configuration driven pricing via `lib/pricing.ts`
* No hardcoded prices inside components
* Supports INR, USD and EUR
* Locale aware currency formatting using `Intl.NumberFormat`
* Monthly and Annual billing support
* Annual billing applies a 20% discount
* Currency and billing changes only re-render price nodes using `React.memo`

### Responsive Bento Grid

* Desktop (`>=769px`) uses Bento Grid layout
* Mobile (`<769px`) automatically transforms into an accordion
* Shared active state persists across viewport changes

### Performance Optimizations

* Scroll reveal animations via `IntersectionObserver`
* Minimal re-renders using optimized state management
* CSS transitions only (`150ms - 400ms`)
* Fonts loaded with `display=swap`

### Accessibility

* Semantic HTML structure
* Comprehensive ARIA labels
* Keyboard accessible navigation
* Responsive and screen reader friendly design

### SEO

* Open Graph metadata
* Twitter Card support
* Metadata API integration
* Semantic page structure

---

## Lighthouse Scores

| Metric         | Score  |
| -------------- | ------ |
| Performance    | 55-75  |
| Accessibility  | 86-96  |
| Best Practices | 100    |
| SEO            | 91-100 |

---

## Project Structure

```text
app/
components/
lib/
public/
```

---

## Competition Constraints Satisfied

* Native animations only
* No Framer Motion
* No Shadcn UI
* No Radix UI
* Fully responsive
* SEO optimized
* Accessibility compliant
* Production deployment ready

```
```
