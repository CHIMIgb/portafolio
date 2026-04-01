"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import Scene from "../components/canvas/Scene";

export default function Home() {
  useEffect(() => {
    // Initializing Lenis for smooth scroll (premium experience)
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Instant reset for seamless infinite loop 3D
    lenis.on('scroll', ({ scroll, limit, direction }: { scroll: number, limit: number, direction: number }) => {
      // Scrolling DOWN at bottom -> Jump to START instantly
      if (direction === 1 && scroll >= limit - 1) {
        lenis.scrollTo(0, { immediate: true });
      } 
      // Scrolling UP at top -> Jump to END instantly
      else if (direction === -1 && scroll <= 1) {
        lenis.scrollTo(limit - 2, { immediate: true });
      }
    });

    // Initial log for UX
    console.log("Welcome to CHIMI 3D Portfolio!");

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <main style={{ height: "600vh", position: "relative" }}>
      <Scene />
    </main>
  );
}
