"use client";

import { useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  useReducedMotion,
} from "motion/react";

/** Mantém o valor dentro do intervalo para o loop não ter emenda. */
function wrap(min: number, max: number, v: number) {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
}

/**
 * ScrollVelocity (referência: React Bits).
 * A faixa roda sozinha e devagar; a velocidade e o sentido do scroll
 * empurram ou puxam a faixa. Rolar para cima inverte o sentido.
 */
export default function ScrollVelocity({
  items,
  baseVelocity = 2.4,
  className = "",
  itemClassName = "",
}: {
  items: string[];
  baseVelocity?: number;
  className?: string;
  itemClassName?: string;
}) {
  const reduce = useReducedMotion();
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);

  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 380,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 4], {
    clamp: false,
  });

  const x = useTransform(baseX, (v) => `${wrap(-25, -50, v)}%`);
  const direction = useRef(1);

  useAnimationFrame((_, delta) => {
    if (reduce) return;
    let moveBy = direction.current * baseVelocity * (delta / 1000);

    const factor = velocityFactor.get();
    if (factor < 0) direction.current = -1;
    else if (factor > 0) direction.current = 1;

    moveBy += direction.current * moveBy * factor;
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className={`relative w-full overflow-hidden ${className}`}>
      <motion.div className="flex w-max flex-nowrap" style={{ x }}>
        {/* Quatro cópias: cobre a janela em qualquer largura */}
        {[0, 1, 2, 3].map((copy) => (
          <span key={copy} className="flex shrink-0 items-center" aria-hidden={copy > 0}>
            {items.map((item, i) => (
              <span key={`${copy}-${i}`} className="flex items-center gap-8 px-8">
                <span
                  className={`font-display text-[9vw] uppercase leading-none tracking-[-0.01em] text-ink-700 sm:text-[5.5vw] ${itemClassName}`}
                >
                  {item}
                </span>
                <span className="h-2 w-2 shrink-0 rotate-45 bg-blood-600" />
              </span>
            ))}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
