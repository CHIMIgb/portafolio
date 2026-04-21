"use client";

import { useRef } from 'react';
import { useFrame, useLoader, useThree } from '@react-three/fiber';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import * as THREE from 'three';

export default function SpaceBansheeModel() {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const { camera } = useThree();

  // Cargamos el OBJ
  const obj = useLoader(OBJLoader, '/models/Space Banshee - 3992435/files/Body.obj');

  // Extraemos la primera geometría que encontremos en el grupo del OBJ
  // para poder usarla en un componente <mesh> igual que el Sabre
  let geometry: THREE.BufferGeometry | undefined;
  obj.traverse((child) => {
    if ((child as THREE.Mesh).isMesh && !geometry) {
      geometry = (child as THREE.Mesh).geometry;
    }
  });

  // Centrados en la vista para visualizarlos de cerca (Justo al lado Derecho)
  const config = {
    position: { x: 1.5, y: 0, z: -5 }, // Reseteado a -5 como el Sabre para asegurar visibilidad
    scale: 3 / 15 // Aumentado para que tenga presencia similar al Sabre
  };

  useFrame((state, delta) => {
    if (groupRef.current) {
      // Sincronizar posición Z con la cámara para que nos acompañe en el viaje
      groupRef.current.position.z = camera.position.z + config.position.z;
    }

    if (meshRef.current) {
      // Rotar sobre sí mismo en X e Y constantemente (Misma lógica que el Sabre)
      meshRef.current.rotation.x += delta * 0.3;
      meshRef.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <group ref={groupRef} position={[config.position.x, config.position.y, config.position.z]}>
      <pointLight position={[0, 5, 2]} intensity={2} color="#714eaf" />

      {geometry && (
        <mesh ref={meshRef} geometry={geometry} scale={config.scale}>
          <meshStandardMaterial
            color="#714eaf"
            wireframe={true}
            transparent={true}
            opacity={0.15}
            fog={false}
          />
        </mesh>
      )}
    </group>
  );
}
