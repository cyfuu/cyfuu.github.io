import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useScrollToTop } from "@shared/hooks/useScrollToTop";
import { useScrollContainer } from "@shared/hooks/useScrollContainer";
import { useLocation } from "react-router";

export function BackToTopButton() {
  const scrollToTop = useScrollToTop();
  const containerRef = useScrollContainer();
  const { pathname } = useLocation();

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      // Show button if user scrolled down even a little
      setVisible(container.scrollTop > 50); 
    };

    // Initial check on route change
    handleScroll();

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [containerRef, pathname]);

  return (
    <motion.button
      onClick={() => scrollToTop("smooth")}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{
        opacity: visible ? 1 : 0,
        scale: visible ? 1 : 0.9,
        pointerEvents: visible ? "auto" : "none",
      }}
      transition={{ duration: 0.2 }}
      className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition"
      aria-label="Back to top"
    >
      <ArrowUp className="text-white" size={20} />
    </motion.button>
  );
}