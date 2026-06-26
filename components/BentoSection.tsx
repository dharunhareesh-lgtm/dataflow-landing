"use client";
import { useEffect, useRef, useState, useCallback } from "react";

interface BentoItem {
  id: number;
  title: string;
  description: string;
  detail: string;
  icon: string;
  tag: string;
  wide?: boolean;
  tall?: boolean;
  accentColor?: string;
  visual: React.ReactNode;
}

const ITEMS: BentoItem[] = [
  {
    id: 0,
    title: "Pipeline Studio",
    description: "Drag-and-drop or YAML — your choice",
    detail:
      "Build pipelines visually or in code. Both modes sync in real time. Every node validates schema before you deploy, catching type mismatches that would break production at 3 am.",
    icon: "🗂",
    tag: "Builder",
    wide: true,
    accentColor: "#FFC801",
    visual: (
      <div
        aria-hidden="true"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
          marginTop: "1rem",
        }}
      >
        {[
          { label: "Source: postgres", color: "#FFC801", w: "100%" },
          { label: "↓  ai.enrich(intent_score)", color: "#FF9932", w: "80%" },
          { label: "↓  deduplicate(email)", color: "#D9E8E2", w: "65%" },
          { label: "Dest: snowflake", color: "#FFC801", w: "90%" },
        ].map((n, i) => (
          <div
            key={i}
            style={{
              background: "rgba(217,232,226,0.05)",
              border: `1px solid ${n.color}33`,
              borderRadius: "0.375rem",
              padding: "0.4rem 0.75rem",
              fontFamily: "var(--font-jetbrains)",
              fontSize: "0.75rem",
              color: n.color,
              width: n.w,
              transition: "opacity 200ms ease-out",
            }}
          >
            {n.label}
          </div>
        ))}
      </div>
    ),
  },
  {
    id: 1,
    title: "Live Observability",
    description: "Every row, every error — visible instantly",
    detail:
      "Sub-second telemetry refresh on all active pipelines. Filter by connector, time window, or error type. Drill into individual record failures with full stack traces.",
    icon: "📡",
    tag: "Ops",
    tall: true,
    accentColor: "#FF9932",
    visual: (
      <div aria-hidden="true" style={{ marginTop: "1rem" }}>
        {[92, 78, 96, 61, 88, 100, 74].map((v, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              marginBottom: "0.5rem",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-jetbrains)",
                fontSize: "0.6875rem",
                color: "rgba(241,246,244,0.35)",
                width: 28,
                textAlign: "right",
              }}
            >
              {`${String(i + 1).padStart(2, "0")}h`}
            </span>
            <div
              style={{
                height: "1.25rem",
                width: `${v}%`,
                background:
                  v > 89
                    ? "rgba(74,222,128,0.4)"
                    : v > 75
                    ? "rgba(255,200,1,0.4)"
                    : "rgba(255,153,50,0.4)",
                borderRadius: "0.25rem",
                transition: "width 400ms ease-in-out",
              }}
            />
            <span
              style={{
                fontFamily: "var(--font-jetbrains)",
                fontSize: "0.6875rem",
                color: "rgba(241,246,244,0.45)",
              }}
            >
              {v}%
            </span>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: 2,
    title: "Anomaly Detection",
    description: "AI flags outliers before they reach production",
    detail:
      "Statistical models learn your data's normal shape over time. When a batch deviates — missing columns, volume spikes, distribution shifts — DataFlow halts and routes the alert to the right person.",
    icon: "🤖",
    tag: "AI",
    accentColor: "#D9E8E2",
    visual: (
      <div
        aria-hidden="true"
        style={{
          marginTop: "1rem",
          padding: "0.75rem",
          background: "rgba(255,153,50,0.08)",
          border: "1px solid rgba(255,153,50,0.2)",
          borderRadius: "0.5rem",
          fontFamily: "var(--font-jetbrains)",
          fontSize: "0.7rem",
          color: "#FF9932",
        }}
      >
        ⚠ Anomaly detected · batch_id: 8f2a91
        <br />
        <span style={{ color: "rgba(241,246,244,0.4)" }}>
          Row count −34% vs 7-day avg
        </span>
      </div>
    ),
  },
  {
    id: 3,
    title: "Governance Layer",
    description: "Lineage, PII masking, RBAC — all in one place",
    detail:
      "Column-level data lineage tracks every transformation from source to destination. Automatic PII detection applies masking policies across all connected destinations without touching pipeline code.",
    icon: "🛡",
    tag: "Compliance",
    accentColor: "#FFC801",
    visual: (
      <div
        aria-hidden="true"
        style={{
          display: "flex",
          gap: "0.5rem",
          flexWrap: "wrap",
          marginTop: "0.875rem",
        }}
      >
        {["SOC 2 Type II", "GDPR", "HIPAA", "ISO 27001", "CCPA"].map((b) => (
          <span
            key={b}
            style={{
              fontFamily: "var(--font-jetbrains)",
              fontSize: "0.65rem",
              fontWeight: 500,
              color: "#FFC801",
              background: "rgba(255,200,1,0.1)",
              border: "1px solid rgba(255,200,1,0.2)",
              borderRadius: "9999px",
              padding: "0.2rem 0.6rem",
            }}
          >
            {b}
          </span>
        ))}
      </div>
    ),
  },
  {
    id: 4,
    title: "One-click Backfills",
    description: "Re-run any historical window without blocking live data",
    detail:
      "Select a date range, choose affected pipelines, and DataFlow partitions the backfill into parallel workers. Live pipelines keep running. Progress is tracked per partition with pause-and-resume support.",
    icon: "🔁",
    tag: "Reliability",
    wide: true,
    accentColor: "#FF9932",
    visual: (
      <div
        aria-hidden="true"
        style={{
          marginTop: "1rem",
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          gap: "0.25rem",
        }}
      >
        {Array.from({ length: 21 }).map((_, i) => {
          const done = i < 13;
          const active = i === 13;
          return (
            <div
              key={i}
              style={{
                height: "1.5rem",
                borderRadius: "0.25rem",
                background: done
                  ? "rgba(74,222,128,0.5)"
                  : active
                  ? "rgba(255,200,1,0.7)"
                  : "rgba(217,232,226,0.06)",
                border: active ? "1px solid rgba(255,200,1,0.5)" : "none",
              }}
            />
          );
        })}
      </div>
    ),
  },
];

export default function BentoSection() {
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const els = sectionRef.current?.querySelectorAll(".reveal");
    if (!els) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) (e.target as HTMLElement).classList.add("visible");
        });
      },
      { threshold: 0.08 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const handleSelect = useCallback((id: number) => {
    setActiveIdx(id);
  }, []);

  return (
    <section
      id="bento"
      ref={sectionRef}
      className="section-pad"
      aria-labelledby="bento-heading"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="reveal text-center mb-12">
          <span className="pill">Platform deep-dive</span>
          <h2
            id="bento-heading"
            className="font-mono"
            style={{
              fontSize: "clamp(1.875rem, 4vw, 2.875rem)",
              fontWeight: 700,
              letterSpacing: "-0.025em",
              color: "#F1F6F4",
              marginTop: "1rem",
              marginBottom: "0.875rem",
              lineHeight: 1.12,
            }}
          >
            Built for engineers who
            <br />
            <span className="gradient-text">refuse to compromise</span>
          </h2>
          <p
            className="font-sans"
            style={{
              fontSize: "1.0625rem",
              color: "rgba(241,246,244,0.55)",
              maxWidth: "32rem",
              margin: "0 auto",
            }}
          >
            Tap any card to learn more. Every feature ships in every plan.
          </p>
        </div>

        {/* ── Desktop Bento Grid ── */}
        <div
          className="reveal bento-grid"
          role="grid"
          aria-label="DataFlow platform features grid"
          style={{ transitionDelay: "60ms" }}
        >
          {ITEMS.map((item) => (
            <div
              key={item.id}
              role="gridcell"
              className={[
                "bento-cell",
                item.wide ? "bento-cell-wide" : "",
                item.tall ? "bento-cell-tall" : "",
                activeIdx === item.id ? "active" : "",
              ]
                .filter(Boolean)
                .join(" ")}
              onClick={() => handleSelect(item.id)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleSelect(item.id);
                }
              }}
              tabIndex={0}
              aria-selected={activeIdx === item.id}
              aria-label={`${item.title} — ${item.description}`}
            >
              {/* Top row */}
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                  marginBottom: "0.875rem",
                }}
              >
                <div
                  style={{
                    fontSize: "1.5rem",
                    lineHeight: 1,
                  }}
                  aria-hidden="true"
                >
                  {item.icon}
                </div>
                <span className="tag-chip">{item.tag}</span>
              </div>

              <h3
                className="font-mono"
                style={{
                  fontSize: "1.0625rem",
                  fontWeight: 600,
                  color: "#F1F6F4",
                  marginBottom: "0.375rem",
                  letterSpacing: "-0.015em",
                }}
              >
                {item.title}
              </h3>
              <p
                className="font-sans"
                style={{
                  fontSize: "0.8125rem",
                  color: "rgba(241,246,244,0.5)",
                  lineHeight: 1.55,
                }}
              >
                {activeIdx === item.id ? item.detail : item.description}
              </p>

              {item.visual}

              {/* Active indicator */}
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: 2,
                  background:
                    activeIdx === item.id
                      ? `linear-gradient(90deg, ${item.accentColor ?? "#FFC801"}, transparent)`
                      : "transparent",
                  transition: "background 300ms ease-in-out",
                  borderRadius: "0 0 1.25rem 1.25rem",
                }}
                aria-hidden="true"
              />
            </div>
          ))}
        </div>

        {/* ── Mobile Accordion ── */}
        <div
          className="bento-accordion reveal"
          role="list"
          aria-label="DataFlow platform features"
          style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}
        >
          {ITEMS.map((item) => {
            const isOpen = activeIdx === item.id;
            return (
              <div
                key={item.id}
                role="listitem"
                className={`accordion-item ${isOpen ? "active" : ""}`}
              >
                <button
                  className="accordion-trigger"
                  onClick={() => handleSelect(item.id)}
                  aria-expanded={isOpen}
                  aria-controls={`accordion-body-${item.id}`}
                  id={`accordion-trigger-${item.id}`}
                >
                  <div
                    style={{ display: "flex", alignItems: "center", gap: "0.875rem" }}
                  >
                    <span
                      style={{ fontSize: "1.25rem", lineHeight: 1 }}
                      aria-hidden="true"
                    >
                      {item.icon}
                    </span>
                    <div>
                      <p
                        className="font-mono"
                        style={{
                          fontSize: "0.9375rem",
                          fontWeight: 600,
                          color: "#F1F6F4",
                          letterSpacing: "-0.01em",
                        }}
                      >
                        {item.title}
                      </p>
                      <p
                        className="font-sans"
                        style={{
                          fontSize: "0.8125rem",
                          color: "rgba(241,246,244,0.45)",
                          marginTop: "0.125rem",
                        }}
                      >
                        {item.description}
                      </p>
                    </div>
                  </div>

                  <svg
                    className="accordion-chevron"
                    viewBox="0 0 20 20"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M5 7.5l5 5 5-5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>

                <div
                  className="accordion-body"
                  id={`accordion-body-${item.id}`}
                  role="region"
                  aria-labelledby={`accordion-trigger-${item.id}`}
                >
                  <div className="accordion-inner">
                    <p
                      className="font-sans"
                      style={{
                        fontSize: "0.9rem",
                        color: "rgba(241,246,244,0.6)",
                        lineHeight: 1.65,
                        marginBottom: "0.875rem",
                      }}
                    >
                      {item.detail}
                    </p>
                    {item.visual}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
