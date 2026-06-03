import { Star } from "lucide-react";
import { TESTIMONIALS } from "../../constants";
import ScrollReveal from "../ui/ScrollReveal";

export default function Testimonials() {
  return (
    <section id="reviews" className="section bg-surface-alt">
      <div className="container-x">
        <ScrollReveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow mb-4">Reviews</span>
          <h2 className="h-section">What Our Customers Say</h2>
          <p className="mt-4 text-base text-ink-soft">
            600+ 5-star reviews across Google and word-of-mouth. We link
            directly to our Google profile so you can verify the latest
            feedback before booking.
          </p>
          <a
            href="https://www.google.com/maps/place/AGG+Doors"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-brand hover:underline"
          >
            View Google Reviews
            <span aria-hidden="true">&#8599;</span>
          </a>
        </ScrollReveal>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {TESTIMONIALS.map((t, index) => (
            <ScrollReveal key={t.name} delay={index * 0.06}>
              <article className="card flex h-full flex-col">
                {/* Stars */}
                <div className="flex items-center gap-0.5" aria-label={`${t.rating} out of 5 stars`}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < t.rating ? "fill-accent text-accent" : "text-border"}`}
                      aria-hidden="true"
                    />
                  ))}
                </div>

                {t.serviceType && (
                  <span className="mt-3 inline-block w-fit rounded-full bg-brand/8 px-2.5 py-0.5 text-xs font-medium text-brand">
                    {t.serviceType}
                  </span>
                )}

                <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-ink-soft">
                  &ldquo;{t.text}&rdquo;
                </blockquote>

                <footer className="mt-5 flex items-center justify-between border-t border-border pt-4">
                  <div>
                    <p className="text-sm font-semibold text-ink">{t.name}</p>
                    <p className="text-xs text-ink-soft">{t.suburb}</p>
                  </div>
                  <time className="text-xs text-ink-light">{t.date}</time>
                </footer>
              </article>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal className="mt-10 text-center">
          <p className="text-sm text-ink-soft">
            Real reviews from real customers.{" "}
            <a
              href="https://www.google.com/maps/place/AGG+Doors"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-brand hover:underline"
            >
              Read all reviews on Google &rarr;
            </a>
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}