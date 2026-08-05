import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { photos } from "../../data/photos";
import { publicAsset } from "../../utils/publicAsset";
import { SectionHeading } from "../common/SectionHeading";

export function PolaroidGallery() {
  const [selected, setSelected] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const activePhoto = selected === null ? null : photos[selected];

  const goPrevious = () =>
    setSelected((current) =>
      current === null ? null : (current - 1 + photos.length) % photos.length,
    );
  const goNext = () =>
    setSelected((current) =>
      current === null ? null : (current + 1) % photos.length,
    );

  useEffect(() => {
    if (selected === null) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelected(null);
      if (event.key === "ArrowLeft") goPrevious();
      if (event.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [selected]);

  return (
    <section id="fotos" className="scroll-mt-24 overflow-hidden bg-cream px-4 py-20 text-background sm:px-6 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="[&_h2]:!text-background [&_p]:!text-wine/80">
          <SectionHeading
            eyebrow="Instantes para volver"
            title="Nuestros recuerdos"
            description="Toca una fotografía para mirarla con calma. Estos ejemplos están listos para ser reemplazados por sus momentos reales."
          />
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-4">
          {photos.map((photo, index) => (
            <motion.button
              key={photo.id}
              type="button"
              onClick={() => setSelected(index)}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              whileHover={{ y: -8, rotate: 0, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.35 }}
              style={{ rotate: `${photo.rotation}deg` }}
              aria-label={`Abrir fotografía: ${photo.caption}`}
              className="group rounded-sm bg-white p-2 pb-4 text-left shadow-[0_15px_35px_rgba(39,28,32,.15)] outline-none transition focus-visible:ring-4 focus-visible:ring-wine/30 sm:p-3 sm:pb-6"
            >
              <div className="aspect-[4/5] overflow-hidden bg-surface/10">
                <img
                  src={publicAsset(photo.src)}
                  alt={photo.alt}
                  loading="lazy"
                  className="h-full w-full object-cover saturate-[.82] transition duration-500 group-hover:scale-105 group-hover:saturate-100"
                />
              </div>
              <p className="mt-3 line-clamp-2 font-display text-sm leading-snug text-background sm:mt-4 sm:text-lg">
                {photo.caption}
              </p>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {activePhoto && (
          <motion.div
            className="fixed inset-0 z-[80] grid place-items-center bg-[#080910]/92 p-3 backdrop-blur-xl sm:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={(event) => {
              if (event.currentTarget === event.target) setSelected(null);
            }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="photo-caption"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 18 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="relative w-full max-w-4xl"
            >
              <button
                ref={closeRef}
                type="button"
                onClick={() => setSelected(null)}
                aria-label="Cerrar fotografía"
                className="absolute right-2 top-2 z-10 grid size-11 place-items-center rounded-full bg-background/75 text-cream backdrop-blur transition hover:bg-background focus-visible:outline-2 focus-visible:outline-gold sm:-right-4 sm:-top-4"
              >
                <X size={20} />
              </button>

              <div className="overflow-hidden rounded-[1.4rem] border border-white/10 bg-surface shadow-2xl sm:grid sm:grid-cols-[1.4fr_.6fr] sm:rounded-[2rem]">
                <div className="flex max-h-[67dvh] min-h-[50dvh] bg-black/30 sm:max-h-[78dvh]">
                  <img
                    key={activePhoto.id}
                    src={publicAsset(activePhoto.src)}
                    alt={activePhoto.alt}
                    className="h-full max-h-[67dvh] w-full object-contain sm:max-h-[78dvh]"
                  />
                </div>
                <div className="flex flex-col justify-between p-5 text-cream sm:p-7">
                  <div>
                    <p className="text-xs uppercase tracking-[0.22em] text-gold">
                      Foto {Number(selected) + 1} de {photos.length}
                    </p>
                    <p id="photo-caption" className="mt-3 font-display text-2xl leading-tight sm:text-3xl">
                      {activePhoto.caption}
                    </p>
                  </div>
                  <div className="mt-6 flex gap-2">
                    <button
                      type="button"
                      onClick={goPrevious}
                      aria-label="Fotografía anterior"
                      className="grid size-12 place-items-center rounded-full border border-white/15 transition hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-gold"
                    >
                      <ChevronLeft />
                    </button>
                    <button
                      type="button"
                      onClick={goNext}
                      aria-label="Fotografía siguiente"
                      className="grid size-12 place-items-center rounded-full border border-white/15 transition hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-gold"
                    >
                      <ChevronRight />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
