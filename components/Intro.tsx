"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { EASE } from "@/lib/motion";
import NameBlock from "./NameBlock";

export const NAME_LAYOUT_ID = "magdiel-eric-name";

/** Transição que leva o nome da capa até o hero. */
export const NAME_TRANSITION = {
  duration: 1.05,
  ease: EASE.inOut,
} as const;

/**
 * Capa. Fica parada com o nome inteiro na tela e só sai quando a pessoa
 * clica em "Conhecer mais" — e aí o nome, que é o mesmo elemento, viaja
 * para o lugar dele no início.
 */
export default function Intro({
  done,
  onDone,
}: {
  done: boolean;
  onDone: () => void;
}) {
  // Trava a rolagem enquanto a capa está de pé.
  useEffect(() => {
    if (done) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [done]);

  return (
    <>
      {/* Fundo da capa: some sozinho, sem arrastar o nome junto */}
      <AnimatePresence>
        {!done && (
          <motion.div
            className="grain scanlines fixed inset-0 z-[98] bg-ink-950"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.75, ease: EASE.out }}
          >
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(70% 55% at 50% 45%, rgba(122,12,18,0.22) 0%, rgba(5,5,5,0) 70%)",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* O nome e o botão. Enquanto a capa está de pé, moram aqui. */}
      {!done && (
        <div className="fixed inset-0 z-[99] flex flex-col items-center justify-center gap-10 px-4">
          <motion.div
            layoutId={NAME_LAYOUT_ID}
            transition={NAME_TRANSITION}
          >
            <NameBlock />
          </motion.div>

          <motion.button
            type="button"
            onClick={onDone}
            className="group relative flex items-center gap-4 overflow-hidden rounded-full border border-ink-500 px-7 py-3.5 transition-[transform,border-color] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:border-blood-500 active:scale-[0.97]"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE.out, delay: 0.35 }}
          >
            {/* Preenchimento que sobe por máscara */}
            <span
              aria-hidden
              className="absolute inset-0 bg-blood-600 transition-[clip-path] duration-[420ms] ease-[cubic-bezier(0.23,1,0.32,1)] [clip-path:inset(100%_0_0_0)] group-hover:[clip-path:inset(0%_0_0_0)]"
            />
            <span className="relative font-mono text-[11px] uppercase tracking-[0.3em] text-bone">
              Conhecer mais
            </span>
            <span
              aria-hidden
              className="relative text-blood-300 transition-[transform,color] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-x-1 group-hover:text-bone"
            >
              ↓
            </span>
          </motion.button>
        </div>
      )}
    </>
  );
}
