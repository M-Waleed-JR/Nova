# NOVA Store — Refactor & Development Guidelines

## 1. Safety & Git Rules (STRICT)

- **NEVER** execute destructive Git commands like `git checkout -- <file>`, `git reset`, or `git restore`.
- **NEVER** write external Python or Bash script hacks to edit files. Apply edits directly using file tools.
- If a file edit fails, re-read the exact file content, analyze its imports/structure, and clean it up safely.

## 2. Code Quality & Hydration Standards

- **SSR & Hydration:** Always wrap client-only states (like `localStorage` reads, badges, and context counts) with an `isMounted` state check to prevent React Hydration Mismatch errors.
- **Dropdown Mutual Exclusion:** Dropdowns (Cart and Wishlist) MUST be mutually exclusive. Opening one panel must explicitly close the other (`setCartOpen(false)` / `setWishlistOpen(false)`).
- **Positioning:** Every dropdown trigger button must be wrapped in a `<div className="relative">` container, with the dropdown panel anchored via `absolute top-full right-0 mt-2`.

## 3. Codebase Hygiene (Review & Refactor)

- **Dead Code Removal:** Scan for and eliminate unused imports, unused variables, `console.log` statements, and commented-out legacy code.
- **Unused Files & Folders:** Safely identify and remove unused components, duplicate files, and empty directories across `app/`, `components/`, and `lib/`.
- **Build Verification:** Always run `npm run build` after major refactoring to ensure 0 syntax, type, or linting errors.
