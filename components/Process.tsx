"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { EASE } from "@/lib/motion";
import { PROCESS } from "@/lib/data";
import { MaskText } from "./ui/Reveal";

/**
 * Processo em scroll horizontal preso: a seção segura a tela
 * enquanto os painéis passam. Dá a sensação de arrastar a playhead.
 */
export default function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "-62%"]);
  const barWidth = useTransform(scrollYProgress, [0, 1], ["8%", "100%"]);

  return (
    <section className="relative border-y border-ink-800 bg-ink-900">
      {/* Altura extra = duração do scroll horizontal */}
      <div ref={ref} className="relative h-[280vh] lg:h-[320vh]">
        <div className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden">
          <div className="mx-auto w-full max-w-[1400px] px-6 sm:px-10">
            <div className="flex flex-col gap-5">
              <MaskText
                as="h2"
                lines={["Como o vídeo", "fica pronto"]}
                className="font-display text-[10vw] uppercase leading-[0.85] text-bone sm:text-[5.5vw] lg:text-[4vw]"
              />
            </div>
          </div>

          <motion.div style={{ x }} className="mt-12 flex gap-5 pl-6 sm:pl-10">
            {PROCESS.map((step, i) => (
              <motion.article
                key={step.step}
                className="group relative flex h-[46vh] w-[78vw] shrink-0 flex-col justify-between overflow-hidden rounded-2xl border border-ink-700 bg-ink-950 p-7 sm:w-[52vw] lg:h-[42vh] lg:w-[34vw]"
                initial={{ opacity: 0, y: 24, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{ duration: 0.65, ease: EASE.out, delay: i * 0.06 }}
              >
                <span
                  aria-hidden
                  className="absolute -bottom-10 -right-4 font-display text-[11rem] leading-none text-ink-800 transition-colors duration-500 group-hover:text-ink-700"
                >
                  {step.step}
                </span>

                <div className="relative flex items-center gap-3">
                  <span className="h-1.5 w-1.5 rotate-45 bg-blood-500" aria-hidden />
                  <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-ash-400">
                    Etapa {step.step}
                  </span>
                </div>

                <div className="relative">
                  <h3 className="font-display text-3xl uppercase text-bone sm:text-4xl">
                    {step.title}
                  </h3>
                  <p className="mt-3 max-w-sm text-sm leading-relaxed text-ash-300">{step.text}</p>
                </div>

                <span
                  aria-hidden
                  className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-blood-600/70 to-transparent"
                />
              </motion.article>
            ))}

            {/* Cartela final da faixa */}
            <div className="flex h-[46vh] w-[70vw] shrink-0 items-center justify-center rounded-2xl border border-dashed border-ink-600 px-8 text-center lg:h-[42vh] lg:w-[28vw]">
              <p className="font-display text-2xl uppercase leading-tight text-ash-400">
                E então<span className="text-blood-500">.</span> aperta play
              </p>
            </div>
          </motion.div>

          {/* Barra de progresso da seção */}
          <div className="mx-auto mt-10 w-full max-w-[1400px] px-6 sm:px-10">
            <div className="h-px w-full bg-ink-700">
              <motion.div className="h-px bg-blood-500" style={{ width: barWidth }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
