"use client";

import { motion } from "motion/react";
import { EASE } from "@/lib/motion";
import { TESTIMONIALS } from "@/lib/data";
import { MaskText } from "./ui/Reveal";

export default function Testimonials() {
  return (
    <section className="relative bg-ink-950 py-24 sm:py-32">
      <div className="mx-auto max-w-[1400px] px-6 sm:px-10">
        <div className="flex flex-col gap-6">
          <MaskText
            as="h2"
            lines={["O que dizem", "depois do corte"]}
            className="font-display text-[11vw] uppercase leading-[0.85] text-bone sm:text-[6.5vw] lg:text-[4.5vw]"
          />
        </div>

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {TESTIMONIALS.map((item, i) => (
            <motion.figure
              key={item.author}
              className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-ink-700 bg-ink-900 p-7 transition-[border-color,transform] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-1 hover:border-blood-700/60"
              initial={{ opacity: 0, y: 26, filter: "blur(5px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-12% 0px" }}
              transition={{ duration: 0.7, ease: EASE.out, delay: i * 0.07 }}
            >
              <span
                aria-hidden
                className="font-display text-6xl leading-none text-blood-700/60 transition-colors duration-300 group-hover:text-blood-600"
              >
                &ldquo;
              </span>
              <blockquote className="mt-2 text-balance text-base leading-relaxed text-ash-200">
                {item.quote}
              </blockquote>
              <figcaption className="mt-7 border-t border-ink-700 pt-4">
                <p className="text-sm text-bone">{item.author}</p>
                <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.25em] text-ash-400">
                  {item.role}
                </p>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
