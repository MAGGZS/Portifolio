"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useInView, useMotionValue, useSpring, useReducedMotion } from "motion/react";
import { EASE, IN_VIEW, blockReveal, lineReveal, stagger, wipeReveal } from "@/lib/motion";

/* ------------------------------------------------------------------ */
/* Texto mascarado: cada linha sobe por trás de um overflow:hidden.    */
/* É o reveal clássico de abertura de vídeo, sem nada surgindo do nada.*/
/* ------------------------------------------------------------------ */

export function MaskText({
  lines,
  className = "",
  lineClassName = "",
  delay = 0,
  as = "h2",
}: {
  lines: string[];
  className?: string;
  lineClassName?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "p" | "div";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, IN_VIEW);
  const reduce = useReducedMotion();
  const Tag = motion[as] as typeof motion.div;

  return (
    <Tag
      ref={ref}
      className={className}
      variants={stagger(0.07, delay)}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
    >
      {lines.map((line, i) => (
        <span key={i} className={`mask-line ${lineClassName}`}>
          <motion.span
            className="block"
            custom={i}
            variants={reduce ? { hidden: { opacity: 0 }, show: { opacity: 1 } } : lineReveal}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

/* ------------------------------------------------------------------ */
/* Bloco genérico com entrada suave (nunca de scale(0)).               */
/* ------------------------------------------------------------------ */

export function Reveal({
  children,
  index = 0,
  className = "",
  variant = "block",
}: {
  children: ReactNode;
  index?: number;
  className?: string;
  variant?: "block" | "wipe";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, IN_VIEW);

  return (
    <motion.div
      ref={ref}
      className={className}
      custom={index}
      variants={variant === "wipe" ? wipeReveal : blockReveal}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Contador que roda ao entrar em tela.                                */
/* ------------------------------------------------------------------ */

export function CountUp({
  to,
  suffix = "",
  duration = 1400,
}: {
  to: number;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20% 0px" });
  const [value, setValue] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setValue(to);
      return;
    }

    let frame = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      // ease-out forte: sai rápido, assenta devagar
      const eased = 1 - Math.pow(1 - t, 4);
      setValue(Math.round(to * eased));
      if (t < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, to, duration, reduce]);

  return (
    <span ref={ref} className="tabular-nums">
      {value}
      {suffix}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Botão magnético: o alvo persegue o ponteiro com mola.               */
/* Decorativo — desligado em toque e em movimento reduzido.            */
/* ------------------------------------------------------------------ */

export function Magnetic({
  children,
  strength = 0.35,
  className = "",
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.6 });

  const onMove = (e: React.PointerEvent) => {
    if (reduce || e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      onPointerMove={onMove}
      onPointerLeave={reset}
      style={{ x: sx, y: sy }}
    >
      {children}
    </motion.div>
  );
}
