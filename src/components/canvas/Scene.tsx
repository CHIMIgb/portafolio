"use client";

import { useState, useEffect } from "react";
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import Experience from "@/components/canvas/Experience";
import HUD from "@/components/dom/HUD";
import { EffectComposer, DepthOfField, Bloom } from "@react-three/postprocessing";

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
        gl={{ antialias: false, stencil: false, depth: true }}
        dpr={[1, 2]}
      >
        <color attach="background" args={["#0A0A0A"]} />
        <fog attach="fog" args={["#0A0A0A", 15, 90]} />
        
        <Suspense fallback={null}>
          <Experience scroll={scroll} />
          
          <EffectComposer>
            <DepthOfField 
              focusDistance={0.01} 
              focalLength={0.1} 
              bokehScale={6} 
              height={480} 
            />
            <Bloom 
              intensity={1.0} 
              luminanceThreshold={0.4} 
              luminanceSmoothing={0.9} 
              mipmapBlur 
            />
          </EffectComposer>
        </Suspense>
      </Canvas>
      <HUD />
    </div>
  );
}
