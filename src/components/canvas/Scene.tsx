"use client";

import { useState, useEffect, useMemo, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import Experience from "./Experience";
import HUD from "../dom/HUD";
import RefitStationModel from "./RefitStationModel";
import SabreModel from "./SabreModel";
import SpaceBansheeModel from "./SpaceBansheeModel";

export default function Scene() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Generador Aleatorio Procedural de Combates
  const squadrons = useMemo(() => {
    const squads = [];
    let currentShips = 0;
    const maxShips = 6; // Límite aumentado ligeramente para permitir escenarios más ricos

    // Generamos naves puramente hasta llegar o acercarnos al límite
    while (currentShips < maxShips) {
      const type = Math.floor(Math.random() * 6); // 6 tipos de escenario
      const seed = Math.random() * 100;
      
      // 0: Lobo Solitario Sabre (Requiere 1 espacio)
      if (type === 0 && currentShips + 1 <= maxShips) {
        squads.push(<SabreModel key={`ship-${currentShips}`} seed={seed} delay={Math.random() * 2} />);
        currentShips++;
      } 
      // 1: Reconocimiento Banshee (Requiere 1 espacio)
      else if (type === 1 && currentShips + 1 <= maxShips) {
        squads.push(<SpaceBansheeModel key={`ship-${currentShips}`} seed={seed} delay={Math.random() * 2} />);
        currentShips++;
      } 
      // 2: Cacería Simple (1 Banshee escapando, 1 Sabre persiguiendo - misma ruta) (Requiere 2 espacios)
      else if (type === 2 && currentShips + 2 <= maxShips) {
        squads.push(<SpaceBansheeModel key={`ship-${currentShips}`} seed={seed} delay={0} />);
        squads.push(<SabreModel key={`ship-${currentShips+1}`} seed={seed} delay={1.2 + Math.random() * 0.5} />); // Más delay para separación natural
        currentShips += 2;
      } 
      // 3: Cacería Inversa (1 Sabre escapando, 2 Banshees persiguiendo) (Requiere 3 espacios)
      else if (type === 3 && currentShips + 3 <= maxShips) {
        squads.push(<SabreModel key={`ship-${currentShips}`} seed={seed} delay={0} />);
        squads.push(<SpaceBansheeModel key={`ship-${currentShips+1}`} seed={seed} delay={0.8} />);
        squads.push(<SpaceBansheeModel key={`ship-${currentShips+2}`} seed={seed} delay={1.5} />);
        currentShips += 3;
      } 
      // 4: Escuadrón Patrulla Sabre (3 Sabres con rutas entrelazadas) (Requiere 3 espacios)
      else if (type === 4 && currentShips + 3 <= maxShips) {
        squads.push(<SabreModel key={`ship-${currentShips}`} seed={seed} delay={0} />);
        squads.push(<SabreModel key={`ship-${currentShips+1}`} seed={seed + 10} delay={0.5} />);
        squads.push(<SabreModel key={`ship-${currentShips+2}`} seed={seed + 20} delay={1.0} />);
        currentShips += 3;
      } 
      // 5: Enjambre Banshee (3 Banshees, rutas similares pero desviadas) (Requiere 3 espacios)
      else if (type === 5 && currentShips + 3 <= maxShips) {
        squads.push(<SpaceBansheeModel key={`ship-${currentShips}`} seed={seed} delay={0} />);
        squads.push(<SpaceBansheeModel key={`ship-${currentShips+1}`} seed={seed + 1} delay={0.4} />);
        squads.push(<SpaceBansheeModel key={`ship-${currentShips+2}`} seed={seed + 2} delay={0.8} />);
        currentShips += 3;
      }
      // Si el tipo elegido requiere más espacio del que queda, forzamos un lobo solitario para llenar y salir
      else {
        squads.push(<SabreModel key={`ship-${currentShips}`} seed={seed} delay={Math.random() * 2} />);
        currentShips++;
      }
    }
    return squads;
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
            {/* Renderizar los escuadrones generados algorítmicamente */}
            {squadrons}
          </group>
        </Suspense>
      </Canvas>
      <HUD />
    </div>
  );
}
