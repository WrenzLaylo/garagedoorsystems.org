import {
  ArrowRight,
  CheckCircle2,
  Clock,
  Phone,
  ShieldCheck,
  Star,
} from "lucide-react";
import { BUSINESS } from "../../constants";
import { CONTACT } from "../../constants";

interface Props {
  onCall: () => void;
  onEmergencyCall: () => void;
}

export default function Hero({ onCall, onEmergencyCall }: Props) {
  return (
    <section
      id="top"
      className="relative min-h-screen overflow-hidden bg-surface pt-16"
    >
      {/* Background pattern */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, #E5E7EB 1px, transparent 0)",
          backgroundSize: "28px 28px",
          opacity: 0.5,
        }}
        aria-hidden="true"
      />
      {/* Blue accent gradient top-right */}
      <div
        className="absolute -right-32 -top-32 h-96 w-96 rounded-full opacity-10 blur-3xl"
        style={{ background: "#1D4ED8" }}
        aria-hidden="true"
      />
      {/* Orange accent bottom-left */}
      <div
        className="absolute -bottom-16 -left-16 h-72 w-72 rounded-full opacity-10 blur-3xl"
        style={{ background: "#E8622A" }}
        aria-hidden="true"
      />

      <div className="container-x grid min-h-[calc(100vh-4rem)] items-center gap-12 py-16 md:grid-cols-2 md:py-24">
        {/* Left: text */}
        <div className="max-w-2xl">
          <div className="mb-4 flex items-center gap-2 rounded-full border border-border bg-surface-alt px-3 py-1.5 text-xs font-medium text-ink-soft">
            <span
              className="h-1.5 w-1.5 rounded-full bg-brand"
              aria-hidden="true"
            />
            {BUSINESS.parenBrand} — In Business Since {BUSINESS.founded}
          </div>

          <h1 className="font-display text-4xl font-bold leading-tight tracking-tight text-ink sm:text-5xl lg:text-[3.25rem]">
            Every Garage Door.
            <br />
            <span className="text-brand">One Trusted Partner.</span>
          </h1>

          <p className="mt-5 text-base leading-relaxed text-ink-soft sm:text-lg">
            Supply, installation, repairs, motors, automation and emergency
            response across Melbourne. When you need your door working — we
            make it happen.
          </p>

          {/* Trust badges */}
          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {[
              { icon: CheckCircle2, text: "Upfront quote before any work" },
              { icon: Clock, text: "Same-day service available" },
              { icon: Star, text: "600+ 5-star Google reviews" },
              { icon: ShieldCheck, text: "Workmanship guarantee on all jobs" },
            ].map(({ icon: Icon, text }) => (
              <div
                key={text}
                className="flex items-center gap-2.5 text-sm text-ink-soft"
              >
                <Icon
                  className="h-4 w-4 shrink-0 text-brand"
                  aria-hidden="true"
                />
                {text}
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#contact"
              className="btn-accent px-7 py-3.5 text-sm"
              onClick={() => onCall()}
            >
              Book a Repair
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <a
              href={CONTACT.phoneTel}
              onClick={() => onCall()}
              className="btn-ghost px-7 py-3.5 text-sm"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              {CONTACT.phone}
            </a>
          </div>
        </div>

        {/* Right: image / visual card */}
        <div className="relative hidden md:block">
          <div className="overflow-hidden rounded-3xl border border-border bg-surface shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80"
              alt="Garage door installed by AGG Doors technician"
              className="h-96 w-full object-cover"
              loading="eager"
            />
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-display text-sm font-semibold text-ink">
                    AGG Doors Technician
                  </p>
                  <p className="mt-0.5 text-xs text-ink-soft">
                    Melbourne — on site
                  </p>
                </div>
                <div className="flex items-center gap-1 rounded-full bg-brand/10 px-3 py-1.5">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-brand" />
                  <span className="text-xs font-medium text-brand">
                    Available Now
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Floating emergency card */}
          <div className="absolute -bottom-6 -left-6 z-10 rounded-2xl border border-accent/20 bg-surface p-4 shadow-xl">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10">
                <Phone className="h-5 w-5 text-accent" aria-hidden="true" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-accent">
                  24 / 7 Emergency
                </p>
                <a
                  href={CONTACT.emergencyTel}
                  onClick={() => onEmergencyCall()}
                  className="mt-0.5 block font-display text-lg font-bold text-ink hover:text-accent transition-colors"
                >
                  {CONTACT.emergencyPhone}
                </a>
                <p className="mt-1 text-xs text-ink-soft">
                  Stuck, off track or unsafe?
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div className="border-t border-border bg-surface-alt">
        <div className="container-x">
          <div className="grid grid-cols-2 divide-x divide-border border-x border-border md:grid-cols-4">
            {[
              { value: "25+", label: "Years in Business" },
              { value: "600+", label: "5-Star Reviews" },
              { value: "24/7", label: "Emergency Support" },
              { value: "100%", label: "Safety Certified" },
            ].map(({ value, label }) => (
              <div key={label} className="px-6 py-5 text-center">
                <p className="font-display text-2xl font-bold text-brand">
                  {value}
                </p>
                <p className="mt-1 text-xs text-ink-soft">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}