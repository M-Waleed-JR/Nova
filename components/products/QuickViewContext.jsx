"use client";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

const defaultContext = {
  product: null,
  openQuickView: () => {},
  closeQuickView: () => {},
};

const QuickViewContext = createContext(defaultContext);

export function QuickViewProvider({ children }) {
  const [product, setProduct] = useState(null);

  const openQuickView = useCallback((nextProduct) => {
    setProduct(nextProduct);
  }, []);
  const closeQuickView = useCallback(() => setProduct(null), []);
  const contextValue = useMemo(
    () => ({ product, openQuickView, closeQuickView }),
    [product, openQuickView, closeQuickView],
  );

  return (
    <QuickViewContext.Provider value={contextValue}>
      {children}
    </QuickViewContext.Provider>
  );
}

export const useQuickView = () => useContext(QuickViewContext);
