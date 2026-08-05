import { useState } from "react";
import { motion } from "motion/react";
import { reasons } from "../../data/reasons";
import { SectionHeading } from "../common/SectionHeading";

export function LoveReasons() {
  const [revealed, setRevealed] = useState<Set<number>>(new Set());

  const toggle = (id: number) => {
    setRevealed((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <section id="razones" className="scroll-mt-24 px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Abre cada detalle"
          title="Todo lo que amo de ti"
          description="Podría escribir una lista infinita. Por ahora, aquí guardé seis razones para volver a recordártelo."
        />

        <div className="grid gap-3 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {reasons.map((reason, index) => {
            const isOpen = revealed.has(reason.id);
            return (
              <motion.button
                key={reason.id}
                type="button"
                onClick={() => toggle(reason.id)}
                aria-expanded={isOpen}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: index * 0.06 }}
                className="group min-h-52 rounded-[1.5rem] border border-white/10 bg-white/[0.045] p-5 text-left shadow-xl outline-none transition hover:border-gold/35 hover:bg-white/[0.065] focus-visible:ring-2 focus-visible:ring-gold sm:min-h-60 sm:rounded-[2rem] sm:p-7"
              >
                <div className="flex items-start justify-between">
                  <span className="grid size-11 place-items-center rounded-full border border-gold/25 bg-gold/10 font-display text-xl text-gold">
                    {reason.icon}
                  </span>
                  <span className="font-display text-xs text-muted/55">0{reason.id}</span>
                </div>
                <div className="mt-8">
                  <p className="font-display text-2xl leading-tight text-cream">
                    {reason.title}
                  </p>
                  <motion.div
                    initial={false}
                    animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                    className="overflow-hidden"
                  >
                    <p className="pt-3 text-sm leading-6 text-muted">{reason.message}</p>
                  </motion.div>
                  {!isOpen && (
                    <p className="mt-3 text-xs uppercase tracking-[0.18em] text-dusty-rose">
                      Toca para descubrir
                    </p>
                  )}
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
