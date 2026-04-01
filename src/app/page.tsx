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

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

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
