import { useEffect, useRef, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  delay?: number; // milliseconds (0-600)
  direction?: "up" | "left" | "right" | "scale";
}

export default function ScrollReveal({
  children,
  className,
  delay,
  direction = "up",
}: Props) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("revealed");
          observer.unobserve(el);
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const revealType =
    direction === "left"
      ? "slide-left"
      : direction === "right"
        ? "slide-right"
        : direction === "scale"
          ? "scale"
          : undefined;

  // Map ms delay to 1-10 bucket (each bucket = 60ms)
  // delay=0 or undefined -> no data-delay
  // delay=60 -> 1, delay=120 -> 2, etc.
  const delayBucket = delay ? Math.min(10, Math.max(1, Math.round(delay / 60))) : undefined;

  return (
    <div
      ref={ref}
      data-reveal={revealType ?? ""}
      data-delay={delayBucket}
      className={className}
    >
      {children}
    </div>
  );
}
