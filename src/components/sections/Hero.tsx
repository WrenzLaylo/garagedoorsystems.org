import {
  ArrowRight,
  CheckCircle2,
  Clock,
  MapPin,
  Phone,
  ShieldCheck,
  Star,
  Wrench,
  Zap,
} from "lucide-react";
import { BUSINESS, CONTACT } from "../../constants";

interface Props {
  onCall: () => void;
  onEmergencyCall: () => void;
}

const servicePills = [
  "New doors",
  "Motors",
  "Repairs",
  "Springs",
  "Remotes",
  "Emergency",
];

const trustItems = [
  { icon: Clock, text: "Same-day repair windows" },
  { icon: Star, text: "600+ 5-star Google reviews" },
  { icon: ShieldCheck, text: "Licensed, insured technicians" },
];

export default function Hero({ onCall, onEmergencyCall }: Props) {
  return (
    <section id="top" className="relative overflow-hidden bg-[#f6f8fb] pt-16">
      <div
        className="absolute inset-0 opacity-70"
        style={{
          backgroundImage:
            "linear-gradient(#dbe3ef 1px, transparent 1px), linear-gradient(90deg, #dbe3ef 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          maskImage:
            "linear-gradient(to bottom, black 0%, black 55%, transparent 100%)",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute left-1/2 top-0 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-brand/10 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="absolute right-0 top-24 h-80 w-32 rounded-l-full bg-accent/10 blur-2xl"
        aria-hidden="true"
      />

      <div className="container-x relative py-12 md:py-16 lg:py-20">
        <div className="mb-8 flex flex-col gap-3 rounded-[2rem] border border-white/80 bg-white/80 p-3 shadow-card backdrop-blur md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3 px-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-brand text-white">
              <Zap className="h-5 w-5" aria-hidden="true" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand">
                {BUSINESS.parenBrand}
              </p>
              <p className="text-sm text-ink-soft">
                Complete garage door systems across Melbourne
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {servicePills.map((pill) => (
              <span
                key={pill}
                className="rounded-full border border-border bg-surface px-3 py-1.5 text-xs font-semibold text-ink-soft"
              >
                {pill}
              </span>
            ))}
          </div>
        </div>

        <div className="grid items-center gap-10 lg:grid-cols-[1.02fr_0.98fr]">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-sm font-semibold text-white shadow-card">
              <span className="h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
              In business since {BUSINESS.founded} — powered by AGG Doors
            </div>

            <h1 className="max-w-4xl font-display text-5xl font-bold leading-[0.95] tracking-[-0.055em] text-ink sm:text-6xl lg:text-[5.4rem]">
              Garage doors,
              <span className="block text-brand">handled end-to-end.</span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-ink-soft sm:text-xl">
              A practical service hub for supply, installation, repairs,
              automation and urgent call-outs — backed by the AGG Doors team
              Melbourne already knows.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#contact"
                className="btn-accent justify-between px-7 py-4 text-base sm:justify-center"
                onClick={() => onCall()}
              >
                Request a quote
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </a>
              <a
                href={CONTACT.phoneTel}
                onClick={() => onCall()}
                className="btn-primary justify-between px-7 py-4 text-base sm:justify-center"
              >
                <Phone className="h-5 w-5" aria-hidden="true" />
                Call {CONTACT.phone}
              </a>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {trustItems.map(({ icon: Icon, text }) => (
                <div
                  key={text}
                  className="rounded-2xl border border-white bg-white/75 p-4 shadow-card backdrop-blur"
                >
                  <Icon className="mb-3 h-5 w-5 text-brand" aria-hidden="true" />
                  <p className="text-sm font-semibold leading-5 text-ink">{text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-4 top-10 hidden h-48 w-2 rounded-full bg-brand lg:block" />
            <div className="relative overflow-hidden rounded-[2.5rem] border border-white bg-white p-5 shadow-2xl">
              <div className="rounded-[2rem] bg-ink p-5 text-white">
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/55">
                      Service board
                    </p>
                    <p className="mt-1 font-display text-2xl font-bold">
                      System check
                    </p>
                  </div>
                  <div className="rounded-full bg-emerald-400/15 px-3 py-1.5 text-xs font-semibold text-emerald-200">
                    Crew active
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-[0.95fr_1.05fr]">
                  <div className="rounded-3xl bg-white p-4 text-ink">
                    <div className="mb-4 flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-widest text-ink-light">
                        Door profile
                      </span>
                      <Wrench className="h-4 w-4 text-brand" aria-hidden="true" />
                    </div>
                    <div className="space-y-2">
                      {["Panel alignment", "Motor response", "Spring tension", "Track safety"].map(
                        (item, index) => (
                          <div
                            key={item}
                            className="flex items-center justify-between rounded-xl bg-surface-alt px-3 py-2"
                          >
                            <span className="text-xs font-semibold text-ink-soft">
                              {item}
                            </span>
                            <span
                              className={`h-2.5 w-2.5 rounded-full ${
                                index === 1 ? "bg-accent" : "bg-brand"
                              }`}
                            />
                          </div>
                        ),
                      )}
                    </div>
                  </div>

                  <div className="relative min-h-[270px] overflow-hidden rounded-3xl bg-[#eef4ff] p-5 text-ink">
                    <div className="absolute inset-x-8 bottom-8 top-16 rounded-t-[2rem] border-[10px] border-brand/80 bg-white shadow-inner" />
                    <div className="absolute inset-x-12 bottom-12 top-24 space-y-4">
                      {[1, 2, 3, 4].map((line) => (
                        <div key={line} className="h-3 rounded-full bg-brand/15" />
                      ))}
                    </div>
                    <div className="absolute bottom-5 left-1/2 h-12 w-32 -translate-x-1/2 rounded-t-3xl bg-ink shadow-xl" />
                    <div className="relative z-10 inline-flex items-center gap-2 rounded-full bg-white px-3 py-2 text-xs font-bold text-brand shadow-card">
                      <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                      Melbourne metro
                    </div>
                    <div className="absolute right-5 top-5 rounded-2xl bg-accent px-4 py-3 text-white shadow-card">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-white/70">
                        Response
                      </p>
                      <p className="font-display text-xl font-bold">Today</p>
                    </div>
                  </div>
                </div>

                <div className="mt-3 grid grid-cols-3 gap-3">
                  {[
                    { value: "25+", label: "Years" },
                    { value: "24/7", label: "Emergency" },
                    { value: "100%", label: "Safety first" },
                  ].map(({ value, label }) => (
                    <div key={label} className="rounded-2xl bg-white/10 p-4 text-center">
                      <p className="font-display text-2xl font-bold">{value}</p>
                      <p className="mt-1 text-xs text-white/60">{label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <a
              href={CONTACT.emergencyTel}
              onClick={() => onEmergencyCall()}
              className="absolute -bottom-5 left-5 right-5 flex items-center gap-3 rounded-2xl border border-accent/20 bg-white p-4 shadow-xl transition-transform hover:-translate-y-1 sm:left-auto sm:right-8 sm:w-80"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-accent/10">
                <Phone className="h-5 w-5 text-accent" aria-hidden="true" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-accent">
                  Urgent door problem?
                </p>
                <p className="font-display text-lg font-bold text-ink">
                  {CONTACT.emergencyPhone}
                </p>
              </div>
            </a>
          </div>
        </div>
      </div>

      <div className="relative mt-10 border-y border-border bg-white/85 backdrop-blur">
        <div className="container-x grid gap-0 divide-y divide-border md:grid-cols-4 md:divide-x md:divide-y-0">
          {[
            { value: "Supply", label: "New roller, sectional and custom doors" },
            { value: "Install", label: "Full systems, motors and controls" },
            { value: "Repair", label: "Tracks, cables, springs and openers" },
            { value: "Secure", label: "After-hours emergency support" },
          ].map(({ value, label }) => (
            <div key={value} className="px-6 py-5">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-brand" aria-hidden="true" />
                <div>
                  <p className="font-display text-xl font-bold text-ink">{value}</p>
                  <p className="mt-1 text-sm leading-5 text-ink-soft">{label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
