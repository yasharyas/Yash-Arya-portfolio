# Yash Arya — Portfolio

Editorial, single-page portfolio built in Next.js 15 + TypeScript + Tailwind CSS.

## Design

- **Register**: Brand (the portfolio is the product).
- **Color**: Restrained — warm paper background, deep ink text, single ember-orange accent under 10%.
- **Theme**: Light editorial, intended for daytime reading on a laptop.
- **Type**: Instrument Serif (display), Inter (body), JetBrains Mono (numerics).
- **Layout**: 12-column asymmetric grid, varied vertical rhythm, no nested cards, no gradient text, no glassmorphism.

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Structure

```
app/
  layout.tsx       Root layout, fonts, metadata
  page.tsx         Composes all sections
  globals.css      Tailwind + paper grain + animations
components/
  Nav · Hero · Work · About · Experience · Skills · Credentials · Contact
lib/
  content.ts       All copy, projects, experience, links — single source of truth
tailwind.config.ts Restrained OKLCH-equivalent palette
```

## Editing content

All text and project data lives in [lib/content.ts](lib/content.ts). Update there; sections re-render automatically.

## Source

Content sourced from `.MD` (researched portfolio document, April 29, 2026). Items flagged as `MISSING` in that document — hero tagline, About narrative — were drafted in-tone; replace as needed.
