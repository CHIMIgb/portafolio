"use client";

import { useRef } from 'react';
import { useFrame, useLoader, useThree } from '@react-three/fiber';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';
import * as THREE from 'three';

export default function HalberdDestroyerModel() {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const { camera } = useThree();

  const geometry = useLoader(STLLoader, '/models/halberd-class-light-destroyer-armada-legends-halo20240817-1-ei6829/spacenavy90/halberd-class-light-destroyer-armada-legends-halo/halberd.stl');

  // ==========================================
  // VARIABLES DE CONTROL (Ajustar libremente)
  // ==========================================
  const config = {
    position: { x: 10, y: -0.35, z: -0.9 },  // Más cerca de la cámara (z=-1.0) y ajustado X e Y para que siga en pantalla
    rotation: { x: -Math.PI / 2, y: 0, z: Math.PI / 2 }, // Rotado 180 grados en el eje Z (antes era -Math.PI/2)
    scale: 0.008,           // Escala ajustada para su nueva cercanía
  };

  useFrame((state) => {
    // Quieto flotando pero atado a la cámara ("estático en la pantalla")
    if (groupRef.current) {
      const floatOffset = Math.sin(state.clock.elapsedTime * 0.8) * 0.05;

      // Sigue la posición de la cámara (X, Y y Z)
      groupRef.current.position.x = camera.position.x + config.position.x;
      groupRef.current.position.y = camera.position.y + config.position.y + floatOffset;
      groupRef.current.position.z = camera.position.z + config.position.z;
    }
  });

  return (
    <group ref={groupRef} position={[config.position.x, config.position.y, config.position.z]}>
      {/* Luz ambiental propia para el destructor */}
      <pointLight position={[0, -1, 1]} intensity={3} color="#00C2FF" />

      <mesh ref={meshRef} geometry={geometry} scale={config.scale} rotation={[config.rotation.x, config.rotation.y, config.rotation.z]}>
        <meshStandardMaterial
          color="#00C2FF"  // Mismo color azul cyán que el resto de la flota
          wireframe={true}
          transparent={true}
          opacity={0.15}   // Un poco más opaco para que se vea mejor al estar cerca
          fog={false}
        />
      </mesh>
    </group>
  );
}
