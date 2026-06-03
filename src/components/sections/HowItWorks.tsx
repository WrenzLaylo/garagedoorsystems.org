import { useState } from "react";
import { STEPS, CONTACT } from "../../constants";
import ScrollReveal from "../ui/ScrollReveal";
import { Phone, FileText, Wrench, ThumbsUp, ChevronRight, ChevronLeft, ArrowRight } from "lucide-react";

const STEP_ICONS = [Phone, FileText, Wrench, ThumbsUp];

const STEP_DETAILS: { bullets: string[]; cta?: { label: string; href: string } }[] = [
  {
    bullets: [
      "Call us any time — business hours or 24/7 emergency line",
      "Or use the contact form below with photos of the issue",
      "We'll confirm availability and give an honest time estimate",
    ],
    cta: { label: "Call now", href: CONTACT.phoneTel },
  },
  {
    bullets: [
      "A qualified technician inspects door, motor, springs and tracks",
      "You receive a clear, itemised quote before any work begins",
      "No hidden call-out fees — price is locked before we start",
    ],
    cta: { label: "Get a free quote", href: "#contact" },
  },
  {
    bullets: [
      "We carry common parts on the van — most repairs done same visit",
      "All work is done to Australian safety standards",
      "We test operation fully and clean up before leaving",
    ],
  },
  {
    bullets: [
      "You receive a full service report for your records",
      "Workmanship warranty on all repairs and installations",
      "Call us any time if something isn't right — we stand behind our work",
    ],
  },
];

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  const goTo = (index: number | null) => setActiveStep(index);
  const prev = () => setActiveStep((s) => (s !== null && s > 0 ? s - 1 : s));
  const next = () =>
    setActiveStep((s) => (s !== null && s < STEPS.length - 1 ? s + 1 : s));

  return (
    <section id="how-it-works" className="section bg-surface-alt">
      <div className="container-x">
        <ScrollReveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow mb-4">How It Works</span>
          <h2 className="h-section">Simple, Clear, Done.</h2>
          <p className="mt-4 text-base text-ink-soft">
            We keep it straightforward. You'll always know what's happening and
            what it costs — before we touch a single bolt.{" "}
            <span className="text-brand font-medium">Click any step to learn more.</span>
          </p>
        </ScrollReveal>

        {/* Timeline */}
        <div className="relative mt-16">
          {/* Base dashed line (desktop) */}
          <div
            className="absolute left-0 right-0 top-[3rem] hidden h-0 md:block"
            aria-hidden="true"
          >
            <div
              className="absolute inset-x-[12.5%] top-0"
              style={{ borderTop: "2px dashed rgba(27,77,143,0.18)", height: 0 }}
            />
            {/* Filled progress line */}
            <div
              className="absolute top-0 h-0 transition-all duration-500 ease-out"
              style={{
                left: "12.5%",
                borderTop: "2px solid #1B4D8F",
                width:
                  activeStep === null
                    ? "0%"
                    : `${(activeStep / (STEPS.length - 1)) * 75}%`,
              }}
            />
          </div>

          <div className="grid gap-8 md:grid-cols-4 md:gap-6">
            {STEPS.map((step, index) => {
              const Icon = STEP_ICONS[index];
              const isActive = activeStep === index;
              const isCompleted = activeStep !== null && index < activeStep;
              const detail = STEP_DETAILS[index];

              return (
                <div
                  key={step.num}
                  style={{ animation: `fadeInUp 0.3s ease ${index * 80}ms both` }}
                >
                  <article
                    className="group flex flex-col items-center text-center cursor-pointer"
                    onClick={() => goTo(isActive ? null : index)}
                    aria-expanded={isActive}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) =>
                      e.key === "Enter" && goTo(isActive ? null : index)
                    }
                  >
                    {/* Icon circle */}
                    <div className="relative z-10 mb-7">
                      <div
                        className={`absolute inset-0 rounded-full transition-all duration-500 ${isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}
                        style={{
                          background: "rgba(27,77,143,0.12)",
                          transform: "scale(1.35)",
                        }}
                        aria-hidden="true"
                      />
                      <div
                        className="absolute inset-0 rounded-full transition-all duration-500"
                        style={{
                          border: `2px solid ${isCompleted ? "#1B4D8F" : "rgba(27,77,143,0.3)"}`,
                          transform: "scale(1.18)",
                        }}
                        aria-hidden="true"
                      />
                      <div
                        className={`relative flex h-[3.5rem] w-[3.5rem] items-center justify-center rounded-full transition-all duration-300 ${isActive ? "scale-110 shadow-glow-brand" : "group-hover:scale-105"}`}
                        style={{
                          background: isActive
                            ? "linear-gradient(135deg, #E8622A 0%, #F08050 100%)"
                            : "linear-gradient(135deg, #1B4D8F 0%, #2563EB 100%)",
                        }}
                      >
                        {isCompleted ? (
                          <svg
                            className="h-5 w-5 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2.5}
                            aria-hidden="true"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        ) : (
                          <Icon className="h-5 w-5 text-white" aria-hidden="true" />
                        )}
                      </div>
                      {/* Step number badge */}
                      <div
                        className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold text-white transition-colors duration-300"
                        style={{
                          background: isActive ? "#E8622A" : "#E8622A",
                        }}
                        aria-hidden="true"
                      >
                        {index + 1}
                      </div>
                    </div>

                    {/* Card */}
                    <div
                      className={`w-full rounded-2xl border bg-surface shadow-card transition-all duration-300 ${
                        isActive
                          ? "border-accent/30 shadow-card-hover -translate-y-1.5"
                          : isCompleted
                          ? "border-brand/20"
                          : "border-border group-hover:-translate-y-1 group-hover:border-brand/20 group-hover:shadow-card-hover"
                      }`}
                    >
                      {/* Card header — always visible */}
                      <div className="flex items-center justify-between p-6 pb-4">
                        <h3
                          className={`font-display text-base font-semibold transition-colors duration-200 ${
                            isActive
                              ? "text-accent"
                              : isCompleted
                              ? "text-brand"
                              : "text-ink"
                          }`}
                        >
                          {step.title}
                        </h3>
                        <span
                          className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
                            isActive
                              ? "bg-accent/10 text-accent"
                              : "bg-surface-alt text-ink-light group-hover:bg-brand/10 group-hover:text-brand"
                          }`}
                          style={{
                            transform: isActive ? "rotate(90deg)" : "rotate(0deg)",
                          }}
                        >
                          <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
                        </span>
                      </div>

                      <p
                        className={`px-6 text-sm leading-relaxed text-ink-soft transition-all duration-200 ${isActive ? "pb-0" : "pb-6"}`}
                      >
                        {step.desc}
                      </p>

                      {/* Expanded detail */}
                      <div
                        className={`overflow-hidden transition-all duration-300 ease-in-out ${
                          isActive ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
                        }`}
                      >
                        <div className="mx-5 mt-4 border-t border-border/60" />
                        <div className="px-6 py-4">
                          <ul className="space-y-2.5 text-left">
                            {detail.bullets.map((bullet, bi) => (
                              <li
                                key={bi}
                                className="flex items-start gap-2.5 text-xs text-ink-soft"
                              >
                                <span
                                  className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                                  aria-hidden="true"
                                />
                                {bullet}
                              </li>
                            ))}
                          </ul>
                          {detail.cta && (
                            <a
                              href={detail.cta.href}
                              onClick={(e) => e.stopPropagation()}
                              className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-accent/10 px-3 py-2 text-xs font-semibold text-accent transition-all duration-200 hover:bg-accent/20"
                            >
                              {detail.cta.label}
                              <ArrowRight className="h-3 w-3" aria-hidden="true" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </article>
                </div>
              );
            })}
          </div>

          {/* Stepper nav — prev / next / dots */}
          {activeStep !== null && (
            <div
              className="mt-8 flex items-center justify-center gap-3"
              style={{ animation: "fadeInUp 0.2s ease both" }}
            >
              <button
                onClick={prev}
                disabled={activeStep === 0}
                className="flex items-center gap-1.5 rounded-xl border border-border bg-surface px-4 py-2 text-sm font-medium text-ink-soft transition-all duration-150 hover:border-brand/30 hover:text-brand disabled:cursor-not-allowed disabled:opacity-30"
              >
                <ChevronLeft className="h-4 w-4" /> Previous
              </button>

              {/* Dot indicators */}
              <div className="flex gap-1.5">
                {STEPS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i)}
                    aria-label={`Step ${i + 1}`}
                    className={`rounded-full transition-all duration-300 ${
                      i === activeStep
                        ? "w-5 h-2 bg-accent"
                        : i < activeStep
                        ? "w-2 h-2 bg-brand"
                        : "w-2 h-2 bg-border"
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={
                  activeStep === STEPS.length - 1 ? () => goTo(null) : next
                }
                className="flex items-center gap-1.5 rounded-xl border border-border bg-surface px-4 py-2 text-sm font-medium text-ink-soft transition-all duration-150 hover:border-brand/30 hover:text-brand"
              >
                {activeStep === STEPS.length - 1 ? (
                  <>
                    Done{" "}
                    <svg
                      className="h-4 w-4 text-brand"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </>
                ) : (
                  <>
                    Next <ChevronRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </div>
          )}
        </div>
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
