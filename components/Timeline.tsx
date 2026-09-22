"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { EASE } from "@/lib/motion";
import { TIMELINE } from "@/lib/data";
import { MaskText } from "./ui/Reveal";

/**
 * Linha do tempo: a régua da esquerda preenche conforme o scroll,
 * do jeito que a playhead atravessa a timeline.
 */
export default function Timeline() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 75%", "end 60%"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.6 });

  // A playhead só avança. Rolar de volta não desfaz o que já foi percorrido.
  const peak = useMotionValue(0);
  useMotionValueEvent(progress, "change", (v) => {
    if (v > peak.get()) peak.set(v);
  });
  const height = useTransform(peak, [0, 1], ["0%", "100%"]);

  return (
    <section className="relative bg-ink-950 py-24 sm:py-32">
      <div className="mx-auto max-w-[1400px] px-6 sm:px-10">
        <div className="flex flex-col gap-6">
          <MaskText
            as="h2"
            lines={["De 2022", "até agora"]}
            className="font-display text-[11vw] uppercase leading-[0.85] text-bone sm:text-[6.5vw] lg:text-[4.5vw]"
          />
        </div>

        <div ref={ref} className="relative mt-16 pl-10 sm:pl-16">
          {/* Régua */}
          <div className="absolute left-0 top-2 h-[calc(100%-1rem)] w-px bg-ink-700 sm:left-3">
            <motion.div className="w-px bg-blood-500" style={{ height }} />
          </div>

          <ol className="space-y-14">
            {TIMELINE.map((item, i) => (
              <motion.li
                key={item.year}
                className="group relative"
                initial={{ opacity: 0, x: 22, filter: "blur(5px)" }}
                whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-20% 0px" }}
                transition={{ duration: 0.7, ease: EASE.out, delay: i * 0.05 }}
              >
                {/* Marcador */}
                <span
                  aria-hidden
                  className="absolute -left-10 top-2 flex h-3 w-3 items-center justify-center sm:-left-[3.4rem]"
                >
                  <span className="h-2 w-2 rotate-45 bg-blood-500 transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-125" />
                </span>

                <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:gap-8">
                  <span className="font-display text-4xl leading-none text-ink-500 transition-colors duration-300 group-hover:text-blood-500 sm:text-5xl">
                    {item.year}
                  </span>
                  <div className="max-w-2xl">
                    <h3 className="font-display text-xl uppercase text-bone sm:text-2xl">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-ash-300 sm:text-base">
                      {item.text}
                    </p>
                  </div>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
