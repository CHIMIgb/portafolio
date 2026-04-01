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

    // Smooth reset scroll to top when reaching the end
    lenis.on('scroll', ({ scroll, limit }: { scroll: number, limit: number }) => {
      if (scroll > limit - 20) {
        lenis.scrollTo(0, { duration: 2, easing: (t: number) => 1 - Math.pow(1 - t, 4) });
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
