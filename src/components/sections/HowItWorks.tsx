import { STEPS } from "../../constants";
import ScrollReveal from "../ui/ScrollReveal";
import { ArrowRight } from "lucide-react";

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="section bg-surface-alt">
      <div className="container-x">
        {/* Header */}
        <ScrollReveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow mb-4">How It Works</span>
          <h2 className="h-section">Simple, Clear, Done.</h2>
          <p className="mt-4 text-base text-ink-soft">
            We keep it straightforward. You'll always know what's happening
            and what it costs — before we touch a single bolt.
          </p>
        </ScrollReveal>

        {/* Timeline + Cards */}
        <div className="relative mt-14">
          {/* ── Connecting line (desktop only) ─────────────────────────── */}
          <div
            className="absolute left-0 right-0 top-[5.5rem] hidden h-0.5 md:block"
            aria-hidden="true"
          >
            <div className="mx-auto h-full w-[calc(100%-6rem)] bg-gradient-to-r from-brand via-brand/60 to-accent opacity-30" />
          </div>

          <div className="grid gap-8 md:grid-cols-4 md:gap-0">
            {STEPS.map((step, index) => (
              <div key={step.num} className="relative flex items-stretch">
                {/* Step card */}
                <ScrollReveal
                  delay={index * 0.1}
                  className="w-full"
                >
                  <article className="group relative z-10 flex h-full flex-col rounded-2xl border border-border bg-surface p-7 shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:border-brand/20 hover:shadow-card-hover md:mx-3">
                    {/* Timeline dot (desktop) */}
                    <div
                      className="absolute -top-3 left-1/2 z-20 hidden -translate-x-1/2 md:block"
                      aria-hidden="true"
                    >
                      <span className="relative flex h-3 w-3 items-center justify-center">
                        <span className="absolute inline-flex h-full w-full rounded-full bg-brand opacity-30 group-hover:animate-pulse-ring" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-brand transition-transform duration-300 group-hover:scale-125" />
                      </span>
                    </div>

                    {/* Step number */}
                    <span
                      className="font-display text-5xl font-bold leading-none text-border transition-colors duration-500 group-hover:text-brand"
                      aria-hidden="true"
                    >
                      {step.num}
                    </span>

                    {/* Title */}
                    <h3 className="mt-5 font-display text-lg font-semibold text-ink">
                      {step.title}
                    </h3>

                    {/* Description */}
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">
                      {step.desc}
                    </p>
                  </article>
                </ScrollReveal>

                {/* Arrow connector between cards (desktop, not after last) */}
                {index < STEPS.length - 1 && (
                  <div
                    className="absolute -right-1 top-[5rem] z-30 hidden md:flex items-center justify-center"
                    aria-hidden="true"
                  >
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-surface border border-border shadow-sm">
                      <ArrowRight className="h-3.5 w-3.5 text-brand" />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}