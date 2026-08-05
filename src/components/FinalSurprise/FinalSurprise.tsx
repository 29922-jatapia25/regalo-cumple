import { lazy, Suspense, useRef, useState } from "react";
import { Gift, Heart, Play, RotateCcw } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { experienceConfig } from "../../config/experience.config";
import { useExperience } from "../../context/ExperienceContext";
import { Button } from "../common/Button";

const GiftVideo = lazy(() => import("./GiftVideo"));
const confetti = Array.from({ length: 34 }, (_, index) => ({
  id: index,
  left: `${(index * 29 + 4) % 100}%`,
  delay: `${(index % 10) * 0.08}s`,
  color: ["#c6a15b", "#d9a5ac", "#fff8f2", "#6f263d"][index % 4],
}));

export function FinalSurprise() {
  const { dispatch } = useExperience();
  const [progress, setProgress] = useState(0);
  const [opened, setOpened] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const timerRef = useRef<number | null>(null);

  const stopHold = () => {
    if (timerRef.current !== null) window.clearInterval(timerRef.current);
    timerRef.current = null;
    if (!opened) setProgress(0);
  };

  const startHold = () => {
    if (opened || timerRef.current !== null) return;
    const startedAt = performance.now();
    timerRef.current = window.setInterval(() => {
      const next = Math.min(100, ((performance.now() - startedAt) / 3000) * 100);
      setProgress(next);
      if (next >= 100) {
        if (timerRef.current !== null) window.clearInterval(timerRef.current);
        timerRef.current = null;
        setOpened(true);
      }
    }, 32);
  };

  return (
    <main className="relative isolate grid min-h-dvh overflow-hidden bg-background px-4 py-[max(2rem,env(safe-area-inset-top))] sm:px-6">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(111,38,61,.4),transparent_37%),linear-gradient(180deg,#111225,#0b0c18)]" />

      {opened && (
        <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden" aria-hidden="true">
          {confetti.map((piece) => (
            <span
              key={piece.id}
              className="confetti-piece"
              style={{ left: piece.left, animationDelay: piece.delay, backgroundColor: piece.color }}
            />
          ))}
        </div>
      )}

      <AnimatePresence mode="wait">
        {!opened ? (
          <motion.section
            key="closed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92 }}
            className="relative m-auto w-full max-w-xl text-center"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">La sorpresa final</p>
            <h1 className="mt-3 font-display text-4xl leading-tight text-cream sm:text-6xl">Guarda este instante</h1>
            <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-muted sm:text-base">
              Mantén presionado el corazón durante tres segundos. Algunas cosas bonitas merecen un poquito de paciencia.
            </p>

            <div className="relative mx-auto mt-10 grid size-48 place-items-center sm:size-56">
              <svg className="absolute inset-0 h-full w-full -rotate-90" viewBox="0 0 100 100" aria-hidden="true">
                <circle cx="50" cy="50" r="44" fill="none" stroke="rgba(255,255,255,.08)" strokeWidth="2" />
                <motion.circle
                  cx="50"
                  cy="50"
                  r="44"
                  fill="none"
                  stroke="#c6a15b"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  pathLength="100"
                  strokeDasharray="100"
                  animate={{ strokeDashoffset: 100 - progress }}
                />
              </svg>
              <button
                type="button"
                onPointerDown={startHold}
                onPointerUp={stopHold}
                onPointerCancel={stopHold}
                onPointerLeave={stopHold}
                onKeyDown={(event) => {
                  if ((event.key === " " || event.key === "Enter") && !event.repeat) {
                    event.preventDefault();
                    startHold();
                  }
                }}
                onKeyUp={(event) => {
                  if (event.key === " " || event.key === "Enter") stopHold();
                }}
                aria-label="Mantén presionado para abrir el regalo"
                className="final-heart grid size-32 touch-none place-items-center rounded-full border border-dusty-rose/25 bg-wine/35 text-dusty-rose shadow-[0_0_70px_rgba(111,38,61,.4)] outline-none transition hover:scale-105 focus-visible:ring-4 focus-visible:ring-gold/45 sm:size-36"
              >
                <Heart size={44} fill="currentColor" />
              </button>
            </div>
            <p className="mt-6 font-mono text-xs tabular-nums text-muted" aria-live="polite">
              {progress > 0 ? `${Math.round(progress)}%` : "MANTÉN PRESIONADO"}
            </p>
          </motion.section>
        ) : (
          <motion.section
            key="opened"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.8 }}
            className="relative z-30 m-auto w-full max-w-3xl py-10 text-center"
          >
            <motion.div
              initial={{ scale: 0.4, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 150, damping: 14 }}
              className="mx-auto grid size-16 place-items-center rounded-full border border-gold/35 bg-gold/12 text-gold"
            >
              <Gift size={26} />
            </motion.div>
            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.3em] text-gold">Feliz cumpleaños, mi vida</p>
            <h1 className="mx-auto mt-3 max-w-2xl font-display text-4xl leading-tight text-cream sm:text-6xl">
              {experienceConfig.finalGift.title}
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-muted sm:text-base">
              {experienceConfig.finalGift.description}
            </p>
            <p className="mt-6 font-display text-2xl italic text-dusty-rose sm:text-3xl">
              Te amo, {experienceConfig.girlfriendName}.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button onClick={() => setShowVideo((value) => !value)} className="w-full sm:w-auto">
                <Play size={17} /> {showVideo ? "Ocultar video" : "Ver nuestro video"}
              </Button>
              <Button
                variant="ghost"
                onClick={() => dispatch({ type: "GO_TO", scene: "WELCOME" })}
                className="w-full sm:w-auto"
              >
                <RotateCcw size={16} /> Volver a comenzar
              </Button>
            </div>

            {showVideo && (
              <div className="mt-8 text-left">
                <Suspense fallback={<div className="aspect-video animate-pulse rounded-2xl bg-white/5" />}>
                  <GiftVideo />
                </Suspense>
              </div>
            )}
          </motion.section>
        )}
      </AnimatePresence>
    </main>
  );
}
