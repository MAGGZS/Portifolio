"use client";

import type { ReactNode } from "react";

/**
 * ShinyText (referência: React Bits).
 * Varredura de brilho sobre o texto, em CSS puro — sem custo de main thread.
 */
export default function ShinyText({
  children,
  className = "",
  speed = 4.5,
  disabled = false,
}: {
  children: ReactNode;
  className?: string;
  speed?: number;
  disabled?: boolean;
}) {
  return (
    <span
      className={`shiny-text ${disabled ? "shiny-text--off" : ""} ${className}`}
      style={{ ["--shine-duration" as string]: `${speed}s` }}
    >
      {children}
    </span>
  );
}
