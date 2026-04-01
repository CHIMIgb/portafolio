"use client";

import { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import Experience from "./Experience";
import HUD from "../dom/HUD";

export default function Scene({ scroll }: { scroll: number }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div style={{ width: "100%", height: "100vh", background: "#0A0A0A" }} />;

  return (
    <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", background: "#0A0A0A" }}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        gl={{ antialias: true }}
      >
        <color attach="background" args={["#0A0A0A"]} />
        <fog attach="fog" args={["#0A0A0A", 5, 30]} />
        
        <Experience scroll={scroll} />
      </Canvas>
      <HUD />
    </div>
  );
}
