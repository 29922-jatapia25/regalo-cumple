import { useCallback, useState } from "react";

interface PreloadState {
  loading: boolean;
  progress: number;
}

const settleWithin = (promise: Promise<void>, timeout = 5000) =>
  Promise.race([
    promise,
    new Promise<void>((resolve) => window.setTimeout(resolve, timeout)),
  ]);

export function usePreloadMedia() {
  const [state, setState] = useState<PreloadState>({
    loading: false,
    progress: 0,
  });

  const preload = useCallback(async (imageSrc: string, audioSrc: string) => {
    setState({ loading: true, progress: 8 });

    const imagePromise = new Promise<void>((resolve) => {
      const image = new Image();
      image.onload = () => resolve();
      image.onerror = () => resolve();
      image.src = imageSrc;
    });

    const audioPromise = new Promise<void>((resolve) => {
      const audio = new Audio();
      const finish = () => resolve();
      audio.preload = "metadata";
      audio.addEventListener("canplaythrough", finish, { once: true });
      audio.addEventListener("error", finish, { once: true });
      audio.src = audioSrc;
      audio.load();
    });

    await settleWithin(imagePromise);
    setState({ loading: true, progress: 58 });
    await settleWithin(audioPromise);
    setState({ loading: false, progress: 100 });
  }, []);

  return { ...state, preload };
}
