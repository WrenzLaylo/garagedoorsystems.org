import { Star } from "lucide-react";
import { useRef, useState, useCallback, useEffect } from "react";
import { PARENT_BRAND, TESTIMONIALS } from "../../constants";
import ScrollReveal from "../ui/ScrollReveal";

const CARDS = [...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS];
const SPEED = 0.6; // px per frame

export default function Testimonials() {
  const trackRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<number>(0);
  const posRef = useRef(0);
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragStartPos = useRef(0);
  const [grabbing, setGrabbing] = useState(false);

  // Auto-scroll loop
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const CARD_W = 336;
    const totalWidth = CARD_W * TESTIMONIALS.length;

    const tick = () => {
      if (!isDragging.current) {
        posRef.current += SPEED;
        if (posRef.current >= totalWidth) {
          posRef.current -= totalWidth;
        }
        el.scrollLeft = posRef.current;
      }
      animRef.current = requestAnimationFrame(tick);
    };

    animRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    const el = trackRef.current;
    if (!el) return;
    isDragging.current = true;
    dragStartX.current = e.pageX;
    dragStartPos.current = posRef.current;
    setGrabbing(true);
    e.preventDefault();
  }, []);

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging.current || !trackRef.current) return;
    const dx = e.pageX - dragStartX.current;
    const CARD_W = 336;
    const totalWidth = CARD_W * TESTIMONIALS.length;
    let next = dragStartPos.current - dx;
    // wrap
    next = ((next % totalWidth) + totalWidth) % totalWidth;
    posRef.current = next;
    trackRef.current.scrollLeft = next;
  }, []);

  const onMouseUp = useCallback(() => {
    isDragging.current = false;
    setGrabbing(false);
  }, []);

  // Touch support
  const touchStartX = useRef(0);
  const touchStartPos = useRef(0);
  const onTouchStart = useCallback((e: React.TouchEvent) => {
    isDragging.current = true;
    touchStartX.current = e.touches[0].pageX;
    touchStartPos.current = posRef.current;
  }, []);
  const onTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging.current || !trackRef.current) return;
    const dx = e.touches[0].pageX - touchStartX.current;
    const CARD_W = 336;
    const totalWidth = CARD_W * TESTIMONIALS.length;
    let next = touchStartPos.current - dx;
    next = ((next % totalWidth) + totalWidth) % totalWidth;
    posRef.current = next;
    trackRef.current.scrollLeft = next;
  }, []);
  const onTouchEnd = useCallback(() => {
    isDragging.current = false;
  }, []);

  return (
    <section id="reviews" className="section bg-surface-alt overflow-hidden">
      <div className="container-x">
        <ScrollReveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow mb-4">Reviews</span>
          <h2 className="h-section">What Our Customers Say</h2>
          <p className="mt-4 text-base leading-relaxed text-ink-soft">
            AGG Doors has hundreds of customer reviews across Google and word-of-mouth. We link directly to the source so you can verify the latest feedback before booking.
          </p>
          <a
            href={PARENT_BRAND.reviewsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group/link mt-5 inline-flex items-center gap-2 rounded-full bg-brand/[0.06] px-5 py-2 text-sm font-semibold text-brand transition-all duration-300 hover:bg-brand/[0.12] hover:shadow-sm"
          >
            View Google Reviews
            <svg className="h-4 w-4 transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
          </a>
        </ScrollReveal>
      </div>

      <div className="relative mt-14">
        {/* Edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-surface-alt to-transparent" aria-hidden="true" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-surface-alt to-transparent" aria-hidden="true" />

        {/* Track */}
        <div
          ref={trackRef}
          className="flex gap-5 overflow-x-hidden px-8 pb-4"
          style={{
            cursor: grabbing ? "grabbing" : "grab",
            userSelect: "none",
            WebkitOverflowScrolling: "touch",
          }}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          aria-label="Customer testimonials — drag to scroll"
          role="region"
        >
          {CARDS.map((t, index) => (
            <article
              key={`${t.name}-${index}`}
              className="group/card relative flex w-80 shrink-0 flex-col overflow-hidden rounded-2xl border border-border bg-surface-raised p-6 shadow-card transition-shadow duration-300 hover:shadow-card-hover"
              draggable={false}
            >
              <svg className="pointer-events-none absolute -right-2 -top-2 h-16 w-16 text-brand/[0.06] transition-all duration-500 group-hover/card:scale-125 group-hover/card:text-brand/[0.12]" viewBox="0 0 100 100" fill="currentColor" aria-hidden="true">
                <path d="M20 65c0-16 10-31 28-40l5 8C40 40 36 50 36 56h12v24H20V65zm40 0c0-16 10-31 28-40l5 8C80 40 76 50 76 56h12v24H60V65z" />
              </svg>

              <div className="flex items-center gap-0.5" aria-label={`${t.rating} out of 5 stars`}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`h-4 w-4 ${i < t.rating ? "fill-accent text-accent" : "text-border"}`} aria-hidden="true" />
                ))}
              </div>

              {t.serviceType && (
                <span className="mt-3 inline-flex w-fit items-center gap-1.5 rounded-full bg-brand/[0.07] px-3 py-1 text-xs font-semibold tracking-wide text-brand">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-pulse-soft rounded-full bg-brand/60" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand" />
                  </span>
                  {t.serviceType}
                </span>
              )}

              <blockquote className="relative z-10 mt-4 flex-1 text-sm leading-relaxed text-ink-soft">
                &ldquo;{t.text}&rdquo;
              </blockquote>

              <footer className="relative mt-5 pt-4">
                <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-ink transition-colors duration-300 group-hover/card:text-brand">{t.name}</p>
                    <p className="mt-0.5 text-xs text-ink-soft">{t.suburb}</p>
                  </div>
                  <time className="rounded-md bg-surface-alt px-2.5 py-1 text-xs font-medium text-ink-light">{t.date}</time>
                </div>
              </footer>
            </article>
          ))}
        </div>
      </div>

      <div className="container-x mt-10 text-center">
        <ScrollReveal delay={200}>
          <p className="text-sm text-ink-soft">
            Real reviews from real customers.{" "}
            <a href={PARENT_BRAND.reviewsUrl} target="_blank" rel="noopener noreferrer" className="nav-link font-semibold text-brand">
              Read all reviews on Google &rarr;
            </a>
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
