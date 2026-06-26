"use client";
const FOOTER_LINKS: Record<string, { label: string; href: string }[]> = {
  Product: [
    { label: "Features", href: "#features" },
    { label: "Platform", href: "#bento" },
    { label: "Pricing", href: "#pricing" },
    { label: "Changelog", href: "#" },
    { label: "Roadmap", href: "#" },
  ],
  Developers: [
    { label: "Documentation", href: "#" },
    { label: "API Reference", href: "#" },
    { label: "SDKs", href: "#" },
    { label: "Connectors", href: "#" },
    { label: "Status", href: "#" },
  ],
  Company: [
    { label: "About", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Press", href: "#" },
    { label: "Contact", href: "mailto:hello@dataflow.ai" },
  ],
  Legal: [
    { label: "Privacy", href: "#" },
    { label: "Terms", href: "#" },
    { label: "Security", href: "#" },
    { label: "DPA", href: "#" },
    { label: "Cookies", href: "#" },
  ],
};

export default function Footer() {
  return (
    <footer
      role="contentinfo"
      style={{
        background: "rgba(23,43,54,0.6)",
        borderTop: "1px solid rgba(217,232,226,0.07)",
        paddingTop: "4rem",
        paddingBottom: "2rem",
      }}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Top row */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-14">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <a
              href="#hero"
              aria-label="DataFlow home"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.625rem",
                textDecoration: "none",
                marginBottom: "1rem",
              }}
            >
              <span
                aria-hidden="true"
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 7,
                  background: "linear-gradient(135deg, #FFC801, #FF9932)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "0.875rem",
                }}
              >
                ⬡
              </span>
              <span
                className="font-mono"
                style={{ fontSize: "0.9375rem", fontWeight: 700, color: "#F1F6F4" }}
              >
                DataFlow
              </span>
            </a>
            <p
              className="font-sans"
              style={{
                fontSize: "0.8125rem",
                color: "rgba(241,246,244,0.4)",
                lineHeight: 1.6,
                maxWidth: "15rem",
              }}
            >
              AI-driven data automation for engineering teams who refuse to
              compromise.
            </p>

            {/* Social links */}
            <div
              style={{ display: "flex", gap: "0.875rem", marginTop: "1.25rem" }}
              aria-label="DataFlow social media links"
            >
              {[
                { label: "Twitter / X", symbol: "𝕏", href: "#" },
                { label: "GitHub", symbol: "⌥", href: "#" },
                { label: "LinkedIn", symbol: "in", href: "#" },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={`DataFlow on ${s.label}`}
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: "0.5rem",
                    background: "rgba(217,232,226,0.06)",
                    border: "1px solid rgba(217,232,226,0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "var(--font-jetbrains)",
                    fontSize: "0.75rem",
                    color: "rgba(241,246,244,0.5)",
                    textDecoration: "none",
                    transition: "border-color 150ms ease-out, color 150ms ease-out",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor =
                      "rgba(255,200,1,0.3)";
                    (e.currentTarget as HTMLElement).style.color = "#FFC801";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor =
                      "rgba(217,232,226,0.1)";
                    (e.currentTarget as HTMLElement).style.color =
                      "rgba(241,246,244,0.5)";
                  }}
                >
                  {s.symbol}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <nav key={category} aria-label={`${category} links`}>
              <h3
                className="font-mono"
                style={{
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  color: "rgba(241,246,244,0.35)",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  marginBottom: "1rem",
                }}
              >
                {category}
              </h3>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.625rem" }}>
                {links.map((l) => (
                  <li key={l.label}>
                    <a href={l.href}>{l.label}</a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: "1px solid rgba(217,232,226,0.07)",
            paddingTop: "1.5rem",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "0.75rem",
          }}
        >
          <p
            className="font-sans"
            style={{ fontSize: "0.8125rem", color: "rgba(241,246,244,0.3)" }}
          >
            © {new Date().getFullYear()} DataFlow, Inc. All rights reserved.
          </p>
          <p
            className="font-mono"
            style={{
              fontSize: "0.75rem",
              color: "rgba(241,246,244,0.2)",
              letterSpacing: "0.04em",
            }}
            aria-label="System status"
          >
            <span
              aria-hidden="true"
              style={{
                display: "inline-block",
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "#4ade80",
                marginRight: "0.375rem",
                verticalAlign: "middle",
              }}
            />
            All systems operational
          </p>
        </div>
      </div>
    </footer>
  );
}
