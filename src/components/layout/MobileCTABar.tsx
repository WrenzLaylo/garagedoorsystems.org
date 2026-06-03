import { Phone, FileText } from "lucide-react";
import { CONTACT } from "../../constants";

interface Props {
  onCall: () => void;
}

export default function MobileCTABar({ onCall }: Props) {
  return (
    <div
      className="fixed bottom-0 inset-x-0 z-50 md:hidden"
      style={{
        background: "rgba(15, 27, 45, 0.97)",
        borderTop: "1px solid rgba(255,255,255,0.1)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        paddingBottom: "env(safe-area-inset-bottom, 0px)",
      }}
    >
      <div className="grid grid-cols-2">
        {/* Call now */}
        <a
          href={CONTACT.phoneTel}
          onClick={onCall}
          className="group flex flex-col items-center justify-center gap-1 px-4 py-3.5 transition-colors duration-200 active:bg-white/5"
          style={{ borderRight: "1px solid rgba(255,255,255,0.08)" }}
          aria-label={`Call us at ${CONTACT.phone}`}
        >
          <div className="flex items-center gap-2">
            <div
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-transform duration-200 group-active:scale-95"
              style={{ background: "rgba(232,98,42,0.2)" }}
            >
              <Phone className="h-3.5 w-3.5" style={{ color: "#F08050" }} aria-hidden="true" />
            </div>
            <span className="text-sm font-bold text-white">Call Now</span>
          </div>
          <span className="text-[11px]" style={{ color: "rgba(255,255,255,0.45)" }}>
            {CONTACT.phone}
          </span>
        </a>

        {/* Get a quote */}
        <a
          href="#contact"
          className="group flex flex-col items-center justify-center gap-1 px-4 py-3.5 transition-all duration-200 active:opacity-80"
          style={{ background: "linear-gradient(135deg, #E8622A 0%, #F08050 100%)" }}
          aria-label="Get a free quote"
        >
          <div className="flex items-center gap-2">
            <div
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-transform duration-200 group-active:scale-95"
              style={{ background: "rgba(255,255,255,0.2)" }}
            >
              <FileText className="h-3.5 w-3.5 text-white" aria-hidden="true" />
            </div>
            <span className="text-sm font-bold text-white">Get a Quote</span>
          </div>
          <span className="text-[11px] text-white/70">Free, no obligation</span>
        </a>
      </div>
    </div>
  );
}
