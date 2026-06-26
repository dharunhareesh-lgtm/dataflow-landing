"use client";
import { useEffect, useRef } from "react";

export default function CTA() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const els = sectionRef.current?.querySelectorAll(".reveal");
    if (!els) return;
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) (e.target as HTMLElement).classList.add("visible");
        }),
      { threshold: 0.15 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="cta"
      ref={sectionRef}
      className="section-pad"
      aria-labelledby="cta-heading"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="cta-section reveal px-8 md:px-16 py-20 text-center">
          {/* Decoration */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "700px",
              height: "300px",
              background:
                "radial-gradient(ellipse, rgba(17,76,90,0.5) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />

          <div style={{ position: "relative" }}>
            <span className="pill" aria-label="Get started today">
              Get started today
            </span>

            <h2
              id="cta-heading"
              className="font-mono"
              style={{
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                fontWeight: 700,
                letterSpacing: "-0.03em",
                color: "#F1F6F4",
                lineHeight: 1.1,
                marginTop: "1.25rem",
                marginBottom: "1rem",
              }}
            >
              Your pipelines won&apos;t fix
              <br />
              <span className="gradient-text">themselves</span>
            </h2>

            <p
              className="font-sans"
              style={{
                fontSize: "1.125rem",
                color: "rgba(241,246,244,0.6)",
                maxWidth: "34rem",
                margin: "0 auto 2.5rem",
                lineHeight: 1.65,
              }}
            >
              Join 3,200+ engineering teams who automated their data stack with
              DataFlow. Free for 14 days — no card, no friction.
            </p>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: "0.875rem",
                marginBottom: "2rem",
              }}
            >
              <a
                href="#pricing"
                className="btn-primary"
                style={{ fontSize: "1rem", padding: "0.875rem 2rem" }}
                aria-label="Start your free 14-day trial"
              >
                Start free trial — 14 days
                <svg
                  aria-hidden="true"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <path
                    d="M3 8h10M9 4l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
              <a
                href="mailto:sales@dataflow.ai"
                className="btn-secondary"
                style={{ fontSize: "1rem", padding: "0.875rem 2rem" }}
                aria-label="Schedule a demo with our sales team"
              >
                Schedule a demo
              </a>
            </div>

            {/* Trust badges */}
            <div
              className="flex flex-wrap justify-center items-center gap-6"
              aria-label="Trust and security badges"
            >
              {[
                "✓  No credit card",
                "✓  SOC 2 Type II",
                "✓  GDPR ready",
                "✓  Cancel anytime",
              ].map((b) => (
                <span
                  key={b}
                  className="font-sans"
                  style={{
                    fontSize: "0.8125rem",
                    color: "rgba(241,246,244,0.4)",
                  }}
                >
                  {b}
                </span>
              ))}
            </div>

            {/* Data throughput counter */}
            <div
              style={{
                marginTop: "3rem",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.75rem",
                background: "rgba(17,76,90,0.4)",
                border: "1px solid rgba(217,232,226,0.1)",
                borderRadius: "0.75rem",
                padding: "0.875rem 1.5rem",
              }}
              role="status"
              aria-live="off"
              aria-label="Live metric: 4.1 billion records processed today"
            >
              <span className="pulse-dot" aria-hidden="true" />
              <span
                className="font-sans"
                style={{
                  fontSize: "0.875rem",
                  color: "rgba(241,246,244,0.5)",
                }}
              >
                Live:
              </span>
              <span
                className="font-mono"
                style={{
                  fontSize: "0.9375rem",
                  fontWeight: 600,
                  color: "#FFC801",
                }}
              >
                4,127,483,912
              </span>
              <span
                className="font-sans"
                style={{
                  fontSize: "0.875rem",
                  color: "rgba(241,246,244,0.4)",
                }}
              >
                records processed today
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
