"use client";
import {
  useCallback,
  useEffect,
  useReducer,
  useRef,
  memo,
} from "react";
import {
  PRICING_CONFIG,
  computePrice,
  formatPrice,
  type Currency,
  type BillingCycle,
  type PlanKey,
} from "@/lib/pricing";

// ── State ──────────────────────────────────────────────────────────────────
interface PricingState {
  currency: Currency;
  cycle: BillingCycle;
}
type PricingAction =
  | { type: "SET_CURRENCY"; payload: Currency }
  | { type: "SET_CYCLE"; payload: BillingCycle };

function pricingReducer(state: PricingState, action: PricingAction): PricingState {
  switch (action.type) {
    case "SET_CURRENCY":
      return { ...state, currency: action.payload };
    case "SET_CYCLE":
      return { ...state, cycle: action.payload };
    default:
      return state;
  }
}

// ── Price node — only this re-renders on currency/cycle change ──────────────
const PriceNode = memo(function PriceNode({
  planKey,
  currency,
  cycle,
}: {
  planKey: PlanKey;
  currency: Currency;
  cycle: BillingCycle;
}) {
  const plan = PRICING_CONFIG.plans[planKey];
  const raw = computePrice(
    plan.tier.base[currency],
    cycle,
    PRICING_CONFIG.annualDiscount
  );
  const formatted = formatPrice(raw, currency, PRICING_CONFIG);
  const nodeRef = useRef<HTMLSpanElement>(null);
  const prevRef = useRef<string>("");

  useEffect(() => {
    if (prevRef.current && prevRef.current !== formatted && nodeRef.current) {
      nodeRef.current.classList.remove("price-updating");
      void nodeRef.current.offsetWidth; // force reflow
      nodeRef.current.classList.add("price-updating");
    }
    prevRef.current = formatted;
  }, [formatted]);

  return (
    <span
      ref={nodeRef}
      className="pricing-price price-updating"
      aria-label={`${formatted} per month`}
    >
      {formatted}
    </span>
  );
});

// ── Toggle ────────────────────────────────────────────────────────────────
const CycleToggle = memo(function CycleToggle({
  cycle,
  onToggle,
}: {
  cycle: BillingCycle;
  onToggle: () => void;
}) {
  const isAnnual = cycle === "annual";
  return (
    <div
      style={{ display: "flex", alignItems: "center", gap: "0.875rem" }}
    >
      <span
        className="font-sans"
        style={{
          fontSize: "0.875rem",
          color: isAnnual ? "rgba(241,246,244,0.45)" : "#F1F6F4",
          fontWeight: isAnnual ? 400 : 500,
          transition: "color 200ms ease-out",
        }}
      >
        Monthly
      </span>

      <button
        role="switch"
        aria-checked={isAnnual}
        aria-label={`Switch to ${isAnnual ? "monthly" : "annual"} billing`}
        className={`toggle-track ${isAnnual ? "active" : ""}`}
        onClick={onToggle}
      >
        <span className="toggle-thumb" />
      </button>

      <span
        className="font-sans"
        style={{
          fontSize: "0.875rem",
          color: isAnnual ? "#F1F6F4" : "rgba(241,246,244,0.45)",
          fontWeight: isAnnual ? 500 : 400,
          transition: "color 200ms ease-out",
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
        }}
      >
        Annual
        <span
          className="pill"
          style={{ fontSize: "0.65rem", padding: "0.15rem 0.5rem" }}
          aria-label="Save 20 percent"
        >
          −20%
        </span>
      </span>
    </div>
  );
});

// ── Currency picker ───────────────────────────────────────────────────────
const CurrencyPicker = memo(function CurrencyPicker({
  currency,
  onChange,
}: {
  currency: Currency;
  onChange: (c: Currency) => void;
}) {
  const currencies: Currency[] = ["INR", "USD", "EUR"];
  return (
    <div
      role="radiogroup"
      aria-label="Select currency"
      style={{
        display: "flex",
        gap: "0.25rem",
        background: "rgba(217,232,226,0.05)",
        border: "1px solid rgba(217,232,226,0.1)",
        borderRadius: "0.625rem",
        padding: "0.25rem",
      }}
    >
      {currencies.map((c) => (
        <button
          key={c}
          role="radio"
          aria-checked={currency === c}
          className={`currency-btn ${currency === c ? "active" : ""}`}
          onClick={() => onChange(c)}
          aria-label={`Show prices in ${c}`}
        >
          {PRICING_CONFIG.currencies[c].symbol} {c}
        </button>
      ))}
    </div>
  );
});

// ── Plan card ─────────────────────────────────────────────────────────────
const PlanCard = memo(function PlanCard({
  planKey,
  currency,
  cycle,
}: {
  planKey: PlanKey;
  currency: Currency;
  cycle: BillingCycle;
}) {
  const plan = PRICING_CONFIG.plans[planKey];
  const highlighted = plan.tier.highlight ?? false;

  return (
    <article
      className={`pricing-card ${highlighted ? "highlighted" : ""}`}
      aria-label={`${plan.name} plan`}
    >
      {/* Badge */}
      {plan.tier.badge && (
        <div
          aria-label={plan.tier.badge}
          style={{
            position: "absolute",
            top: "-1px",
            left: "50%",
            transform: "translateX(-50%)",
            background: "linear-gradient(135deg, #FFC801, #FF9932)",
            color: "#172B36",
            fontFamily: "var(--font-jetbrains)",
            fontSize: "0.6875rem",
            fontWeight: 700,
            padding: "0.25rem 0.875rem",
            borderRadius: "0 0 0.625rem 0.625rem",
            whiteSpace: "nowrap",
            letterSpacing: "0.04em",
            textTransform: "uppercase",
          }}
        >
          {plan.tier.badge}
        </div>
      )}

      {/* Plan name */}
      <div style={{ marginTop: plan.tier.badge ? "1rem" : 0 }}>
        <h3
          className="font-mono"
          style={{
            fontSize: "1.0625rem",
            fontWeight: 600,
            color: "#F1F6F4",
            letterSpacing: "-0.015em",
            marginBottom: "0.25rem",
          }}
        >
          {plan.name}
        </h3>
        <p
          className="font-sans"
          style={{
            fontSize: "0.8125rem",
            color: "rgba(241,246,244,0.45)",
            lineHeight: 1.5,
          }}
        >
          {plan.description}
        </p>
      </div>

      {/* Price */}
      <div
        className="pricing-price-wrap"
        style={{ margin: "1.5rem 0 0.25rem" }}
      >
        <PriceNode planKey={planKey} currency={currency} cycle={cycle} />
        <span className="pricing-cycle font-sans">/mo</span>
      </div>
      {cycle === "annual" && (
        <p
          className="font-sans"
          style={{
            fontSize: "0.75rem",
            color: "rgba(74,222,128,0.8)",
            marginBottom: "0.25rem",
          }}
          aria-live="polite"
        >
          Billed annually · 20% off
        </p>
      )}

      {/* Limits grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "0.5rem",
          margin: "1.25rem 0",
          padding: "0.875rem",
          background: "rgba(217,232,226,0.04)",
          borderRadius: "0.625rem",
          border: "1px solid rgba(217,232,226,0.07)",
        }}
        aria-label="Plan limits"
      >
        {[
          ["Pipelines", plan.limits.pipelines],
          ["Records", plan.limits.records],
          ["Seats", plan.limits.seats],
          ["API calls", plan.limits.apiCalls],
        ].map(([label, val]) => (
          <div key={String(label)}>
            <p
              className="font-sans"
              style={{ fontSize: "0.6875rem", color: "rgba(241,246,244,0.35)" }}
            >
              {label}
            </p>
            <p
              className="font-mono"
              style={{
                fontSize: "0.8125rem",
                fontWeight: 600,
                color: "#F1F6F4",
                marginTop: "0.1rem",
              }}
            >
              {String(val)}
            </p>
          </div>
        ))}
      </div>

      {/* Features */}
      <ul
        style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.6rem", marginBottom: "1.75rem" }}
        aria-label={`${plan.name} features`}
      >
        {plan.tier.features.map((feat) => (
          <li
            key={feat}
            style={{ display: "flex", alignItems: "flex-start", gap: "0.625rem" }}
          >
            <span className="check-icon" aria-hidden="true">✓</span>
            <span
              className="font-sans"
              style={{ fontSize: "0.875rem", color: "rgba(241,246,244,0.65)", lineHeight: 1.4 }}
            >
              {feat}
            </span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <a
        href="#"
        className={highlighted ? "btn-primary" : "btn-secondary"}
        style={{ width: "100%", justifyContent: "center" }}
        aria-label={`${plan.tier.cta} — ${plan.name} plan`}
      >
        {plan.tier.cta}
      </a>
    </article>
  );
});

// ── Main section ──────────────────────────────────────────────────────────
export default function Pricing() {
  const [state, dispatch] = useReducer(pricingReducer, {
    currency: "USD",
    cycle: "monthly",
  });
  const sectionRef = useRef<HTMLElement>(null);

  const setCurrency = useCallback((c: Currency) => {
    dispatch({ type: "SET_CURRENCY", payload: c });
  }, []);

  const toggleCycle = useCallback(() => {
    dispatch({
      type: "SET_CYCLE",
      payload: state.cycle === "monthly" ? "annual" : "monthly",
    });
  }, [state.cycle]);

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

  const planKeys: PlanKey[] = ["starter", "growth", "enterprise"];

  return (
    <section
      id="pricing"
      ref={sectionRef}
      className="section-pad"
      aria-labelledby="pricing-heading"
      style={{ background: "rgba(23,43,54,0.35)" }}
    >
      <div className="section-divider" aria-hidden="true" />
      <div className="max-w-7xl mx-auto px-6 pt-16">
        {/* Header */}
        <div className="reveal text-center mb-10">
          <span className="pill">Pricing</span>
          <h2
            id="pricing-heading"
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
            Simple pricing.{" "}
            <span className="gradient-text">No surprises.</span>
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
            All plans include a 14-day free trial. No credit card required to
            start.
          </p>
        </div>

        {/* Controls */}
        <div
          className="reveal flex flex-wrap items-center justify-center gap-5 mb-12"
          style={{ transitionDelay: "60ms" }}
        >
          <CurrencyPicker currency={state.currency} onChange={setCurrency} />
          <CycleToggle cycle={state.cycle} onToggle={toggleCycle} />
        </div>

        {/* Cards */}
        <div
          className="reveal grid grid-cols-1 md:grid-cols-3 gap-6 items-start"
          style={{ transitionDelay: "120ms" }}
          aria-label="Pricing plans"
        >
          {planKeys.map((key) => (
            <PlanCard
              key={key}
              planKey={key}
              currency={state.currency}
              cycle={state.cycle}
            />
          ))}
        </div>

        {/* Enterprise note */}
        <p
          className="reveal font-sans text-center mt-8"
          style={{
            fontSize: "0.875rem",
            color: "rgba(241,246,244,0.35)",
            transitionDelay: "180ms",
          }}
        >
          Need a custom contract or on-prem deployment?{" "}
          <a
            href="mailto:sales@dataflow.ai"
            style={{
              color: "#FFC801",
              textDecoration: "none",
              transition: "opacity 150ms ease-out",
            }}
            onMouseEnter={(e) => ((e.target as HTMLElement).style.opacity = "0.75")}
            onMouseLeave={(e) => ((e.target as HTMLElement).style.opacity = "1")}
          >
            Talk to our team →
          </a>
        </p>
      </div>
      <div className="section-divider mt-16" aria-hidden="true" />
    </section>
  );
}
