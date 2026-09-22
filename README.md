# Nova Electronics

A premium electronics storefront built with Next.js, Tailwind CSS, Swiper, and Lucide. It includes an interactive product hero, category collections, and an accessible quick-view modal.

## Structure

- `/` — product hero and featured products.
- `/products/[category]` — statically generated category collections.
- `lib/data.js` — normalized product catalogue and query helpers.
- `lib/categories.js` — the shared category source used by navigation and routes.

## Development

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

## Checks

```bash
npm run lint
npm run build
```
