import { Pause, Play, Volume2, VolumeX } from "lucide-react";

interface AudioControlsProps {
  isPlaying: boolean;
  muted: boolean;
  volume: number;
  unavailable: boolean;
  onPlay: () => void;
  onPause: () => void;
  onToggleMute: () => void;
  onVolume: (value: number) => void;
}

export function AudioControls({
  isPlaying,
  muted,
  volume,
  unavailable,
  onPlay,
  onPause,
  onToggleMute,
  onVolume,
}: AudioControlsProps) {
  if (unavailable) {
    return (
      <div className="fixed bottom-[max(0.8rem,env(safe-area-inset-bottom))] left-1/2 z-50 -translate-x-1/2 rounded-full border border-white/10 bg-background/90 px-4 py-2 text-xs text-muted backdrop-blur-xl">
        Agrega serenata.mp4 en public/video para escuchar la música
      </div>
    );
  }

  return (
    <div
      className="fixed bottom-[max(0.8rem,env(safe-area-inset-bottom))] left-1/2 z-50 flex -translate-x-1/2 items-center gap-1 rounded-full border border-white/10 bg-background/85 p-1.5 text-cream shadow-2xl backdrop-blur-xl sm:left-auto sm:right-5 sm:translate-x-0"
      aria-label="Controles de la serenata"
    >
      <button
        type="button"
        onClick={isPlaying ? onPause : onPlay}
        aria-label={isPlaying ? "Pausar serenata" : "Reanudar serenata"}
        className="grid size-10 place-items-center rounded-full transition hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-gold"
      >
        {isPlaying ? <Pause size={17} /> : <Play size={17} />}
      </button>
      <button
        type="button"
        onClick={onToggleMute}
        aria-label={muted ? "Activar sonido" : "Silenciar"}
        className="grid size-10 place-items-center rounded-full transition hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-gold"
      >
        {muted ? <VolumeX size={17} /> : <Volume2 size={17} />}
      </button>
      <input
        aria-label="Volumen"
        type="range"
        min="0"
        max="1"
        step="0.05"
        value={volume}
        onChange={(event) => onVolume(Number(event.target.value))}
        className="audio-range mx-2 w-16 sm:w-24"
      />
    </div>
  );
}
