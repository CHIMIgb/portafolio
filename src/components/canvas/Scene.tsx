"use client";

import { useState, useEffect } from "react";
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import Experience from "./Experience";
import HUD from "../dom/HUD";
import RefitStationModel from "./RefitStationModel";
import ParisFrigateModel from "./ParisFrigateModel";
import MarathonCruiserModel from "./MarathonCruiserModel";
import HalberdDestroyerModel from "./HalberdDestroyerModel";
import SabreModel from "./SabreModel";
import SpaceBansheeModel from "./SpaceBansheeModel";

export default function Scene() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div style={{ width: "100%", height: "100vh", background: "#0A0A0A" }} />;

  return (
    <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", background: "#0A0A0A" }}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        gl={{ antialias: true, powerPreference: "high-performance" }}
        dpr={[1, 1.5]}
      >
        <color attach="background" args={["#0A0A0A"]} />
        <fog attach="fog" args={["#0A0A0A", 5, 80]} />

        <Suspense fallback={<group><mesh><sphereGeometry args={[0.1]} /><meshBasicMaterial color="#00C2FF" /></mesh></group>}>
          <Experience />

          {/* Flota de la UNSC en el espacio profundo */}
          <group>
            <RefitStationModel />
            {/*
            <ParisFrigateModel />
            <MarathonCruiserModel />
            <HalberdDestroyerModel />
            */}
            {/* Escuadrón Alfa (Banshee liderando, Sabre persigue, Banshee embosca por detrás) */}
            <SpaceBansheeModel seed={0} startDelay={2} delay={0} />
            <SabreModel seed={0} delay={0.4} />
            <SpaceBansheeModel seed={0} startDelay={3.5} delay={0.8} />
            
            {/* Escuadrón Bravo (Un Sabre letal dando caza a dos Banshees rezagadas) */}
            <SpaceBansheeModel seed={1} startDelay={2.5} delay={0} />
            <SpaceBansheeModel seed={1} startDelay={3} delay={0.4} />
            <SabreModel seed={1} delay={0.8} />

            {/* Escuadrón Charlie (Duelo a tres bandas: Sabre vs Banshee vs Sabre) */}
            <SabreModel seed={2} delay={0} />
            <SpaceBansheeModel seed={2} startDelay={2.8} delay={0.4} />
            <SabreModel seed={2} delay={0.9} />
          </group>
        </Suspense>
      </Canvas>
      <HUD />
    </div>
  );
}
