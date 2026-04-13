# US-062 — Add font-display: swap to custom font loading

**Epic:** Discovery
**Priority:** 62
**Status:** pending

## Description

The app uses Plus Jakarta Sans and Be Vietnam Pro via `next/font/google`. Without explicit `display: 'swap'`, slow connections show a Flash of Invisible Text (FOIT) while fonts load, degrading perceived performance and causing layout shift. The Next.js font API supports this with a one-line `display: 'swap'` option per font import. Adding it prevents FOIT, satisfies Core Web Vitals CLS requirements, and improves the perceived speed of the initial page load.

## Acceptance Criteria

1. All `next/font/google` font imports in `web/src/app/layout.tsx` (or wherever fonts are declared) include `display: 'swap'` in their options object.
2. No additional fonts are added or removed — only the `display` option is updated.
3. The visual appearance of the app is unchanged after the fix (same fonts, same sizes, same weights).
4. A Vitest unit test (or snapshot test) verifies the font configuration object includes the `display: 'swap'` property.
5. TypeScript strict mode is maintained — no `any` types introduced.

## Out of Scope

- Do not add new fonts or change the existing font family choices
- Do not modify any component styling, Tailwind classes, or globals.css colour variables
- No backend changes
