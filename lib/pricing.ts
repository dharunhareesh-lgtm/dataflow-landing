export type Currency = "INR" | "USD" | "EUR";
export type BillingCycle = "monthly" | "annual";
export type PlanKey = "starter" | "growth" | "enterprise";

export interface PricingTier {
  base: Record<Currency, number>;
  annualDiscount: number;
  features: string[];
  highlight?: boolean;
  cta: string;
  badge?: string;
}

export interface PricingConfig {
  currencies: Record<Currency, { symbol: string; locale: string }>;
  annualDiscount: number;
  plans: Record<PlanKey, {
    name: string;
    description: string;
    tier: PricingTier;
    limits: {
      pipelines: number | "unlimited";
      records: string;
      seats: number | "unlimited";
      apiCalls: string;
    };
  }>;
}

export const PRICING_CONFIG: PricingConfig = {
  currencies: {
    INR: { symbol: "₹", locale: "en-IN" },
    USD: { symbol: "$", locale: "en-US" },
    EUR: { symbol: "€", locale: "de-DE" },
  },
  annualDiscount: 0.20,
  plans: {
    starter: {
      name: "Starter",
      description: "For teams beginning their automation journey",
      tier: {
        base: { INR: 2999, USD: 36, EUR: 33 },
        annualDiscount: 0.20,
        features: [
          "5 active data pipelines",
          "1M records / month",
          "3 team seats",
          "REST & webhook triggers",
          "Email & Slack alerts",
          "Community support",
        ],
        cta: "Start free trial",
      },
      limits: {
        pipelines: 5,
        records: "1M / mo",
        seats: 3,
        apiCalls: "500K / mo",
      },
    },
    growth: {
      name: "Growth",
      description: "For scaling teams that need reliability at speed",
      tier: {
        base: { INR: 8999, USD: 108, EUR: 99 },
        annualDiscount: 0.20,
        features: [
          "50 active data pipelines",
          "50M records / month",
          "20 team seats",
          "Advanced scheduling & cron",
          "Priority Slack support",
          "SOC 2 Type II compliance",
          "Custom transformations",
          "Audit logs (90 days)",
        ],
        highlight: true,
        badge: "Most popular",
        cta: "Start free trial",
      },
      limits: {
        pipelines: 50,
        records: "50M / mo",
        seats: 20,
        apiCalls: "10M / mo",
      },
    },
    enterprise: {
      name: "Enterprise",
      description: "For organisations with complex, critical workloads",
      tier: {
        base: { INR: 24999, USD: 299, EUR: 275 },
        annualDiscount: 0.20,
        features: [
          "Unlimited pipelines",
          "Unlimited records",
          "Unlimited seats",
          "Dedicated infrastructure",
          "99.99% SLA guarantee",
          "24/7 dedicated support",
          "HIPAA & GDPR ready",
          "Custom SSO & RBAC",
          "Audit logs (unlimited)",
          "On-prem deployment option",
        ],
        cta: "Contact sales",
      },
      limits: {
        pipelines: "unlimited",
        records: "Unlimited",
        seats: "unlimited",
        apiCalls: "Unlimited",
      },
    },
  },
};

export function computePrice(
  base: number,
  cycle: BillingCycle,
  discount: number
): number {
  if (cycle === "annual") {
    return Math.round(base * (1 - discount));
  }
  return base;
}

export function formatPrice(
  amount: number,
  currency: Currency,
  config: PricingConfig
): string {
  const { symbol, locale } = config.currencies[currency];
  const formatted = new Intl.NumberFormat(locale, {
    maximumFractionDigits: 0,
  }).format(amount);
  return `${symbol}${formatted}`;
}
