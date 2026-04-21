"use client";

import { useRef } from 'react';
import { useFrame, useLoader, useThree } from '@react-three/fiber';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';
import * as THREE from 'three';

export default function SabreModel() {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const { camera } = useThree();

  const geometry = useLoader(STLLoader, '/models/Halo Sabre - 4834338/files/Sabre_2.stl');

  // Centrados en la vista para visualizarlos de cerca (Justo al lado Izquierdo)
  const config = {
    position: { x: -1.5, y: 0, z: -5 },
    scale: 0.8 / 15
  };

  useFrame((state, delta) => {
    if (groupRef.current) {
      // Sincronizar posición Z con la cámara para que nos acompañe en el viaje
      groupRef.current.position.z = camera.position.z + config.position.z;
    }

    if (meshRef.current) {
      // Rotar sobre sí mismo en X e Y constantemente
      meshRef.current.rotation.x += delta * 0.3;
      meshRef.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <group ref={groupRef} position={[config.position.x, config.position.y, config.position.z]}>
      <pointLight position={[0, 5, 2]} intensity={2} color="#00C2FF" />

      {/* Para que el centro de la rotación sea el origen local, a veces es necesario envolver la malla o ajustar la rotación inicial */}
      <mesh ref={meshRef} geometry={geometry} scale={config.scale}>
        <meshStandardMaterial
          color="#00C2FF"
          wireframe={true}
          transparent={true}
          opacity={0.15}
          fog={false}
        />
      </mesh>
    </group>
  );
}
