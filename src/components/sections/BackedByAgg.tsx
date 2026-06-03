import {
  ArrowRight,
  BadgeCheck,
  Building2,
  ExternalLink,
  MapPin,
  ShoppingBag,
  Star,
} from "lucide-react";
import { PARENT_BRAND } from "../../constants";
import ScrollReveal from "../ui/ScrollReveal";

const facts = [
  {
    icon: BadgeCheck,
    label: "Verified business",
    value: `ABN ${PARENT_BRAND.abn}`,
    detail: "AGG DOORS PTY. LTD. is listed as an active Australian Private Company.",
  },
  {
    icon: MapPin,
    label: "Melbourne base",
    value: "Hallam, Victoria",
    detail: PARENT_BRAND.address,
  },
  {
    icon: Building2,
    label: "Trade experience",
    value: PARENT_BRAND.experienceLabel,
    detail: "Garage door repairs, installs, servicing, gates and roller shutters.",
  },
  {
    icon: Star,
    label: "Customer proof",
    value: PARENT_BRAND.reviewLabel,
    detail: "Review links are kept source-based so counts do not go stale.",
  },
];

export default function BackedByAgg() {
  return (
    <section className="section relative overflow-hidden bg-surface-alt">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand/25 to-transparent" />
      <div className="container-x">
        <ScrollReveal direction="up">
          <div className="mx-auto max-w-3xl text-center">
            <span className="eyebrow">Fact-checked parent brand</span>
            <h2 className="h-section mt-3">Backed by AGG Doors Pty Ltd</h2>
            <p className="mt-4 text-base leading-7 text-ink-soft md:text-lg">
              Garage Door Systems is powered by AGG Doors Pty Ltd, a Hallam-based
              Melbourne garage door company providing repairs, installations,
              servicing and automation support across residential and commercial
              properties.
            </p>
          </div>
        </ScrollReveal>

        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {facts.map(({ icon: Icon, label, value, detail }, index) => (
            <ScrollReveal key={label} direction="up" delay={index * 80}>
              <article className="group h-full rounded-3xl border border-border bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-brand/20 hover:shadow-card-hover">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-brand/10 text-brand transition-all duration-300 group-hover:bg-brand group-hover:text-white">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-ink-light">
                  {label}
                </p>
                <h3 className="mt-2 font-display text-xl font-bold text-ink">
                  {value}
                </h3>
                <p className="mt-3 text-sm leading-6 text-ink-soft">{detail}</p>
              </article>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal direction="up" delay={180}>
          <div className="mt-8 grid gap-4 rounded-[2rem] border border-border bg-white p-5 shadow-card md:grid-cols-[1.2fr_0.8fr] md:items-center md:p-6">
            <div>
              <p className="font-display text-2xl font-bold text-ink">
                Need remotes, openers or spare parts?
              </p>
              <p className="mt-2 text-sm leading-6 text-ink-soft">
                The AGG Doors online shop carries garage door remotes, smart
                control kits, keypads, receivers, wall buttons, openers and
                common spare parts.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row md:justify-end">
              <a
                href={PARENT_BRAND.shopUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-accent px-5 py-3 text-sm"
              >
                <ShoppingBag className="h-4 w-4" aria-hidden="true" />
                Visit shop
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href={PARENT_BRAND.reviewsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost px-5 py-3 text-sm"
              >
                Read reviews
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
