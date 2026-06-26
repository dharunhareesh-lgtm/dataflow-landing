"use client";
import { useEffect, useRef } from "react";

const FEATURES = [
  {
    icon: "⚡",
    tag: "Core",
    title: "AI-powered transformations",
    description:
      "Write data logic in plain English. DataFlow compiles your intent into optimised SQL, Python, or dbt models — and tests them before every run.",
    metric: "70%",
    metricLabel: "less pipeline code",
  },
  {
    icon: "🔗",
    tag: "Connectors",
    title: "200+ native integrations",
    description:
      "Postgres, Snowflake, BigQuery, Kafka, S3, Salesforce, HubSpot — all connectors are maintained first-party with full schema introspection.",
    metric: "200+",
    metricLabel: "integrations",
  },
  {
    icon: "🛡",
    tag: "Compliance",
    title: "Data governance built in",
    description:
      "Column-level lineage, PII detection, field masking, and RBAC ship with every plan. Audit logs are immutable and exportable to your SIEM.",
    metric: "SOC 2",
    metricLabel: "Type II certified",
  },
  {
    icon: "📡",
    tag: "Observability",
    title: "Real-time pipeline telemetry",
    description:
      "Every row processed, every transform applied, every error surfaced — all visible in the ops dashboard with sub-second refresh.",
    metric: "< 1s",
    metricLabel: "telemetry refresh",
  },
  {
    icon: "🔁",
    tag: "Reliability",
    title: "Automatic retry and backfill",
    description:
      "Configurable retry policies with exponential backoff. Historical backfills run in parallel without blocking live pipelines.",
    metric: "99.99%",
    metricLabel: "delivery guarantee",
  },
  {
    icon: "🤖",
    tag: "AI",
    title: "Anomaly detection as code",
    description:
      "Define expected data shapes. DataFlow runs statistical checks on every batch and routes anomalies to Slack, PagerDuty, or your incident tracker.",
    metric: "0 config",
    metricLabel: "ML setup needed",
  },
];

export default function Features() {
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

  return (
    <section
      id="features"
      ref={sectionRef}
      className="section-pad"
      aria-labelledby="features-heading"
      style={{ background: "rgba(23,43,54,0.4)" }}
    >
      <div className="section-divider" aria-hidden="true" />
      <div className="max-w-7xl mx-auto px-6 pt-16">
        {/* Header */}
        <div className="reveal text-center mb-16">
          <span className="pill" aria-label="Section: Platform features">
            Platform features
          </span>
          <h2
            id="features-heading"
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
            Everything your data team needs.
            <br />
            <span className="gradient-text">Nothing they don&apos;t.</span>
          </h2>
          <p
            className="font-sans"
            style={{
              fontSize: "1.0625rem",
              color: "rgba(241,246,244,0.55)",
              maxWidth: "34rem",
              margin: "0 auto",
              lineHeight: 1.6,
            }}
          >
            Six pillars that eliminate the gap between data infrastructure and
            the product decisions that depend on it.
          </p>
        </div>

        {/* Grid */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          role="list"
          aria-label="DataFlow platform features"
        >
          {FEATURES.map((f, i) => (
            <article
              key={f.title}
              role="listitem"
              className="reveal card-glass p-7"
              style={{ transitionDelay: `${i * 60}ms` }}
              aria-label={`Feature: ${f.title}`}
            >
              <div className="flex items-start gap-4 mb-5">
                <div className="feature-icon" aria-hidden="true">
                  {f.icon}
                </div>
                <span className="tag-chip" aria-label={`Category: ${f.tag}`}>
                  {f.tag}
                </span>
              </div>

              <h3
                className="font-mono"
                style={{
                  fontSize: "1.0625rem",
                  fontWeight: 600,
                  color: "#F1F6F4",
                  marginBottom: "0.625rem",
                  letterSpacing: "-0.015em",
                }}
              >
                {f.title}
              </h3>

              <p
                className="font-sans"
                style={{
                  fontSize: "0.9rem",
                  color: "rgba(241,246,244,0.55)",
                  lineHeight: 1.65,
                  marginBottom: "1.25rem",
                }}
              >
                {f.description}
              </p>

              <div
                style={{
                  borderTop: "1px solid rgba(217,232,226,0.08)",
                  paddingTop: "1rem",
                  display: "flex",
                  alignItems: "baseline",
                  gap: "0.5rem",
                }}
              >
                <span
                  className="font-mono gradient-text"
                  style={{ fontSize: "1.375rem", fontWeight: 700 }}
                  aria-label={`${f.metric} — ${f.metricLabel}`}
                >
                  {f.metric}
                </span>
                <span
                  className="font-sans"
                  style={{
                    fontSize: "0.8125rem",
                    color: "rgba(241,246,244,0.4)",
                  }}
                >
                  {f.metricLabel}
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
      <div className="section-divider mt-16" aria-hidden="true" />
    </section>
  );
}
