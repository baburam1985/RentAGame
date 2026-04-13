# US-044: Use Next.js Image component for all game images

- **Epic:** Discovery
- **Priority:** 44
- **Status:** tests-written
- **Passes:** false
- **Branch:** 
- **PR:** 
- **QA Attempts:** 0

## Description

If any game images use a standard HTML `<img>` tag rather than Next.js `Image` (next/image), they miss automatic WebP conversion, responsive srcSet generation, and lazy loading. On a grid of 12 full-width game images this measurably hurts Largest Contentful Paint (LCP) on mobile. All game images in game cards, the game detail page, and the game modal should use `next/image` with appropriate `width`, `height`, and `priority` props on above-the-fold cards, in line with PRODUCT.md design principle 5 (fast perceived performance).

## Acceptance Criteria

- [ ] All game card images in `web/src/components/GameCard.tsx` use `<Image>` from `next/image` — no `<img>` tags for game images in this file
- [ ] All game images in `web/src/components/GameModal.tsx` use `<Image>` from `next/image` — no `<img>` tags for game images in this file
- [ ] All game images in `web/src/app/games/[id]/` pages use `<Image>` from `next/image` — no `<img>` tags for game images in this directory
- [ ] The first 4 game cards in the grid have `priority={true}` on their `<Image>` to signal above-the-fold LCP images; remaining cards use the default lazy loading
- [ ] All `<Image>` components provide explicit `width` and `height` props (or use `fill` with a sized container) to prevent layout shift (CLS)
- [ ] A unit test or Playwright test verifies that at least one rendered game card contains an `<img>` element with a `src` attribute referencing an Unsplash URL (confirming next/image rendered correctly)

## Dev Notes

Audit `GameCard.tsx`, `GameModal.tsx`, and `web/src/app/games/[id]/page.tsx` and `GameDetailClient.tsx` for any `<img>` tags used for game images. Replace them with `import Image from 'next/image'` and the `<Image>` component. Use `fill` layout with a `relative` sized wrapper div if exact pixel dimensions are not known. For `GameCard.tsx`, pass `priority={index < 4}` or `priority={props.priority}` from the parent grid component. `GameCard.tsx`, `GameModal.tsx`, and the game detail pages are all listed as protected components, so make the minimum change — only replacing `<img>` with `<Image>`; do not alter layout, styles, or other logic.
