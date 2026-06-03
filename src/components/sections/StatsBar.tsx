import { Award, Clock, ShieldCheck, Star } from "lucide-react";
import { useCountUp } from "../../hooks/useCountUp";
import { useState } from "react";

const STATS_CONFIG = [
  {
    end: 20,
    suffix: "+",
    label: "Years Experience",
    icon: Award,
    tooltip: "In business since 1999 — founded as AGG Doors Pty Ltd.",
  },
  {
    end: 100,
    suffix: "s",
    label: "Customer Reviews",
    icon: Star,
    tooltip: "Verified reviews across Google.",
  },
  {
    end: 24,
    suffix: "/7",
    label: "Emergency Support",
    icon: Clock,
    tooltip: null,
  },
  {
    end: 100,
    suffix: "%",
    label: "Safety Focused",
    icon: ShieldCheck,
    tooltip: null,
  },
];

function StatCard({
  end,
  suffix,
  label,
  icon: Icon,
  tooltip,
}: {
  end: number;
  suffix: string;
  label: string;
  icon: typeof Award;
  tooltip: string | null;
}) {
  const { ref, display } = useCountUp({ end, suffix, duration: 1800 });
  const [visible, setVisible] = useState(false);

  return (
    <div
      className="group relative flex flex-col items-center gap-3 rounded-2xl border border-border bg-surface-raised p-6 text-center shadow-card transition-all duration-400 hover:-translate-y-2 hover:shadow-card-hover hover:border-brand/15 cursor-default"
      onMouseEnter={() => tooltip && setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onFocus={() => tooltip && setVisible(true)}
      onBlur={() => setVisible(false)}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand/8 transition-all duration-300 group-hover:bg-brand/15 group-hover:shadow-glow-brand">
        <Icon className="h-6 w-6 text-brand transition-transform duration-500 group-hover:scale-110" aria-hidden="true" />
      </div>
      <p
        ref={ref as React.RefObject<HTMLParagraphElement>}
        className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl"
        aria-label={`${end}${suffix} ${label}`}
      >
        {display}
      </p>
      <p className="text-sm font-medium text-ink-soft">{label}</p>

      {/* Tooltip */}
      {tooltip && (
        <div
          role="tooltip"
          className={`pointer-events-none absolute bottom-full left-1/2 z-20 mb-3 w-52 -translate-x-1/2 rounded-xl border border-border bg-surface px-4 py-3 text-xs leading-relaxed text-ink-soft shadow-card-hover transition-all duration-200 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"
          }`}
        >
          {tooltip}
          {/* Arrow */}
          <span
            className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent"
            style={{ borderTopColor: "var(--color-border, #e2e8f0)" }}
            aria-hidden="true"
          />
        </div>
      )}

      {/* Subtle indicator that this stat has a tooltip */}
      {tooltip && (
        <span className="absolute right-3 top-3 flex h-4 w-4 items-center justify-center rounded-full bg-brand/10 text-[9px] font-bold text-brand opacity-0 transition-opacity duration-200 group-hover:opacity-100" aria-hidden="true">
          i
        </span>
      )}
    </div>
  );
}

export default function StatsBar() {
  return (
    <section className="relative border-y border-border bg-surface-alt py-14 md:py-16">
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 50%, rgba(27,77,143,0.06) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(232,98,42,0.04) 0%, transparent 50%)",
        }}
        aria-hidden="true"
      />
      <div className="container-x relative">
        <div className="grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-4">
          {STATS_CONFIG.map((stat) => (
            <StatCard
              key={stat.label}
              end={stat.end}
              suffix={stat.suffix}
              label={stat.label}
              icon={stat.icon}
              tooltip={stat.tooltip}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
