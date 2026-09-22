"use client";

import { useRef, useState, type ReactNode } from "react";

/**
 * SpotlightCard (referência: React Bits).
 * Um facho radial segue o ponteiro dentro do card.
 * Só posição de máscara muda — nada de layout, nada de repaint pesado.
 */
export default function SpotlightCard({
  children,
  className = "",
  color = "rgba(209, 31, 39, 0.18)",
  size = 320,
}: {
  children?: ReactNode;
  className?: string;
  color?: string;
  size?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const [on, setOn] = useState(false);

  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    setPos({ x: e.clientX - r.left, y: e.clientY - r.top });
  };

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden ${className}`}
      onPointerMove={onMove}
      onPointerEnter={(e) => e.pointerType === "mouse" && setOn(true)}
      onPointerLeave={() => setOn(false)}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 transition-opacity duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]"
        style={{
          opacity: on ? 1 : 0,
          background: `radial-gradient(${size}px circle at ${pos.x}px ${pos.y}px, ${color}, transparent 68%)`,
        }}
      />
      {children}
    </div>
  );
}
