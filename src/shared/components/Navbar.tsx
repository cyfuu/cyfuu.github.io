import { Link, useLocation } from "react-router";
import { Menu, X } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { navItems } from "../constants/navItems";
import logo from "/logo.svg";
import { useScrollToTop } from "@shared/hooks/useScrollToTop";

export function Navbar() {
  const location = useLocation();
  const scrollToTop = useScrollToTop();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) =>
    path === "/" ? location.pathname === "/" : location.pathname.startsWith(path);

  /**
   * Unified handler for logo + Home nav item
   */
  const handleHomeClick = (e: React.MouseEvent, path: string) => {
    if (path === "/" && location.pathname === "/") {
      e.preventDefault(); // stop navigation
      scrollToTop("smooth");
    }
  };

  // Desktop underline
  const containerRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const [underlineStyle, setUnderlineStyle] = useState({ width: 0, left: 0 });

  const updateUnderline = (path: string) => {
    const el = linkRefs.current[path];
    const container = containerRef.current;

    if (el && container) {
      const elRect = el.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();

      setUnderlineStyle({
        width: elRect.width,
        left: elRect.left - containerRect.left,
      });
    }
  };

  useEffect(() => {
    const activeItem = navItems.find((item) => isActive(item.path));
    if (activeItem) updateUnderline(activeItem.path);

    const handleResize = () => activeItem && updateUnderline(activeItem.path);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [location.pathname]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/30 backdrop-blur-md">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* ✅ Logo uses same logic */}
          <Link
            to="/"
            onClick={(e) => handleHomeClick(e, "/")}
            className="flex items-center"
          >
            <img
              src={logo}
              alt="Logo"
              className="h-10 w-auto object-contain select-none transition-transform duration-300 hover:scale-110"
            />
          </Link>

          {/* Desktop */}
          <div ref={containerRef} className="relative hidden md:flex gap-8">
            <span
              className="absolute bottom-0 h-px bg-white rounded-full transition-all duration-300 ease-out"
              style={underlineStyle}
            />

            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                ref={(el) => { linkRefs.current[item.path] = el; }}
                onClick={(e) => handleHomeClick(e, item.path)} // ✅ unified logic
                className="text-white px-4 py-1.5 transition-transform select-none duration-300 hover:scale-110"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/10">
            <div className="flex flex-col gap-4">
              {navItems.map((item) => {
                const active = isActive(item.path);

                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={(e) => {
                      handleHomeClick(e, item.path); // ✅ same logic
                      setMobileMenuOpen(false);
                    }}
                    className="relative text-white px-2 py-1 transition"
                  >
                    {item.label}
                    {active && (
                      <span className="absolute left-0 bottom-0 w-full h-px bg-white" />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}