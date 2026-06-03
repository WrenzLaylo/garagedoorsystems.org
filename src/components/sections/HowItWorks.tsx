import { STEPS } from "../../constants";
import ScrollReveal from "../ui/ScrollReveal";

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="section bg-surface-alt"
    >
      <div className="container-x">
        <ScrollReveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow mb-4">How It Works</span>
          <h2 className="h-section">Simple, Clear, Done.</h2>
          <p className="mt-4 text-base text-ink-soft">
            We keep it straightforward. You'll always know what's happening
            and what it costs — before we touch a single bolt.
          </p>
        </ScrollReveal>

        <div className="mt-14 grid gap-6 md:grid-cols-4">
          {STEPS.map((step, index) => (
            <ScrollReveal key={step.num} delay={index * 0.06}>
              <article className="group relative flex h-full flex-col rounded-2xl border border-border bg-surface p-7 shadow-card">
                {/* Step number */}
                <span
                  className="font-display text-5xl font-bold text-border transition-colors duration-300 group-hover:text-brand/20"
                  aria-hidden="true"
                >
                  {step.num}
                </span>
                <h3 className="mt-6 font-display text-lg font-semibold text-ink">
                  {step.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">
                  {step.desc}
                </p>
                {/* Connector line — hide on last and mobile */}
                {index < STEPS.length - 1 && (
                  <div
                    className="absolute -right-3 top-1/2 hidden h-px w-6 bg-border md:block"
                    aria-hidden="true"
                  />
                )}
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}