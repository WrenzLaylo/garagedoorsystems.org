import { Menu, Phone, X } from "lucide-react";
import { useState, useEffect, useRef, useCallback } from "react";
import { NAV_LINKS, BUSINESS, CONTACT } from "../../constants";

interface Props {
  onCall: () => void;
  onEmergencyCall: () => void;
}

export default function Navbar({ onCall }: Props) {
  const [open, setOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const closeMenu = useCallback(() => {
    setOpen(false);
    triggerRef.current?.focus();
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
      if (e.key === "Tab" && open && menuRef.current) {
        const focusable = Array.from(
          menuRef.current.querySelectorAll<HTMLElement>(
            'a, button, [tabindex]:not([tabindex="-1"])'
          )
        );
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey) {
          if (document.activeElement === first) { e.preventDefault(); last.focus(); }
        } else {
          if (document.activeElement === last) { e.preventDefault(); first.focus(); }
        }
      }
    };
    if (open) {
      document.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [open, closeMenu]);

  useEffect(() => {
    const onScroll = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? Math.min(window.scrollY / docHeight, 1) : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Scroll progress bar — orange */}
      <div
        className="scroll-progress"
        style={{ transform: `scaleX(${scrollProgress})`, width: "100%", background: "linear-gradient(90deg, #E8622A, #F08050)" }}
        role="progressbar"
        aria-valuenow={Math.round(scrollProgress * 100)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Page scroll progress"
      />

      {/* Dark glass navbar — always */}
      <header
        className="fixed inset-x-0 top-0 z-50 transition-all duration-500"
        style={{
          background: "rgba(15, 27, 45, 0.85)",
          backdropFilter: "blur(20px) saturate(180%)",
          WebkitBackdropFilter: "blur(20px) saturate(180%)",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <div className="container-x flex h-16 items-center justify-between md:h-[4.5rem]">
          {/* Logo */}
          <a
            href="#top"
            className="group flex items-center gap-3 transition-transform duration-300 ease-spring hover:scale-105"
            aria-label="Garage Door Systems — back to top"
          >
            <img
              src="/assets/garage-door-systems-logo.png"
              alt="Garage Door Systems — powered by AGG Doors"
              className="h-9 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.02] md:h-10"
              draggable={false}
              style={{ filter: "brightness(0) invert(1)" }}
            />
          </a>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-7 lg:flex" aria-label="Main navigation">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium transition-colors duration-300 hover:text-white relative group"
                style={{ color: "rgba(255,255,255,0.6)", paddingBottom: "2px" }}
              >
                {link.label}
                <span className="absolute left-0 bottom-0 h-[2px] w-0 rounded-full bg-accent transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden items-center gap-3 lg:flex">
            <a
              href={CONTACT.phoneTel}
              onClick={onCall}
              className="flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition-all duration-300"
              style={{ color: "rgba(255,255,255,0.7)", border: "1px solid rgba(255,255,255,0.15)" }}
              aria-label="Call us"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              {CONTACT.phone}
            </a>
            <a
              href="#contact"
              className="btn-accent relative text-sm"
              aria-label="Get a quote"
            >
              <span className="absolute inset-0 rounded-xl border-2 border-accent/40 animate-pulse-ring pointer-events-none" />
              Get a Quote
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            ref={triggerRef}
            className="relative flex h-10 w-10 items-center justify-center rounded-xl text-white transition-all duration-300 hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-brand lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            <span className={`absolute transition-all duration-300 ease-spring ${open ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"}`}>
              <Menu className="h-5 w-5" />
            </span>
            <span className={`absolute transition-all duration-300 ease-spring ${open ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0"}`}>
              <X className="h-5 w-5" />
            </span>
          </button>
        </div>
      </header>

      {/* Mobile backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-ink/60 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${open ? "opacity-100" : "pointer-events-none opacity-0"}`}
        onClick={closeMenu}
        aria-hidden="true"
      />

      {/* Mobile drawer — dark */}
      <div
        id="mobile-menu"
        ref={menuRef}
        className={`fixed right-0 top-0 z-40 flex h-full w-[85%] max-w-sm flex-col transition-transform duration-500 ease-smooth-out lg:hidden ${open ? "translate-x-0" : "translate-x-full"}`}
        style={{ background: "#0F1B2D", borderLeft: "1px solid rgba(255,255,255,0.08)" }}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
      >
        <div className="flex h-16 items-center justify-between px-5" style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
          <div className="flex flex-col">
            <span className="font-display text-sm font-bold text-white">Garage Door Systems</span>
            <span className="text-[9px] font-medium uppercase tracking-widest" style={{ color: "#E8622A" }}>by {BUSINESS.parenBrand}</span>
          </div>
          <button
            className="flex h-9 w-9 items-center justify-center rounded-lg transition-colors duration-200 hover:bg-white/10"
            style={{ color: "rgba(255,255,255,0.5)" }}
            onClick={closeMenu}
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-4 pt-4" aria-label="Mobile navigation">
          {NAV_LINKS.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              className="group flex items-center gap-3 rounded-xl px-4 py-3 text-base font-medium transition-all duration-300"
              style={{
                color: "rgba(255,255,255,0.65)",
                transitionDelay: open ? `${80 + i * 50}ms` : "0ms",
                opacity: open ? 1 : 0,
                transform: open ? "translateX(0)" : "translateX(24px)",
              }}
              onClick={closeMenu}
            >
              <span className="h-1 w-1 rounded-full bg-accent/60 transition-all duration-300 group-hover:w-2 group-hover:bg-accent" />
              {link.label}
            </a>
          ))}
        </nav>

        <div
          className="p-4"
          style={{
            borderTop: "1px solid rgba(255,255,255,0.08)",
            transitionDelay: open ? "400ms" : "0ms",
            opacity: open ? 1 : 0,
            transform: open ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 0.4s ease, transform 0.4s ease",
          }}
        >
          <div className="flex flex-col gap-2.5">
            <a
              href={CONTACT.phoneTel}
              onClick={() => { onCall(); closeMenu(); }}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-300"
              style={{ color: "rgba(255,255,255,0.7)", border: "1px solid rgba(255,255,255,0.15)" }}
            >
              <Phone className="h-4 w-4" />
              {CONTACT.phone}
            </a>
            <a href="#contact" className="btn-accent w-full justify-center text-sm" onClick={closeMenu}>
              Get a Quote
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
