"use client";
import {
  createContext,
  useContext,
  useCallback,
  useEffect,
  useState,
  startTransition,
} from "react";
const WishlistCtx = createContext(null);
const KEY = "nova-wishlist-v1";

export function WishlistProvider({ children }) {
  // Defer browser storage until after hydration so the initial HTML is the
  // same on the server and client.
  const [items, setItems] = useState([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(KEY);
      if (raw) {
        const p = JSON.parse(raw);
        if (Array.isArray(p)) startTransition(() => setItems(p));
      }
    } catch {
      /* ignore */
    }
    startTransition(() => setHydrated(true));
  }, []);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    if (hydrated)
      try {
        window.localStorage.setItem(KEY, JSON.stringify(items));
      } catch {
        /* ignore */
      }
  }, [items, hydrated]);

  const isLoved = useCallback(
    (id) => items.some((i) => String(i.id) === String(id)),
    [items],
  );
  const toggleLove = useCallback((product) => {
    setItems((prev) => {
      const found = prev.find((i) => String(i.id) === String(product.id));
      if (found) return prev.filter((i) => String(i.id) !== String(product.id));
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          image: product.image,
          price: product.price,
          slug: product.slug,
          brand: product.brand,
        },
      ];
    });
  }, []);
  const remove = useCallback(
    (id) => setItems((prev) => prev.filter((i) => String(i.id) !== String(id))),
    [],
  );
  const clear = useCallback(() => setItems([]), []);

  const openDropdown = useCallback(() => setDropdownOpen(true), []);
  const closeDropdown = useCallback(() => setDropdownOpen(false), []);

  return (
    <WishlistCtx.Provider
      value={{
        items,
        count: items.length,
        isLoved,
        toggleLove,
        remove,
        clear,
        hydrated,
        dropdownOpen,
        openDropdown,
        closeDropdown,
      }}
    >
      {children}
    </WishlistCtx.Provider>
  );
}

export function useWishlist() {
  const c = useContext(WishlistCtx);
  if (!c) throw new Error("useWishlist inside WishlistProvider");
  return c;
}
