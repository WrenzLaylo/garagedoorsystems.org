import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { FAQS, CONTACT } from "../../constants";
import ScrollReveal from "../ui/ScrollReveal";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="section bg-surface">
      <div className="container-x">
        <ScrollReveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow mb-4">FAQ</span>
          <h2 className="h-section">Common Questions</h2>
          <p className="mt-4 text-base text-ink-soft">
            Everything you need to know before booking. Can&apos;t find your
            answer below?{" "}
            <a
              href={CONTACT.phoneTel}
              className="font-medium text-brand hover:underline"
            >
              Call us directly
            </a>
            .
          </p>
        </ScrollReveal>

        <div className="mx-auto mt-12 max-w-2xl">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <ScrollReveal key={index} delay={index * 0.04}>
                <div
                  className={`group border-b border-border last:border-b-0 transition-colors duration-300 ${
                    isOpen ? "border-l-2 border-l-brand pl-4" : "border-l-2 border-l-transparent pl-4"
                  }`}
                >
                  <button
                    className="flex w-full items-center justify-between gap-4 py-5 text-left transition-colors duration-200 group-hover:text-brand"
                    onClick={() =>
                      setOpenIndex(isOpen ? null : index)
                    }
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${index}`}
                    id={`faq-question-${index}`}
                  >
                    <span
                      className={`font-display text-base font-semibold transition-colors duration-200 ${
                        isOpen ? "text-brand" : "text-ink"
                      } group-hover:text-brand`}
                    >
                      {faq.q}
                    </span>
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-all duration-300 ${
                        isOpen
                          ? "bg-brand/10 text-brand rotate-180"
                          : "bg-surface-alt text-ink-light group-hover:bg-brand/10 group-hover:text-brand"
                      }`}
                    >
                      <ChevronDown className="h-4 w-4" aria-hidden="true" />
                    </span>
                  </button>
                  <div
                    id={`faq-answer-${index}`}
                    role="region"
                    aria-labelledby={`faq-question-${index}`}
                    className={`accordion-content ${isOpen ? "open" : ""}`}
                  >
                    <div>
                      <div className="pb-5 text-sm leading-relaxed text-ink-soft">
                        {faq.a}
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        <ScrollReveal className="mx-auto mt-12 max-w-xl">
          <div className="group relative overflow-hidden rounded-2xl border border-brand/10 bg-brand/5 p-8 text-center transition-all duration-300 hover:border-brand/25 hover:shadow-card-glow">
            {/* Glow effect on hover */}
            <div
              className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              style={{
                background:
                  "radial-gradient(circle at 50% 50%, rgba(27, 77, 143, 0.06), transparent 70%)",
              }}
              aria-hidden="true"
            />
            <div className="relative">
              <p className="font-display text-lg font-semibold text-ink">
                Still have questions?
              </p>
              <p className="mt-2 text-sm text-ink-soft">
                Our technicians are available Mon–Fri 8am–5pm and 24/7 for
                emergencies.
              </p>
              <div className="mt-5 flex flex-wrap justify-center gap-3">
                <a href={CONTACT.phoneTel} className="btn-ghost text-sm">
                  {CONTACT.phone}
                </a>
                <a href="#contact" className="btn-primary text-sm">
                  Get a Free Quote
                </a>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}