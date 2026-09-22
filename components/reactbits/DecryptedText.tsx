"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&/\\*+-<>";

/**
 * DecryptedText (referência: React Bits).
 * O texto embaralha e vai assentando letra a letra, como um scrub de timecode.
 * Dispara ao entrar em tela e, opcionalmente, no hover.
 */
export default function DecryptedText({
  text,
  className = "",
  speed = 38,
  revealEvery = 2,
  onHover = false,
}: {
  text: string;
  className?: string;
  /** ms por frame de embaralhamento */
  speed?: number;
  /** a cada N frames, uma letra assenta */
  revealEvery?: number;
  onHover?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const reduce = useReducedMotion();
  const [output, setOutput] = useState(text);
  const [run, setRun] = useState(0);

  useEffect(() => {
    if (reduce) {
      setOutput(text);
      return;
    }
    if (!inView && run === 0) return;

    let frame = 0;
    let settled = 0;

    const id = window.setInterval(() => {
      frame += 1;
      if (frame % revealEvery === 0) settled += 1;

      setOutput(
        text
          .split("")
          .map((char, i) => {
            if (i < settled || char === " ") return char;
            return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          })
          .join("")
      );

      if (settled >= text.length) {
        window.clearInterval(id);
        setOutput(text);
      }
    }, speed);

    return () => window.clearInterval(id);
  }, [inView, run, text, speed, revealEvery, reduce]);

  return (
    <span
      ref={ref}
      className={className}
      onPointerEnter={(e) => {
        if (onHover && e.pointerType === "mouse") setRun((v) => v + 1);
      }}
    >
      {output}
    </span>
  );
}
