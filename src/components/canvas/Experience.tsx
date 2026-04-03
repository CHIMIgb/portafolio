"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { Stars, Sparkles } from "@react-three/drei";
import { useState, useRef } from "react";
import * as THREE from "three";
import { projects } from "../../data/projects";
import ProjectPortal from "@/components/canvas/ProjectPortal";

export default function Experience({ scroll }: { scroll: number }) {
  const { camera } = useThree();

  // The distance at which projects reposition themselves (leapfrog)
  const LOOP_LENGTH = 100;

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const ENTRANCE_TIME = 2.5;
    
    // Persistent Z coordinate tracking (synced with page.tsx virtual offset)
    const targetZ = -(scroll * 0.05);

    // Initial "Warp Exit" recoil effect
    // We start at a higher Z and zoom into position
    const isInitial = time < ENTRANCE_TIME;
    const entranceFactor = isInitial ? 1 - Math.pow(1 - time / ENTRANCE_TIME, 3) : 1;
    
    const baseCameraZ = targetZ + 7;
    const warpRecoil = isInitial ? (1 - entranceFactor) * 20 : 0;

    // GENTLE movement (lerp = 0.03) for a more static/stable feeling
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, baseCameraZ + warpRecoil, 0.03);

    // Minimal horizontal sway
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, state.mouse.x * 0.3, 0.02);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, state.mouse.y * 0.3, 0.02);

    // Look ahead with a wider perspective
    camera.lookAt(0, 0, targetZ - 20);
  });

  return (
    <>
      <fog attach="fog" args={["#0A0A0A", 10, 100]} />
      <ambientLight intensity={0.6} />

      {/* 
          Deep Space Environment: Live "Pulsing" Starfield 
      */}
      <group position={[0, 0, camera.position.z]}>
        {/* Layer 1: Fixed Distant Universe */}
        <Stars radius={250} depth={80} count={12000} factor={6} saturation={0} fade speed={0.2} />
        
        {/* Layer 2: Micro Star Dust (Subtle & Constant) */}
        <Sparkles 
          count={800} 
          scale={200} 
          size={0.6} 
          speed={0.4} 
          opacity={0.4} 
          noise={0.3} 
          color="#FFF" 
        />

        {/* Layer 3: Vibrant Pulsing Stars (Active Twinkling) */}
        <Sparkles 
          count={400} 
          scale={180} 
          size={1.8} 
          speed={2.5} 
          opacity={0.9} 
          noise={2.5} 
          color="#00C2FF" 
        />

        {/* Layer 4: "Supernovas" (Intense random bursts) */}
        <Sparkles 
          count={45} 
          scale={120} 
          size={5} 
          speed={4.5} 
          opacity={1} 
          noise={6} 
          color="#FF00F7" 
        />

        {/* Layer 5: High-Glow White Stars (Bursting Intensity) */}
        <Sparkles 
          count={80} 
          scale={150} 
          size={3.5} 
          speed={3.2} 
          opacity={0.8} 
          noise={3} 
          color="#FFF" 
        />

        <pointLight position={[10, 10, 10]} intensity={3} color="#00C2FF" />
        <pointLight position={[-10, -10, -20]} intensity={3} color="#FF00F7" />
        
        {/* Living Pulse: This light breathes constant life into the dust */}
        <PulsingAmbientStar />
      </group>

      {/* 
          Leapfrog Project Portals: 
          Wonderland-style staggered layout (Widened to X = +/- 6)
      */}
      {projects.map((project, index) => (
        <ProjectPortalWithLeapfrog
          key={project.id}
          project={{
            ...project,
            // Staggered layout with more central space
            position: [
              project.position[0] >= 0 ? 4.5 : -4.5,
              0,
              project.position[2]
            ]
          }}
          index={index}
          loopLength={LOOP_LENGTH}
        />
      ))}
    </>
  );
}

function PulsingAmbientStar() {
  const lightRef = useRef<THREE.PointLight>(null);
  useFrame((state) => {
    if (lightRef.current) {
      // Create a complex "twinkle" wave
      const time = state.clock.getElapsedTime();
      const pulse = Math.sin(time * 2) * 0.5 + Math.sin(time * 0.7) * 0.3 + 1;
      lightRef.current.intensity = pulse * 15;
    }
  });

  return <pointLight ref={lightRef} position={[0, 0, -10]} color="#FFF" distance={100} />;
}

// Logic for infinite project repositioning during forward travel
function ProjectPortalWithLeapfrog({ project, index, loopLength }: { project: any, index: number, loopLength: number }) {
  const { camera } = useThree();
  const [currentZ, setCurrentZ] = useState(project.position[2]);

  useFrame(() => {
    const originalZ = project.position[2];

    // Leapfrog math: find the correct loop index to keep the project in view
    const loopOffset = Math.floor((camera.position.z - originalZ + 20) / loopLength);
    const targetZ = originalZ + (loopOffset * loopLength);

    if (currentZ !== targetZ) {
      setCurrentZ(targetZ);
    }
  });

  return (
    <ProjectPortal
      project={{ ...project, position: [project.position[0], project.position[1], currentZ] }}
      index={index}
    />
  );
}
