import { SERVICES } from "../../constants";
import ScrollReveal from "../ui/ScrollReveal";
import { useTilt } from "../../hooks/useTilt";
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

const SERVICE_PHOTOS = [
  {
    src: "/assets/hero-technician-branded.webp",
    alt: "AGG Doors technician repairing a garage door motor",
    label: "Motor repairs",
  },
  {
    src: "/assets/melbourne-technician-branded.webp",
    alt: "AGG Doors technician repairing a roller garage door",
    label: "Roller door servicing",
  },
  {
    src: "/assets/technician-door-service-branded.webp",
    alt: "AGG Doors technician servicing a commercial roller door",
    label: "Door installs and maintenance",
  },
];

/* ─── Tilt-enabled card wrapper ────────────────────────────────────── */
function TiltCard({
  service,
}: {
  service: (typeof SERVICES)[number];
}) {
  const { ref, onMouseMove, onMouseLeave, onMouseEnter } = useTilt({
    maxTilt: 6,
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
      <article className="group flex h-full flex-col rounded-2xl border border-border bg-surface p-7 transition-all duration-300 hover:-translate-y-1 hover:border-brand/20 hover:shadow-card-glow">
        {/* Icon */}
        <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-brand/8 transition-all duration-300 group-hover:bg-brand/15 group-hover:shadow-glow-brand">
          <Icon
            className="h-6 w-6 text-brand transition-transform duration-300 group-hover:scale-110"
            aria-hidden="true"
          />
        </div>

        {/* Title */}
        <h3 className="font-display text-lg font-semibold text-ink">
          {service.title}
        </h3>

        {/* Description */}
        <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">
          {service.desc}
        </p>

        {/* Feature bullets */}
        <ul className="mt-5 space-y-2.5">
          {service.features.map((f) => (
            <li
              key={f}
              className="flex items-start gap-2.5 text-xs text-ink-soft"
            >
              <span
                className="relative mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-brand transition-all duration-300"
                aria-hidden="true"
              >
                {/* Pulse ring on card hover */}
                <span className="absolute inset-0 rounded-full bg-brand/40 opacity-0 transition-opacity duration-300 group-hover:animate-pulse-soft group-hover:opacity-100" />
              </span>
              {f}
            </li>
          ))}
        </ul>
      </article>
    </div>
  );
}

/* ─── Services section ─────────────────────────────────────────────── */
export default function Services() {
  return (
    <section id="services" className="section bg-surface">
      <div className="container-x">
        {/* Header */}
        <ScrollReveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow mb-4">What We Do</span>
          <h2 className="h-section">Complete Garage Door Systems</h2>
          <p className="mt-4 text-base text-ink-soft">
            From new installations to emergency repairs — we handle every
            aspect of your garage door. No subbies, no surprises, just
            qualified technicians who know the trade.
          </p>
        </ScrollReveal>

        {/* Branded technician photo strip */}
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {SERVICE_PHOTOS.map((photo, index) => (
            <ScrollReveal key={photo.src} delay={index * 0.08}>
              <figure className="group relative overflow-hidden rounded-2xl border border-border bg-ink shadow-card transition-all duration-500 hover:-translate-y-1 hover:shadow-card-hover">
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="h-64 w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                  decoding="async"
                  draggable={false}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/10 to-transparent" />
                <figcaption className="absolute bottom-0 left-0 right-0 p-5">
                  <span className="inline-flex rounded-full bg-white/15 px-3 py-1 text-xs font-bold uppercase tracking-widest text-white backdrop-blur-sm">
                    {photo.label}
                  </span>
                </figcaption>
              </figure>
            </ScrollReveal>
          ))}
        </div>

        {/* Cards grid */}
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, index) => (
            <ScrollReveal key={service.id} delay={index * 0.07}>
              <TiltCard service={service} />
            </ScrollReveal>
          ))}
        </div>

        {/* CTA */}
        <ScrollReveal className="mt-14 text-center" delay={200}>
          <a
            href="#contact"
            className="btn-primary inline-flex items-center gap-2"
          >
            Get a Free Quote
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true" />
          </a>
        </ScrollReveal>
      </div>
    </section>
  );
}