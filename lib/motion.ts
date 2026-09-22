import type { Transition, Variants } from "motion/react";

/** Curvas fortes — as nativas do CSS são fracas demais para UI com presença. */
export const EASE = {
  out: [0.23, 1, 0.32, 1] as const,
  inOut: [0.77, 0, 0.175, 1] as const,
  drawer: [0.32, 0.72, 0, 1] as const,
};

export const SPRING_SOFT: Transition = { type: "spring", duration: 0.6, bounce: 0.18 };
export const SPRING_CURSOR: Transition = { type: "spring", stiffness: 520, damping: 42, mass: 0.6 };

/** Reveal de linha mascarada: o texto sobe por trás de um overflow:hidden. */
export const lineReveal: Variants = {
  hidden: { y: "110%" },
  show: (i: number = 0) => ({
    y: "0%",
    transition: { duration: 0.85, ease: EASE.out, delay: 0.06 * i },
  }),
};

/** Entrada padrão de bloco. Nunca de scale(0) — nada surge do nada. */
export const blockReveal: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.98, filter: "blur(6px)" },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: EASE.out, delay: 0.05 * i },
  }),
};

/** Reveal em clip-path, como uma máscara de wipe no After Effects. */
export const wipeReveal: Variants = {
  hidden: { clipPath: "inset(0 0 100% 0)", opacity: 0.4 },
  show: (i: number = 0) => ({
    clipPath: "inset(0 0 0% 0)",
    opacity: 1,
    transition: { duration: 0.9, ease: EASE.inOut, delay: 0.07 * i },
  }),
};

export const stagger = (staggerChildren = 0.06, delayChildren = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren, delayChildren } },
});

export const IN_VIEW = { once: true, margin: "-12% 0px -12% 0px" } as const;
