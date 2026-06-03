import { useState } from "react";
import { SERVICES } from "../../constants";
import ScrollReveal from "../ui/ScrollReveal";
import { useTilt } from "../../hooks/useTilt";
import BeforeAfterSlider from "../ui/BeforeAfterSlider";
import {
  PackagePlus,
  Wrench,
  Zap,
  RefreshCw,
  Key,
  AlertTriangle,
  ShieldCheck,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";

const ICON_MAP: Record<string, LucideIcon> = {
  PackagePlus,
  Wrench,
  Zap,
  RefreshCw,
  Key,
  AlertTriangle,
  ShieldCheck,
};

// Filter category definitions — each service maps to one or more categories
const FILTERS = [
  { id: "all",       label: "All Services", icon: "✦" },
  { id: "install",   label: "Install",      icon: "📦" },
  { id: "repair",    label: "Repair",       icon: "🔧" },
  { id: "automate",  label: "Automate",     icon: "⚡" },
  { id: "emergency", label: "Emergency",    icon: "🚨" },
] as const;

type FilterId = typeof FILTERS[number]["id"];

// Which filter(s) each service belongs to (by service id from constants)
const SERVICE_CATEGORIES: Record<string, FilterId[]> = {
  "supply-install":  ["install"],
  "repairs":         ["repair"],
  "motors-automation": ["automate", "install"],
  "springs-cables":  ["repair"],
  "remotes-controls":["automate", "repair"],
  "emergency":       ["emergency", "repair"],
  "maintenance":     ["repair"],
};

// Before/after slider data — real AGG Doors job photos
const BEFORE_AFTER_PAIRS = [
  {
    before: "/assets/door-before-outdoor.png",
    after: "/assets/door-after-outdoor.png",
    beforeAlt: "Worn, damaged panel lift door before replacement",
    afterAlt: "Brand new panel lift door after AGG Doors installation",
    beforeLabel: "Before",
    afterLabel: "After",
    caption: "Panel door replacement",
  },
  {
    before: "/assets/motor-before.png",
    after: "/assets/motor-after.png",
    beforeAlt: "Empty ceiling mount bracket before motor installation",
    afterAlt: "New garage door motor fully installed by AGG Doors",
    beforeLabel: "Before",
    afterLabel: "After",
    caption: "Motor installation",
  },
  {
    before: "/assets/roller-before.png",
    after: "/assets/roller-after.png",
    beforeAlt: "Roller door jammed open and coming off track",
    afterAlt: "Roller door fully closed and operating smoothly after repair",
    beforeLabel: "Before",
    afterLabel: "After",
    caption: "Roller door repair",
  },
];

function TiltCard({
  service,
  featured = false,
}: {
  service: (typeof SERVICES)[number];
  featured?: boolean;
}) {
  const { ref, onMouseMove, onMouseLeave, onMouseEnter } = useTilt({
    maxTilt: featured ? 4 : 6,
    scale: 1.02,
  });

  const Icon = ICON_MAP[service.icon] ?? Wrench;

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onMouseEnter={onMouseEnter}
      className="h-full"
    >
      <article
        className={`group flex h-full flex-col rounded-2xl border border-border bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-brand/20 hover:shadow-card-glow ${
          featured ? "p-8 md:p-10" : "p-7"
        }`}
      >
        {featured && (
          <span className="mb-4 inline-flex w-fit items-center gap-1.5 rounded-full bg-brand/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-brand">
            <span className="h-1.5 w-1.5 rounded-full bg-brand" />
            Most requested
          </span>
        )}

        <div
          className={`mb-5 flex items-center justify-center rounded-xl bg-brand/8 transition-all duration-300 group-hover:bg-brand/15 group-hover:shadow-glow-brand ${
            featured ? "h-16 w-16" : "h-12 w-12"
          }`}
        >
          <Icon
            className={`text-brand transition-transform duration-300 group-hover:scale-110 ${
              featured ? "h-8 w-8" : "h-6 w-6"
            }`}
            aria-hidden="true"
          />
        </div>

        <h3
          className={`font-display font-semibold text-ink ${
            featured ? "text-2xl" : "text-lg"
          }`}
        >
          {service.title}
        </h3>

        <p
          className={`mt-2 flex-1 leading-relaxed text-ink-soft ${
            featured ? "text-base" : "text-sm"
          }`}
        >
          {service.desc}
        </p>

        <ul className={`space-y-2.5 ${featured ? "mt-6" : "mt-5"}`}>
          {service.features.map((f) => (
            <li key={f} className="flex items-start gap-2.5 text-xs text-ink-soft">
              <span className="relative mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-brand transition-all duration-300" aria-hidden="true">
                <span className="absolute inset-0 rounded-full bg-brand/40 opacity-0 transition-opacity duration-300 group-hover:animate-pulse-soft group-hover:opacity-100" />
              </span>
              {f}
            </li>
          ))}
        </ul>

        {featured && (
          <a href="#contact" className="btn-accent mt-6 self-start text-sm">
            Get a quote
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
        )}
      </article>
    </div>
  );
}

export default function Services() {
  const [activeFilter, setActiveFilter] = useState<FilterId>("all");

  const filteredServices = activeFilter === "all"
    ? SERVICES
    : SERVICES.filter((s) =>
        SERVICE_CATEGORIES[s.id]?.includes(activeFilter)
      );

  const [featured, ...rest] = filteredServices;
  // When filtered to 1 result, treat it as featured but don't span 2 cols
  const isSingleResult = filteredServices.length === 1;

  const filterCount = (id: FilterId) =>
    id === "all"
      ? SERVICES.length
      : SERVICES.filter((s) => SERVICE_CATEGORIES[s.id]?.includes(id)).length;

  return (
    <section id="services" className="section bg-surface">
      <div className="container-x">
        <ScrollReveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow mb-4">What We Do</span>
          <h2 className="h-section">Complete Garage Door Systems</h2>
          <p className="mt-4 text-base text-ink-soft">
            From new installations to emergency repairs — we handle every aspect of your garage door. No subbies, no surprises, just qualified technicians who know the trade.
          </p>
        </ScrollReveal>

        {/* Filter tabs */}
        <ScrollReveal className="mt-10" delay={80}>
          <div className="flex flex-wrap justify-center gap-2" role="tablist" aria-label="Filter services by category">
            {FILTERS.map((filter) => {
              const isActive = activeFilter === filter.id;
              const count = filterCount(filter.id);
              return (
                <button
                  key={filter.id}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`group relative flex items-center gap-2 overflow-hidden rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "border-brand bg-brand text-white shadow-md"
                      : "border-border bg-surface-raised text-ink-soft hover:-translate-y-0.5 hover:border-brand/30 hover:text-brand hover:shadow-sm"
                  }`}
                >
                  <span aria-hidden="true">{filter.icon}</span>
                  {filter.label}
                  <span
                    className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold transition-colors duration-200 ${
                      isActive
                        ? "bg-white/20 text-white"
                        : "bg-surface-alt text-ink-light group-hover:bg-brand/10 group-hover:text-brand"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </ScrollReveal>

        {/* Before/After sliders — only show on "All" */}
        {activeFilter === "all" && (
          <div className="mt-12">
            <ScrollReveal className="mb-5 flex items-center justify-between" delay={60}>
              <p className="text-sm font-semibold text-ink-soft">
                Real results from our Melbourne customers
              </p>
              <span className="flex items-center gap-1.5 rounded-full bg-brand/8 px-3 py-1 text-xs font-bold text-brand">
                <span className="h-1.5 w-1.5 rounded-full bg-brand" />
                Drag to compare
              </span>
            </ScrollReveal>
            <div className="grid gap-5 md:grid-cols-3">
              {BEFORE_AFTER_PAIRS.map((pair, index) => (
                <ScrollReveal key={pair.caption} delay={index * 80}>
                  <div className="flex flex-col gap-2.5">
                    <BeforeAfterSlider
                      beforeSrc={pair.before}
                      afterSrc={pair.after}
                      beforeAlt={pair.beforeAlt}
                      afterAlt={pair.afterAlt}
                      beforeLabel={pair.beforeLabel}
                      afterLabel={pair.afterLabel}
                      className="h-64"
                    />
                    <p className="text-center text-xs font-semibold text-ink-light tracking-wide uppercase">
                      {pair.caption}
                    </p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        )}

        {/* Card grid */}
        <div
          key={activeFilter}
          className={`mt-14 grid gap-5 ${
            filteredServices.length === 1
              ? "md:grid-cols-1 max-w-lg mx-auto"
              : filteredServices.length === 2
              ? "md:grid-cols-2"
              : "md:grid-cols-3"
          }`}
          style={{ animation: "fadeInUp 0.25s ease both" }}
        >
          {filteredServices.length === 0 ? (
            <div className="col-span-3 py-16 text-center text-ink-soft">
              No services in this category.
            </div>
          ) : activeFilter === "all" ? (
            // Original asymmetric layout when showing all
            <>
              <div className="md:col-span-2">
                <TiltCard service={featured} featured />
              </div>
              <div>
                <TiltCard service={rest[0]} />
              </div>
              {rest.slice(1).map((service) => (
                <TiltCard key={service.id} service={service} />
              ))}
            </>
          ) : (
            // Even grid layout when filtered
            filteredServices.map((service, i) => (
              <TiltCard
                key={service.id}
                service={service}
                featured={isSingleResult || i === 0}
              />
            ))
          )}
        </div>

        {/* Filtered result hint */}
        {activeFilter !== "all" && filteredServices.length > 0 && (
          <p className="mt-6 text-center text-xs text-ink-light">
            Showing {filteredServices.length} of {SERVICES.length} services
            {" · "}
            <button
              onClick={() => setActiveFilter("all")}
              className="font-semibold text-brand hover:underline"
            >
              View all
            </button>
          </p>
        )}

        <ScrollReveal className="mt-14 text-center" delay={200}>
          <a href="#contact" className="btn-primary inline-flex items-center gap-2">
            Get a Free Quote
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true" />
          </a>
        </ScrollReveal>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
