"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { EASE, IN_VIEW } from "@/lib/motion";
import { REELS, type Reel } from "@/lib/data";
import Marquee from "./Marquee";
import { MaskText, Reveal } from "./ui/Reveal";

/**
 * Carrossel do reel.
 * Roda sozinho e devagar (loop de 78s), pausa no hover.
 * Quando os vídeos chegarem, basta preencher `src` e `poster` em lib/data.ts —
 * o card troca o placeholder pelo vídeo sem mudar mais nada.
 */
export default function ShowreelCarousel() {
  return (
    <section id="reel" className="relative overflow-hidden border-y border-ink-800 bg-ink-900 py-24 sm:py-32">
      <div className="mx-auto mb-12 flex max-w-[1400px] flex-col gap-6 px-6 sm:px-10">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <MaskText
            as="h2"
            lines={["Trabalhos", "em movimento"]}
            className="font-display text-[12vw] uppercase leading-[0.85] text-bone sm:text-[7vw] lg:text-[5.5vw]"
          />
          <Reveal index={1}>
            <p className="max-w-sm text-sm leading-relaxed text-ash-300">
              Uma seleção rodando em loop, como um monitor de programa deixado ligado. Passe o mouse
              para segurar a faixa e dar uma olhada melhor.
            </p>
          </Reveal>
        </div>
      </div>

      {/* Faixa 1 — devagar, para a esquerda */}
      <Marquee duration={78} pauseOnHover className="py-2">
        {REELS.map((reel, i) => (
          <ReelCard key={reel.id} reel={reel} index={i} />
        ))}
      </Marquee>

      {/* Faixa 2 — ainda mais devagar, sentido oposto: dá profundidade */}
      <Marquee duration={104} direction="right" pauseOnHover className="mt-6 py-2 opacity-80">
        {[...REELS].reverse().map((reel, i) => (
          <ReelCard key={`b-${reel.id}`} reel={reel} index={i} small />
        ))}
      </Marquee>

      <Reveal className="mx-auto mt-14 flex max-w-[1400px] items-center justify-between gap-6 px-6 font-mono text-[10px] uppercase tracking-[0.3em] text-ash-400 sm:px-10">
        <span>{REELS.length} peças no ar</span>
        <span className="hidden sm:block">Premiere Pro · After Effects · DaVinci Resolve</span>
        <span className="text-blood-500">● loop</span>
      </Reveal>
    </section>
  );
}

function ReelCard({ reel, index, small = false }: { reel: Reel; index: number; small?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, IN_VIEW);

  return (
    <motion.div
      ref={ref}
      className={`group relative mx-3 shrink-0 overflow-hidden rounded-xl border border-ink-700 bg-ink-850 ${
        small ? "h-[190px] w-[300px] sm:h-[220px] sm:w-[360px]" : "h-[240px] w-[380px] sm:h-[300px] sm:w-[520px]"
      }`}
      initial={{ opacity: 0, y: 26, scale: 0.97 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 26, scale: 0.97 }}
      transition={{ duration: 0.7, ease: EASE.out, delay: Math.min(index, 5) * 0.05 }}
      data-cursor="hot"
    >
      {/* Mídia */}
      {reel.src ? (
        <video
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.04]"
          src={reel.src}
          poster={reel.poster}
          muted
          loop
          playsInline
          autoPlay
          preload="metadata"
        />
      ) : (
        <div
          className="grain absolute inset-0 transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.04]"
          style={{ background: reel.tint }}
          aria-hidden
        />
      )}

      {/* Gradiente de leitura */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-ink-950/90 via-ink-950/20 to-transparent"
      />

      {/* Botão de play */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full border border-bone/30 bg-ink-950/40 backdrop-blur-sm transition-[transform,background-color,border-color] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-105 group-hover:border-blood-500 group-hover:bg-blood-600/30">
          <svg viewBox="0 0 24 24" className="ml-0.5 h-4 w-4 fill-bone" aria-hidden>
            <path d="M8 5.5v13l11-6.5z" />
          </svg>
        </span>
      </div>

      {/* Metadados */}
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-blood-400">
            {reel.category} · {reel.year}
          </p>
          <h3 className="mt-1 font-display text-lg uppercase leading-tight text-bone sm:text-xl">
            {reel.title}
          </h3>
          <p className="mt-0.5 text-xs text-ash-300">{reel.client}</p>
        </div>
        <span className="shrink-0 rounded-full border border-ink-600 bg-ink-950/60 px-2.5 py-1 font-mono text-[10px] tracking-widest text-ash-200">
          {reel.duration}
        </span>
      </div>

      {/* Linha de scrub que preenche no hover */}
      <span
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 bg-blood-500 transition-transform duration-[2000ms] ease-linear group-hover:scale-x-100"
      />
    </motion.div>
  );
}
