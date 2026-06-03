import { Award, Clock, ShieldCheck, Star } from "lucide-react";
import { STATS } from "../../constants";
import ScrollReveal from "../ui/ScrollReveal";

const statIcons = [Award, Star, Clock, ShieldCheck];

function StatCard({
  value,
  label,
  icon: Icon,
  delay,
}: {
  value: string;
  label: string;
  icon: typeof Award;
  delay: number;
}) {
  return (
    <ScrollReveal direction="up" delay={delay}>
      <div className="group flex flex-col items-center gap-3 rounded-2xl border border-border bg-surface-raised p-6 text-center shadow-card transition-all duration-400 hover:-translate-y-2 hover:shadow-card-hover hover:border-brand/15 cursor-default">
        {/* Icon */}
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand/8 transition-all duration-300 group-hover:bg-brand/15 group-hover:shadow-glow-brand">
          <Icon
            className="h-6 w-6 text-brand transition-transform duration-500 group-hover:scale-110"
            aria-hidden="true"
          />
        </div>

        {/* Value */}
        <p
          className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl"
        >
          {value}
        </p>

        {/* Label */}
        <p className="text-sm font-medium text-ink-soft">{label}</p>
      </div>
    </ScrollReveal>
  );
}

export default function StatsBar() {
  return (
    <section className="relative border-y border-border bg-surface-alt py-14 md:py-16">
      {/* Subtle decorative accent */}
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
          {STATS.map((stat, index) => (
            <StatCard
              key={stat.label}
              value={stat.value}
              label={stat.label}
              icon={statIcons[index]}
              delay={index * 100}
            />
          ))}
        </div>
      </div>
    </section>
  );
}