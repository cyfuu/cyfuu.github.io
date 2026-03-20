import { Outlet } from "react-router";
import { Navbar } from "@shared/components/Navbar";
import { ScrollToTop } from "@shared/components/ScrollToTop";
import bgImage from "../assets/portfolio.png";

export function Layout() {
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