import { useEffect, useRef, useState } from "react";
import { Outlet } from "react-router";
import { Navbar } from "@shared/components/Navbar";
import { ScrollToTop } from "@shared/components/ScrollToTop";
import ParticlesBg from "@shared/components/ParticlesBg";
import { ScrollContainerContext } from "@shared/hooks/useScrollContainer";
import { BackToTopButton } from "@shared/components/BackToTopButton";

export function Layout() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [snapEnabled, setSnapEnabled] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scrollToTop = () => {
      container.scrollTo({ top: 0, behavior: "auto" });
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    };

    scrollToTop();
    requestAnimationFrame(() => setSnapEnabled(true));

    const timeout = setTimeout(scrollToTop, 50);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <ScrollContainerContext.Provider value={containerRef}>
      <div
        ref={containerRef}
        className={`scroll-container h-screen overflow-y-scroll ${
          snapEnabled ? "snap-y snap-proximity" : ""
        } bg-[--color-background] scroll-smooth`}
      >
        <ParticlesBg />
        <ScrollToTop />
        <Navbar />

        <main>
          <Outlet />
        </main>

        {/* ✅ Back to top button (global) */}
        <BackToTopButton />

        <footer className="snap-start border-t border-white/10 bg-black/30 backdrop-blur-sm py-4">
          <p className="text-center text-white/60 text-xs sm:text-sm">
            © {new Date().getFullYear()} All rights reserved. | cyfuu.dev@gmail.com
          </p>
        </footer>
      </div>
    </ScrollContainerContext.Provider>
  );
}