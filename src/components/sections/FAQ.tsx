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
            <a href={CONTACT.phoneTel} className="font-medium text-brand hover:underline">
              Call us directly
            </a>
            .
          </p>
        </ScrollReveal>

        <div className="mx-auto mt-12 max-w-2xl">
          {FAQS.map((faq, index) => (
            <ScrollReveal key={index} delay={index * 0.04}>
              <div className="border-b border-border last:border-b-0">
                <button
                  className="flex w-full items-center justify-between gap-4 py-5 text-left"
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  aria-expanded={openIndex === index}
                >
                  <span className="font-display text-base font-semibold text-ink">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-brand transition-transform duration-200 ${openIndex === index ? "rotate-180" : ""}`}
                    aria-hidden="true"
                  />
                </button>
                {openIndex === index && (
                  <div className="pb-5 text-sm leading-relaxed text-ink-soft">
                    {faq.a}
                  </div>
                )}
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal className="mx-auto mt-10 max-w-xl rounded-2xl border border-brand/10 bg-brand/5 p-6 text-center">
          <p className="font-display text-base font-semibold text-ink">
            Still have questions?
          </p>
          <p className="mt-2 text-sm text-ink-soft">
            Our technicians are available Mon–Fri 8am–5pm and 24/7 for
            emergencies.
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-3">
            <a href={CONTACT.phoneTel} className="btn-ghost text-sm">
              {CONTACT.phone}
            </a>
            <a href="#contact" className="btn-primary text-sm">
              Get a Free Quote
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}