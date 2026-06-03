import { Menu, Phone, X } from "lucide-react";
import { useState, useEffect, useRef, useCallback } from "react";
import { NAV_LINKS, BUSINESS, CONTACT } from "../../constants";

interface Props {
  onCall: () => void;
  onEmergencyCall: () => void;
}

export default function Navbar({ onCall }: Props) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const closeMenu = useCallback(() => {
    setOpen(false);
    triggerRef.current?.focus();
  }, []);

  /* ── Keyboard handling & focus trap ── */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeMenu();
      }
      if (e.key === "Tab" && open && menuRef.current) {
        const focusable = Array.from(
          menuRef.current.querySelectorAll<HTMLElement>(
            'a, button, [tabindex]:not([tabindex="-1"])'
          )
        );
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    if (open) {
      document.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, closeMenu]);

  /* ── Scroll tracking: scrolled state + progress bar ── */
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 16);

      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? window.scrollY / docHeight : 0;
      setScrollProgress(Math.min(progress, 1));
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* ── Scroll progress bar ── */}
      <div
        className="scroll-progress"
        style={{ transform: `scaleX(${scrollProgress})`, width: "100%" }}
        role="progressbar"
        aria-valuenow={Math.round(scrollProgress * 100)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Page scroll progress"
      />

      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-smooth-out ${
          scrolled
            ? "glass border-b border-white/10 shadow-glass"
            : "bg-transparent"
        }`}
      >
        <div className="container-x flex h-16 items-center justify-between md:h-[4.5rem]">
          {/* ── Logo ── */}
          <a
            href="#top"
            className="group flex items-center gap-3 transition-transform duration-300 ease-spring hover:scale-105"
            aria-label="Garage Door Systems — back to top"
          >
            <img
              src="/assets/garage-door-systems-logo.png"
              alt="Garage Door Systems — powered by AGG Doors"
              className="h-11 w-auto transition-transform duration-300 group-hover:scale-[1.02] md:h-12"
              draggable={false}
            />
          </a>

          {/* ── Desktop nav ── */}
          <nav
            className="hidden items-center gap-7 lg:flex"
            aria-label="Main navigation"
          >
            {NAV_LINKS.map((link) => (
              <a key={link.href} href={link.href} className="nav-link">
                {link.label}
              </a>
            ))}
          </nav>

          {/* ── Desktop CTA ── */}
          <div className="hidden items-center gap-3 lg:flex">
            <a
              href={CONTACT.phoneTel}
              onClick={onCall}
              className="btn-ghost flex items-center gap-2 text-sm"
              aria-label="Call us"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              {CONTACT.phone}
            </a>
            <a
              href="#contact"
              className="btn-primary group relative text-sm"
              aria-label="Get a quote"
            >
              {/* Idle pulse ring */}
              <span className="absolute inset-0 rounded-xl border-2 border-brand/40 animate-pulse-ring pointer-events-none" />
              Get a Quote
            </a>
          </div>

          {/* ── Mobile hamburger ── */}
          <button
            ref={triggerRef}
            className="relative flex h-10 w-10 items-center justify-center rounded-xl text-ink transition-all duration-300 hover:bg-surface-alt hover:text-brand focus-visible:ring-2 focus-visible:ring-brand lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            <span
              className={`absolute transition-all duration-300 ease-spring ${
                open ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"
              }`}
            >
              <Menu className="h-5 w-5" />
            </span>
            <span
              className={`absolute transition-all duration-300 ease-spring ${
                open ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0"
              }`}
            >
              <X className="h-5 w-5" />
            </span>
          </button>
        </div>
      </header>

      {/* ── Mobile backdrop ── */}
      <div
        className={`fixed inset-0 z-40 bg-ink/50 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={closeMenu}
        aria-hidden="true"
      />

      {/* ── Mobile slide-in drawer ── */}
      <div
        id="mobile-menu"
        ref={menuRef}
        className={`fixed right-0 top-0 z-40 flex h-full w-[85%] max-w-sm flex-col bg-surface shadow-2xl transition-transform duration-500 ease-smooth-out lg:hidden ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
      >
        {/* Drawer header */}
        <div className="flex h-16 items-center justify-between border-b border-border px-5">
          <div className="flex flex-col">
            <span className="font-display text-sm font-bold text-ink">
              Garage Door Systems
            </span>
            <span className="text-[9px] font-medium uppercase tracking-widest text-brand">
              by {BUSINESS.parenBrand}
            </span>
          </div>
          <button
            className="flex h-9 w-9 items-center justify-center rounded-lg text-ink-soft transition-colors duration-200 hover:bg-surface-alt hover:text-ink"
            onClick={closeMenu}
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Drawer nav links */}
        <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-4 pt-4" aria-label="Mobile navigation">
          {NAV_LINKS.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              className="group flex items-center gap-3 rounded-xl px-4 py-3 text-base font-medium text-ink-soft transition-all duration-300 hover:bg-brand/5 hover:text-brand"
              onClick={closeMenu}
              style={{
                transitionDelay: open ? `${80 + i * 50}ms` : "0ms",
                opacity: open ? 1 : 0,
                transform: open ? "translateX(0)" : "translateX(24px)",
              }}
            >
              <span className="h-1 w-1 rounded-full bg-brand/40 transition-all duration-300 group-hover:w-2 group-hover:bg-brand" />
              {link.label}
            </a>
          ))}
        </nav>

        {/* Drawer CTAs */}
        <div
          className="border-t border-border p-4"
          style={{
            transitionDelay: open ? "400ms" : "0ms",
            opacity: open ? 1 : 0,
            transform: open ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 0.4s ease, transform 0.4s ease",
          }}
        >
          <div className="flex flex-col gap-2.5">
            <a
              href={CONTACT.phoneTel}
              onClick={() => {
                onCall();
                closeMenu();
              }}
              className="btn-ghost w-full justify-center text-sm"
            >
              <Phone className="h-4 w-4" />
              {CONTACT.phone}
            </a>
            <a
              href="#contact"
              className="btn-primary w-full justify-center text-sm"
              onClick={closeMenu}
            >
              Get a Quote
            </a>
          </div>
        </div>
      </div>
    </>
  );
}