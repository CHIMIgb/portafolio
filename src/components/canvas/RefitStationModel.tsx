"use client";

import { useRef } from 'react';
import { useFrame, useLoader, useThree } from '@react-three/fiber';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';
import * as THREE from 'three';

export default function RefitStationModel() {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const { camera } = useThree();

  const geometry = useLoader(STLLoader, '/models/halo-fleet-battles-refit-station20201204-10644-cg2l6l/xdlolxd1/halo-fleet-battles-refit-station/Anchor_9_Scale.stl');

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (groupRef.current) {
      // La estación espacial es masiva y se mueve muy lento en el fondo distante
      groupRef.current.position.x = 25 + Math.sin(t * 0.02) * 5;
      groupRef.current.position.y = 8 + Math.cos(t * 0.02) * 5;
      // La colocamos bien al fondo
      groupRef.current.position.z = camera.position.z - 90;
    }
    if (meshRef.current) {
      // Gira sobre su eje central
      meshRef.current.rotation.z += 0.001;
    }
  });

  return (
    <group ref={groupRef} position={[25, 8, -90]}>
      {/* Luz ambiental extra si se decide apagar el wireframe alguna vez */}
      <pointLight position={[0, 20, 10]} intensity={3} color="#00C2FF" />
      <mesh ref={meshRef} geometry={geometry} scale={1.5} rotation={[-Math.PI / 2, 0, 0]}>
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
