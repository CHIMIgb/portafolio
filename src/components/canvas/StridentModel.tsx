"use client";

import { useRef } from 'react';
import { useFrame, useLoader, useThree } from '@react-three/fiber';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';
import * as THREE from 'three';

export default function StridentModel() {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const { camera } = useThree();

  const geometry = useLoader(STLLoader, '/models/halo-fleet-battles-strident-class20201204-10231-7fs4nz/xdlolxd1/halo-fleet-battles-strident-class/Strident_SLA_Optimized_Scale.stl');

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (groupRef.current) {
      // La fragata clase Strident escolta más rápido que la nave principal
      groupRef.current.position.x = Math.sin(t * 0.15) * 45 - 15;
      groupRef.current.position.y = Math.cos(t * 0.1) * 15 + 5;
      groupRef.current.position.z = camera.position.z - 45;

      groupRef.current.rotation.y = Math.cos(t * 0.15) * 0.4;
      groupRef.current.rotation.z = -Math.sin(t * 0.15) * 0.2;
      groupRef.current.rotation.x = Math.sin(t * 0.1) * 0.1;
    }
  });

  return (
    <group ref={groupRef} position={[-15, 5, -45]}>
      <mesh ref={meshRef} geometry={geometry} scale={0.5} rotation={[-Math.PI / 2, 0, 0]}>
        <meshStandardMaterial 
          color="#00C2FF" 
          wireframe={true} 
          transparent={true} 
          opacity={0.06} 
          fog={false} 
        />
      </mesh>
    </group>
  );
}
