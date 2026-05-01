"use client";

import { useState, useEffect, useMemo, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import Experience from "./Experience";
import HUD from "../dom/HUD";
import RefitStationModel from "./RefitStationModel";
import SabreModel from "./SabreModel";
import SpaceBansheeModel from "./SpaceBansheeModel";
import ParisFrigateModel from "./ParisFrigateModel";

export default function Scene() {
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsMobile(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
  }, []);

  // Generador Aleatorio Procedural de Combates
  const squadrons = useMemo(() => {
    // Si es móvil, no generamos los escuadrones para ahorrar memoria y CPU
    if (isMobile) return null;

    const squads = [];
    let currentShips = 0;
    const maxShips = 6;

    while (currentShips < maxShips) {
      const type = Math.floor(Math.random() * 6);
      const seed = Math.random() * 100;
      
      if (type === 0 && currentShips + 1 <= maxShips) {
        squads.push(<SabreModel key={`ship-${currentShips}`} seed={seed} delay={Math.random() * 2} />);
        currentShips++;
      } 
      else if (type === 1 && currentShips + 1 <= maxShips) {
        squads.push(<SpaceBansheeModel key={`ship-${currentShips}`} seed={seed} delay={Math.random() * 2} />);
        currentShips++;
      } 
      else if (type === 2 && currentShips + 2 <= maxShips) {
        squads.push(<SpaceBansheeModel key={`ship-${currentShips}`} seed={seed} delay={0} />);
        squads.push(<SabreModel key={`ship-${currentShips+1}`} seed={seed} delay={1.2 + Math.random() * 0.5} />);
        currentShips += 2;
      } 
      else if (type === 3 && currentShips + 3 <= maxShips) {
        squads.push(<SabreModel key={`ship-${currentShips}`} seed={seed} delay={0} />);
        squads.push(<SpaceBansheeModel key={`ship-${currentShips+1}`} seed={seed} delay={0.8} />);
        squads.push(<SpaceBansheeModel key={`ship-${currentShips+2}`} seed={seed} delay={1.5} />);
        currentShips += 3;
      } 
      else if (type === 4 && currentShips + 3 <= maxShips) {
        squads.push(<SabreModel key={`ship-${currentShips}`} seed={seed} delay={0} />);
        squads.push(<SabreModel key={`ship-${currentShips+1}`} seed={seed + 10} delay={0.5} />);
        squads.push(<SabreModel key={`ship-${currentShips+2}`} seed={seed + 20} delay={1.0} />);
        currentShips += 3;
      } 
      else if (type === 5 && currentShips + 3 <= maxShips) {
        squads.push(<SpaceBansheeModel key={`ship-${currentShips}`} seed={seed} delay={0} />);
        squads.push(<SpaceBansheeModel key={`ship-${currentShips+1}`} seed={seed + 1} delay={0.4} />);
        squads.push(<SpaceBansheeModel key={`ship-${currentShips+2}`} seed={seed + 2} delay={0.8} />);
        currentShips += 3;
      }
      else {
        squads.push(<SabreModel key={`ship-${currentShips}`} seed={seed} delay={Math.random() * 2} />);
        currentShips++;
      }
    }
    return squads;
  }, [isMobile]);

  if (!mounted) return <div style={{ width: "100%", height: "100vh", background: "#0A0A0A" }} />;

  return (
    <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", background: "#0A0A0A" }}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        gl={{ antialias: !isMobile, powerPreference: "high-performance" }}
        dpr={isMobile ? 1 : [1, 1.5]}
      >
        <color attach="background" args={["#0A0A0A"]} />
        <fog attach="fog" args={["#0A0A0A", 5, 80]} />

        <Suspense fallback={<group><mesh><sphereGeometry args={[0.1]} /><meshBasicMaterial color="#00C2FF" /></mesh></group>}>
          <Experience />
          <group>
            <RefitStationModel />
            {isMobile ? (
              <ParisFrigateModel />
            ) : (
              squadrons
            )}
          </group>
        </Suspense>
      </Canvas>
      <HUD />
    </div>
  );
}
