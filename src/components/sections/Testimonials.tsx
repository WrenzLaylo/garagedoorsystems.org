import { Star } from "lucide-react";
import { useRef, useState, useCallback, useEffect, useMemo } from "react";
import { PARENT_BRAND, TESTIMONIALS } from "../../constants";
import ScrollReveal from "../ui/ScrollReveal";

const CARD_W = 336 + 20; // card width + gap
const SPEED = 0.6;
// Minimum cards needed before infinite scroll makes sense
const MIN_FOR_SCROLL = 4;

// Collect unique service types for filter pills
const SERVICE_TYPES = Array.from(
  new Set(TESTIMONIALS.map((t) => t.serviceType).filter(Boolean))
) as string[];

function TestimonialCard({ t, index }: { t: typeof TESTIMONIALS[number]; index: number }) {
  return (
    <article
      key={`${t.name}-${index}`}
      className="group/card relative flex w-80 shrink-0 flex-col overflow-hidden rounded-2xl border border-border bg-surface-raised p-6 shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1"
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
  );
}

export default function Testimonials() {
  const trackRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<number>(0);
  const posRef = useRef(0);
  const isDragging = useRef(false);
  const isHovered = useRef(false);
  const dragStartX = useRef(0);
  const dragStartPos = useRef(0);
  const [grabbing, setGrabbing] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [activeDot, setActiveDot] = useState(0);

  // Filtered testimonials
  const filtered = useMemo(
    () =>
      activeFilter
        ? TESTIMONIALS.filter((t) => t.serviceType === activeFilter)
        : TESTIMONIALS,
    [activeFilter]
  );

  const useScrollMode = filtered.length >= MIN_FOR_SCROLL;

  // Triple the filtered set for seamless infinite scroll (only when enough cards)
  const CARDS = useMemo(
    () => useScrollMode ? [...filtered, ...filtered, ...filtered] : filtered,
    [filtered, useScrollMode]
  );

  // Reset scroll position when filter changes
  useEffect(() => {
    posRef.current = 0;
    if (trackRef.current) trackRef.current.scrollLeft = 0;
    setActiveDot(0);
  }, [activeFilter]);

  // Track which dot is active based on scroll position
  const updateActiveDot = useCallback(() => {
    const totalWidth = CARD_W * filtered.length;
    const pos = ((posRef.current % totalWidth) + totalWidth) % totalWidth;
    const dot = Math.round(pos / CARD_W) % filtered.length;
    setActiveDot(dot);
  }, [filtered.length]);

  // Auto-scroll loop — pauses on hover, disabled when not enough cards
  useEffect(() => {
    if (!useScrollMode) return;
    const el = trackRef.current;
    if (!el) return;

    const totalWidth = CARD_W * filtered.length;

    const tick = () => {
      if (!isDragging.current && !isHovered.current) {
        posRef.current += SPEED;
        if (posRef.current >= totalWidth) posRef.current -= totalWidth;
        el.scrollLeft = posRef.current;
        updateActiveDot();
      }
      animRef.current = requestAnimationFrame(tick);
    };

    animRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animRef.current);
  }, [filtered.length, updateActiveDot, useScrollMode]);

  // Jump to a specific dot/card
  const jumpToDot = useCallback(
    (index: number) => {
      const totalWidth = CARD_W * filtered.length;
      posRef.current = index * CARD_W + Math.floor(posRef.current / totalWidth) * totalWidth;
      if (trackRef.current) trackRef.current.scrollLeft = posRef.current;
      setActiveDot(index);
    },
    [filtered.length]
  );

  // Drag handlers
  const onMouseDown = useCallback((e: React.MouseEvent) => {
    if (!trackRef.current) return;
    isDragging.current = true;
    dragStartX.current = e.pageX;
    dragStartPos.current = posRef.current;
    setGrabbing(true);
    e.preventDefault();
  }, []);

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging.current || !trackRef.current) return;
    const dx = e.pageX - dragStartX.current;
    const totalWidth = CARD_W * filtered.length;
    let next = dragStartPos.current - dx;
    next = ((next % totalWidth) + totalWidth) % totalWidth;
    posRef.current = next;
    trackRef.current.scrollLeft = next;
    updateActiveDot();
  }, [filtered.length, updateActiveDot]);

  const onMouseUp = useCallback(() => {
    isDragging.current = false;
    setGrabbing(false);
  }, []);

  // Touch handlers
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
    const totalWidth = CARD_W * filtered.length;
    let next = touchStartPos.current - dx;
    next = ((next % totalWidth) + totalWidth) % totalWidth;
    posRef.current = next;
    trackRef.current.scrollLeft = next;
    updateActiveDot();
  }, [filtered.length, updateActiveDot]);
  const onTouchEnd = useCallback(() => { isDragging.current = false; }, []);

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

        {/* Service type filter pills */}
        <ScrollReveal className="mt-8 flex flex-wrap justify-center gap-2" delay={80}>
          <button
            onClick={() => setActiveFilter(null)}
            className={`rounded-full border px-4 py-1.5 text-xs font-semibold transition-all duration-150 hover:-translate-y-0.5 ${
              activeFilter === null
                ? "border-brand bg-brand text-white shadow-sm"
                : "border-border bg-surface-raised text-ink-soft hover:border-brand/30 hover:text-brand"
            }`}
            aria-pressed={activeFilter === null}
          >
            All reviews
            <span className={`ml-1.5 rounded-full px-1.5 py-0.5 text-[10px] font-bold ${activeFilter === null ? "bg-white/20 text-white" : "bg-surface-alt text-ink-light"}`}>
              {TESTIMONIALS.length}
            </span>
          </button>
          {SERVICE_TYPES.map((type) => {
            const isActive = activeFilter === type;
            const count = TESTIMONIALS.filter((t) => t.serviceType === type).length;
            return (
              <button
                key={type}
                onClick={() => setActiveFilter(isActive ? null : type)}
                className={`rounded-full border px-4 py-1.5 text-xs font-semibold transition-all duration-150 hover:-translate-y-0.5 ${
                  isActive
                    ? "border-accent bg-accent text-white shadow-sm"
                    : "border-border bg-surface-raised text-ink-soft hover:border-accent/30 hover:text-accent"
                }`}
                aria-pressed={isActive}
              >
                {type}
                <span className={`ml-1.5 rounded-full px-1.5 py-0.5 text-[10px] font-bold ${isActive ? "bg-white/20 text-white" : "bg-surface-alt text-ink-light"}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </ScrollReveal>
      </div>

      {/* Carousel OR centered static grid */}
      {useScrollMode ? (
        <div
          className="relative mt-10"
          onMouseEnter={() => { isHovered.current = true; }}
          onMouseLeave={() => { isHovered.current = false; onMouseUp(); }}
        >
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
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            aria-label="Customer testimonials — drag to scroll"
            role="region"
          >
            {CARDS.map((t, index) => (
              <TestimonialCard key={`${t.name}-${index}`} t={t} index={index} />
            ))}
          </div>

          {/* Dot navigation */}
          <div className="mt-6 flex justify-center gap-2" role="tablist" aria-label="Jump to review">
            {filtered.map((t, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={activeDot === i}
                aria-label={`Go to review by ${t.name}`}
                onClick={() => jumpToDot(i)}
                className="group relative flex items-center justify-center transition-all duration-200"
              >
                <span
                  className={`block rounded-full transition-all duration-300 ${
                    activeDot === i
                      ? "w-6 h-2 bg-brand"
                      : "w-2 h-2 bg-border group-hover:bg-brand/40"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
      ) : (
        /* Static centered grid for small filtered sets */
        <div className="container-x mt-10">
          <div className="flex flex-wrap justify-center gap-5 pb-4">
            {filtered.map((t, index) => (
              <TestimonialCard key={`${t.name}-${index}`} t={t} index={index} />
            ))}
          </div>
        </div>
      )}

      <div className="container-x mt-8 text-center">
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
