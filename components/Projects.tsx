"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "motion/react";
import { EASE } from "@/lib/motion";
import { PROJECTS, type Project } from "@/lib/data";
import { MaskText, Reveal } from "./ui/Reveal";
import SpotlightCard from "./reactbits/SpotlightCard";
import SplitText from "./reactbits/SplitText";

/** Projetos de código ligados a edição de vídeo. */
export default function Projects() {
  return (
    <section id="projetos" className="relative bg-ink-950 py-24 sm:py-32">
      <div className="mx-auto max-w-[1400px] px-6 sm:px-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex flex-col gap-6">
            <MaskText
              as="h2"
              lines={["Código que", "edita comigo"]}
              className="font-display text-[11vw] uppercase leading-[0.85] text-bone sm:text-[6.5vw] lg:text-[4.5vw]"
            />
          </div>
          <Reveal index={1}>
            <p className="max-w-sm text-sm leading-relaxed text-ash-300">
              Ferramentas que escrevi para acelerar meu próprio fluxo: cortar, sincronizar, colorir
              e publicar sem repetir trabalho manual.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.name} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

const STATUS_COLOR: Record<Project["status"], string> = {
  ativo: "text-blood-400 border-blood-700/60",
  "em progresso": "text-ash-200 border-ink-500",
  arquivado: "text-ash-400 border-ink-600",
};

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const reduce = useReducedMotion();

  // Inclinação 3D leve seguindo o ponteiro. Mola, não valor direto —
  // ligar a rotação ao mouse sem mola fica artificial.
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 140, damping: 16, mass: 0.6 });
  const sry = useSpring(ry, { stiffness: 140, damping: 16, mass: 0.6 });
  const rotateX = useTransform(srx, (v) => `${v}deg`);
  const rotateY = useTransform(sry, (v) => `${v}deg`);

  const onMove = (e: React.PointerEvent) => {
    if (reduce || e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    rx.set(-py * 7);
    ry.set(px * 7);
  };

  const reset = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={project.href}
      target="_blank"
      rel="noreferrer noopener"
      className="group relative block overflow-hidden rounded-xl border border-ink-700 bg-ink-900 p-6 transition-[border-color,background-color] duration-300 hover:border-blood-700/70 hover:bg-ink-850 active:scale-[0.99]"
      onPointerMove={onMove}
      onPointerLeave={reset}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      initial={{ opacity: 0, y: 26, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.7, ease: EASE.out, delay: (index % 3) * 0.07 }}
    >
      {/* Facho que segue o ponteiro (ref.: React Bits — SpotlightCard) */}
      <SpotlightCard className="absolute inset-0 rounded-xl" size={280} />

      {/* Brilho de canto no hover */}
      <span
        aria-hidden
        className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-blood-600/0 blur-2xl transition-[background-color] duration-500 group-hover:bg-blood-600/25"
      />

      <div className="relative flex items-start justify-between gap-4">
        <span className="flex h-9 w-9 items-center justify-center rounded-md border border-ink-600 bg-ink-950 text-ash-300 transition-colors duration-300 group-hover:text-blood-400">
          <GitIcon />
        </span>
        <span
          className={`rounded-full border px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.2em] ${STATUS_COLOR[project.status]}`}
        >
          {project.status}
        </span>
      </div>

      <h3 className="relative mt-6 font-mono text-lg text-bone">
        <SplitText text={project.name} stagger={0.02} delay={0.1 + (index % 3) * 0.05} />
        <span className="ml-2 inline-block text-blood-500 opacity-0 transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-x-1 group-hover:opacity-100">
          ↗
        </span>
      </h3>

      <p className="relative mt-3 min-h-[4.5rem] text-sm leading-relaxed text-ash-300">
        {project.description}
      </p>

      <ul className="relative mt-5 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <li
            key={tag}
            className="rounded border border-ink-600 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-ash-400"
          >
            {tag}
          </li>
        ))}
      </ul>

      {/* Régua inferior que preenche no hover */}
      <span
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-blood-500 transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-x-100"
      />
    </motion.a>
  );
}

function GitIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden>
      <circle cx="6" cy="6" r="2.4" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="6" cy="18" r="2.4" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="17" cy="9" r="2.4" stroke="currentColor" strokeWidth="1.4" />
      <path d="M6 8.4v7.2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path
        d="M17 11.4c0 2.6-2.1 4.2-5 4.6"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}
