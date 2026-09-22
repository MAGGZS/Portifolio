"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { EASE } from "@/lib/motion";
import { NAV, PROFILE } from "@/lib/data";

export default function Nav() {
  const { scrollY } = useScroll();
  const [solid, setSolid] = useState(false);
  const [menu, setMenu] = useState(false);

  useMotionValueEvent(scrollY, "change", (v) => setSolid(v > 40));

  // Escape fecha o menu. Ação de teclado: sem animação extra.
  useEffect(() => {
    if (!menu) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenu(false);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [menu]);

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50"
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: EASE.out, delay: 1.6 }}
      >
        <div
          className="border-b transition-[background-color,border-color,backdrop-filter] duration-300"
          style={{
            backgroundColor: solid ? "rgba(10,10,11,0.72)" : "transparent",
            borderColor: solid ? "rgba(42,42,46,0.8)" : "transparent",
            backdropFilter: solid ? "blur(14px)" : "none",
          }}
        >
          <nav className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-5 sm:px-10">
            <a href="#inicio" className="group flex items-center gap-3" aria-label="Início">
              <Mark />
              <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-ash-300 transition-colors duration-200 group-hover:text-bone">
                M.ERIC
              </span>
            </a>

            <ul className="hidden items-center gap-8 md:flex">
              {NAV.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="group relative font-mono text-[11px] uppercase tracking-[0.25em] text-ash-300 transition-colors duration-200 hover:text-bone"
                  >
                    {item.label}
                    <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-blood-500 transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-x-100" />
                  </a>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-4">
              <a
                href="#contato"
                className="hidden rounded-full border border-ink-600 px-5 py-2 font-mono text-[11px] uppercase tracking-[0.2em] text-bone transition-[transform,background-color,border-color] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:border-blood-500 hover:bg-blood-600/15 active:scale-[0.97] sm:block"
              >
                Orçamento
              </a>

              <button
                type="button"
                onClick={() => setMenu((v) => !v)}
                aria-label={menu ? "Fechar menu" : "Abrir menu"}
                aria-expanded={menu}
                className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.94] md:hidden"
              >
                <span
                  className="h-px w-6 bg-bone transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]"
                  style={{ transform: menu ? "translateY(3.5px) rotate(45deg)" : "none" }}
                />
                <span
                  className="h-px w-6 bg-bone transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]"
                  style={{ transform: menu ? "translateY(-3.5px) rotate(-45deg)" : "none" }}
                />
              </button>
            </div>
          </nav>
        </div>
      </motion.header>

      {/* Menu mobile: wipe vertical, saída mais rápida que a entrada */}
      <AnimatePresence>
        {menu && (
          <motion.div
            className="grain fixed inset-0 z-40 flex flex-col justify-center overflow-hidden bg-ink-950/98 px-8 md:hidden"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)", transition: { duration: 0.5, ease: EASE.inOut } }}
            exit={{ clipPath: "inset(0 0 100% 0)", transition: { duration: 0.3, ease: EASE.out } }}
          >
            <ul className="space-y-2">
              {NAV.map((item, i) => (
                <li key={item.href} className="mask-line">
                  <motion.a
                    href={item.href}
                    onClick={() => setMenu(false)}
                    className="block font-display text-[13vw] uppercase leading-[0.95] text-bone transition-colors duration-200 hover:text-blood-500"
                    initial={{ y: "110%" }}
                    animate={{ y: "0%", transition: { duration: 0.6, ease: EASE.out, delay: 0.16 + i * 0.05 } }}
                  >
                    {item.label}
                  </motion.a>
                </li>
              ))}
            </ul>
            <div className="mt-12 font-mono text-[11px] uppercase tracking-[0.25em] text-ash-400">
              {PROFILE.email}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/** Marca: três barras inclinadas, como camadas numa timeline. */
function Mark() {
  return (
    <span className="flex h-7 w-7 items-center justify-center" aria-hidden>
      <svg viewBox="0 0 24 24" className="h-6 w-6">
        {[0, 1, 2].map((i) => (
          <rect
            key={i}
            x={4 + i * 6}
            y={3}
            width={3.4}
            height={18}
            rx={1.7}
            fill="var(--color-blood-500)"
            opacity={1 - i * 0.22}
            transform={`skewX(-14) translate(${i * 0.6} 0)`}
          />
        ))}
      </svg>
    </span>
  );
}
