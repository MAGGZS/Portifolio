"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { EASE } from "@/lib/motion";
import { PROFILE } from "@/lib/data";
import { Magnetic } from "./ui/Reveal";

export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const k = reduce ? 0 : 1;
  const yGlow = useTransform(scrollYProgress, [0, 1], [`${30 * k}%`, `${-10 * k}%`]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);

  return (
    <section
      ref={ref}
      id="contato"
      className="grain relative overflow-hidden bg-ink-950 py-28 sm:py-36"
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 aspect-square w-[130vw] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60 blur-[110px] sm:w-[80vw]"
        style={{
          y: yGlow,
          scale,
          background: "radial-gradient(circle, rgba(165,18,26,0.45), transparent 62%)",
        }}
      />

      <div className="mx-auto flex max-w-[1400px] flex-col items-center gap-10 px-6 text-center sm:px-10">

        <h2 className="select-none">
          <span className="sr-only">Vamos editar seu próximo vídeo</span>
          {["Bora", "editar"].map((word, i) => (
            <span key={word} className="mask-line" aria-hidden>
              <motion.span
                className="block font-display text-[16vw] uppercase leading-[0.84] text-bone sm:text-[11vw]"
                initial={{ y: "112%" }}
                whileInView={{ y: "0%" }}
                viewport={{ once: true, margin: "-15% 0px" }}
                transition={{ duration: 0.9, ease: EASE.out, delay: i * 0.08 }}
              >
                {i === 1 ? (
                  <>
                    <span className="text-blood-500">edi</span>tar
                  </>
                ) : (
                  word
                )}
              </motion.span>
            </span>
          ))}
        </h2>

        <motion.p
          className="max-w-md text-balance text-sm leading-relaxed text-ash-300 sm:text-base"
          initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ duration: 0.7, ease: EASE.out, delay: 0.15 }}
        >
          Me conta o projeto, a referência e o prazo. Respondo em até 24 horas com um plano e um
          orçamento direto.
        </motion.p>

        <Magnetic strength={0.25}>
          <motion.a
            href={`mailto:${PROFILE.email}`}
            className="group relative inline-flex items-center gap-4 overflow-hidden rounded-full border border-ink-500 px-8 py-4 transition-[transform,border-color] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:border-blood-500 active:scale-[0.97]"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{ duration: 0.7, ease: EASE.out, delay: 0.25 }}
          >
            {/* Preenchimento que sobe por máscara */}
            <span
              aria-hidden
              className="absolute inset-0 bg-blood-600 transition-[clip-path] duration-[420ms] ease-[cubic-bezier(0.23,1,0.32,1)] [clip-path:inset(100%_0_0_0)] group-hover:[clip-path:inset(0%_0_0_0)]"
            />
            <span className="relative font-mono text-xs uppercase tracking-[0.3em] text-bone">
              {PROFILE.email}
            </span>
            <span className="relative text-blood-300 transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-x-1 group-hover:text-bone">
              ↗
            </span>
          </motion.a>
        </Magnetic>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {PROFILE.socials.map((social, i) => (
            <motion.a
              key={social.label}
              href={social.href}
              target={social.href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer noopener"
              className="group font-mono text-[11px] uppercase tracking-[0.25em] text-ash-400 transition-colors duration-200 hover:text-bone"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.5, ease: EASE.out, delay: 0.3 + i * 0.05 }}
            >
              {social.label}
              <span className="ml-2 inline-block h-px w-0 bg-blood-500 align-middle transition-[width] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:w-5" />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
