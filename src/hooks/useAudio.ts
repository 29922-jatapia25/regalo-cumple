import { useCallback, useEffect, useRef, useState } from "react";

interface UseAudioOptions {
  fadeInSeconds?: number;
  initialVolume?: number;
}

export function useAudio(
  src: string,
  { fadeInSeconds = 2.5, initialVolume = 0.75 }: UseAudioOptions = {},
) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeFrameRef = useRef<number | null>(null);
  const mutedRef = useRef(false);
  const volumeRef = useRef(initialVolume);
  const [isPlaying, setIsPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [volume, setVolumeState] = useState(initialVolume);
  const [blocked, setBlocked] = useState(false);
  const [unavailable, setUnavailable] = useState(false);

  useEffect(() => {
    const audio = new Audio(src);
    audio.preload = "auto";
    audio.loop = true;
    audio.volume = 0;
    audioRef.current = audio;

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onError = () => setUnavailable(true);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("error", onError);

    return () => {
      if (fadeFrameRef.current) cancelAnimationFrame(fadeFrameRef.current);
      audio.pause();
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("error", onError);
      audioRef.current = null;
    };
  }, [src]);

  const play = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return false;

    try {
      audio.volume = 0;
      await audio.play();
      setBlocked(false);
      setUnavailable(false);
      const startedAt = performance.now();
      const fade = (now: number) => {
        const progress = Math.min(
          (now - startedAt) / (fadeInSeconds * 1000),
          1,
        );
        audio.volume = mutedRef.current ? 0 : volumeRef.current * progress;
        if (progress < 1) fadeFrameRef.current = requestAnimationFrame(fade);
      };
      fadeFrameRef.current = requestAnimationFrame(fade);
      return true;
    } catch {
      setBlocked(true);
      return false;
    }
  }, [fadeInSeconds]);

  const pause = useCallback(() => audioRef.current?.pause(), []);

  const toggleMute = useCallback(() => {
    setMuted((current) => {
      const next = !current;
      mutedRef.current = next;
      if (audioRef.current) audioRef.current.muted = next;
      return next;
    });
  }, []);

  const setVolume = useCallback((next: number) => {
    const normalized = Math.max(0, Math.min(1, next));
    volumeRef.current = normalized;
    setVolumeState(normalized);
    if (audioRef.current) audioRef.current.volume = normalized;
  }, []);

  return {
    isPlaying,
    muted,
    volume,
    blocked,
    unavailable,
    play,
    pause,
    toggleMute,
    setVolume,
  };
}
