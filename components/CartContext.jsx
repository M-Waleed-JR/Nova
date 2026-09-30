"use client";
import { createContext, useContext, useState, useCallback, useEffect, startTransition } from "react";

const CartCtx = createContext(null);

export function CartProvider({ children }) {
  // Keep the first client render identical to the server render. Reading
  // localStorage during state initialization can otherwise hydrate with a
  // populated cart while the server rendered an empty one.
  const [items, setItems] = useState([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem("nova_cart");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) startTransition(() => setItems(parsed));
      }
    } catch {}
    startTransition(() => setHydrated(true));
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem("nova_cart", JSON.stringify(items));
    } catch {}
  }, [items, hydrated]);

  const add = useCallback((product) => {
    setItems((prev) => {
      const qty = product.qty != null ? product.qty : 1;
      const found = prev.find((i) => i.id === product.id);
      if (found) return prev.map((i) => i.id === product.id ? { ...i, qty: i.qty + qty } : i);
      return [...prev, { id: product.id, name: product.name || product.title, price: product.price, qty, img: product.image || product.thumbnail, variant: product.variant || "" }];
    });
  }, []);

  const remove = useCallback((id) => setItems((prev) => prev.filter((i) => i.id !== id)), []);
  const updateQty = useCallback((id, delta) => setItems((prev) => prev.map((i) => i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i)), []);
  const clear = useCallback(() => setItems([]), []);

  const count = items.reduce((s, i) => s + i.qty, 0);
  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);

  return (
    <CartCtx.Provider value={{ items, count, subtotal, add, remove, updateQty, clear }}>
      {children}
    </CartCtx.Provider>
  );
}

export const useCart = () => {
  const c = useContext(CartCtx);
  if (!c) throw new Error("useCart inside CartProvider");
  return c;
};
