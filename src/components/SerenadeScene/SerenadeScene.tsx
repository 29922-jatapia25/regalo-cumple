import { useEffect, useState } from "react";
import { Music2 } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { experienceConfig } from "../../config/experience.config";
import { useExperience } from "../../context/ExperienceContext";
import type { useAudio } from "../../hooks/useAudio";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { publicAsset } from "../../utils/publicAsset";
import { Button } from "../common/Button";

const petals = Array.from({ length: 16 }, (_, index) => ({
  id: index,
  left: `${(index * 41 + 9) % 98}%`,
  delay: `${(index % 8) * 0.7}s`,
  duration: `${8 + (index % 5)}s`,
}));

interface SerenadeSceneProps {
  audio: ReturnType<typeof useAudio>;
}

export function SerenadeScene({ audio }: SerenadeSceneProps) {
  const { state, dispatch } = useExperience();
  const reducedMotion = useReducedMotion();
  const [elapsed, setElapsed] = useState(reducedMotion ? 99 : 0);
  const playSerenade = audio.play;

  useEffect(() => {
    if (reducedMotion || !state.animationsEnabled) {
      setElapsed(99);
      return;
    }

    const timer = window.setInterval(() => setElapsed((value) => value + 1), 1000);
    return () => window.clearInterval(timer);
  }, [reducedMotion, state.animationsEnabled]);

  useEffect(() => {
    const voice = new Audio(publicAsset(experienceConfig.audio.voiceIntro));
    voice.preload = "metadata";
    const voiceTimer = window.setTimeout(() => void voice.play().catch(() => undefined), 800);
    const musicTimer = window.setTimeout(() => void playSerenade(), 4200);

    return () => {
      window.clearTimeout(voiceTimer);
      window.clearTimeout(musicTimer);
      voice.pause();
    };
  }, [playSerenade]);

  return (
    <main className="relative isolate overflow-hidden bg-transparent sm:min-h-dvh">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_8%,rgba(198,161,91,.12),transparent_38%)] sm:bg-[linear-gradient(180deg,rgba(7,8,18,.5),rgba(7,8,18,.18)_36%,rgba(7,8,18,.9)_88%),linear-gradient(90deg,rgba(7,8,18,.65),transparent_65%)]" />

      {state.animationsEnabled && elapsed >= 6 && (
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          {petals.map((petal) => (
            <span
              key={petal.id}
              className="falling-petal"
              style={{
                left: petal.left,
                animationDelay: petal.delay,
                animationDuration: petal.duration,
              }}
            />
          ))}
        </div>
      )}

      <section className="relative z-10 flex min-h-[34rem] flex-col items-center justify-start px-6 pb-6 pt-12 text-center sm:min-h-dvh sm:justify-center sm:px-8 sm:pb-24 sm:pt-24">
        <div className="w-full max-w-3xl">
          <div className="mb-7 text-gold sm:hidden" aria-hidden="true">
            <span className="mx-auto grid size-11 place-items-center rounded-full border border-gold/30 bg-gold/5 font-display text-4xl leading-none shadow-[0_0_24px_rgba(198,161,91,.2)]">
              ♡
            </span>
          </div>

          <AnimatePresence mode="wait">
            {elapsed < 8 && (
              <motion.div
                key="opening"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="mx-auto mb-5 flex w-fit items-center gap-2 rounded-full border border-white/10 bg-background/35 px-4 py-2 text-xs tracking-[0.18em] text-cream/80 backdrop-blur-lg"
              >
                <Music2 size={14} className="text-gold" />
                ESTA CANCIÓN ES PARA TI
              </motion.div>
            )}
          </AnimatePresence>

          {elapsed >= 8 && (
            <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2 }}>
              <p className="mx-auto mb-4 max-w-xs text-[0.7rem] font-semibold uppercase leading-relaxed tracking-[0.38em] text-gold sm:mb-3 sm:max-w-none sm:text-xs sm:leading-normal sm:tracking-[0.34em]">
                Mi lugar favorito siempre eres tú
              </p>
              <div className="mx-auto mb-5 flex max-w-52 items-center gap-3 text-gold/70 sm:hidden" aria-hidden="true">
                <span className="h-px flex-1 bg-gradient-to-r from-transparent to-gold/70" />
                <span className="font-display text-2xl">♡</span>
                <span className="h-px flex-1 bg-gradient-to-l from-transparent to-gold/70" />
              </div>
              <h1 className="bg-gradient-to-b from-white via-cream to-[#dfc17d] bg-clip-text font-display text-[4.6rem] leading-[0.9] text-transparent drop-shadow-[0_8px_24px_rgba(198,161,91,.18)] sm:bg-none sm:text-8xl sm:text-cream lg:text-9xl">
                {experienceConfig.girlfriendName}
              </h1>
            </motion.div>
          )}

          {elapsed >= 11 && (
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="mx-auto mt-5 max-w-xl font-display text-2xl italic leading-snug text-cream sm:mt-4 sm:text-3xl"
            >
              {experienceConfig.birthdayMessage}
            </motion.p>
          )}

          <div className="mt-8 min-h-14 sm:mt-8">
            {elapsed >= 14 && (
              <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}>
                <Button
                  onClick={() => dispatch({ type: "GO_TO", scene: "WELCOME" })}
                  className="min-h-14 w-full max-w-[20rem] font-display text-base shadow-[0_12px_38px_rgba(198,161,91,.26)] sm:w-auto sm:max-w-none sm:font-sans sm:text-sm"
                >
                  Comenzar nuestra historia <span aria-hidden="true">→</span>
                </Button>
              </motion.div>
            )}
          </div>

          {elapsed < 14 && !reducedMotion && (
            <button
              type="button"
              onClick={() => setElapsed(99)}
              className="mt-2 text-xs text-cream/55 underline decoration-white/20 underline-offset-4 transition hover:text-cream focus-visible:outline-2 focus-visible:outline-gold"
            >
              Mostrar mensaje ahora
            </button>
          )}

          {elapsed >= 14 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25 }}
              className="mt-10 sm:hidden"
            >
              <div className="flex items-center gap-3 text-gold/70" aria-hidden="true">
                <span className="h-px flex-1 bg-gradient-to-r from-transparent via-gold/70 to-gold/30" />
                <span className="text-xl">✦</span>
                <span className="h-px flex-1 bg-gradient-to-l from-transparent via-gold/70 to-gold/30" />
              </div>
              <p className="mt-5 text-[0.68rem] font-semibold uppercase tracking-[0.35em] text-gold">
                Una serenata para ti
              </p>
            </motion.div>
          )}
        </div>
      </section>

    </main>
  );
}
