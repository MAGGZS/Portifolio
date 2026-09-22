"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { EASE } from "@/lib/motion";
import { PROFILE } from "@/lib/data";

export default function Footer() {
  const [clock, setClock] = useState("--:--:--");

  // Relógio local: detalhe pequeno, mas dá sinal de site vivo.
  useEffect(() => {
    const tick = () =>
      setClock(
        new Date().toLocaleTimeString("pt-BR", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <footer className="border-t border-ink-800 bg-ink-900">
      <motion.div
        className="mx-auto flex max-w-[1400px] flex-col gap-6 px-6 py-10 sm:px-10 md:flex-row md:items-center md:justify-between"
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-5% 0px" }}
        transition={{ duration: 0.6, ease: EASE.out }}
      >
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-ash-400">
          © {new Date().getFullYear()} {PROFILE.name}
        </p>

        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-ash-400">
          Timeline local <span className="text-bone tabular-nums">{clock}</span>
        </p>

        <a
          href="#inicio"
          className="group inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-ash-400 transition-colors duration-200 hover:text-bone"
        >
          Voltar ao início
          <span className="inline-block transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:-translate-y-0.5">
            ↑
          </span>
        </a>
      </motion.div>
    </footer>
  );
}
