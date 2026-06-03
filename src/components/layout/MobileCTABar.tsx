import { useEffect, useRef, useState } from "react";
import { Phone, FileText, AlertTriangle } from "lucide-react";
import { CONTACT } from "../../constants";

interface Props {
  onCall: () => void;
  onEmergencyCall?: () => void;
}

export default function MobileCTABar({ onCall, onEmergencyCall }: Props) {
  const [visible, setVisible] = useState(false);
  const [showEmergency, setShowEmergency] = useState(false);
  const scrolledPast = useRef(false);

  // Reveal after user scrolls 120px past the hero (roughly one viewport height)
  useEffect(() => {
    const onScroll = () => {
      const past = window.scrollY > 120;
      if (past !== scrolledPast.current) {
        scrolledPast.current = past;
        setVisible(past);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Main bar */}
      <div
        className="fixed inset-x-0 bottom-0 z-50 md:hidden"
        style={{
          transform: visible ? "translateY(0)" : "translateY(100%)",
          transition: "transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
          background: "rgba(10, 20, 38, 0.97)",
          borderTop: "1px solid rgba(255,255,255,0.09)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          paddingBottom: "env(safe-area-inset-bottom, 0px)",
        }}
        aria-hidden={!visible}
      >
        {/* Emergency expand panel */}
        <div
          style={{
            maxHeight: showEmergency ? "72px" : "0px",
            overflow: "hidden",
            transition: "max-height 0.35s cubic-bezier(0.22, 1, 0.36, 1)",
            background: "rgba(232,98,42,0.12)",
            borderBottom: showEmergency ? "1px solid rgba(232,98,42,0.2)" : "none",
          }}
        >
          <a
            href={CONTACT.emergencyTel}
            onClick={onEmergencyCall}
            className="flex items-center justify-center gap-3 px-5 py-3.5 active:opacity-80"
            aria-label={`Emergency call ${CONTACT.emergencyPhone}`}
          >
            <div
              className="relative flex h-7 w-7 shrink-0 items-center justify-center rounded-full"
              style={{ background: "rgba(232,98,42,0.25)" }}
            >
              {/* Pulse ring */}
              <span
                className="absolute inset-0 rounded-full"
                style={{
                  border: "1.5px solid rgba(232,98,42,0.6)",
                  animation: "pulse-ring 1.6s ease-out infinite",
                }}
                aria-hidden="true"
              />
              <AlertTriangle className="h-3.5 w-3.5" style={{ color: "#F08050" }} aria-hidden="true" />
            </div>
            <div className="text-left">
              <p className="text-xs font-bold text-white leading-none">24/7 Emergency Line</p>
              <p className="mt-0.5 text-[11px]" style={{ color: "rgba(255,255,255,0.55)" }}>
                {CONTACT.emergencyPhone}
              </p>
            </div>
            <span
              className="ml-auto rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide"
              style={{ background: "rgba(232,98,42,0.3)", color: "#F08050" }}
            >
              Call now
            </span>
          </a>
        </div>

        {/* Main 3-button row */}
        <div className="grid grid-cols-3">
          {/* Emergency toggle */}
          <button
            onClick={() => setShowEmergency((s) => !s)}
            className="group relative flex flex-col items-center justify-center gap-1 px-3 py-3.5 transition-colors duration-150 active:bg-white/5"
            style={{ borderRight: "1px solid rgba(255,255,255,0.07)" }}
            aria-label="Toggle emergency line"
            aria-expanded={showEmergency}
          >
            {/* Pulse dot */}
            <div className="relative">
              <div
                className="flex h-7 w-7 items-center justify-center rounded-full transition-all duration-200"
                style={{
                  background: showEmergency ? "rgba(232,98,42,0.3)" : "rgba(232,98,42,0.15)",
                }}
              >
                <AlertTriangle
                  className="h-3.5 w-3.5 transition-colors duration-200"
                  style={{ color: "#F08050" }}
                  aria-hidden="true"
                />
              </div>
              {/* Live pulse indicator */}
              <span
                className="absolute -right-0.5 -top-0.5 flex h-2.5 w-2.5 items-center justify-center rounded-full"
                style={{ background: "#E8622A" }}
                aria-hidden="true"
              >
                <span
                  className="absolute inline-flex h-full w-full rounded-full"
                  style={{
                    background: "#E8622A",
                    animation: "pulse-ring 1.8s ease-out infinite",
                    opacity: 0.7,
                  }}
                />
              </span>
            </div>
            <span className="text-[10px] font-semibold leading-none" style={{ color: "#F08050" }}>
              Emergency
            </span>
          </button>

          {/* Call now — primary */}
          <a
            href={CONTACT.phoneTel}
            onClick={onCall}
            className="group flex flex-col items-center justify-center gap-1 px-3 py-3.5 transition-all duration-150 active:opacity-80"
            style={{
              background: "linear-gradient(160deg, #1B4D8F 0%, #2563EB 100%)",
              borderRight: "1px solid rgba(255,255,255,0.07)",
            }}
            aria-label={`Call us now at ${CONTACT.phone}`}
          >
            <div
              className="flex h-7 w-7 items-center justify-center rounded-full transition-transform duration-150 group-active:scale-95"
              style={{ background: "rgba(255,255,255,0.18)" }}
            >
              <Phone className="h-3.5 w-3.5 text-white" aria-hidden="true" />
            </div>
            <span className="text-[10px] font-bold leading-none text-white">Call Now</span>
          </a>

          {/* Get a quote */}
          <a
            href="#contact"
            className="group flex flex-col items-center justify-center gap-1 px-3 py-3.5 transition-all duration-150 active:opacity-80"
            style={{ background: "rgba(255,255,255,0.04)" }}
            aria-label="Get a free quote"
          >
            <div
              className="flex h-7 w-7 items-center justify-center rounded-full transition-transform duration-150 group-active:scale-95"
              style={{ background: "rgba(255,255,255,0.1)" }}
            >
              <FileText className="h-3.5 w-3.5" style={{ color: "rgba(255,255,255,0.7)" }} aria-hidden="true" />
            </div>
            <span className="text-[10px] font-semibold leading-none" style={{ color: "rgba(255,255,255,0.65)" }}>
              Get Quote
            </span>
          </a>
        </div>
      </div>

      <style>{`
        @keyframes pulse-ring {
          0%   { transform: scale(1);   opacity: 0.7; }
          100% { transform: scale(2.2); opacity: 0;   }
        }
      `}</style>
    </>
  );
}
