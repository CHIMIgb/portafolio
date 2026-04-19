"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { Stars, Sparkles } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

export default function Experience() {
  const { camera } = useThree();
  const shipGroupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    // CINEMATIC AUTONOMOUS MOVEMENT
    // Instead of scrolling, we drift slowly through space
    const driftSpeed = 0.5;
    const baseZ = -(time * driftSpeed);

    // Smooth entrance from "Warp" (first 3 seconds)
    const entranceThreshold = 3;
    const entranceFactor = time < entranceThreshold 
      ? Math.pow(time / entranceThreshold, 2) 
      : 1;
    
    // Camera Position & Sway
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, baseZ + 7, 0.05);
    camera.position.x = Math.sin(time * 0.2) * 0.5 + (state.mouse.x * 0.2);
    camera.position.y = Math.cos(time * 0.15) * 0.3 + (state.mouse.y * 0.2);

    // Always look ahead into the deep space
    camera.lookAt(0, 0, baseZ - 50);
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
        <Stars radius={250} depth={80} count={4000} factor={6} saturation={0} fade speed={0.2} />
        
        {/* Layer 2: Micro Star Dust (Subtle & Constant) */}
        <Sparkles 
          count={200} 
          scale={200} 
          size={1.2} 
          speed={0.4} 
          opacity={0.4} 
          noise={0.3} 
          color="#FFF" 
        />

        {/* Layer 3: Vibrant Pulsing Stars (Active Twinkling) */}
        <Sparkles 
          count={100} 
          scale={180} 
          size={3.0} 
          speed={2.5} 
          opacity={0.9} 
          noise={2.5} 
          color="#00C2FF" 
        />

        <pointLight position={[10, 10, 10]} intensity={3} color="#00C2FF" />
        <pointLight position={[-10, -10, -20]} intensity={3} color="#FF00F7" />
        
        {/* Living Pulse: This light breathes constant life into the dust */}
        <PulsingAmbientStar />
      </group>
    </>
  );
}

function PulsingAmbientStar() {
  const lightRef = useRef<THREE.PointLight>(null);
  useFrame((state) => {
    if (lightRef.current) {
      const time = state.clock.getElapsedTime();
      const pulse = Math.sin(time * 2) * 0.5 + Math.sin(time * 0.7) * 0.3 + 1;
      lightRef.current.intensity = pulse * 15;
    }
  });

  return <pointLight ref={lightRef} position={[0, 0, -10]} color="#FFF" distance={100} />;
}
