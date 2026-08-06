import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type RefObject,
} from "react";

interface UseAudioOptions {
  fadeInSeconds?: number;
  initialVolume?: number;
}

export function useAudio(
  mediaRef: RefObject<HTMLMediaElement | null>,
  { fadeInSeconds = 2.5, initialVolume = 0.75 }: UseAudioOptions = {},
) {
  const fadeFrameRef = useRef<number | null>(null);
  const mutedRef = useRef(false);
  const volumeRef = useRef(initialVolume);
  const [isPlaying, setIsPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [volume, setVolumeState] = useState(initialVolume);
  const [blocked, setBlocked] = useState(false);
  const [unavailable, setUnavailable] = useState(false);

  useEffect(() => {
    const audio = mediaRef.current;
    if (!audio) return;

    audio.volume = 0;

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
    };
  }, [mediaRef]);

  const play = useCallback(async () => {
    const audio = mediaRef.current;
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
  }, [fadeInSeconds, mediaRef]);

  const pause = useCallback(() => mediaRef.current?.pause(), [mediaRef]);

  const toggleMute = useCallback(() => {
    setMuted((current) => {
      const next = !current;
      mutedRef.current = next;
      if (mediaRef.current) mediaRef.current.muted = next;
      return next;
    });
  }, [mediaRef]);

  const setVolume = useCallback((next: number) => {
    const normalized = Math.max(0, Math.min(1, next));
    volumeRef.current = normalized;
    setVolumeState(normalized);
    if (mediaRef.current) mediaRef.current.volume = normalized;
  }, [mediaRef]);

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
