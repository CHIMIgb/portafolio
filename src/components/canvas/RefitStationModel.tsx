"use client";

import { useRef } from 'react';
import { useFrame, useLoader, useThree } from '@react-three/fiber';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';
import * as THREE from 'three';

export default function RefitStationModel() {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const { camera } = useThree();

  const geometry = useLoader(STLLoader, '/models/anchor 7/anchor 7.stl');

  // ==========================================
  // VARIABLES DE CONTROL (Ajustar libremente)
  // ==========================================
  const config = {
    position: { x: 50, y: -55, z: -45 }, // La 'z' sirve como distancia hacia el fondo
    rotation: { x: -Math.PI / 2, y: 0, z: Math.PI - (Math.PI / 4) }, // 180 grados menos 45 grados
    scale: 1.5
  };

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    if (groupRef.current) {
      // Microflotación: movimiento que oscila muy lento en el eje Y para darle "vida" espacial
      const floatOffset = Math.sin(t * 0.4) * 1.5; // sube y baja 1.5 unidades lentamente

      // Posición dinámica ligada a la cámara en Z, pero controlada por tus variables + flotación
      groupRef.current.position.x = config.position.x;
      groupRef.current.position.y = config.position.y + floatOffset;
      groupRef.current.position.z = camera.position.z + config.position.z;
    }
    if (meshRef.current) {
      // Rotación absoluta dictada por tus variables (en bucle por si la cambias)
      meshRef.current.rotation.x = config.rotation.x;
      meshRef.current.rotation.y = config.rotation.y;
      meshRef.current.rotation.z = config.rotation.z;
    }
  });

  return (
    <group ref={groupRef} position={[config.position.x, config.position.y, config.position.z]}>
      {/* Luz ambiental extra si se decide apagar el wireframe alguna vez */}
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
