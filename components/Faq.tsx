"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { EASE } from "@/lib/motion";
import { FAQ } from "@/lib/data";
import { MaskText, Reveal } from "./ui/Reveal";

/** Acordeão. Altura animada com transição, não keyframe: dá para interromper. */
export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="relative border-y border-ink-800 bg-ink-900 py-24 sm:py-32">
      <div className="mx-auto grid max-w-[1400px] gap-12 px-6 sm:px-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div className="flex flex-col gap-6 lg:sticky lg:top-28 lg:self-start">
          <MaskText
            as="h2"
            lines={["Antes de", "fechar"]}
            className="font-display text-[11vw] uppercase leading-[0.85] text-bone sm:text-[6.5vw] lg:text-[4vw]"
          />
          <Reveal index={1}>
            <p className="max-w-sm text-sm leading-relaxed text-ash-300">
              O que costumam me perguntar antes do primeiro projeto. Se faltar algo, é só mandar
              mensagem.
            </p>
          </Reveal>
        </div>

        <div className="border-t border-ink-700">
          {FAQ.map((item, i) => {
            const isOpen = open === i;
            return (
              <motion.div
                key={item.q}
                className="border-b border-ink-700"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{ duration: 0.55, ease: EASE.out, delay: i * 0.05 }}
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="group flex w-full items-center justify-between gap-6 py-6 text-left transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.995]"
                >
                  <span className="flex items-baseline gap-4">
                    <span className="font-mono text-[10px] text-blood-500">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-base text-bone transition-colors duration-200 group-hover:text-blood-300 sm:text-lg">
                      {item.q}
                    </span>
                  </span>

                  <span className="relative h-4 w-4 shrink-0" aria-hidden>
                    <span className="absolute left-0 top-1/2 h-px w-4 -translate-y-1/2 bg-ash-300" />
                    <span
                      className="absolute left-1/2 top-0 h-4 w-px -translate-x-1/2 bg-ash-300 transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]"
                      style={{ transform: `translateX(-50%) scaleY(${isOpen ? 0 : 1}) rotate(${isOpen ? 90 : 0}deg)` }}
                    />
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      className="overflow-hidden"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{
                        height: { duration: 0.34, ease: EASE.inOut },
                        opacity: { duration: 0.22, ease: EASE.out },
                      }}
                    >
                      <p className="max-w-xl pb-7 pl-8 text-sm leading-relaxed text-ash-300">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
