"use client";

import { useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useTransform,
  useReducedMotion,
} from "motion/react";
import { EASE } from "@/lib/motion";
import { PROFILE } from "@/lib/data";
import DotGrid from "./reactbits/DotGrid";
import NameBlock from "./NameBlock";
import { NAME_LAYOUT_ID, NAME_TRANSITION } from "./Intro";

/**
 * Abertura da página: só o nome, em uma linha.
 * A seção tem pista de rolagem e o palco fica preso no topo — conforme
 * a página desce, a foto sobe por baixo do nome e passa à frente dele.
 *
 * `introDone` diz que a animação de escrita terminou.
 */
export default function Hero({ introDone }: { introDone: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const [hasPhoto, setHasPhoto] = useState(true);

  /*
    "end end" é o ponto em que o palco preso se solta: a base da seção
    encontra a base da tela. Com "end start" o progresso só chegava a 1
    depois que a seção inteira já tinha passado, ou seja, a foto ainda
    estava subindo quando o palco já havia saído de vista.
  */
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const k = reduce ? 0 : 1;

  /*
    A foto só avança. Guardamos o ponto mais longe já percorrido, então
    rolar de volta não desfaz a entrada dela: uma vez inteira, fica inteira.
  */
  const photoProgress = useMotionValue(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (v > photoProgress.get()) photoProgress.set(v);
  });

  /*
    A foto sobe inteira, vinda de fora da tela. Sem máscara: ela não é
    revelada no lugar, ela entra em quadro — é um movimento de câmera,
    não um wipe. 100% do próprio tamanho a deixa abaixo da borda.
  */
  const photoY = useTransform(photoProgress, [0.05, 0.72], ["100%", "0%"]);
  const photoOpacity = useTransform(photoProgress, [0.02, 0.08], [0, 1]);

  // Círculo vermelho ao fundo, como na referência.
  const circleY = useTransform(scrollYProgress, [0, 1], ["0%", `${12 * k}%`]);
  const circleScale = useTransform(scrollYProgress, [0, 1], [1, 1 + 0.14 * k]);

  return (
    <section ref={ref} id="inicio" className="relative h-[250svh]">
      <div className="grain scanlines sticky top-0 flex h-[100svh] items-center justify-center overflow-hidden bg-ink-950">
        {/* Vinheta */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(100% 70% at 50% 45%, rgba(122,12,18,0.26) 0%, rgba(5,5,5,0) 60%), radial-gradient(90% 60% at 50% 100%, rgba(20,20,22,0.95) 0%, rgba(5,5,5,0) 70%)",
          }}
        />

        <DotGrid className="opacity-60" gap={28} />

        {/* Círculo vermelho */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute aspect-square w-[130vw] rounded-full sm:w-[78vw] lg:w-[52vw]"
          style={{
            y: circleY,
            scale: circleScale,
            background:
              "radial-gradient(circle at 36% 30%, #e63946 0%, #a5121a 42%, #5c070c 72%, #2a0407 100%)",
            boxShadow: "0 0 180px 50px rgba(165,18,26,0.22)",
          }}
          initial={{ opacity: 0, scale: 0.86 }}
          animate={introDone ? { opacity: 0.9, scale: 1 } : { opacity: 0, scale: 0.86 }}
          transition={{ duration: 1.4, ease: EASE.out, delay: 0.05 }}
        />

        {/*
          Nome e legendas. O bloco do meio tem a largura do próprio nome,
          então as legendas nascem alinhadas às pontas dele, e não aos
          cantos da tela.
        */}
        <div className="relative z-10 w-full px-2 sm:px-3">
          <div className="mx-auto w-max">
            <motion.div
              className="flex items-end justify-between gap-6 pb-1 font-mono text-[9px] uppercase tracking-[0.25em] text-ash-300 sm:pb-2 sm:text-[11px]"
              initial={{ opacity: 0, y: 8 }}
              animate={introDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
              transition={{ duration: 0.7, ease: EASE.out, delay: 0.45 }}
            >
              <span className="text-bone">editor—dev</span>
              <span className="hidden text-right sm:block">
                Premiere · After Effects · DaVinci
              </span>
            </motion.div>

            <h1>
              <span className="sr-only">{PROFILE.name} — editor de vídeo</span>
              <span aria-hidden className="block">
                {introDone ? (
                  <motion.span
                    className="block"
                    layoutId={NAME_LAYOUT_ID}
                    transition={NAME_TRANSITION}
                  >
                    <NameBlock />
                  </motion.span>
                ) : (
                  <span className="invisible block">
                    <NameBlock />
                  </span>
                )}
              </span>
            </h1>

            <motion.div
              className="flex items-start justify-between gap-6 pt-1 font-mono text-[9px] uppercase tracking-[0.25em] text-ash-300 sm:pt-2 sm:text-[11px]"
              initial={{ opacity: 0, y: -8 }}
              animate={introDone ? { opacity: 1, y: 0 } : { opacity: 0, y: -8 }}
              transition={{ duration: 0.7, ease: EASE.out, delay: 0.52 }}
            >
              <span>
                {PROFILE.age} anos · desde {PROFILE.since}
              </span>
              <span className="text-right text-blood-400">disponível para freela</span>
            </motion.div>
          </div>
        </div>

        {/*
          A foto. Fica na frente do nome (z maior) e encosta na base.
          Entra em quadro subindo de fora da tela, sem máscara.
        */}
        {hasPhoto && (
          <motion.div
            className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex justify-center"
            style={{ y: photoY, opacity: photoOpacity }}
          >
            {/* Sem moldura, sem fundo: o recorte flutua sobre o círculo. */}
            <img
              src="/selfie.png"
              alt={`Retrato de ${PROFILE.name}`}
              onError={() => setHasPhoto(false)}
              className="h-auto w-[98vw] max-w-none object-contain object-bottom sm:h-[66svh] sm:w-auto"
              style={{ filter: "saturate(0.85) contrast(1.06)" }}
            />
          </motion.div>
        )}
      </div>
    </section>
  );
}
