import { MapPin, Phone } from "lucide-react";
import { SERVICE_AREAS, CONTACT } from "../../constants";
import ScrollReveal from "../ui/ScrollReveal";

export default function ServiceAreas() {
  return (
    <section id="service-areas" className="section bg-surface">
      <div className="container-x">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          {/* ── Left column: text + area list ── */}
          <ScrollReveal direction="left">
            <span className="eyebrow mb-4">Coverage</span>
            <h2 className="h-section">We Cover All of Melbourne</h2>
            <p className="mt-4 text-base leading-relaxed text-ink-soft">
              From the CBD to the outer suburbs — we have technicians
              positioned across Melbourne so we can reach you fast, wherever
              you are.
            </p>

            {/* Area grid */}
            <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-2.5">
              {SERVICE_AREAS.map((area, i) => (
                <div
                  key={area}
                  className="group/pin flex cursor-default items-center gap-2.5 rounded-lg px-2 py-1.5 transition-all duration-300 ease-out hover:bg-brand/[0.04]"
                  style={{ transitionDelay: `${i * 30}ms` }}
                >
                  {/* Map pin with pulse ring on hover */}
                  <span className="relative flex shrink-0 items-center justify-center">
                    <MapPin
                      className="relative z-10 h-4 w-4 text-brand transition-transform duration-300 group-hover/pin:scale-110"
                      aria-hidden="true"
                    />
                    {/* Pulse ring */}
                    <span className="absolute inset-0 -m-1 rounded-full bg-brand/20 opacity-0 transition-all duration-500 ease-out group-hover/pin:animate-pulse-ring group-hover/pin:opacity-100" />
                    <span className="absolute inset-0 -m-0.5 rounded-full bg-brand/10 opacity-0 transition-all duration-700 ease-out group-hover/pin:scale-150 group-hover/pin:opacity-60" />
                  </span>

                  {/* Text with slide-right on hover */}
                  <span className="text-sm font-medium text-ink-soft transition-all duration-300 ease-out group-hover/pin:translate-x-1 group-hover/pin:text-brand">
                    {area}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA with animated underline */}
            <p className="mt-8 text-sm text-ink-soft">
              Not sure if we cover your area?{" "}
              <a
                href={CONTACT.phoneTel}
                className="nav-link relative inline-flex items-center gap-1.5 font-semibold text-brand"
              >
                <Phone className="h-3.5 w-3.5" aria-hidden="true" />
                Give us a call
              </a>{" "}
              — we'll let you know in seconds.
            </p>
          </ScrollReveal>

          {/* ── Right column: image card ── */}
          <ScrollReveal direction="right" delay={0.12}>
            <div className="group relative overflow-hidden rounded-2xl border border-border shadow-card transition-shadow duration-500 hover:shadow-card-hover">
              <img
                src="/assets/melbourne-technician-branded.webp"
                alt="AGG Doors technician repairing a garage door across Melbourne"
                className="h-[420px] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                loading="lazy"
                draggable={false}
              />

              {/* Default gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-ink/10 to-transparent transition-opacity duration-500 group-hover:opacity-0" />

              {/* Interactive hover overlay — warm gradient */}
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-brand/80 via-brand/70 to-accent/60 opacity-0 backdrop-blur-[2px] transition-all duration-500 ease-out group-hover:opacity-100">
                <div className="translate-y-4 transition-transform duration-500 ease-out group-hover:translate-y-0">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white/20 ring-2 ring-white/30 backdrop-blur-sm">
                    <MapPin className="h-7 w-7 text-white" aria-hidden="true" />
                  </div>
                  <p className="text-center font-display text-lg font-bold text-white">
                    Across All of Melbourne
                  </p>
                  <p className="mt-1 text-center text-sm font-medium text-white/80">
                    8 regions — fast response times
                  </p>
                </div>
              </div>

              {/* Bottom phone CTA */}
              <div className="absolute bottom-0 left-0 right-0 p-6 transition-transform duration-500 ease-out group-hover:translate-y-full">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand shadow-glow-brand transition-transform duration-300 group-hover:scale-110">
                    <Phone className="h-5 w-5 text-white" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="font-display text-sm font-semibold text-white">
                      Call the Melbourne Team
                    </p>
                    <a
                      href={CONTACT.phoneTel}
                      className="font-display text-lg font-bold text-white transition-colors duration-300 hover:text-accent"
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
