import ScrollReveal from "../ui/ScrollReveal";

// Brand data — name, tagline, and a subtle accent colour for hover state
const BRANDS = [
  {
    name: "B&D",
    full: "B&D Doors",
    category: "Doors & Openers",
    accent: "#1B4D8F",
  },
  {
    name: "Dominator",
    full: "Dominator",
    category: "Garage Door Openers",
    accent: "#C0392B",
  },
  {
    name: "Merlin",
    full: "Merlin",
    category: "Smart Openers",
    accent: "#2980B9",
  },
  {
    name: "Gliderol",
    full: "Gliderol",
    category: "Roller Doors",
    accent: "#27AE60",
  },
  {
    name: "Centurion",
    full: "Centurion",
    category: "Gate & Door Systems",
    accent: "#8E44AD",
  },
  {
    name: "ATA",
    full: "ATA",
    category: "Access & Automation",
    accent: "#E8622A",
  },
];

function BrandBadge({ brand }: { brand: typeof BRANDS[number] }) {
  return (
    <div
      className="group relative flex flex-col items-center justify-center gap-2 rounded-2xl border border-border bg-surface-raised px-5 py-5 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover cursor-default"
      style={{ "--brand-accent": brand.accent } as React.CSSProperties}
    >
      {/* Top accent line — appears on hover */}
      <div
        className="absolute inset-x-4 top-0 h-[2px] rounded-b-full opacity-0 transition-all duration-300 group-hover:opacity-100"
        style={{ background: brand.accent }}
        aria-hidden="true"
      />

      {/* Wordmark */}
      <span
        className="font-display text-xl font-black tracking-tight text-ink transition-colors duration-200 group-hover:text-[--brand-accent]"
        aria-label={brand.full}
      >
        {brand.name}
      </span>

      {/* Category label */}
      <span className="text-center text-[10px] font-semibold uppercase tracking-[0.15em] text-ink-light transition-colors duration-200 group-hover:text-[--brand-accent]/70">
        {brand.category}
      </span>

      {/* Tick badge */}
      <div
        className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full border-2 border-surface-raised opacity-0 transition-all duration-300 group-hover:opacity-100"
        style={{ background: brand.accent }}
        aria-hidden="true"
      >
        <svg className="h-2.5 w-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>
    </div>
  );
}

export default function TrustBadges() {
  return (
    <section className="relative border-b border-border bg-surface py-10 md:py-12">
      {/* Subtle background texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle at 15% 50%, rgba(27,77,143,0.04) 0%, transparent 55%), radial-gradient(circle at 85% 50%, rgba(232,98,42,0.03) 0%, transparent 55%)",
        }}
        aria-hidden="true"
      />

      <div className="container-x relative">
        <ScrollReveal className="mb-7 flex flex-col items-center gap-2 text-center sm:flex-row sm:justify-between sm:text-left">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-ink-light">
              Authorised to service & repair
            </p>
            <p className="mt-1 text-sm text-ink-soft">
              We work on all major garage door brands — whatever you have, we know it.
            </p>
          </div>
          <span className="shrink-0 rounded-full border border-brand/20 bg-brand/[0.06] px-4 py-1.5 text-xs font-bold text-brand">
            All brands welcome
          </span>
        </ScrollReveal>

        <div className="grid grid-cols-3 gap-3 sm:grid-cols-6 md:gap-4">
          {BRANDS.map((brand, index) => (
            <ScrollReveal key={brand.name} delay={index * 50}>
              <BrandBadge brand={brand} />
            </ScrollReveal>
          ))}
        </div>

        {/* Fine print */}
        <ScrollReveal delay={200}>
          <p className="mt-5 text-center text-[11px] text-ink-light">
            Not seeing your brand?{" "}
            <a href="#contact" className="font-semibold text-brand hover:underline">
              Get in touch
            </a>{" "}
            — we service virtually all residential and commercial garage door systems.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
