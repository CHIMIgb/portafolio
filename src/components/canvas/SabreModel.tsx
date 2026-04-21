"use client";

import { useRef, useMemo } from 'react';
import { useFrame, useLoader, useThree } from '@react-three/fiber';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';
import { Sparkles } from '@react-three/drei';
import * as THREE from 'three';
import { getFlightPosition, calculateRoll } from '@/utils/flightMath';

interface SabreModelProps {
  seed?: number;
  delay?: number;
}

export default function SabreModel({ seed = 0, delay = 0.5 }: SabreModelProps) {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const innerRollRef = useRef<THREE.Group>(null);
  const { camera } = useThree();

  const geometry = useLoader(STLLoader, '/models/Halo Sabre - 4834338/files/Sabre_2.stl');

  // Asegurarnos de que las normales estén computadas para reflejos correctos
  useMemo(() => {
    geometry.computeVertexNormals();
  }, [geometry]);

  const config = {
    scale: 0.8 / 15,
    // Factor de suavizado para el alabeo (roll)
    rollLerp: 0.05
  };

  useFrame((state) => {
    if (!groupRef.current || !innerRollRef.current) return;
    
    const t = state.clock.getElapsedTime();
    
    // Persecución: El Sabre lee la trayectoria con un "delay" para ir detrás de la Banshee
    const trackTime = Math.max(0, t - delay);
    const lookAheadTime = trackTime + 0.1; // Hacia donde debe apuntar el Sabre para seguir la curva
    
    const currentPos = getFlightPosition(trackTime, seed, camera.position.z);
    const nextPos = getFlightPosition(lookAheadTime, seed, camera.position.z);
    
    // 1. Mover el grupo base
    groupRef.current.position.copy(currentPos);
    
    // 2. Apuntar (Yaw/Pitch) hacia el siguiente punto de la trayectoria
    groupRef.current.lookAt(nextPos);
    
    // 3. Obtener el ángulo de alabeo (Roll) dependiendo de qué tan fuerte es el giro
    const targetRoll = calculateRoll(currentPos, nextPos);
    
    // Suavizar el banqueo para que se vea como un caza real
    innerRollRef.current.rotation.z = THREE.MathUtils.lerp(
      innerRollRef.current.rotation.z, 
      targetRoll, 
      config.rollLerp
    );
  });

  return (
    <group ref={groupRef}>
      {/* 
        El innerRollRef es responsable de inclinar las alas (eje Z).
        El offsetRotation es para asegurar que el morro del modelo original apunte 
        correctamente hacia adelante (-Z) si el STL viene girado por defecto.
        Ajusta esta rotación base si el caza vuela de lado o hacia atrás.
      */}
      <group ref={innerRollRef}>
        <group rotation={[-Math.PI / 2, 0, 0]}>
          <mesh ref={meshRef} geometry={geometry} scale={config.scale}>
            <meshStandardMaterial
              color="#333333"      
              metalness={0.9}      
              roughness={0.2}      
              wireframe={false}    
            />
          </mesh>
          
          {/* 
            === AFTERBURNERS (MOTORES SABRE) ===
            Posición tentativa en la cola del caza. Ajusta Y o Z según el centro del STL.
          */}
          <group position={[0, -5, -0.5]}>
            {/* Luces de los reactores gemelos */}
            <pointLight position={[-1.2, 0, 0]} intensity={15} distance={10} color="#FF4500" />
            <pointLight position={[1.2, 0, 0]} intensity={15} distance={10} color="#FF4500" />
            
            {/* Núcleo del calor (Amarillo) */}
            <pointLight position={[0, 0, 0.5]} intensity={8} distance={5} color="#FFD700" />
            
            {/* Estela de Plasma / Fuego */}
            <Sparkles 
              position={[-1.2, -1, 0]}
              count={40} 
              scale={[1, 3, 1]} 
              size={3} 
              speed={5} 
              opacity={0.8} 
              color="#FF4500" 
            />
            <Sparkles 
              position={[1.2, -1, 0]}
              count={40} 
              scale={[1, 3, 1]} 
              size={3} 
              speed={5} 
              opacity={0.8} 
              color="#FF4500" 
            />
          </group>
        </group>
      </group>
    </group>
  );
}
