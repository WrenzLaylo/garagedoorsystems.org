import { ArrowRight, ArrowUp, Mail, MapPin, Phone } from "lucide-react";
import { BUSINESS, CONTACT, NAV_LINKS, PARENT_BRAND } from "../../constants";

const SERVICES = [
  "New Door Supply & Install",
  "Garage Door Repairs",
  "Motors & Automation",
  "Springs, Cables & Tracks",
  "Remotes & Wall Controls",
  "Emergency Repairs",
  "Preventative Maintenance",
];

export default function Footer() {
  const year = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      className="relative overflow-hidden bg-surface-dark pt-16 pb-24 md:pb-12"
      style={{
        backgroundImage:
          "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)",
        backgroundSize: "24px 24px",
      }}
    >
      {/* Subtle top gradient glow */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand/30 to-transparent" />

      <div className="container-x relative">
        {/* ── Three-column grid ── */}
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr]">
          {/* ── Brand column ── */}
          <div>
            <div className="mb-6 flex flex-col">
              <span className="font-display text-lg font-bold text-ink-inverse">
                {BUSINESS.name}
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-widest text-brand-light">
                A Division of {BUSINESS.parenBrand}
              </span>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-ink-inverse/60">
              Full-service garage door specialists across Melbourne. Supply,
              installation, repairs, motors and automation — backed by{" "}
              <a
                href={BUSINESS.parentBrandUrl}
                className="font-medium text-brand-light transition-colors duration-300 hover:text-white hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {BUSINESS.parenBrand}
              </a>
              , in business since {BUSINESS.founded}.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-5 text-sm text-ink-inverse/50">
              <a
                href={CONTACT.phoneTel}
                className="group flex items-center gap-2 transition-colors duration-300 hover:text-brand-light"
                aria-label="Call us"
              >
                <Phone
                  className="h-4 w-4 text-brand-light transition-transform duration-300 group-hover:scale-110"
                  aria-hidden="true"
                />
                {CONTACT.phone}
              </a>
              <a
                href={`mailto:${CONTACT.email}`}
                className="group flex items-center gap-2 transition-colors duration-300 hover:text-brand-light"
                aria-label="Email us"
              >
                <Mail
                  className="h-4 w-4 text-brand-light transition-transform duration-300 group-hover:scale-110"
                  aria-hidden="true"
                />
                {CONTACT.email}
              </a>
            </div>
          </div>

          {/* ── Services column ── */}
          <div>
            <h3 className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-ink-inverse/40">
              Services
            </h3>
            <ul className="space-y-2.5">
              {SERVICES.map((s) => (
                <li key={s}>
                  <a
                    href="#services"
                    className="group flex items-center gap-0 text-sm text-ink-inverse/60 transition-all duration-300 hover:text-brand-light"
                  >
                    <ArrowRight className="mr-0 h-3 w-3 -translate-x-3 text-brand-light opacity-0 transition-all duration-300 group-hover:mr-1.5 group-hover:translate-x-0 group-hover:opacity-100" />
                    <span className="transition-transform duration-300 group-hover:translate-x-0">
                      {s}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Contact column ── */}
          <div>
            <h3 className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-ink-inverse/40">
              Contact
            </h3>
            <ul className="space-y-3.5 text-sm text-ink-inverse/60">
              <li className="flex items-start gap-2.5">
                <MapPin
                  className="mt-0.5 h-4 w-4 shrink-0 text-brand-light"
                  aria-hidden="true"
                />
                <span>{CONTACT.address}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone
                  className="mt-0.5 h-4 w-4 shrink-0 text-brand-light"
                  aria-hidden="true"
                />
                <div className="flex flex-col">
                  <a
                    href={CONTACT.phoneTel}
                    className="transition-colors duration-300 hover:text-brand-light"
                  >
                    {CONTACT.phone}
                  </a>
                  <span className="text-xs text-ink-inverse/30">
                    Mon–Fri 8am–5pm
                  </span>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone
                  className="mt-0.5 h-4 w-4 shrink-0 text-accent"
                  aria-hidden="true"
                />
                <div className="flex flex-col">
                  <a
                    href={CONTACT.emergencyTel}
                    className="font-medium text-accent-light transition-colors duration-300 hover:text-accent"
                  >
                    {CONTACT.emergencyPhone}
                  </a>
                  <span className="text-xs text-ink-inverse/30">
                    24/7 Emergency
                  </span>
                </div>
              </li>
            </ul>

            {/* Emergency call-out box */}
            <div className="mt-5 rounded-xl border border-accent/20 bg-accent/10 p-4 transition-colors duration-300 hover:border-accent/30">
              <p className="text-xs font-bold uppercase tracking-wider text-accent-light">
                Emergency?
              </p>
              <p className="mt-1 text-xs leading-relaxed text-ink-inverse/50">
                Door stuck, off track or unsafe? Call our 24/7 emergency line
                immediately.
              </p>
              <a
                href={CONTACT.emergencyTel}
                className="mt-2.5 inline-flex items-center gap-1.5 text-xs font-semibold text-accent-light transition-all duration-300 hover:text-accent hover:gap-2.5"
              >
                <Phone className="h-3 w-3" />
                Call {CONTACT.emergencyPhone}
                <ArrowRight className="h-3 w-3" />
              </a>
            </div>
          </div>
        </div>

        {/* ── Divider ── */}
        <div className="mt-12 h-px w-full bg-gradient-to-r from-transparent via-ink-inverse/10 to-transparent" />

        {/* ── Bottom bar ── */}
        <div className="mt-6 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <p className="text-xs text-ink-inverse/30">
            &copy; {year} {BUSINESS.parenBrand}. All rights reserved.
          </p>
          <nav
            className="flex flex-wrap gap-5"
            aria-label="Footer navigation"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-xs text-ink-inverse/30 transition-colors duration-300 hover:text-brand-light"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-6 flex flex-col gap-4 text-xs text-ink-inverse/25 md:flex-row md:items-center md:justify-between">
          <a
            href={BUSINESS.parentBrandUrl}
            className="group inline-flex w-fit items-center rounded-2xl border border-white/10 bg-white px-4 py-3 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-brand-light/40 hover:shadow-glow-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-light/50"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Powered by AGG Doors — open AGG Doors website"
          >
            <img
              src="/assets/powered-by-aggdoors.png"
              alt="Powered by AGG Doors"
              className="h-12 w-auto transition-transform duration-300 group-hover:scale-105"
              draggable={false}
            />
          </a>

          <p className="max-w-3xl leading-6">
            {PARENT_BRAND.legalName} &bull; ABN {PARENT_BRAND.abn} &bull; {PARENT_BRAND.address} &bull;{" "}
            <a
              href={PARENT_BRAND.shopUrl}
              className="transition-colors duration-300 hover:text-brand-light"
              target="_blank"
              rel="noopener noreferrer"
            >
              AGG Doors Shop
            </a>
          </p>
        </div>
      </div>

      {/* ── Back to top button ── */}
      <button
        onClick={scrollToTop}
        className="group absolute bottom-6 right-6 z-10 flex h-11 w-11 items-center justify-center rounded-xl border border-ink-inverse/10 bg-surface-dark-alt text-ink-inverse/40 shadow-inner-glow transition-all duration-300 hover:-translate-y-1 hover:border-brand/30 hover:text-brand-light hover:shadow-glow-brand md:bottom-8 md:right-8"
        aria-label="Back to top"
      >
        <ArrowUp className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
      </button>
    </footer>
  );
}