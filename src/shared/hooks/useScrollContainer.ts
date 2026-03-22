import { useContext, createContext, MutableRefObject } from "react";

export const ScrollContainerContext =
  createContext<MutableRefObject<HTMLDivElement | null> | null>(null);

export function useScrollContainer() {
  const context = useContext(ScrollContainerContext);

  if (!context) {
    throw new Error("useScrollContainer must be used within ScrollContainerContext.Provider");
  }

  return context;
}