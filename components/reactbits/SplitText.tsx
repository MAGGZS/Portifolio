"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { EASE } from "@/lib/motion";

/**
 * SplitText (referência: React Bits).
 * Quebra o texto em caracteres e revela em cascata.
 * Stagger curto — atraso longo faz a interface parecer lenta.
 */
export default function SplitText({
  text,
  className = "",
  charClassName = "",
  delay = 0,
  stagger = 0.028,
  from = "bottom",
  as = "span",
}: {
  text: string;
  className?: string;
  charClassName?: string;
  delay?: number;
  stagger?: number;
  from?: "bottom" | "top" | "blur";
  as?: "span" | "h1" | "h2" | "h3" | "p";
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-12% 0px" });
  const reduce = useReducedMotion();
  const Tag = motion[as] as typeof motion.span;

  const hidden =
    from === "blur"
      ? { opacity: 0, filter: "blur(8px)", y: 6 }
      : { opacity: 0, y: from === "top" ? -26 : 26, filter: "blur(4px)" };

  return (
    <Tag ref={ref} className={className} aria-label={text}>
      {text.split("").map((char, i) => (
        <motion.span
          key={`${char}-${i}`}
          aria-hidden
          className={`inline-block whitespace-pre will-change-transform ${charClassName}`}
          initial={reduce ? { opacity: 0 } : hidden}
          animate={
            inView
              ? { opacity: 1, y: 0, filter: "blur(0px)" }
              : reduce
                ? { opacity: 0 }
                : hidden
          }
          transition={{
            duration: 0.55,
            ease: EASE.out,
            delay: delay + i * (reduce ? 0 : stagger),
          }}
        >
          {char}
        </motion.span>
      ))}
    </Tag>
  );
}
