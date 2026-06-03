import { useEffect, useRef, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  delay?: number;
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

  return (
    <div
      ref={ref}
      data-reveal={revealType ?? ""}
      data-delay={delay ? Math.round(delay / 0.06) : undefined}
      className={className}
    >
      {children}
    </div>
  );
}