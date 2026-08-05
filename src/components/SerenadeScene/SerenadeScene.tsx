import { useEffect, useState } from "react";
import { Music2 } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { experienceConfig } from "../../config/experience.config";
import { useExperience } from "../../context/ExperienceContext";
import { useAudio } from "../../hooks/useAudio";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { publicAsset } from "../../utils/publicAsset";
import { AudioControls } from "../common/AudioControls";
import { Button } from "../common/Button";

const petals = Array.from({ length: 16 }, (_, index) => ({
  id: index,
  left: `${(index * 41 + 9) % 98}%`,
  delay: `${(index % 8) * 0.7}s`,
  duration: `${8 + (index % 5)}s`,
}));

export function SerenadeScene() {
  const { state, dispatch } = useExperience();
  const reducedMotion = useReducedMotion();
  const [elapsed, setElapsed] = useState(reducedMotion ? 99 : 0);
  const audio = useAudio(publicAsset(experienceConfig.audio.serenade));
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
    <main className="relative isolate min-h-dvh overflow-hidden bg-background">
      <motion.img
        src={publicAsset(experienceConfig.coverImage)}
        alt="Serenata nocturna bajo un cielo estrellado"
        className="absolute inset-0 h-full w-full object-cover object-[68%_center] sm:object-center"
        initial={{ scale: 1.04 }}
        animate={{ scale: state.animationsEnabled && !reducedMotion ? 1.12 : 1.04 }}
        transition={{ duration: 24, ease: "linear" }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,8,18,.5),rgba(7,8,18,.18)_36%,rgba(7,8,18,.9)_88%),linear-gradient(90deg,rgba(7,8,18,.65),transparent_65%)]" />

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

      <section className="relative z-10 flex min-h-dvh flex-col items-center justify-end px-5 pb-[calc(6.5rem+env(safe-area-inset-bottom))] pt-24 text-center sm:justify-center sm:px-8 sm:pb-24">
        <div className="w-full max-w-3xl">
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
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.34em] text-gold">
                Mi lugar favorito siempre eres tú
              </p>
              <h1 className="font-display text-6xl leading-none text-cream drop-shadow-2xl sm:text-8xl lg:text-9xl">
                {experienceConfig.girlfriendName}
              </h1>
            </motion.div>
          )}

          {elapsed >= 11 && (
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="mx-auto mt-4 max-w-xl font-display text-2xl italic leading-snug text-cream sm:text-3xl"
            >
              {experienceConfig.birthdayMessage}
            </motion.p>
          )}

          <div className="mt-8 min-h-14">
            {elapsed >= 14 && (
              <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}>
                <Button onClick={() => dispatch({ type: "GO_TO", scene: "WELCOME" })}>
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
        </div>
      </section>

      {audio.blocked && !audio.unavailable && (
        <Button
          onClick={() => void audio.play()}
          className="fixed left-1/2 top-20 z-50 -translate-x-1/2 whitespace-nowrap"
        >
          <Music2 size={17} /> Reproducir serenata
        </Button>
      )}

      <AudioControls
        {...audio}
        onPlay={() => void audio.play()}
        onPause={audio.pause}
        onToggleMute={audio.toggleMute}
        onVolume={audio.setVolume}
      />
    </main>
  );
}
