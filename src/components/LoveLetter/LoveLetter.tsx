import { useState } from "react";
import { MailOpen } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { experienceConfig } from "../../config/experience.config";
import { letter } from "../../data/letter";
import { SectionHeading } from "../common/SectionHeading";

export function LoveLetter() {
  const [opened, setOpened] = useState(false);

  return (
    <section id="carta" className="scroll-mt-24 bg-[#e9dcca] px-4 py-20 text-background sm:px-6 sm:py-28">
      <div className="mx-auto max-w-5xl">
        <div className="[&_h2]:!text-background [&_p]:!text-wine/80">
          <SectionHeading
            eyebrow="Palabras para guardar"
            title="Una carta para ti"
            description="Algunas cosas merecen decirse despacio, como si el tiempo pudiera detenerse un momento."
          />
        </div>

        <AnimatePresence mode="wait">
          {!opened ? (
            <motion.div
              key="envelope"
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              exit={{ opacity: 0, y: -20, scale: 0.96 }}
              className="mx-auto max-w-xl"
            >
              <button
                type="button"
                onClick={() => setOpened(true)}
                aria-label="Abrir la carta romántica"
                className="envelope group relative mx-auto block aspect-[1.5/1] w-full max-w-lg outline-none focus-visible:ring-4 focus-visible:ring-wine/35"
              >
                <span className="envelope-back" />
                <span className="envelope-letter" aria-hidden="true">
                  <span>Para {experienceConfig.girlfriendName}</span>
                </span>
                <span className="envelope-front" />
                <span className="envelope-flap" />
                <span className="envelope-seal" aria-hidden="true">D</span>
              </button>
              <p className="mt-7 text-center text-xs font-semibold uppercase tracking-[0.22em] text-wine/70">
                Toca el sobre para abrirlo
              </p>
            </motion.div>
          ) : (
            <motion.article
              key="letter"
              initial={{ opacity: 0, y: 35, rotateX: -5 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 0.8 }}
              className="relative mx-auto max-w-3xl overflow-hidden rounded-sm bg-[#fffdf8] px-5 py-10 shadow-[0_25px_70px_rgba(67,43,43,.2)] sm:px-12 sm:py-14 lg:px-16"
            >
              <div className="pointer-events-none absolute inset-0 opacity-35 [background-image:linear-gradient(rgba(111,38,61,.05)_1px,transparent_1px)] [background-size:100%_2rem]" />
              <div className="relative">
                <p className="font-display text-3xl italic text-wine sm:text-4xl">{letter.greeting}</p>
                <div className="mt-7 space-y-5">
                  {letter.paragraphs.map((paragraph, index) => (
                    <motion.p
                      key={paragraph}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.25 + index * 0.28, duration: 0.65 }}
                      className="text-[0.95rem] leading-8 text-[#403338] sm:text-base"
                    >
                      {paragraph}
                    </motion.p>
                  ))}
                </div>
                <motion.p
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.25 + letter.paragraphs.length * 0.28 }}
                  className="mt-7 font-display text-xl font-bold text-wine sm:text-2xl"
                >
                  {letter.celebration}
                </motion.p>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 + letter.paragraphs.length * 0.28 }}
                  className="mt-7 font-display text-xl italic leading-relaxed text-wine sm:text-2xl"
                >
                  {letter.closing}
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.75 + letter.paragraphs.length * 0.28 }}
                  className="mt-8 whitespace-pre-line text-right font-display text-xl italic text-background"
                >
                  {letter.signature}
                </motion.p>

              </div>
            </motion.article>
          )}
        </AnimatePresence>

        {opened && (
          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => setOpened(false)}
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-wine/65 underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-wine"
            >
              <MailOpen size={14} /> Guardar la carta
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
