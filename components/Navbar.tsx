"use client";
import { useEffect, useState, useCallback } from "react";

const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "Platform", href: "#bento" },
  { label: "Pricing", href: "#pricing" },
  { label: "Testimonials", href: "#testimonials" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 24);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header
      role="banner"
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        backdropFilter: scrolled ? "blur(20px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
        background: scrolled ? "rgba(23,43,54,0.9)" : "transparent",
        borderBottom: scrolled
          ? "1px solid rgba(217,232,226,0.08)"
          : "1px solid transparent",
        transition: "background 300ms ease-in-out, border-color 300ms ease-in-out",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <a
          href="#hero"
          className="flex items-center gap-2.5"
          aria-label="DataFlow home"
        >
          <span
            aria-hidden="true"
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              background: "linear-gradient(135deg, #FFC801, #FF9932)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1rem",
            }}
          >
            ⬡
          </span>
          <span
            className="font-mono font-700"
            style={{
              color: "#F1F6F4",
              fontSize: "1.0625rem",
              fontWeight: 700,
              letterSpacing: "-0.02em",
            }}
          >
            DataFlow
          </span>
        </a>

        {/* Desktop nav */}
        <nav aria-label="Primary navigation" className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              style={{
                color: "rgba(241,246,244,0.65)",
                fontSize: "0.875rem",
                fontWeight: 500,
                textDecoration: "none",
                fontFamily: "var(--font-inter)",
                transition: "color 150ms ease-out",
              }}
              onMouseEnter={(e) =>
                ((e.target as HTMLElement).style.color = "#F1F6F4")
              }
              onMouseLeave={(e) =>
                ((e.target as HTMLElement).style.color = "rgba(241,246,244,0.65)")
              }
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="#pricing"
            className="btn-secondary"
            style={{ padding: "0.5rem 1.125rem", fontSize: "0.875rem" }}
          >
            Sign in
          </a>
          <a
            href="#pricing"
            className="btn-primary"
            style={{ padding: "0.5rem 1.25rem", fontSize: "0.875rem" }}
          >
            Get started free
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2 rounded-md"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          style={{ background: "transparent", border: "none", cursor: "pointer" }}
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              style={{
                display: "block",
                width: 22,
                height: 2,
                background: "#F1F6F4",
                borderRadius: 2,
                transition: "transform 300ms ease-in-out, opacity 300ms ease-in-out",
                transform:
                  menuOpen && i === 0
                    ? "translateY(8px) rotate(45deg)"
                    : menuOpen && i === 2
                    ? "translateY(-8px) rotate(-45deg)"
                    : "none",
                opacity: menuOpen && i === 1 ? 0 : 1,
              }}
            />
          ))}
        </button>
      </div>

      {/* Mobile nav drawer */}
      <div
        role="navigation"
        aria-label="Mobile navigation"
        style={{
          maxHeight: menuOpen ? 400 : 0,
          overflow: "hidden",
          transition: "max-height 350ms ease-in-out",
          background: "rgba(23,43,54,0.97)",
          borderBottom: menuOpen ? "1px solid rgba(217,232,226,0.08)" : "none",
        }}
      >
        <div className="px-6 pb-6 pt-2 flex flex-col gap-4">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={closeMenu}
              style={{
                color: "rgba(241,246,244,0.8)",
                fontSize: "1rem",
                fontWeight: 500,
                textDecoration: "none",
                fontFamily: "var(--font-inter)",
                padding: "0.375rem 0",
                borderBottom: "1px solid rgba(217,232,226,0.06)",
              }}
            >
              {l.label}
            </a>
          ))}
          <div className="flex flex-col gap-2 pt-2">
            <a href="#pricing" onClick={closeMenu} className="btn-secondary" style={{ justifyContent: "center" }}>
              Sign in
            </a>
            <a href="#pricing" onClick={closeMenu} className="btn-primary" style={{ justifyContent: "center" }}>
              Get started free
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
