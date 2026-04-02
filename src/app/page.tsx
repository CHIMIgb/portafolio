"use client";

import { useEffect, useState } from "react";
import Lenis from "lenis";
import Scene from "../components/canvas/Scene";

export default function Home() {
  const [totalScrolled, setTotalScrolled] = useState(0);

  useEffect(() => {
    let scrollOffset = 0;

    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1.2,
    });

    let isResetting = false;

    // Jumping between physical extremes while preserving virtual progress
    const jumpTo = (target: number, offsetDelta: number) => {
      if (isResetting) return;
      isResetting = true;

      lenis.scrollTo(target, { 
        immediate: true,
        onComplete: () => {
          scrollOffset += offsetDelta;
          // Small delay to prevent immediate re-trigger
          setTimeout(() => { isResetting = false; }, 50);
        }
      });
    };

    const raf = (time: number) => {
      lenis.raf(time);
      // Update global 3D context
      setTotalScrolled(window.scrollY + scrollOffset);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Instant reset for seamless infinite loop 3D
    lenis.on('scroll', ({ scroll, limit, direction }: { scroll: number, limit: number, direction: number }) => {
      if (isResetting) return;

      // Scrolling DOWN at bottom -> Jump to START instantly
      if (direction === 1 && scroll >= limit - 1) {
        jumpTo(10, limit - 10);
      } 
      // Scrolling UP at top -> Jump to END instantly
      else if (direction === -1 && scroll <= 1) {
        jumpTo(limit - 10, -(limit - 10));
      }
    });

    return () => lenis.destroy();
  }, []);

  return (
    <main style={{ height: "600vh", position: "relative" }}>
      <Scene scroll={totalScrolled} />
    </main>
  );
}
