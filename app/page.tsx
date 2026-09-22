"use client";

import { useState } from "react";
import Intro from "@/components/Intro";
import ScrollProgress from "@/components/ScrollProgress";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import ShowreelCarousel from "@/components/ShowreelCarousel";
import ScrollVelocity from "@/components/reactbits/ScrollVelocity";
import About from "@/components/About";
import Software from "@/components/Software";
import Timeline from "@/components/Timeline";
import Services from "@/components/Services";
import Projects from "@/components/Projects";
import Process from "@/components/Process";
import Testimonials from "@/components/Testimonials";
import Faq from "@/components/Faq";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Page() {
  // A abertura e o hero compartilham este estado: é ele que faz o nome
  // sair do centro da tela e ir para o lugar dele no topo da página.
  const [ready, setReady] = useState(false);

  return (
    <>
      <Intro done={ready} onDone={() => setReady(true)} />
      <ScrollProgress />
      <Nav />

      <main data-ready={ready}>
        <Hero introDone={ready} />

        <div className="border-y border-ink-800 bg-ink-950 py-6">
          <ScrollVelocity
            items={["Edição de vídeo", "Motion design", "Color grade", "Sound design", "Shorts & Reels"]}
            baseVelocity={2.2}
          />
        </div>

        <ShowreelCarousel />
        <About />
        <Software />
        <Timeline />
        <Services />
        <Projects />
        <Process />
        <Testimonials />

        <div className="border-y border-ink-800 bg-ink-950 py-6">
          <ScrollVelocity
            items={["Premiere Pro", "After Effects", "DaVinci Resolve", "Next.js", "Freelance"]}
            baseVelocity={-1.8}
          />
        </div>

        <Faq />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
