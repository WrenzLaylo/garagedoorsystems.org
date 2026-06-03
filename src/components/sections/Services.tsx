import { SERVICES } from "../../constants";
import ScrollReveal from "../ui/ScrollReveal";
import {
  PackagePlus,
  Wrench,
  Zap,
  RefreshCw,
  Key,
  AlertTriangle,
  ShieldCheck,
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

export default function Services() {
  return (
    <section id="services" className="section bg-surface">
      <div className="container-x">
        <ScrollReveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow mb-4">What We Do</span>
          <h2 className="h-section">Complete Garage Door Systems</h2>
          <p className="mt-4 text-base text-ink-soft">
            From new installations to emergency repairs — we handle every
            aspect of your garage door. No subbies, no surprises, just
            qualified technicians who know the trade.
          </p>
        </ScrollReveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, index) => {
            const Icon = ICON_MAP[service.icon] ?? Wrench;
            return (
              <ScrollReveal key={service.id} delay={index * 0.05}>
                <article className="group card-hover flex h-full flex-col rounded-2xl border border-border bg-surface p-7 transition-all duration-300 hover:-translate-y-1 hover:border-brand/20 hover:shadow-card-hover">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-brand/8">
                    <Icon
                      className="h-6 w-6 text-brand"
                      aria-hidden="true"
                    />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-ink">
                    {service.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">
                    {service.desc}
                  </p>
                  <ul className="mt-5 space-y-2">
                    {service.features.map((f) => (
                      <li
                        key={f}
                        className="flex items-start gap-2 text-xs text-ink-soft"
                      >
                        <span
                          className="mt-0.5 h-1 w-1 shrink-0 rounded-full bg-brand"
                          aria-hidden="true"
                        />
                        {f}
                      </li>
                    ))}
                  </ul>
                </article>
              </ScrollReveal>
            );
          })}
        </div>

        <ScrollReveal className="mt-12 text-center">
          <a href="#contact" className="btn-primary">
            Get a Free Quote
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </ScrollReveal>
      </div>
    </section>
  );
}

function ArrowRight({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}