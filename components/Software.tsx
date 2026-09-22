"use client";

import { motion } from "motion/react";
import { EASE } from "@/lib/motion";
import { SOFTWARE } from "@/lib/data";
import { MaskText, Reveal } from "./ui/Reveal";
import SpotlightCard from "./reactbits/SpotlightCard";

/** Ferramentas: barra que preenche ao entrar em tela, como um render bar. */
export default function Software() {
  return (
    <section className="relative border-y border-ink-800 bg-ink-900 py-24 sm:py-32">
      <div className="mx-auto max-w-[1400px] px-6 sm:px-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex flex-col gap-6">
            <MaskText
              as="h2"
              lines={["Onde eu", "moro o dia todo"]}
              className="font-display text-[11vw] uppercase leading-[0.85] text-bone sm:text-[6.5vw] lg:text-[4.5vw]"
            />
          </div>
          <Reveal index={1}>
            <p className="max-w-sm text-sm leading-relaxed text-ash-300">
              Cada software resolve uma parte do problema. Corte no Premiere, movimento no After
              Effects, cor no DaVinci — e o resto vira acabamento.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-px overflow-hidden rounded-xl border border-ink-700 bg-ink-700 sm:grid-cols-2 lg:grid-cols-3">
          {SOFTWARE.map((tool, i) => (
            <motion.article
              key={tool.name}
              className="group relative bg-ink-950 p-6 transition-colors duration-300 hover:bg-ink-850"
              initial={{ opacity: 0, y: 22, filter: "blur(5px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-12% 0px" }}
              transition={{ duration: 0.65, ease: EASE.out, delay: (i % 3) * 0.06 }}
            >
              <SpotlightCard className="absolute inset-0" size={260} />

              <div className="relative flex items-start justify-between gap-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-lg border border-ink-600 bg-ink-900 font-display text-lg text-blood-400 transition-[transform,border-color] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:-translate-y-0.5 group-hover:border-blood-500">
                  {tool.short}
                </span>
                <span className="font-mono text-xs tabular-nums text-ash-400">{tool.level}%</span>
              </div>

              <h3 className="relative mt-5 font-display text-xl uppercase text-bone">{tool.name}</h3>
              <p className="relative mt-1.5 text-sm leading-relaxed text-ash-300">{tool.note}</p>

              <div className="relative mt-6 h-[3px] w-full overflow-hidden rounded-full bg-ink-700">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-blood-700 to-blood-400"
                  initial={{ width: "0%" }}
                  whileInView={{ width: `${tool.level}%` }}
                  viewport={{ once: true, margin: "-12% 0px" }}
                  transition={{ duration: 1.1, ease: EASE.inOut, delay: 0.15 + (i % 3) * 0.06 }}
                />
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
