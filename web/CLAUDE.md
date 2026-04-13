# RentAGame — Agent Rules for web/

@AGENTS.md

## Brand Identity: "Kinetic Games"

This app has a polished "Kinetic Games" visual identity. The brand uses:
- **Navbar:** Yellow (#F5C518) background, "Kinetic Games" italic blue-800 brand, cart icon with badge
- **Hero:** Warm cream (#fffde1) background, gradient headline, decorative blobs, game preview grid
- **Footer:** bg-blue-900, rounded-t-[3rem], Kinetic Games branding
- **Fonts:** Plus Jakarta Sans (headlines) + Be Vietnam Pro (body) via next/font/google
- **Icons:** Material Symbols Outlined loaded via CDN link in layout.tsx head
- **Body background:** #fffde1 (warm yellow-white)
- **Cart flow:** CartContext with addItem/removeItem/updateDays, /cart page, /games/[id] detail pages

## Protected Files

Do NOT modify these files unless your task explicitly requires it:
- `app/layout.tsx`, `app/globals.css` — fonts, providers, color tokens
- `components/Navbar.tsx`, `components/Hero.tsx`, `components/Footer.tsx` — brand identity
- `context/CartContext.tsx` — cart state API
- `app/cart/page.tsx`, `app/games/[id]/` — established user flows

## Adding New Features

When adding features to the catalog/browse experience:
1. Create new components in `web/src/components/`
2. Wire them into `page.tsx` via props/state
3. Do NOT replace the GameCard cart-aware behavior
4. Do NOT replace `<img>` with `next/image` without explicit authorization
5. Wrap test renders in `<CartProvider>` when testing components that use `useCart`
6. Mock `next/navigation` in tests when components use `useRouter`

## Game Data

The `Game` type includes `images: string[]` and `howToPlay: string[]` fields.
Do NOT remove these fields or reduce the Game type — they are required by the
detail page and game card components.
