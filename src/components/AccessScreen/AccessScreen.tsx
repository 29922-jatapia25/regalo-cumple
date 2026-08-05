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
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!key.trim() || status === "loading") return;

    setStatus("loading");
    await new Promise((resolve) => window.setTimeout(resolve, 650));

    try {
      const candidate = await sha256(key.trim());
      if (candidate === experienceConfig.accessKeyHash) {
        dispatch({ type: "GO_TO", scene: "LOADING" });
        return;
      }
    } catch {
      // La experiencia sigue respondiendo con un mensaje amable si crypto falla.
    }

    setStatus("error");
  };

  return (
    <main className="relative grid min-h-dvh overflow-hidden bg-background px-4 py-20 sm:px-6">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(111,38,61,.22),transparent_35%),linear-gradient(160deg,#121329_0%,#0f1020_55%,#171124_100%)]" />
      <DecorativeBackground dense />

      <motion.section
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="relative m-auto w-full max-w-md rounded-[2rem] border border-white/10 bg-white/[0.055] p-5 shadow-[0_35px_100px_rgba(0,0,0,.42)] backdrop-blur-2xl sm:p-9"
        aria-labelledby="access-title"
      >
        <div className="mb-7 flex items-center justify-between">
          <div className="grid size-12 place-items-center rounded-full border border-gold/25 bg-gold/10 text-gold">
            <Sparkles size={20} aria-hidden="true" />
          </div>
          <span className="flex items-center gap-1.5 text-[0.65rem] uppercase tracking-[0.23em] text-muted">
            <LockKeyhole size={12} aria-hidden="true" />
            Solo para ti
          </span>
        </div>

        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-gold">
          Un pequeño secreto
        </p>
        <h1
          id="access-title"
          className="max-w-sm font-display text-[2.55rem] leading-[1.04] text-cream sm:text-5xl"
        >
          Preparé algo especial solamente para ti
        </h1>
        <p className="mt-4 text-sm leading-6 text-muted sm:text-base">
          Ingresa nuestra clave especial y deja que comience la sorpresa.
        </p>

        <form onSubmit={handleSubmit} className="mt-8" noValidate>
          <label
            htmlFor="special-key"
            className="mb-2 block text-xs font-medium uppercase tracking-[0.17em] text-muted"
          >
            Nuestra clave
          </label>
          <div className="relative">
            <KeyRound
              size={17}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gold"
              aria-hidden="true"
            />
            <input
              id="special-key"
              type="password"
              value={key}
              onChange={(event) => {
                setKey(event.target.value);
                if (status === "error") setStatus("idle");
              }}
              autoComplete="off"
              placeholder="Escríbela aquí…"
              aria-invalid={status === "error"}
              aria-describedby="access-feedback"
              className="min-h-14 w-full rounded-2xl border border-white/12 bg-background/45 py-3 pl-12 pr-4 text-base text-cream outline-none transition placeholder:text-muted/45 focus:border-gold/65 focus:ring-4 focus:ring-gold/10"
            />
          </div>

          <div id="access-feedback" className="min-h-12 pt-2" aria-live="polite">
            {status === "error" && (
              <motion.p
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-sm leading-5 text-dusty-rose"
              >
                Esa no es nuestra clave, amor. Piensa en ese detalle que solo
                nosotros conocemos.
              </motion.p>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={!key.trim() || status === "loading"}>
            {status === "loading" ? (
              <>
                <LoaderCircle className="animate-spin" size={17} />
                Preparando tu sorpresa
              </>
            ) : (
              <>
                Abrir mi sorpresa
                <span aria-hidden="true">→</span>
              </>
            )}
          </Button>
        </form>
      </motion.section>

      <p className="relative mt-auto pt-8 text-center text-[0.65rem] uppercase tracking-[0.22em] text-muted/55">
        Hecho con paciencia, recuerdos y mucho amor
      </p>
    </main>
  );
}
