"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { EASE } from "@/lib/motion";
import { SERVICES } from "@/lib/data";
import { MaskText, Reveal } from "./ui/Reveal";

/**
 * Lista de serviços em linhas.
 * O preenchimento vermelho sobe de baixo com clip-path — uma máscara
 * anima melhor que trocar background, e fica mais barato de pintar.
 */
export default function Services() {
  return (
    <section id="servicos" className="relative border-y border-ink-800 bg-ink-900 py-24 sm:py-32">
      <div className="mx-auto max-w-[1400px] px-6 sm:px-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex flex-col gap-6">
            <MaskText
              as="h2"
              lines={["O que eu", "entrego"]}
              className="font-display text-[11vw] uppercase leading-[0.85] text-bone sm:text-[6.5vw] lg:text-[4.5vw]"
            />
          </div>
          <Reveal index={1}>
            <p className="max-w-sm text-sm leading-relaxed text-ash-300">
              Do corte cru à página onde o vídeo vai morar. Dá para contratar um pedaço ou o pacote
              inteiro.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 border-t border-ink-700">
          {SERVICES.map((service, i) => (
            <ServiceRow key={service.index} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceRow({
  service,
  index,
}: {
  service: (typeof SERVICES)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState(false);
  const mx = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 200, damping: 26 });

  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mx.set(e.clientX - r.left);
  };

  return (
    <motion.div
      ref={ref}
      className="group relative overflow-hidden border-b border-ink-700"
      onPointerMove={onMove}
      onPointerEnter={(e) => e.pointerType === "mouse" && setHover(true)}
      onPointerLeave={() => setHover(false)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12% 0px" }}
      transition={{ duration: 0.65, ease: EASE.out, delay: index * 0.05 }}
    >
      {/* Preenchimento mascarado */}
      <span
        aria-hidden
        className="absolute inset-0 bg-gradient-to-r from-blood-700/35 to-ink-900 transition-[clip-path] duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]"
        style={{ clipPath: hover ? "inset(0 0 0% 0)" : "inset(100% 0 0 0)" }}
      />

      {/* Ponto que segue o ponteiro na linha */}
      <motion.span
        aria-hidden
        className="pointer-events-none absolute top-0 h-px w-24 -translate-x-1/2 bg-blood-500"
        style={{ x: smx, opacity: hover ? 1 : 0 }}
      />

      <div className="relative flex flex-col gap-5 py-8 sm:flex-row sm:items-center sm:justify-between sm:gap-10">
        <div className="flex items-baseline gap-5 sm:gap-8">
          <span className="font-mono text-xs text-blood-500">{service.index}</span>
          <h3 className="font-display text-3xl uppercase leading-none text-bone transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] sm:text-5xl sm:group-hover:translate-x-2">
            {service.title}
          </h3>
        </div>

        <div className="flex flex-1 flex-col gap-4 sm:max-w-md">
          <p className="text-sm leading-relaxed text-ash-300">{service.text}</p>
          <ul className="flex flex-wrap gap-2">
            {service.items.map((item) => (
              <li
                key={item}
                className="rounded-full border border-ink-600 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-ash-300 transition-colors duration-300 group-hover:border-blood-600/70 group-hover:text-ash-200"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}
