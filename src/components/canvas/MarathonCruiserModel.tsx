"use client";

import { useRef } from 'react';
import { useFrame, useLoader, useThree } from '@react-three/fiber';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';
import * as THREE from 'three';

export default function MarathonCruiserModel() {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const { camera } = useThree();

  const geometry = useLoader(STLLoader, '/models/marathon-class-heavy-cruiser-armada-legends-halo20240707-1-9tkus/spacenavy90/marathon-class-heavy-cruiser-armada-legends-halo/marathon.stl');

  // ==========================================
  // VARIABLES DE CONTROL (Ajustar libremente)
  // ==========================================
  const config = {
    position: { x: -40, y: -55, z: -55 }, // La 'z' sirve como distancia hacia el fondo
    rotation: { x: -Math.PI / 2, y: 0, z: Math.PI / 4 }, // Ajusta el ángulo de vuelo
    scale: 1.0 // Escalar el crucero
  };

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    if (groupRef.current) {
      // Microflotación lenta
      const floatOffset = Math.sin(t * 0.2) * 1.5;

      // Patrulla lenta en el fondo (se mueve en el eje X)
      groupRef.current.position.x = config.position.x + (t * 0.8) % 150 - 30; // Resetea la posición después de cierto punto para un patrullaje infinito
      groupRef.current.position.y = config.position.y + floatOffset;
      groupRef.current.position.z = camera.position.z + config.position.z;
    }
    if (meshRef.current) {
      // Rotación absoluta
      meshRef.current.rotation.x = config.rotation.x;
      meshRef.current.rotation.y = config.rotation.y;
      meshRef.current.rotation.z = config.rotation.z;
    }
  });

  return (
    <group ref={groupRef} position={[config.position.x, config.position.y, config.position.z]}>
      {/* Luz ambiental extra */}
      <pointLight position={[0, 20, 10]} intensity={3} color="#00C2FF" />

      <mesh ref={meshRef} geometry={geometry} scale={config.scale}>
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
