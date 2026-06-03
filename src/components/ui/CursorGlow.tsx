import { useEffect, useRef, useState } from "react";

export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Skip on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let idleTimer: number;

    const onMove = (e: MouseEvent) => {
      if (glowRef.current) {
        glowRef.current.style.left = `${e.clientX}px`;
        glowRef.current.style.top = `${e.clientY}px`;
      }
      setVisible(true);
      clearTimeout(idleTimer);
      idleTimer = window.setTimeout(() => setVisible(false), 3000);
    };

    const onLeave = () => setVisible(false);

    document.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      clearTimeout(idleTimer);
    };
  }, []);

  return (
    <div
      ref={glowRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        width: "280px",
        height: "280px",
        borderRadius: "50%",
        background:
          "radial-gradient(circle, rgba(27, 77, 143, 0.06) 0%, transparent 70%)",
        pointerEvents: "none",
        zIndex: 9998,
        transform: "translate(-50%, -50%)",
        opacity: visible ? 1 : 0,
        transition: "opacity 0.6s ease",
        willChange: "left, top",
      }}
    />
  );
}
