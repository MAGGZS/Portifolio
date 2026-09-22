"use client";

/**
 * DotGrid / Squares (referência: React Bits).
 * Fundo de grade em CSS, com máscara radial para não competir com o conteúdo.
 * Sem canvas: o navegador pinta uma vez e esquece.
 */
export default function DotGrid({
  className = "",
  gap = 26,
  dot = 1.2,
  color = "rgba(107,107,115,0.35)",
  variant = "dots",
}: {
  className?: string;
  gap?: number;
  dot?: number;
  color?: string;
  variant?: "dots" | "squares";
}) {
  const background =
    variant === "dots"
      ? `radial-gradient(${color} ${dot}px, transparent ${dot}px)`
      : `linear-gradient(to right, ${color} 1px, transparent 1px),
         linear-gradient(to bottom, ${color} 1px, transparent 1px)`;

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 ${className}`}
      style={{
        backgroundImage: background,
        backgroundSize: `${gap}px ${gap}px`,
        maskImage: "radial-gradient(70% 55% at 50% 45%, #000 0%, transparent 100%)",
        WebkitMaskImage: "radial-gradient(70% 55% at 50% 45%, #000 0%, transparent 100%)",
      }}
    />
  );
}
