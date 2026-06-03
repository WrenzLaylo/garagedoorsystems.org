import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeftRight } from "lucide-react";

interface BeforeAfterSliderProps {
  beforeSrc: string;
  afterSrc: string;
  beforeAlt: string;
  afterAlt: string;
  beforeLabel?: string;
  afterLabel?: string;
  className?: string;
}

export default function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  beforeAlt,
  afterAlt,
  beforeLabel = "Before",
  afterLabel = "After",
  className = "",
}: BeforeAfterSliderProps) {
  const [position, setPosition] = useState(48); // percent
  const [isDragging, setIsDragging] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<number>(0);
  const introPlayed = useRef(false);

  // Gentle intro animation on mount — slides from 50 → 30 → 50 to hint interaction
  useEffect(() => {
    if (introPlayed.current) return;
    introPlayed.current = true;
    let start: number | null = null;
    const duration = 1400;

    const animate = (ts: number) => {
      if (!start) start = ts;
      const elapsed = ts - start;
      const t = Math.min(elapsed / duration, 1);
      // ease in-out sine, goes to 30 then back
      const eased = t < 0.5
        ? 2 * t * t
        : 1 - Math.pow(-2 * t + 2, 2) / 2;
      const wave = Math.sin(eased * Math.PI);
      setPosition(48 - wave * 18);
      if (t < 1) {
        animRef.current = requestAnimationFrame(animate);
      } else {
        setPosition(48);
      }
    };

    // Delay so user sees it after scroll-in
    const timeout = setTimeout(() => {
      animRef.current = requestAnimationFrame(animate);
    }, 600);

    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(animRef.current);
    };
  }, []);

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setPosition((x / rect.width) * 100);
  }, []);

  // Mouse
  const onMouseDown = (e: React.MouseEvent) => {
    cancelAnimationFrame(animRef.current);
    setIsDragging(true);
    setHasInteracted(true);
    updatePosition(e.clientX);
    e.preventDefault();
  };

  useEffect(() => {
    if (!isDragging) return;
    const onMove = (e: MouseEvent) => updatePosition(e.clientX);
    const onUp = () => setIsDragging(false);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, [isDragging, updatePosition]);

  // Touch
  const onTouchStart = (e: React.TouchEvent) => {
    cancelAnimationFrame(animRef.current);
    setIsDragging(true);
    setHasInteracted(true);
    updatePosition(e.touches[0].clientX);
  };

  useEffect(() => {
    if (!isDragging) return;
    const onMove = (e: TouchEvent) => updatePosition(e.touches[0].clientX);
    const onEnd = () => setIsDragging(false);
    window.addEventListener("touchmove", onMove, { passive: true });
    window.addEventListener("touchend", onEnd);
    return () => {
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("touchend", onEnd);
    };
  }, [isDragging, updatePosition]);

  // Keyboard support
  const onKeyDown = (e: React.KeyboardEvent) => {
    cancelAnimationFrame(animRef.current);
    setHasInteracted(true);
    if (e.key === "ArrowLeft") setPosition((p) => Math.max(5, p - 3));
    if (e.key === "ArrowRight") setPosition((p) => Math.min(95, p + 3));
  };

  return (
    <div
      ref={containerRef}
      className={`group/slider relative select-none overflow-hidden rounded-2xl border border-border shadow-card ${className}`}
      style={{ cursor: isDragging ? "col-resize" : "col-resize" }}
      onMouseDown={onMouseDown}
      onTouchStart={onTouchStart}
      onKeyDown={onKeyDown}
      tabIndex={0}
      role="slider"
      aria-label="Before and after comparison slider"
      aria-valuenow={Math.round(position)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      {/* AFTER image — full width, sits underneath */}
      <img
        src={afterSrc}
        alt={afterAlt}
        className="h-full w-full object-cover"
        draggable={false}
      />

      {/* BEFORE image — clipped to left portion */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <img
          src={beforeSrc}
          alt={beforeAlt}
          className="h-full w-full object-cover"
          draggable={false}
        />
        {/* Very subtle dark tint on before side to help labels read */}
        <div className="absolute inset-0 bg-ink/5" />
      </div>

      {/* Divider line */}
      <div
        className="absolute inset-y-0 z-10 w-[2px] -translate-x-1/2"
        style={{
          left: `${position}%`,
          background: "rgba(255,255,255,0.9)",
          boxShadow: "0 0 12px rgba(0,0,0,0.35)",
        }}
      />

      {/* Handle */}
      <div
        className="absolute top-1/2 z-20 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full shadow-lg transition-transform duration-150"
        style={{
          left: `${position}%`,
          width: 44,
          height: 44,
          background: "white",
          transform: `translate(-50%, -50%) scale(${isDragging ? 1.12 : 1})`,
          boxShadow: "0 2px 16px rgba(0,0,0,0.22), 0 0 0 2px rgba(27,77,143,0.18)",
        }}
      >
        <ArrowLeftRight
          className="h-5 w-5 text-brand"
          strokeWidth={2.2}
          aria-hidden="true"
        />
      </div>

      {/* Before label */}
      <div
        className="pointer-events-none absolute bottom-4 left-4 z-10"
        style={{ opacity: position > 12 ? 1 : 0, transition: "opacity 0.2s" }}
      >
        <span className="rounded-full bg-ink/60 px-3 py-1 text-xs font-bold uppercase tracking-widest text-white backdrop-blur-sm">
          {beforeLabel}
        </span>
      </div>

      {/* After label */}
      <div
        className="pointer-events-none absolute bottom-4 right-4 z-10"
        style={{ opacity: position < 88 ? 1 : 0, transition: "opacity 0.2s" }}
      >
        <span
          className="rounded-full px-3 py-1 text-xs font-bold uppercase tracking-widest text-white backdrop-blur-sm"
          style={{ background: "rgba(27,77,143,0.75)" }}
        >
          {afterLabel}
        </span>
      </div>

      {/* Drag hint — fades once interacted */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 top-0 z-10 flex items-center justify-center transition-opacity duration-500"
        style={{ opacity: hasInteracted ? 0 : 0.85 }}
      >
        <span className="rounded-xl bg-ink/50 px-4 py-2 text-[11px] font-semibold uppercase tracking-widest text-white backdrop-blur-sm">
          Drag to compare
        </span>
      </div>
    </div>
  );
}
