import { Mail, MapPin, Phone } from "lucide-react";
import { BUSINESS, CONTACT, NAV_LINKS } from "../../constants";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-surface-alt pb-24 pt-12 md:pb-12">
      <div className="container-x">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
          {/* Brand column */}
          <div>
            <div className="mb-5 flex flex-col">
              <span className="font-display text-base font-bold text-ink">
                {BUSINESS.name}
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-widest text-brand">
                A Division of {BUSINESS.parenBrand}
              </span>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-ink-soft">
              Full-service garage door specialists across Melbourne. Supply,
              installation, repairs, motors and automation — backed by{" "}
              <a
                href={BUSINESS.parentBrandUrl}
                className="font-medium text-brand hover:underline"
              >
                {BUSINESS.parenBrand}
              </a>
              , in business since {BUSINESS.founded}.
            </p>
            <div className="mt-5 flex items-center gap-4 text-sm text-ink-soft">
              <a
                href={CONTACT.phoneTel}
                className="flex items-center gap-1.5 hover:text-brand"
                aria-label="Call us"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                {CONTACT.phone}
              </a>
              <a
                href={`mailto:${CONTACT.email}`}
                className="flex items-center gap-1.5 hover:text-brand"
                aria-label="Email us"
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
                {CONTACT.email}
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-ink-light">
              Services
            </h3>
            <ul className="space-y-2.5">
              {SERVICES.map((s) => (
                <li key={s.id}>
                  <a
                    href="#services"
                    className="text-sm text-ink-soft transition-colors hover:text-brand"
                  >
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-ink-light">
              Contact
            </h3>
            <ul className="space-y-3 text-sm text-ink-soft">
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden="true" />
                <span>{CONTACT.address}</span>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden="true" />
                <div className="flex flex-col">
                  <span>{CONTACT.phone}</span>
                  <span className="text-xs text-ink-light">Mon–Fri 8am–5pm</span>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                <div className="flex flex-col">
                  <span className="font-medium text-accent">{CONTACT.emergencyPhone}</span>
                  <span className="text-xs text-ink-light">24/7 Emergency</span>
                </div>
              </li>
            </ul>

            <div className="mt-4 rounded-lg border border-accent/20 bg-accent/5 p-3">
              <p className="text-xs font-semibold text-accent">Emergency?</p>
              <p className="mt-0.5 text-xs text-ink-soft">
                Door stuck, off track or unsafe? Call our 24/7 emergency line.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-border pt-6 md:flex-row md:items-center">
          <p className="text-xs text-ink-light">
            &copy; {year} {BUSINESS.parenBrand}. All rights reserved.
          </p>
          <nav className="flex flex-wrap gap-4" aria-label="Footer navigation">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-xs text-ink-light transition-colors hover:text-brand"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-4 text-xs text-ink-light">
          <a href={BUSINESS.parentBrandUrl} className="hover:text-brand">
            {BUSINESS.parenBrand}
          </a>{" "}
          &bull; Melbourne, VIC &bull; ABN provided on request
        </div>
      </div>
    </footer>
  );
}

const SERVICES = [
  "New Door Supply & Install",
  "Garage Door Repairs",
  "Motors & Automation",
  "Springs, Cables & Tracks",
  "Remotes & Wall Controls",
  "Emergency Repairs",
  "Preventative Maintenance",
];