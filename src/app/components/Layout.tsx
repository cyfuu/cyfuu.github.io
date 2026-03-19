import { Outlet } from "react-router";
import { Navbar } from "./navbar/Navbar";
import { ScrollToTop } from "./scroll_to_top/ScrollToTop";
import { useEffect } from "react";
import bgImage from "../../assets/portfolio.png";
import logo from "../../assets/logo.svg";

export function Layout() {
  useEffect(() => {
    const existingLink = document.querySelector(
      "link[rel='icon']"
    ) as HTMLLinkElement | null;

    if (existingLink) {
      existingLink.href = logo;
    } else {
      const link = document.createElement("link");
      link.rel = "icon";
      link.type = "image/svg+xml";
      link.href = logo;
      document.head.appendChild(link);
    }
  }, []);

  return (
    <div
      className="scroll-container h-screen overflow-y-scroll snap-y snap-proximity bg-[--color-background] scroll-smooth"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <ScrollToTop />
      <Navbar />

      <main>
        <Outlet />
      </main>

      <footer className="snap-start border-t border-white/10 bg-black/30 backdrop-blur-sm py-4">
        <p className="text-center text-white/60 text-xs sm:text-sm">
          © {new Date().getFullYear()} All rights reserved. | cyfuu.dev@gmail.com
        </p>
      </footer>
    </div>
  );
}