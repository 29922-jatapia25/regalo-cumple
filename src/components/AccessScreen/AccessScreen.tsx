import { useState, type FormEvent } from "react";
import { KeyRound, LoaderCircle, LockKeyhole, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { experienceConfig } from "../../config/experience.config";
import { useExperience } from "../../context/ExperienceContext";
import { sha256 } from "../../utils/hash";
import { Button } from "../common/Button";
import { DecorativeBackground } from "../common/DecorativeBackground";

export function AccessScreen() {
  const { dispatch } = useExperience();
  const [key, setKey] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error" | "success">(
    "idle",
  );

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!key.trim() || status === "loading") return;

    setStatus("loading");
    await new Promise((resolve) => window.setTimeout(resolve, 650));

    try {
      const candidate = await sha256(key.trim());
      if (candidate === experienceConfig.accessKeyHash) {
        setStatus("success");
        await new Promise((resolve) => window.setTimeout(resolve, 550));
        dispatch({ type: "GO_TO", scene: "LOADING" });
        return;
      }
    } catch {
      // La experiencia sigue respondiendo con un mensaje amable si crypto falla.
    }

    setStatus("error");
  };

  return (
    <main className="relative grid min-h-dvh overflow-x-hidden bg-background px-4 py-10 sm:px-6 sm:py-14 lg:py-10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(111,38,61,.22),transparent_35%),linear-gradient(160deg,#121329_0%,#0f1020_55%,#171124_100%)]" />
      <DecorativeBackground dense />

      <motion.section
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="relative m-auto w-full max-w-4xl overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.055] p-5 shadow-[0_35px_100px_rgba(0,0,0,.42)] backdrop-blur-2xl sm:p-8 lg:p-10"
        aria-labelledby="access-title"
      >
        {status === "success" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: [0, 1, 0], scale: [0.96, 1.02, 1.05] }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="pointer-events-none absolute inset-0 rounded-[2rem] border border-gold/70 shadow-[inset_0_0_70px_rgba(198,161,91,.2)]"
            aria-hidden="true"
          />
        )}

        <div className="mb-8 flex items-center justify-between lg:mb-10">
          <div className="grid size-12 place-items-center rounded-full border border-gold/25 bg-gold/10 text-gold">
            <Sparkles size={20} aria-hidden="true" />
          </div>
          <span className="flex items-center gap-1.5 text-[0.65rem] uppercase tracking-[0.23em] text-muted">
            <LockKeyhole size={12} aria-hidden="true" />
            Solo para {experienceConfig.girlfriendName}
          </span>
        </div>

        <div className="grid items-center gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
          <div className="lg:pb-4">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-gold">
              Un pequeño secreto
            </p>
            <h1
              id="access-title"
              className="max-w-md font-display text-[2.65rem] leading-[1.04] text-cream sm:text-5xl lg:text-6xl"
            >
              Antes de comenzar…
            </h1>
            <p className="mt-5 max-w-md text-sm leading-6 text-muted sm:text-base sm:leading-7">
              Hay una respuesta que solo tú conoces. Escríbela para descubrir
              lo que preparé con tanto cariño para ti.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="rounded-[1.75rem] border border-gold/15 bg-background/35 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,.05)] sm:p-7"
            noValidate
          >
            <p className="mb-2 text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-gold">
              La pregunta secreta
            </p>
            <label
              htmlFor="special-key"
              className="mb-5 block font-display text-2xl leading-tight text-cream sm:text-[1.75rem]"
            >
              ¿Cuál es tu color favorito?
            </label>
            <div className="relative">
              <KeyRound
                size={17}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gold"
                aria-hidden="true"
              />
              <input
                id="special-key"
                type="text"
                value={key}
                onChange={(event) => {
                  setKey(event.target.value);
                  if (status === "error") setStatus("idle");
                }}
                autoComplete="off"
                placeholder="Tu respuesta secreta…"
                aria-invalid={status === "error"}
                aria-describedby="access-feedback"
                className="min-h-14 w-full rounded-2xl border border-white/12 bg-background/60 py-3 pl-12 pr-4 text-base text-cream outline-none transition placeholder:text-muted/45 focus:border-gold/65 focus:ring-4 focus:ring-gold/10"
              />
            </div>

            <div id="access-feedback" className="min-h-12 pt-2" aria-live="polite">
              {status === "error" && (
                <motion.p
                  initial={{ opacity: 0, x: -5 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-sm leading-5 text-dusty-rose"
                >
                  Esa no es la respuesta, amor. Piensa en ese color especial que
                  solo nosotros conocemos.
                </motion.p>
              )}
              {status === "success" && (
                <motion.p
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm font-medium leading-5 text-gold"
                >
                  Sí, ese es. La sorpresa es toda tuya ✨
                </motion.p>
              )}
            </div>

            <Button
              type="submit"
              variant="romantic"
              className="w-full"
              disabled={!key.trim() || status === "loading" || status === "success"}
            >
              {status === "loading" ? (
                <>
                  <LoaderCircle className="animate-spin" size={17} />
                  Preparando tu sorpresa
                </>
              ) : status === "success" ? (
                <>
                  Respuesta correcta
                  <Sparkles size={16} aria-hidden="true" />
                </>
              ) : (
                <>
                  Descubrir mi sorpresa
                  <span aria-hidden="true">→</span>
                </>
              )}
            </Button>
          </form>
        </div>
      </motion.section>

      <p className="relative mt-auto pt-8 text-center text-[0.65rem] uppercase tracking-[0.22em] text-muted/55">
        Hecho con paciencia, recuerdos y mucho amor
      </p>
    </main>
  );
}
