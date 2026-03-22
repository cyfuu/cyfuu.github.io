// src/shared/hooks/useScrollToTop.ts
import { useScrollContainer } from "./useScrollContainer";

export function useScrollToTop() {
  const containerRef = useScrollContainer();

  const scrollToTop = (behavior: ScrollBehavior = "smooth") => {
    const container = containerRef.current;

    if (container) {
      container.scrollTo({ top: 0, behavior });
    } else {
      window.scrollTo({ top: 0, left: 0, behavior });
    }
  };

  return scrollToTop;
}