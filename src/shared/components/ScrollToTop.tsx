import { useEffect } from "react";
import { useLocation } from "react-router";
import { useScrollToTop } from "@shared/hooks/useScrollToTop";

export function ScrollToTop() {
  const { pathname } = useLocation();
  const scrollToTop = useScrollToTop();

  useEffect(() => {
    scrollToTop("auto");
  }, [pathname, scrollToTop]);

  return null;
}