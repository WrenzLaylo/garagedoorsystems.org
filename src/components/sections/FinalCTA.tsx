import { ArrowRight, Phone } from "lucide-react";
import { CONTACT } from "../../constants";
import { trackCall } from "../../utils/analytics";

interface Props {
  onCall: () => void;
  onEmergencyCall: () => void;
}

export default function FinalCTA({ onCall, onEmergencyCall }: Props) {
  return (
    <section className="relative overflow-hidden bg-brand py-20">
      {/* Background texture */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "24px 24px",
        }}
        aria-hidden="true"
      />

      <div className="container-x relative text-center">
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-white/60">
          Ready when you are
        </p>
        <h2 className="font-display text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
          Let&apos;s Sort Your Garage Door.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base text-white/75">
          Whether it&apos;s a small fix, a new installation, or a 3am emergency —
          AGG Doors has you covered across Melbourne.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <a
            href="#contact"
            className="btn flex items-center gap-2 bg-white font-semibold text-brand hover:bg-white/90 hover:-translate-y-0.5"
            onClick={() => trackCall()}
          >
            Get a Free Quote
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
          <a
            href={CONTACT.phoneTel}
            onClick={() => {
              onCall();
              trackCall();
            }}
            className="btn flex items-center gap-2 border-2 border-white/40 text-white hover:border-white hover:bg-white/10"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            {CONTACT.phone}
          </a>
        </div>
      </div>
    </section>
  );
}