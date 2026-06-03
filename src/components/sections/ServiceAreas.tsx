import { MapPin, Phone } from "lucide-react";
import { SERVICE_AREAS, CONTACT } from "../../constants";
import ScrollReveal from "../ui/ScrollReveal";

export default function ServiceAreas() {
  return (
    <section id="service-areas" className="section bg-surface">
      <div className="container-x">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          <ScrollReveal>
            <span className="eyebrow mb-4">Coverage</span>
            <h2 className="h-section">We Cover All of Melbourne</h2>
            <p className="mt-4 text-base text-ink-soft">
              From the CBD to the outer suburbs — we have technicians
              positioned across Melbourne so we can reach you fast, wherever
              you are.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-2">
              {SERVICE_AREAS.map((area) => (
                <div
                  key={area}
                  className="flex items-center gap-2 text-sm text-ink-soft"
                >
                  <MapPin
                    className="h-3.5 w-3.5 shrink-0 text-brand"
                    aria-hidden="true"
                  />
                  {area}
                </div>
              ))}
            </div>
            <p className="mt-6 text-sm text-ink-soft">
              Not sure if we cover your area?{" "}
              <a
                href={CONTACT.phoneTel}
                className="font-medium text-brand hover:underline"
              >
                Give us a call
              </a>{" "}
              — we'll let you know in seconds.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="relative overflow-hidden rounded-2xl border border-border shadow-card">
              <img
                src="https://images.unsplash.com/photo-1577495508048-b635879837f1?w=700&q=80"
                alt="Melbourne metropolitan area service coverage"
                className="h-80 w-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand">
                    <Phone className="h-5 w-5 text-white" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="font-display text-sm font-semibold text-white">
                      Call the Melbourne Team
                    </p>
                    <a
                      href={CONTACT.phoneTel}
                      className="font-display text-lg font-bold text-white hover:text-brand-light transition-colors"
                    >
                      {CONTACT.phone}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

