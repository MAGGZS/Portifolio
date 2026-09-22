"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { EASE } from "@/lib/motion";
import { PROFILE, STATS } from "@/lib/data";
import { CountUp, MaskText, Reveal } from "./ui/Reveal";

export default function About() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const k = reduce ? 0 : 1;
  const yMedia = useTransform(scrollYProgress, [0, 1], [`${6 * k}%`, `${-6 * k}%`]);
  const yGlow = useTransform(scrollYProgress, [0, 1], [`${-10 * k}%`, `${10 * k}%`]);

  return (
    <section ref={ref} id="sobre" className="relative overflow-hidden bg-ink-950 py-24 sm:py-32">
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-[-20vw] top-1/3 -z-10 aspect-square w-[70vw] rounded-full opacity-50 blur-[120px]"
        style={{ y: yGlow, background: "radial-gradient(circle, rgba(165,18,26,0.35), transparent 65%)" }}
      />

      <div className="mx-auto grid max-w-[1400px] gap-14 px-6 sm:px-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        {/* Coluna da imagem */}
        <motion.div style={{ y: yMedia }} className="lg:sticky lg:top-28 lg:self-start">
          <Reveal variant="wipe">
            {/* Sem foto aqui: a única é a do início. Este é um quadro de monitor. */}
            <div className="grain scanlines relative aspect-[16/11] overflow-hidden rounded-2xl border border-ink-700 bg-ink-850">
              <div
                aria-hidden
                className="h-full w-full"
                style={{
                  background:
                    "radial-gradient(70% 50% at 50% 25%, rgba(209,31,39,0.35), transparent 70%), linear-gradient(180deg, #1c1c1f, #050505)",
                }}
              />

              {/* Moldura de viewfinder */}
              <div aria-hidden className="pointer-events-none absolute inset-4 border border-bone/10" />
              <div className="absolute left-5 top-5 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-bone/80">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-blood-500" />
                REC
              </div>
              <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between font-mono text-[10px] uppercase tracking-[0.25em] text-bone/70">
                <span>{PROFILE.name}</span>
                <span>{PROFILE.location}</span>
              </div>
            </div>
          </Reveal>
        </motion.div>

        {/* Coluna do texto */}
        <div className="flex flex-col gap-10">

          <MaskText
            as="h2"
            lines={["Eu penso", "em ritmo."]}
            className="font-display text-[13vw] uppercase leading-[0.85] text-bone sm:text-[7.5vw] lg:text-[5vw]"
          />

          <div className="space-y-5 text-balance text-base leading-relaxed text-ash-200">
            {PROFILE.bio.map((paragraph, i) => (
              <Reveal key={i} index={i}>
                <p>{paragraph}</p>
              </Reveal>
            ))}
          </div>

          {/* Números */}
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-ink-700 bg-ink-700 sm:grid-cols-4">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                className="bg-ink-900 p-5 transition-colors duration-300 hover:bg-ink-850"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-15% 0px" }}
                transition={{ duration: 0.6, ease: EASE.out, delay: i * 0.06 }}
              >
                <p className="font-display text-3xl leading-none text-bone sm:text-4xl">
                  {stat.raw ? stat.value : <CountUp to={stat.value} suffix={stat.suffix} />}
                  {stat.raw ? stat.suffix : null}
                </p>
                <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-ash-400">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
