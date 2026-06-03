import { useState, useMemo, useRef } from "react";
import { ChevronDown, Search, X } from "lucide-react";
import { FAQS, CONTACT } from "../../constants";
import ScrollReveal from "../ui/ScrollReveal";

// Category tags — each FAQ mapped by index to one tag
const FAQ_TAGS = [
  "Install",
  "Brands",
  "Pricing",
  "Emergency",
  "Automate",
  "Warranty",
] as const;

type FaqTag = typeof FAQ_TAGS[number];

// Tag colour accents
const TAG_COLORS: Record<FaqTag, { bg: string; text: string; activeBg: string; activeText: string; border: string }> = {
  "Install":   { bg: "bg-blue-50",   text: "text-blue-700",   activeBg: "bg-blue-600",   activeText: "text-white", border: "border-blue-200"   },
  "Brands":    { bg: "bg-purple-50", text: "text-purple-700", activeBg: "bg-purple-600", activeText: "text-white", border: "border-purple-200" },
  "Pricing":   { bg: "bg-green-50",  text: "text-green-700",  activeBg: "bg-green-600",  activeText: "text-white", border: "border-green-200"  },
  "Emergency": { bg: "bg-red-50",    text: "text-red-700",    activeBg: "bg-red-500",    activeText: "text-white", border: "border-red-200"    },
  "Automate":  { bg: "bg-amber-50",  text: "text-amber-700",  activeBg: "bg-amber-500",  activeText: "text-white", border: "border-amber-200"  },
  "Warranty":  { bg: "bg-teal-50",   text: "text-teal-700",   activeBg: "bg-teal-600",   activeText: "text-white", border: "border-teal-200"   },
};

function highlight(text: string, query: string) {
  if (!query.trim()) return <>{text}</>;
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi");
  const parts = text.split(regex);
  return (
    <>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <mark key={i} className="rounded bg-brand/15 px-0.5 text-brand not-italic">
            {part}
          </mark>
        ) : (
          part
        )
      )}
    </>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState<FaqTag | null>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const faqsWithMeta = FAQS.map((faq, i) => ({
    ...faq,
    tag: FAQ_TAGS[i] as FaqTag,
    originalIndex: i,
  }));

  const filtered = useMemo(() => {
    return faqsWithMeta.filter((faq) => {
      const matchesTag = !activeTag || faq.tag === activeTag;
      const q = query.toLowerCase();
      const matchesSearch =
        !q ||
        faq.q.toLowerCase().includes(q) ||
        faq.a.toLowerCase().includes(q);
      return matchesTag && matchesSearch;
    });
  }, [query, activeTag]);

  const clearSearch = () => {
    setQuery("");
    searchRef.current?.focus();
  };

  const hasFilters = query.trim() || activeTag;

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

        {/* Search + tag filters */}
        <ScrollReveal className="mx-auto mt-10 max-w-2xl" delay={80}>
          {/* Search input */}
          <div className="relative">
            <Search
              className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-light"
              aria-hidden="true"
            />
            <input
              ref={searchRef}
              type="search"
              placeholder="Search questions…"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setOpenIndex(null);
              }}
              className="w-full rounded-xl border border-border bg-surface-raised py-3 pl-11 pr-10 text-sm text-ink placeholder:text-ink-light transition-all duration-200 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/15 hover:border-brand/30"
              aria-label="Search frequently asked questions"
            />
            {query && (
              <button
                onClick={clearSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-ink-light transition-colors hover:text-ink"
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Tag pills */}
          <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label="Filter by topic">
            {FAQ_TAGS.map((tag) => {
              const colors = TAG_COLORS[tag];
              const isActive = activeTag === tag;
              return (
                <button
                  key={tag}
                  onClick={() => {
                    setActiveTag(isActive ? null : tag);
                    setOpenIndex(null);
                  }}
                  className={`rounded-full border px-3 py-1 text-xs font-semibold transition-all duration-150 hover:-translate-y-0.5 ${
                    isActive
                      ? `${colors.activeBg} ${colors.activeText} border-transparent shadow-sm`
                      : `${colors.bg} ${colors.text} ${colors.border} hover:opacity-80`
                  }`}
                  aria-pressed={isActive}
                >
                  {tag}
                </button>
              );
            })}
            {hasFilters && (
              <button
                onClick={() => { setQuery(""); setActiveTag(null); setOpenIndex(0); }}
                className="rounded-full border border-dashed border-ink-light/40 px-3 py-1 text-xs font-medium text-ink-light transition-all hover:border-ink-soft hover:text-ink-soft"
              >
                Clear all ×
              </button>
            )}
          </div>
        </ScrollReveal>

        {/* Results */}
        <div className="mx-auto mt-8 max-w-2xl">
          {filtered.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border py-14 text-center">
              <p className="text-sm font-medium text-ink-soft">No questions match &ldquo;{query}&rdquo;</p>
              <button
                onClick={() => { setQuery(""); setActiveTag(null); }}
                className="mt-3 text-sm font-semibold text-brand hover:underline"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <>
              {filtered.map((faq, idx) => {
                const isOpen = openIndex === faq.originalIndex;
                const colors = TAG_COLORS[faq.tag];
                return (
                  <div
                    key={faq.originalIndex}
                    className={`group border-b border-border last:border-b-0 transition-colors duration-300 ${
                      isOpen ? "border-l-2 border-l-brand pl-4" : "border-l-2 border-l-transparent pl-4"
                    }`}
                    style={{ animation: `fadeIn 0.2s ease ${idx * 40}ms both` }}
                  >
                    <button
                      className="flex w-full items-center justify-between gap-4 py-5 text-left transition-colors duration-200 group-hover:text-brand"
                      onClick={() => setOpenIndex(isOpen ? null : faq.originalIndex)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-answer-${faq.originalIndex}`}
                      id={`faq-question-${faq.originalIndex}`}
                    >
                      <div className="flex min-w-0 flex-col gap-1.5">
                        {/* Tag badge */}
                        <span
                          className={`inline-flex w-fit rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${colors.bg} ${colors.text} ${colors.border}`}
                        >
                          {faq.tag}
                        </span>
                        <span
                          className={`font-display text-base font-semibold transition-colors duration-200 ${
                            isOpen ? "text-brand" : "text-ink"
                          } group-hover:text-brand`}
                        >
                          {highlight(faq.q, query)}
                        </span>
                      </div>
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
                      id={`faq-answer-${faq.originalIndex}`}
                      role="region"
                      aria-labelledby={`faq-question-${faq.originalIndex}`}
                      className={`accordion-content ${isOpen ? "open" : ""}`}
                    >
                      <div>
                        <div className="pb-5 text-sm leading-relaxed text-ink-soft">
                          {highlight(faq.a, query)}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Result count when filtering */}
              {hasFilters && (
                <p className="mt-4 text-center text-xs text-ink-light">
                  {filtered.length} of {FAQS.length} questions
                  {" · "}
                  <button
                    onClick={() => { setQuery(""); setActiveTag(null); setOpenIndex(0); }}
                    className="font-semibold text-brand hover:underline"
                  >
                    Show all
                  </button>
                </p>
              )}
            </>
          )}
        </div>

        <ScrollReveal className="mx-auto mt-12 max-w-xl">
          <div className="group relative overflow-hidden rounded-2xl border border-brand/10 bg-brand/5 p-8 text-center transition-all duration-300 hover:border-brand/25 hover:shadow-card-glow">
            <div
              className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              style={{
                background: "radial-gradient(circle at 50% 50%, rgba(27, 77, 143, 0.06), transparent 70%)",
              }}
              aria-hidden="true"
            />
            <div className="relative">
              <p className="font-display text-lg font-semibold text-ink">Still have questions?</p>
              <p className="mt-2 text-sm text-ink-soft">
                Our technicians are available Mon–Fri 8am–5pm and 24/7 for emergencies.
              </p>
              <div className="mt-5 flex flex-wrap justify-center gap-3">
                <a href={CONTACT.phoneTel} className="btn-ghost text-sm">{CONTACT.phone}</a>
                <a href="#contact" className="btn-primary text-sm">Get a Free Quote</a>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
