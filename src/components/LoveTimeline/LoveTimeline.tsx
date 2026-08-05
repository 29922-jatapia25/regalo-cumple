import { MapPin } from "lucide-react";
import { motion } from "motion/react";
import { memories } from "../../data/memories";
import { publicAsset } from "../../utils/publicAsset";
import { SectionHeading } from "../common/SectionHeading";

export function LoveTimeline() {
  return (
    <section id="historia" className="scroll-mt-24 px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Capítulo a capítulo"
          title="Nuestra historia"
          description="Hay recuerdos que duran un instante y, aun así, terminan viviendo para siempre dentro de nosotros."
        />

        <div className="relative">
          <div className="absolute bottom-8 left-[0.43rem] top-8 w-px bg-gradient-to-b from-transparent via-gold/55 to-transparent lg:left-1/2" />

          <div className="space-y-14 sm:space-y-20 lg:space-y-28">
            {memories.map((memory, index) => {
              const imageFirst = index % 2 === 0;
              return (
                <motion.article
                  key={memory.id}
                  initial={{ opacity: 0, y: 35 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.7, delay: index * 0.08 }}
                  className="relative grid gap-6 pl-8 lg:grid-cols-[1fr_80px_1fr] lg:items-center lg:gap-0 lg:pl-0"
                >
                  <span className="absolute left-0 top-7 z-10 size-3 rounded-full border-2 border-gold bg-background shadow-[0_0_0_6px_rgba(198,161,91,.09)] lg:left-1/2 lg:top-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2" />

                  <div className={imageFirst ? "lg:col-start-1 lg:pr-10" : "lg:col-start-3 lg:pl-10"}>
                    <div className="group relative aspect-[4/3] overflow-hidden rounded-[1.5rem] border border-white/10 bg-surface shadow-2xl sm:rounded-[2rem]">
                      <img
                        src={publicAsset(memory.image)}
                        alt={`Recuerdo de ejemplo: ${memory.title}`}
                        loading="lazy"
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/45 to-transparent" />
                      <span className="absolute bottom-4 right-4 rounded-full border border-white/10 bg-background/60 px-3 py-1 text-[0.65rem] uppercase tracking-[0.18em] text-cream backdrop-blur-lg">
                        Recuerdo {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                  </div>

                  <div
                    className={`${imageFirst ? "lg:col-start-3 lg:pl-10" : "lg:col-start-1 lg:row-start-1 lg:pr-10 lg:text-right"}`}
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
                      {memory.date}
                    </p>
                    <h3 className="mt-3 font-display text-3xl leading-tight text-cream sm:text-4xl">
                      {memory.title}
                    </h3>
                    <p className="mt-4 text-sm leading-7 text-muted sm:text-base">
                      {memory.description}
                    </p>
                    {memory.location && (
                      <p className={`mt-4 flex items-center gap-1.5 text-xs text-dusty-rose ${!imageFirst ? "lg:justify-end" : ""}`}>
                        <MapPin size={13} /> {memory.location}
                      </p>
                    )}
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
