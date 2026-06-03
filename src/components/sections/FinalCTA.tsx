import { ArrowRight, Phone } from "lucide-react";
import { CONTACT } from "../../constants";
import { trackCall } from "../../utils/analytics";
import ScrollReveal from "../ui/ScrollReveal";
import { useMagnetic } from "../../hooks/useMagnetic";

interface Props {
  onCall: () => void;
  onEmergencyCall: () => void;
}

export default function FinalCTA({ onCall }: Props) {
  const quoteBtn = useMagnetic(0.2);
  const callBtn = useMagnetic(0.2);

  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      {/* Animated gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(-45deg, #0F2E5C, #1B4D8F, #162337, #0F1B2D)",
          backgroundSize: "400% 400%",
          animation: "gradient-shift 12s ease infinite",
        }}
        aria-hidden="true"
      />

      {/* Dot texture */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "28px 28px",
        }}
        aria-hidden="true"
      />

      {/* Floating decorative shapes */}
      <div
        className="absolute left-[10%] top-[20%] h-48 w-48 rounded-full bg-brand-light/10 blur-3xl animate-float-slow"
        aria-hidden="true"
      />
      <div
        className="absolute right-[15%] bottom-[10%] h-64 w-64 rounded-full bg-accent/10 blur-3xl animate-float"
        aria-hidden="true"
      />
      <div
        className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.03] blur-3xl"
        aria-hidden="true"
      />

      <div className="container-x relative text-center">
        <ScrollReveal>
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-white/50">
            Ready when you are
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.06}>
          <h2 className="font-display text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
            Let&apos;s Sort Your
            <span className="block mt-1 text-gradient-accent bg-clip-text" style={{
              background: "linear-gradient(135deg, #F08050, #E8622A)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>
              Garage Door.
            </span>
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.12}>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-white/65">
            Whether it&apos;s a small fix, a new installation, or a 3am
            emergency — AGG Doors has you covered across Melbourne.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.18}>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <div
              ref={quoteBtn.ref as React.RefObject<HTMLDivElement>}
              onMouseMove={quoteBtn.onMouseMove}
              onMouseLeave={quoteBtn.onMouseLeave}
              className="magnetic-wrap"
            >
              <a
                href="#contact"
                className="btn group relative overflow-hidden bg-white font-semibold text-brand hover:bg-white/95"
                onClick={() => trackCall()}
                style={{ transform: "none" }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  Get a Free Quote
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                </span>
              </a>
            </div>
            <div
              ref={callBtn.ref as React.RefObject<HTMLDivElement>}
              onMouseMove={callBtn.onMouseMove}
              onMouseLeave={callBtn.onMouseLeave}
              className="magnetic-wrap"
            >
              <a
                href={CONTACT.phoneTel}
                onClick={() => {
                  onCall();
                  trackCall();
                }}
                className="btn group border-2 border-white/30 text-white hover:border-white/60 hover:bg-white/10"
                style={{ transform: "none" }}
              >
                <Phone className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" aria-hidden="true" />
                {CONTACT.phone}
              </a>
            </div>
          </div>
        </ScrollReveal>

        {/* Trust badges */}
        <ScrollReveal delay={0.24}>
          <div className="mt-12 flex flex-wrap justify-center gap-6 text-xs font-medium text-white/40">
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
              20+ Years Experience
            </span>
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
              Hundreds of Customer Reviews
            </span>
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
              24/7 Emergency Support
            </span>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}