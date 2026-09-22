"use client";

import { motion, useScroll, useSpring } from "motion/react";

/** Playhead global no topo da página. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 180, damping: 30, mass: 0.4 });

  return (
    <motion.div
      aria-hidden
      className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-blood-500"
      style={{ scaleX }}
    />
  );
}
