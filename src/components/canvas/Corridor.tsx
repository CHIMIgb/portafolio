"use client";

import { useMemo } from "react";
import * as THREE from "three";

export default function Corridor() {
  const points = useMemo(() => {
    const p = [];
    for (let i = 0; i <= 20; i++) {
      p.push(new THREE.Vector3(0, 0, -i * 5));
    }
    return p;
  }, []);

  const curve = useMemo(() => new THREE.CatmullRomCurve3(points), [points]);

  return (
    <group>
      {/* The main tunnel tube */}
      <mesh>
        <tubeGeometry args={[curve, 64, 3, 32, false]} />
        <meshStandardMaterial 
          color="#050505" 
          roughness={0.1}
          metalness={0.9} 
          side={THREE.BackSide}
          wireframe={true}
        />
      </mesh>
      
      {/* Digital Rings - Covering two full cycles */}
      {Array.from({ length: 40 }).map((_, i) => (
        <mesh key={i} position={[0, 0, -i * 5]} rotation={[0, 0, 0]}>
          <ringGeometry args={[2.9, 3, 64]} />
          <meshBasicMaterial color="#00C2FF" transparent opacity={0.3} side={THREE.DoubleSide} />
        </mesh>
      ))}
      
      {/* Ambient glowing floor grid (flat) - Covering 200 units */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, -100]}>
        <planeGeometry args={[20, 200, 20, 200]} />
        <meshStandardMaterial 
          color="#00C2FF" 
          wireframe 
          transparent 
          opacity={0.05} 
        />
      </mesh>
    </group>
  );
}
