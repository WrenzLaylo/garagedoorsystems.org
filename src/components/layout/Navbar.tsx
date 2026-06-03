import { Menu, Phone, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { NAV_LINKS, BUSINESS, CONTACT } from "../../constants";

interface Props {
  onCall: () => void;
  onEmergencyCall: () => void;
}

export default function Navbar({ onCall }: Props) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
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
  }, [open]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-border bg-surface/95 shadow-sm backdrop-blur-sm"
          : "bg-transparent"
      }`}
    >
      <div className="container-x flex h-16 items-center justify-between">
        {/* Logo */}
        <a
          href="#top"
          className="flex items-center gap-3"
          aria-label="Garage Door Systems — back to top"
        >
          <div className="flex flex-col">
            <span className="font-display text-base font-bold leading-tight tracking-tight text-ink">
              Garage Door Systems
            </span>
            <span className="text-[10px] font-medium uppercase tracking-widest text-brand">
              by {BUSINESS.parenBrand}
            </span>
          </div>
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 md:flex" aria-label="Main navigation">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className="nav-link">
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden items-center gap-3 md:flex">
          <a
            href={CONTACT.phoneTel}
            onClick={onCall}
            className="btn-ghost flex items-center gap-2 text-sm"
            aria-label="Call us"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            {CONTACT.phone}
          </a>
          <a href="#contact" className="btn-primary text-sm" aria-label="Get a quote">
            Get a Quote
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          ref={triggerRef}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-ink transition-colors hover:bg-surface-alt md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div
          id="mobile-menu"
          ref={menuRef}
          className="border-t border-border bg-surface px-5 pb-6 pt-4 md:hidden"
        >
          <nav className="flex flex-col gap-1" aria-label="Mobile navigation">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-ink-soft transition-colors hover:bg-surface-alt hover:text-brand"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="mt-4 flex flex-col gap-2">
            <a
              href={CONTACT.phoneTel}
              onClick={() => {
                onCall();
                setOpen(false);
              }}
              className="btn-ghost w-full justify-center text-sm"
            >
              <Phone className="h-4 w-4" />
              {CONTACT.phone}
            </a>
            <a
              href="#contact"
              className="btn-primary w-full justify-center text-sm"
              onClick={() => setOpen(false)}
            >
              Get a Quote
            </a>
          </div>
        </div>
      )}
    </header>
  );
}