import { Star } from "lucide-react";
import { PARENT_BRAND, TESTIMONIALS } from "../../constants";
import ScrollReveal from "../ui/ScrollReveal";

export default function Testimonials() {
  return (
    <section id="reviews" className="section bg-surface-alt">
      <div className="container-x">
        {/* ── Header ── */}
        <ScrollReveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow mb-4">Reviews</span>
          <h2 className="h-section">What Our Customers Say</h2>
          <p className="mt-4 text-base leading-relaxed text-ink-soft">
            AGG Doors has hundreds of customer reviews across Google and
            word-of-mouth. We link directly to the source so you can verify the
            latest feedback before booking.
          </p>

          {/* Google Reviews link with external icon */}
          <a
            href={PARENT_BRAND.reviewsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group/link mt-5 inline-flex items-center gap-2 rounded-full bg-brand/[0.06] px-5 py-2 text-sm font-semibold text-brand transition-all duration-300 hover:bg-brand/[0.12] hover:shadow-sm"
          >
            View Google Reviews
            <svg
              className="h-4 w-4 transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7 17L17 7M17 7H7M17 7v10"
              />
            </svg>
          </a>
        </ScrollReveal>

        {/* ── Cards grid ── */}
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t, index) => (
            <ScrollReveal key={t.name} delay={index * 0.08}>
              <article className="group/card card relative flex h-full flex-col overflow-hidden transition-all duration-500 ease-out hover:-translate-y-1.5 hover:shadow-card-hover">
                {/* Decorative quote mark — scales on hover */}
                <svg
                  className="pointer-events-none absolute -right-2 -top-2 h-20 w-20 text-brand/[0.06] transition-all duration-500 ease-out group-hover/card:scale-125 group-hover/card:text-brand/[0.12]"
                  viewBox="0 0 100 100"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M20 65c0-16 10-31 28-40l5 8C40 40 36 50 36 56h12v24H20V65zm40 0c0-16 10-31 28-40l5 8C80 40 76 50 76 56h12v24H60V65z" />
                </svg>

                {/* Star rating with stagger animation */}
                <div
                  className="flex items-center gap-0.5"
                  aria-label={`${t.rating} out of 5 stars`}
                >
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 transition-all duration-500 ease-out ${
                        i < t.rating
                          ? "fill-accent text-accent"
                          : "text-border"
                      }`}
                      style={{
                        transitionDelay: `${i * 80 + 200}ms`,
                        animationDelay: `${i * 80 + 200}ms`,
                      }}
                      aria-hidden="true"
                    />
                  ))}
                </div>

                {/* Service type badge with subtle pulse */}
                {t.serviceType && (
                  <span className="mt-3 inline-flex w-fit items-center gap-1.5 rounded-full bg-brand/[0.07] px-3 py-1 text-xs font-semibold tracking-wide text-brand transition-colors duration-300 group-hover/card:bg-brand/[0.12]">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="absolute inline-flex h-full w-full animate-pulse-soft rounded-full bg-brand/60" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand" />
                    </span>
                    {t.serviceType}
                  </span>
                )}

                {/* Quote text */}
                <blockquote className="relative z-10 mt-4 flex-1 text-sm leading-relaxed text-ink-soft">
                  &ldquo;{t.text}&rdquo;
                </blockquote>

                {/* Footer with clean separator */}
                <footer className="relative mt-6 pt-4">
                  {/* Gradient separator line */}
                  <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-bold text-ink transition-colors duration-300 group-hover/card:text-brand">
                        {t.name}
                      </p>
                      <p className="mt-0.5 text-xs text-ink-soft">
                        {t.suburb}
                      </p>
                    </div>
                    <time className="rounded-md bg-surface-alt px-2.5 py-1 text-xs font-medium text-ink-light transition-colors duration-300 group-hover/card:bg-brand/[0.06] group-hover/card:text-brand/80">
                      {t.date}
                    </time>
                  </div>
                </footer>
              </article>
            </ScrollReveal>
          ))}
        </div>

        {/* ── Bottom CTA ── */}
        <ScrollReveal className="mt-12 text-center" delay={0.2}>
          <p className="text-sm text-ink-soft">
            Real reviews from real customers.{" "}
            <a
              href={PARENT_BRAND.reviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="nav-link font-semibold text-brand"
            >
              Read all reviews on Google &rarr;
            </a>
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}