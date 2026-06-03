import {
  ArrowRight,
  CheckCircle2,
  Clock,
  Phone,
  ShieldCheck,
  Star,
  Wrench,
  Zap,
} from "lucide-react";
import { BUSINESS, CONTACT } from "../../constants";
import ScrollReveal from "../ui/ScrollReveal";

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
  { icon: Star, text: "Hundreds of customer reviews" },
  { icon: ShieldCheck, text: "Licensed, insured technicians" },
];

export default function Hero({ onCall, onEmergencyCall }: Props) {
  return (
    <section
      id="top"
      className="relative overflow-hidden pt-16"
      style={{
        background:
          "linear-gradient(135deg, #f6f8fb 0%, #eef2f9 25%, #f0ece6 50%, #f6f8fb 75%, #eef2f9 100%)",
        backgroundSize: "400% 400%",
        animation: "gradient-shift 8s ease infinite",
      }}
    >
      {/* ---- Warm grid pattern ---- */}
      <div
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "linear-gradient(#e0d8cc 1px, transparent 1px), linear-gradient(90deg, #e0d8cc 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          maskImage:
            "linear-gradient(to bottom, black 0%, black 55%, transparent 100%)",
        }}
        aria-hidden="true"
      />

      {/* ---- Animated gradient blobs ---- */}
      <div
        className="absolute left-1/2 top-0 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-brand/10 blur-3xl animate-float-slow"
        aria-hidden="true"
      />
      <div
        className="absolute right-0 top-24 h-80 w-32 rounded-l-full bg-accent/10 blur-2xl animate-float-slow"
        style={{ animationDelay: "2s" }}
        aria-hidden="true"
      />
      <div
        className="absolute -left-16 bottom-40 h-64 w-64 rounded-full bg-brand/5 blur-3xl animate-float-slow"
        style={{ animationDelay: "3.5s" }}
        aria-hidden="true"
      />

      <div className="container-x relative py-12 md:py-16 lg:py-20">
        {/* ---- Top bar with service pills ---- */}
        <ScrollReveal direction="up">
          <div className="mb-8 flex flex-col gap-3 rounded-[2rem] border border-white/80 bg-white/80 p-3 shadow-card backdrop-blur-sm md:flex-row md:items-center md:justify-between transition-shadow duration-500 hover:shadow-card-hover">
            <div className="flex items-center gap-3 px-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-brand text-white shadow-glow-brand">
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
                  className="cursor-default rounded-full border border-border bg-surface px-3 py-1.5 text-xs font-semibold text-ink-soft transition-all duration-300 hover:scale-110 hover:border-brand hover:text-brand hover:shadow-glow-brand hover:bg-white"
                >
                  {pill}
                </span>
              ))}
            </div>
          </div>
        </ScrollReveal>

        <div className="grid items-center gap-10 lg:grid-cols-[1.02fr_0.98fr]">
          {/* ---- Left column with stagger ---- */}
          <div className="stagger-children">
            {/* "In business since" badge with shimmer */}
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-sm font-semibold text-white shadow-card relative overflow-hidden group cursor-default">
              <span className="pulse-dot h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
              In business since {BUSINESS.founded} — powered by AGG Doors
              {/* Shimmer overlay on hover */}
              <span
                className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent group-hover:animate-shimmer pointer-events-none"
                aria-hidden="true"
              />
            </div>

            <h1 className="max-w-4xl font-display text-5xl font-bold leading-[0.95] tracking-[-0.055em] text-ink sm:text-6xl lg:text-[5.4rem]">
              Garage doors,
              <span className="block text-gradient-brand">handled end-to-end.</span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-ink-soft sm:text-xl">
              A practical service hub for supply, installation, repairs,
              automation and urgent call-outs — backed by the AGG Doors team
              Melbourne already knows.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#contact"
                className="btn-accent justify-between px-7 py-4 text-base sm:justify-center group"
                onClick={() => onCall()}
              >
                Request a quote
                <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
              </a>
              <a
                href={CONTACT.phoneTel}
                onClick={() => onCall()}
                className="btn-primary justify-between px-7 py-4 text-base sm:justify-center group"
              >
                <Phone className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" aria-hidden="true" />
                Call {CONTACT.phone}
              </a>
            </div>

            {/* Trust items — icon spins on hover */}
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {trustItems.map(({ icon: Icon, text }) => (
                <div
                  key={text}
                  className="group rounded-2xl border border-white bg-white/75 p-4 shadow-card backdrop-blur transition-all duration-400 hover:shadow-card-hover hover:-translate-y-1 hover:border-brand/15 cursor-default"
                >
                  <Icon
                    className="mb-3 h-5 w-5 text-brand transition-transform duration-500 group-hover:[transform:rotate(360deg)]"
                    aria-hidden="true"
                  />
                  <p className="text-sm font-semibold leading-5 text-ink">{text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ---- Right column: interactive technician image ---- */}
          <div className="relative">
            <div className="absolute -left-4 top-10 hidden h-48 w-2 rounded-full bg-brand lg:block" />

            <ScrollReveal direction="right" delay={200}>
              <a
                href={CONTACT.phoneTel}
                onClick={() => onCall()}
                className="group relative block overflow-hidden rounded-[2.5rem] border border-white bg-white shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:shadow-card-hover focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/30 animate-float"
                aria-label={`Call Garage Door Systems on ${CONTACT.phone}`}
              >
                <img
                  src="/assets/hero-technician-branded.webp"
                  alt="AGG Doors technician repairing a garage door motor"
                  className="h-[620px] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  draggable={false}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/10 to-transparent transition-opacity duration-500 group-hover:opacity-0" />

                <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-brand/85 via-brand/70 to-accent/65 opacity-0 backdrop-blur-[2px] transition-all duration-500 ease-out group-hover:opacity-100">
                  <div className="translate-y-5 px-6 text-center transition-transform duration-500 ease-out group-hover:translate-y-0">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/20 ring-2 ring-white/30 backdrop-blur-sm">
                      <Wrench className="h-8 w-8 text-white" aria-hidden="true" />
                    </div>
                    <p className="font-display text-2xl font-bold text-white">
                      Motor repairs, installs and automation
                    </p>
                    <p className="mt-2 text-sm font-medium text-white/85">
                      Click to call the Melbourne team — {CONTACT.phone}
                    </p>
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-6 transition-transform duration-500 ease-out group-hover:translate-y-full">
                  <div className="rounded-3xl border border-white/20 bg-ink/70 p-5 text-white shadow-2xl backdrop-blur-md">
                    <p className="text-xs font-bold uppercase tracking-[0.24em] text-accent">
                      Real garage door motor work
                    </p>
                    <p className="mt-2 font-display text-2xl font-bold">
                      Technician-led repairs across Melbourne
                    </p>
                    <p className="mt-2 text-sm leading-6 text-white/75">
                      Branded AGG Doors service support for openers, springs, tracks and urgent call-outs.
                    </p>
                  </div>
                </div>
              </a>
            </ScrollReveal>

            {/* Emergency call banner with pulse ring */}
            <a
              href={CONTACT.emergencyTel}
              onClick={() => onEmergencyCall()}
              className="absolute -bottom-5 left-5 right-5 z-20 flex items-center gap-3 rounded-2xl border border-accent/20 bg-white p-4 shadow-xl transition-all duration-300 hover:-translate-y-1.5 hover:shadow-glow-accent sm:left-auto sm:right-8 sm:w-80 group"
            >
              <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-accent/10">
                <Phone className="h-5 w-5 text-accent transition-transform duration-300 group-hover:scale-110" aria-hidden="true" />
                <span className="absolute inset-0 rounded-2xl border-2 border-accent/60 animate-pulse-ring" aria-hidden="true" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-accent">
                  24/7 emergency line
                </p>
                <p className="font-display text-lg font-bold text-ink">
                  {CONTACT.emergencyPhone}
                </p>
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* ---- Bottom strip: Supply / Install / Repair / Secure ---- */}
      <div className="relative mt-10 border-y border-border bg-white/85 backdrop-blur">
        <div className="container-x grid gap-0 divide-y divide-border md:grid-cols-4 md:divide-x md:divide-y-0">
          {[
            { value: "Supply", label: "New roller, sectional and custom doors" },
            { value: "Install", label: "Full systems, motors and controls" },
            { value: "Repair", label: "Tracks, cables, springs and openers" },
            { value: "Secure", label: "After-hours emergency support" },
          ].map(({ value, label }) => (
            <div
              key={value}
              className="group px-6 py-5 transition-all duration-300 hover:bg-brand/[0.03] cursor-default"
            >
              <div className="flex items-start gap-3">
                <CheckCircle2
                  className="mt-1 h-5 w-5 shrink-0 text-brand transition-transform duration-500 group-hover:[transform:rotate(360deg)] group-hover:text-accent"
                  aria-hidden="true"
                />
                <div>
                  <p className="font-display text-xl font-bold text-ink transition-colors duration-300 group-hover:text-brand">
                    {value}
                  </p>
                  <p className="mt-1 text-sm leading-5 text-ink-soft transition-colors duration-300 group-hover:text-ink">
                    {label}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
