"use client";
import { useEffect, useRef } from "react";

const STATS = [
  { value: "3,200+", label: "Engineering teams" },
  { value: "98.7%", label: "Uptime SLA" },
  { value: "4.1B+", label: "Records processed / day" },
  { value: "< 80ms", label: "Median pipeline latency" },
];

const LOGOS = [
  "Stripe",
  "Notion",
  "Linear",
  "Vercel",
  "Supabase",
  "Cloudflare",
];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const els = sectionRef.current?.querySelectorAll(".reveal");
    if (!els) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            (e.target as HTMLElement).classList.add("visible");
          }
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="hero-grid relative min-h-screen flex flex-col justify-center overflow-hidden"
      aria-label="Hero — DataFlow AI-driven data automation"
      style={{ paddingTop: "5rem" }}
    >
      {/* Ambient glows */}
      <div
        className="glow-ring"
        aria-hidden="true"
        style={{
          width: 600,
          height: 600,
          top: "-15%",
          right: "-10%",
          animationDelay: "0s",
        }}
      />
      <div
        className="glow-ring"
        aria-hidden="true"
        style={{
          width: 400,
          height: 400,
          bottom: "5%",
          left: "-8%",
          animationDelay: "3s",
          background:
            "radial-gradient(circle, rgba(255,153,50,0.08) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 w-full py-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Status pill */}
          <div className="reveal flex justify-center mb-6" style={{ transitionDelay: "60ms" }}>
            <span className="pill" role="status">
              <span className="pulse-dot" aria-hidden="true" />
              Now processing 4.1B records daily — live
            </span>
          </div>

          {/* Heading */}
          <h1
            className="reveal font-mono"
            style={{
              fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
              fontWeight: 700,
              lineHeight: 1.08,
              letterSpacing: "-0.03em",
              color: "#F1F6F4",
              transitionDelay: "120ms",
              marginBottom: "1.5rem",
            }}
          >
            Automate every{" "}
            <span className="gradient-text">data pipeline</span>
            <br />
            before your next sprint
          </h1>

          {/* Sub-heading */}
          <p
            className="reveal font-sans"
            style={{
              fontSize: "clamp(1rem, 2.2vw, 1.25rem)",
              color: "rgba(241,246,244,0.65)",
              lineHeight: 1.65,
              maxWidth: "38rem",
              margin: "0 auto 2.5rem",
              fontWeight: 400,
              transitionDelay: "180ms",
            }}
          >
            DataFlow connects your entire data stack and runs AI-driven
            transformations at scale — with zero-config orchestration that ops
            teams actually want to maintain.
          </p>

          {/* CTAs */}
          <div
            className="reveal flex flex-wrap justify-center gap-3"
            style={{ transitionDelay: "240ms" }}
          >
            <a href="#pricing" className="btn-primary" aria-label="Start your free 14-day trial">
              Start free — 14 days
              <svg
                aria-hidden="true"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="currentColor"
              >
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a href="#bento" className="btn-secondary" aria-label="See how DataFlow works">
              See how it works
            </a>
          </div>

          {/* Trust note */}
          <p
            className="reveal font-sans"
            style={{
              fontSize: "0.8125rem",
              color: "rgba(241,246,244,0.35)",
              marginTop: "1rem",
              transitionDelay: "300ms",
            }}
          >
            No credit card required · SOC 2 Type II · GDPR ready
          </p>
        </div>

        {/* Terminal preview */}
        <div
          className="reveal mt-16 mx-auto"
          style={{
            maxWidth: 780,
            transitionDelay: "360ms",
            background: "rgba(17,76,90,0.3)",
            border: "1px solid rgba(217,232,226,0.12)",
            borderRadius: "1rem",
            overflow: "hidden",
          }}
          role="img"
          aria-label="DataFlow pipeline code example showing YAML configuration"
        >
          {/* Terminal bar */}
          <div
            style={{
              padding: "0.75rem 1rem",
              background: "rgba(23,43,54,0.6)",
              borderBottom: "1px solid rgba(217,232,226,0.08)",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            {["#FF5F57", "#FEBC2E", "#28C840"].map((c, i) => (
              <span
                key={i}
                aria-hidden="true"
                style={{ width: 12, height: 12, borderRadius: "50%", background: c }}
              />
            ))}
            <span
              className="font-mono"
              style={{
                fontSize: "0.75rem",
                color: "rgba(241,246,244,0.35)",
                marginLeft: "0.5rem",
              }}
            >
              dataflow.pipeline.yaml
            </span>
          </div>

          {/* Code block */}
          <pre
            className="font-mono"
            style={{
              padding: "1.5rem",
              fontSize: "clamp(0.7rem, 1.5vw, 0.875rem)",
              lineHeight: 1.7,
              overflowX: "auto",
              color: "rgba(241,246,244,0.85)",
            }}
          >
            <code>{`pipeline:
  name: <span style="color:#FFC801">customer_360_sync</span>
  trigger: <span style="color:#FF9932">cron("0 */4 * * *")</span>
  
  source:
    connector: <span style="color:#D9E8E2">postgres</span>
    query: <span style="color:#FFC801">"SELECT * FROM customers WHERE updated_at > :last_run"</span>
  
  transform:
    - ai.enrich(model: <span style="color:#FF9932">"gpt-4o-mini"</span>, field: "intent_score")
    - deduplicate(key: <span style="color:#FFC801">"email"</span>, strategy: <span style="color:#D9E8E2">"latest"</span>)
    - validate(schema: <span style="color:#D9E8E2">./schemas/customer.json</span>)
  
  destination:
    connector: <span style="color:#FFC801">snowflake</span>
    table: <span style="color:#D9E8E2">warehouse.customers_enriched</span>
    write_mode: <span style="color:#FF9932">upsert</span>
    
  on_error: <span style="color:#4ade80">retry(3)</span> | <span style="color:#4ade80">alert(slack, pagerduty)</span>`}</code>
          </pre>
        </div>

        {/* Stats row */}
        <div
          className="reveal mt-16 grid grid-cols-2 md:grid-cols-4 gap-0 border border-solid"
          style={{
            borderColor: "rgba(217,232,226,0.08)",
            borderRadius: "0.875rem",
            overflow: "hidden",
            transitionDelay: "420ms",
          }}
          aria-label="Key DataFlow metrics"
        >
          {STATS.map((s, i) => (
            <div
              key={i}
              className="stat-item text-center"
              style={{
                padding: "1.5rem 1rem",
                background:
                  i % 2 === 0
                    ? "rgba(17,76,90,0.2)"
                    : "rgba(17,76,90,0.12)",
              }}
            >
              <p
                className="font-mono"
                style={{
                  fontSize: "1.625rem",
                  fontWeight: 700,
                  color: "#FFC801",
                  letterSpacing: "-0.02em",
                  marginBottom: "0.25rem",
                }}
              >
                {s.value}
              </p>
              <p
                className="font-sans"
                style={{
                  fontSize: "0.8125rem",
                  color: "rgba(241,246,244,0.5)",
                }}
              >
                {s.label}
              </p>
            </div>
          ))}
        </div>

        {/* Logo bar */}
        <div
          className="reveal mt-12 text-center"
          style={{ transitionDelay: "480ms" }}
        >
          <p
            className="font-sans"
            style={{
              fontSize: "0.75rem",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: "rgba(241,246,244,0.3)",
              marginBottom: "1.25rem",
            }}
          >
            Trusted by engineering teams at
          </p>
          <div
            className="flex flex-wrap justify-center items-center gap-6 md:gap-10"
            aria-label="Companies using DataFlow"
          >
            {LOGOS.map((name) => (
              <span
                key={name}
                className="font-mono"
                style={{
                  fontSize: "0.9375rem",
                  fontWeight: 600,
                  color: "rgba(241,246,244,0.22)",
                  letterSpacing: "0.02em",
                  transition: "color 150ms ease-out",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.color =
                    "rgba(241,246,244,0.55)")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.color =
                    "rgba(241,246,244,0.22)")
                }
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
