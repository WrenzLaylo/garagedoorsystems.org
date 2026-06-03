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
      className="relative overflow-hidden"
      style={{ background: "#0F1B2D", minHeight: "100dvh", display: "flex", flexDirection: "column" }}
    >
      {/* ---- Full-bleed hero photo with gradient wipe ---- */}
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/hero-technician-branded.webp"
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover object-top"
          loading="eager"
          fetchPriority="high"
          draggable={false}
          style={{ opacity: 0.45 }}
        />
        {/* Left-to-right gradient: dark left side for text, fades to photo on right */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(105deg, #0F1B2D 0%, #0F1B2D 30%, rgba(15,27,45,0.82) 55%, rgba(15,27,45,0.3) 75%, transparent 100%)",
          }}
        />
        {/* Bottom fade */}
        <div
          className="absolute inset-x-0 bottom-0 h-48"
          style={{ background: "linear-gradient(to top, #0F1B2D, transparent)" }}
        />
        {/* Subtle orange accent line top */}
        <div className="absolute inset-x-0 top-0 h-[3px]" style={{ background: "linear-gradient(90deg, #E8622A 0%, #F08050 40%, transparent 70%)" }} />
      </div>

      {/* ---- Noise texture overlay ---- */}
      <div
        className="absolute inset-0 z-0 opacity-[0.03]"
        style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
          backgroundRepeat: "repeat",
          backgroundSize: "128px 128px",
        }}
        aria-hidden="true"
      />

      <div className="container-x relative z-10 flex flex-1 flex-col justify-center py-28 md:py-36 lg:py-40 pt-32">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_0.45fr]">
          {/* ---- Left: headline block ---- */}
          <div className="stagger-children max-w-3xl">
            {/* Badge */}
            <div className="mb-7 inline-flex items-center gap-2.5 rounded-full px-4 py-2 text-xs font-semibold text-white/70 relative overflow-hidden"
              style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", backdropFilter: "blur(12px)" }}>
              <span className="pulse-dot h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
              In business since {BUSINESS.founded} — powered by AGG Doors
            </div>

            {/* Main headline — massive, white */}
            <h1 className="font-display font-bold tracking-[-0.04em] text-white"
              style={{ fontSize: "clamp(3rem, 7vw, 6.5rem)", lineHeight: 0.92 }}>
              Garage doors,
              <br />
              <span style={{ color: "#E8622A" }}>handled</span>
              <br />
              end-to-end.
            </h1>

            <p className="mt-8 text-lg leading-relaxed md:text-xl" style={{ color: "rgba(255,255,255,0.6)", maxWidth: "38ch" }}>
              Supply, installation, repairs, automation and urgent call-outs — backed by the AGG Doors team Melbourne already knows.
            </p>

            {/* CTA buttons */}
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <a
                href="#contact"
                className="btn-accent group justify-between px-8 py-4 text-base sm:justify-center"
                onClick={() => onCall()}
                style={{ fontSize: "1rem" }}
              >
                Request a quote
                <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
              </a>
              <a
                href={CONTACT.phoneTel}
                onClick={() => onCall()}
                className="group justify-between px-8 py-4 text-base sm:justify-center inline-flex items-center gap-2 rounded-xl font-semibold text-white transition-all duration-300"
                style={{ border: "1.5px solid rgba(255,255,255,0.25)", backdropFilter: "blur(8px)", background: "rgba(255,255,255,0.06)" }}
              >
                <Phone className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" aria-hidden="true" />
                Call {CONTACT.phone}
              </a>
            </div>

            {/* Trust strip */}
            <div className="mt-10 flex flex-wrap gap-5">
              {trustItems.map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2.5">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg" style={{ background: "rgba(232,98,42,0.15)", border: "1px solid rgba(232,98,42,0.25)" }}>
                    <Icon className="h-4 w-4" style={{ color: "#F08050" }} aria-hidden="true" />
                  </div>
                  <span className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.7)" }}>{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ---- Right: service pills + emergency card ---- */}
          <div className="hidden lg:flex flex-col gap-4">
            {/* Service pills */}
            <div className="rounded-2xl p-5" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", backdropFilter: "blur(20px)" }}>
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em]" style={{ color: "rgba(255,255,255,0.35)" }}>We handle</p>
              <div className="flex flex-wrap gap-2">
                {servicePills.map((pill) => (
                  <span
                    key={pill}
                    className="cursor-default rounded-full px-3 py-1.5 text-xs font-semibold transition-all duration-300 hover:scale-105"
                    style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.75)" }}
                  >
                    {pill}
                  </span>
                ))}
              </div>
            </div>

            {/* Emergency CTA card */}
            <a
              href={CONTACT.emergencyTel}
              onClick={() => onEmergencyCall()}
              className="group flex items-center gap-4 rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1"
              style={{ background: "rgba(232,98,42,0.12)", border: "1.5px solid rgba(232,98,42,0.3)", backdropFilter: "blur(20px)" }}
              aria-label="24/7 emergency line"
            >
              <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-xl" style={{ background: "rgba(232,98,42,0.2)" }}>
                <Phone className="h-5 w-5" style={{ color: "#F08050" }} aria-hidden="true" />
                <span className="absolute inset-0 rounded-xl border-2 animate-pulse-ring" style={{ borderColor: "rgba(232,98,42,0.4)" }} aria-hidden="true" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest" style={{ color: "#F08050" }}>24/7 Emergency</p>
                <p className="font-display text-xl font-bold text-white">{CONTACT.emergencyPhone}</p>
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* ---- Bottom strip ---- */}
      <div className="relative z-10 border-t" style={{ borderColor: "rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.04)", backdropFilter: "blur(12px)" }}>
        <div className="container-x grid gap-0 divide-y md:grid-cols-4 md:divide-x md:divide-y-0" style={{ "--tw-divide-opacity": 1, borderColor: "rgba(255,255,255,0.08)" } as React.CSSProperties}>
          {[
            { value: "Supply", label: "New roller, sectional and custom doors" },
            { value: "Install", label: "Full systems, motors and controls" },
            { value: "Repair", label: "Tracks, cables, springs and openers" },
            { value: "Secure", label: "After-hours emergency support" },
          ].map(({ value, label }) => (
            <div
              key={value}
              className="group px-6 py-5 transition-all duration-300 cursor-default"
              style={{ borderColor: "rgba(255,255,255,0.08)" }}
            >
              <div className="flex items-start gap-3">
                <CheckCircle2
                  className="mt-0.5 h-4 w-4 shrink-0 transition-colors duration-300"
                  style={{ color: "#E8622A" }}
                  aria-hidden="true"
                />
                <div>
                  <p className="font-display text-base font-bold text-white">{value}</p>
                  <p className="mt-0.5 text-xs leading-5" style={{ color: "rgba(255,255,255,0.45)" }}>{label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
