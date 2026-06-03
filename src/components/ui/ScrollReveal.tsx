import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export default function ScrollReveal({ children, className, delay }: Props) {
  return (
    <div
      data-reveal
      data-delay={delay ? Math.round(delay / 0.06) : undefined}
      className={className}
    >
      {children}
    </div>
  );
}