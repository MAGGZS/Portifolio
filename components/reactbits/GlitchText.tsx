"use client";

import type { ReactNode } from "react";

/**
 * GlitchText (referência: React Bits).
 * Duas cópias deslocadas em ciano e vermelho, recortadas por clip-path.
 * Fica parado até o hover — glitch constante cansa e rouba atenção.
 */
export default function GlitchText({
  children,
  text,
  className = "",
  always = false,
}: {
  children?: ReactNode;
  text: string;
  className?: string;
  always?: boolean;
}) {
  return (
    <span
      className={`glitch ${always ? "glitch--always" : ""} ${className}`}
      data-text={text}
    >
      {children ?? text}
    </span>
  );
}
