import { STEPS } from "../../constants";
import ScrollReveal from "../ui/ScrollReveal";
import { Phone, FileText, Wrench, ThumbsUp } from "lucide-react";

const STEP_ICONS = [Phone, FileText, Wrench, ThumbsUp];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="section bg-surface-alt">
      <div className="container-x">
        <ScrollReveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow mb-4">How It Works</span>
          <h2 className="h-section">Simple, Clear, Done.</h2>
          <p className="mt-4 text-base text-ink-soft">
            We keep it straightforward. You'll always know what's happening
            and what it costs — before we touch a single bolt.
          </p>
        </ScrollReveal>

        {/* Timeline */}
        <div className="relative mt-16">
          {/* Dashed connecting line (desktop) */}
          <div
            className="absolute left-0 right-0 top-[3rem] hidden h-0 md:block"
            aria-hidden="true"
          >
            <div
              className="absolute inset-x-[12.5%] top-0"
              style={{
                borderTop: "2px dashed rgba(27,77,143,0.25)",
                height: 0,
              }}
            />
          </div>

          <div className="grid gap-8 md:grid-cols-4 md:gap-6">
            {STEPS.map((step, index) => {
              const Icon = STEP_ICONS[index];
              return (
                <ScrollReveal key={step.num} delay={index * 100}>
                  <article className="group flex flex-col items-center text-center">
                    {/* Numbered circle */}
                    <div className="relative z-10 mb-7">
                      {/* Outer pulse ring */}
                      <div
                        className="absolute inset-0 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                        style={{
                          background: "rgba(27,77,143,0.12)",
                          transform: "scale(1.35)",
                          borderRadius: "9999px",
                        }}
                        aria-hidden="true"
                      />
                      {/* Ring */}
                      <div
                        className="absolute inset-0 rounded-full transition-all duration-500 group-hover:scale-110"
                        style={{
                          border: "2px solid rgba(27,77,143,0.3)",
                          transform: "scale(1.18)",
                          borderRadius: "9999px",
                        }}
                        aria-hidden="true"
                      />
                      {/* Main circle */}
                      <div
                        className="relative flex h-[3.5rem] w-[3.5rem] items-center justify-center rounded-full transition-all duration-400 group-hover:shadow-glow-brand group-hover:scale-105"
                        style={{
                          background: "linear-gradient(135deg, #1B4D8F 0%, #2563EB 100%)",
                        }}
                      >
                        <Icon className="h-5 w-5 text-white" aria-hidden="true" />
                      </div>
                      {/* Step number badge */}
                      <div
                        className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold text-white"
                        style={{ background: "#E8622A" }}
                        aria-hidden="true"
                      >
                        {index + 1}
                      </div>
                    </div>

                    {/* Card */}
                    <div className="w-full rounded-2xl border border-border bg-surface p-6 shadow-card transition-all duration-300 group-hover:-translate-y-1.5 group-hover:border-brand/20 group-hover:shadow-card-hover">
                      <h3 className="font-display text-base font-semibold text-ink">
                        {step.title}
                      </h3>
                      <p className="mt-2.5 text-sm leading-relaxed text-ink-soft">
                        {step.desc}
                      </p>
                    </div>
                  </article>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
