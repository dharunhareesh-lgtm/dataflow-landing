"use client";
import { useEffect, useRef } from "react";

const TESTIMONIALS = [
  {
    quote:
      "We replaced three different ETL tools and a custom Python scheduler with DataFlow in a single sprint. Our on-call alerts dropped by 60% in the first week.",
    name: "Priya Mehta",
    title: "Staff Data Engineer",
    company: "Razorpay",
    avatar: "PM",
    rating: 5,
  },
  {
    quote:
      "The AI transformation suggestions are genuinely good — not just autocomplete. It caught a silent type coercion bug that had been skewing our revenue metrics for months.",
    name: "Luca Moretti",
    title: "Head of Platform Engineering",
    company: "Contentful",
    avatar: "LM",
    rating: 5,
  },
  {
    quote:
      "We process 800M events a day through DataFlow. It's the only infrastructure tool I've introduced where engineering asked to use more of it, not less.",
    name: "Sarah Chen",
    title: "VP of Engineering",
    company: "Faire",
    avatar: "SC",
    rating: 5,
  },
  {
    quote:
      "SOC 2 compliance used to mean months of custom data lineage work. With DataFlow it was already done — column-level lineage, PII masking, audit logs. We passed our audit in two weeks.",
    name: "Markus Bauer",
    title: "CTO",
    company: "Personio",
    avatar: "MB",
    rating: 5,
  },
  {
    quote:
      "We migrated from Airflow with three engineers in a week. The YAML syntax is intuitive enough that our analytics team writes pipelines now, not just the data engineers.",
    name: "Amara Okafor",
    title: "Director of Data",
    company: "Paystack",
    avatar: "AO",
    rating: 5,
  },
  {
    quote:
      "The backfill experience is leagues ahead. We re-processed six months of customer data in four hours without touching our live pipelines. No other platform comes close.",
    name: "James Whitfield",
    title: "Principal Engineer",
    company: "Monzo",
    avatar: "JW",
    rating: 5,
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div
      style={{ display: "flex", gap: "0.2rem" }}
      aria-label={`${count} out of 5 stars`}
      role="img"
    >
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          aria-hidden="true"
          style={{ color: "#FFC801", fontSize: "0.875rem" }}
        >
          ★
        </span>
      ))}
    </div>
  );
}

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const els = sectionRef.current?.querySelectorAll(".reveal");
    if (!els) return;
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) (e.target as HTMLElement).classList.add("visible");
        }),
      { threshold: 0.08 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="section-pad"
      aria-labelledby="testimonials-heading"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="reveal text-center mb-14">
          <span className="pill">Customer stories</span>
          <h2
            id="testimonials-heading"
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
            Engineers trust DataFlow
            <br />
            <span className="gradient-text">in production</span>
          </h2>
          <p
            className="font-sans"
            style={{
              fontSize: "1.0625rem",
              color: "rgba(241,246,244,0.55)",
              maxWidth: "30rem",
              margin: "0 auto",
            }}
          >
            3,200+ teams ship faster data pipelines with DataFlow. Here&apos;s
            what they say.
          </p>
        </div>

        {/* Testimonials grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          role="list"
          aria-label="Customer testimonials"
        >
          {TESTIMONIALS.map((t, i) => (
            <figure
              key={t.name}
              role="listitem"
              className="reveal testimonial-card"
              style={{ transitionDelay: `${i * 70}ms` }}
              aria-label={`Testimonial from ${t.name}, ${t.title} at ${t.company}`}
            >
              <Stars count={t.rating} />

              <blockquote
                className="font-sans"
                style={{
                  fontSize: "0.9375rem",
                  color: "rgba(241,246,244,0.72)",
                  lineHeight: 1.7,
                  margin: "1rem 0 1.5rem",
                  fontStyle: "normal",
                }}
              >
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              <figcaption
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.875rem",
                  borderTop: "1px solid rgba(217,232,226,0.07)",
                  paddingTop: "1.25rem",
                }}
              >
                {/* Avatar */}
                <div
                  aria-hidden="true"
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    background:
                      "linear-gradient(135deg, #114C5A 0%, #172B36 100%)",
                    border: "1px solid rgba(255,200,1,0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "var(--font-jetbrains)",
                    fontSize: "0.6875rem",
                    fontWeight: 700,
                    color: "#FFC801",
                    flexShrink: 0,
                  }}
                >
                  {t.avatar}
                </div>

                <div>
                  <p
                    className="font-sans"
                    style={{
                      fontSize: "0.875rem",
                      fontWeight: 600,
                      color: "#F1F6F4",
                    }}
                  >
                    {t.name}
                  </p>
                  <p
                    className="font-sans"
                    style={{
                      fontSize: "0.8rem",
                      color: "rgba(241,246,244,0.4)",
                      marginTop: "0.1rem",
                    }}
                  >
                    {t.title} · {t.company}
                  </p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>

        {/* G2 bar */}
        <div
          className="reveal mt-12 flex flex-wrap justify-center items-center gap-8"
          style={{ transitionDelay: "100ms" }}
          aria-label="Review platform ratings"
        >
          {[
            { platform: "G2", score: "4.9", label: "/ 5 · 640 reviews" },
            { platform: "Product Hunt", score: "#1", label: "Product of the Year" },
            { platform: "Capterra", score: "4.8", label: "/ 5 · 320 reviews" },
          ].map((r) => (
            <div
              key={r.platform}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.625rem",
              }}
            >
              <span
                className="font-sans"
                style={{
                  fontSize: "0.8125rem",
                  color: "rgba(241,246,244,0.4)",
                }}
              >
                {r.platform}
              </span>
              <span
                className="font-mono"
                style={{
                  fontSize: "1.125rem",
                  fontWeight: 700,
                  color: "#FFC801",
                }}
                aria-label={`${r.score} ${r.label}`}
              >
                {r.score}
              </span>
              <span
                className="font-sans"
                style={{
                  fontSize: "0.8125rem",
                  color: "rgba(241,246,244,0.35)",
                }}
              >
                {r.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
