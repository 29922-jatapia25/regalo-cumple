import { useEffect, useRef, useState, type CSSProperties } from "react";
import { RotateCcw, X } from "lucide-react";
import { createPortal } from "react-dom";
import { experienceConfig } from "../../config/experience.config";
import { publicAsset } from "../../utils/publicAsset";

const ducks = Array.from({ length: 72 }, (_, index) => ({
  id: index,
  emoji: index % 6 === 0 ? "🦆" : "🐥",
  left: `${(index * 37 + (index % 5) * 7) % 100}%`,
  delay: `${(index % 18) * 0.07}s`,
  duration: `${2.3 + (index % 7) * 0.2}s`,
  size: `${1.35 + (index % 5) * 0.34}rem`,
  drift: `${((index * 29) % 140) - 70}px`,
  spin: `${index % 2 === 0 ? 540 : -540}deg`,
}));

type DuckStyle = CSSProperties & {
  "--duck-drift": string;
  "--duck-spin": string;
};

interface GiftVideoProps {
  onClose: () => void;
}

export default function GiftVideo({ onClose }: GiftVideoProps) {
  const [unavailable, setUnavailable] = useState(false);
  const [celebrating, setCelebrating] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const celebrationStartedRef = useRef(false);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  const startCelebration = () => {
    if (celebrationStartedRef.current) return;
    celebrationStartedRef.current = true;
    setCelebrating(true);
  };

  const replayVideo = () => {
    setCelebrating(false);
    celebrationStartedRef.current = false;
    if (!videoRef.current) return;

    videoRef.current.currentTime = 0;
    void videoRef.current.play();
  };

  if (unavailable) {
    return createPortal(
      <div className="fixed inset-0 z-[140] grid place-items-center bg-[#080910]/95 p-5 backdrop-blur-xl" role="dialog" aria-modal="true">
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar video"
          className="absolute right-4 top-4 grid size-12 place-items-center rounded-full border border-white/15 bg-background/80 text-cream"
        >
          <X />
        </button>
        <p className="max-w-lg rounded-2xl border border-white/10 bg-white/5 p-6 text-sm leading-6 text-muted">
          No se pudo reproducir el video <strong className="text-cream">public/video/sorpresa-final.mp4</strong>.
        </p>
      </div>,
      document.body,
    );
  }

  return createPortal(
    <div
      className="fixed inset-0 z-[140] grid place-items-center overflow-hidden bg-[#05060c]/96 p-2 backdrop-blur-xl sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label="Video de la sorpresa final"
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Cerrar video"
        className="absolute right-3 top-3 z-10 grid size-12 place-items-center rounded-full border border-white/15 bg-background/80 text-cream shadow-xl backdrop-blur transition hover:bg-surface focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold sm:right-6 sm:top-6"
      >
        <X size={23} />
      </button>

      <video
        ref={videoRef}
        controls
        playsInline
        preload="metadata"
        onEnded={startCelebration}
        onTimeUpdate={(event) => {
          const { currentTime, duration } = event.currentTarget;
          if (Number.isFinite(duration) && duration > 0 && duration - currentTime <= 0.2) {
            startCelebration();
          }
        }}
        onPlay={() => {
          if (!videoRef.current || videoRef.current.currentTime < videoRef.current.duration - 0.5) {
            celebrationStartedRef.current = false;
            setCelebrating(false);
          }
        }}
        onError={() => setUnavailable(true)}
        className="h-[88dvh] w-full max-w-6xl rounded-[1.5rem] border border-white/10 bg-black object-contain shadow-[0_25px_100px_rgba(0,0,0,.75)]"
      >
        <source src={publicAsset(experienceConfig.finalGift.video)} type="video/mp4" />
        Tu navegador no puede reproducir este video.
      </video>

      {celebrating && (
          <div
            className="birthday-duck-shower fixed inset-0 z-[150] grid place-items-center overflow-hidden px-5 text-center"
            role="status"
            aria-live="assertive"
          >
            <div className="absolute inset-0" aria-hidden="true">
              {ducks.map((duck) => (
                <span
                  key={duck.id}
                  className="birthday-duck"
                  style={
                    {
                      left: duck.left,
                      animationDelay: duck.delay,
                      animationDuration: duck.duration,
                      fontSize: duck.size,
                      "--duck-drift": duck.drift,
                      "--duck-spin": duck.spin,
                    } as DuckStyle
                  }
                >
                  {duck.emoji}
                </span>
              ))}
            </div>

            <div className="birthday-message relative z-10 max-w-xl rounded-[2rem] border border-gold/40 bg-background/85 px-6 py-9 shadow-[0_25px_100px_rgba(0,0,0,.65)] backdrop-blur-xl sm:px-12 sm:py-12">
              <p className="text-5xl" aria-hidden="true">🐥🎂🐥</p>
              <p className="mt-5 text-xs font-bold uppercase tracking-[0.3em] text-gold">Una última sorpresa</p>
              <h2 className="mt-3 font-display text-4xl leading-tight text-cream sm:text-6xl">
                ¡Feliz cumpleaños, {experienceConfig.girlfriendName}!
              </h2>
              <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-muted sm:text-base">
                Que tu vida esté siempre llena de amor, alegría y muchísimos patitos felices.
              </p>
              <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={replayVideo}
                  className="flex items-center justify-center gap-2 rounded-full border border-gold/45 bg-gold/15 px-5 py-3 text-sm font-semibold text-cream transition hover:bg-gold/25 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
                >
                  <RotateCcw size={17} /> Repetir el video
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-cream transition hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
                >
                  <X size={17} /> Cerrar
                </button>
              </div>
            </div>
          </div>
      )}
    </div>,
    document.body,
  );
}
