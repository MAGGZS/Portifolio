"use client";

import type { ReactNode } from "react";

/**
 * Faixa infinita em CSS puro.
 * Roda fora da main thread, então não perde frame enquanto a página carrega.
 * O conteúdo é duplicado para o loop não ter emenda.
 */
export default function Marquee({
  children,
  duration = 40,
  direction = "left",
  pauseOnHover = false,
  className = "",
  fade = true,
}: {
  children: ReactNode;
  duration?: number;
  direction?: "left" | "right";
  pauseOnHover?: boolean;
  className?: string;
  fade?: boolean;
}) {
  return (
    <div
      className={`marquee-host relative w-full overflow-hidden ${fade ? "edge-fade" : ""} ${className}`}
    >
      <div
        className="marquee-track"
        data-direction={direction}
        data-pause-on-hover={pauseOnHover}
        style={{ ["--marquee-duration" as string]: `${duration}s` }}
      >
        <div className="flex shrink-0">{children}</div>
        <div className="flex shrink-0" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
