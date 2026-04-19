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
    position: { x: -350, y: -40, z: -200 },  // Empujado mucho más atrás en Z para que pase detrás de la Estación (z=-45)
    rotation: { x: -Math.PI / 2, y: 0, z: Math.PI / 2 }, 
    scale: 1.5,           // Ligeramente más grande porque está mucho más lejos
    speed: 7.0,           
    rangeX: 800,          
    heightVariation: 25   
  };

  // Segundos antes de que el Destructor Halberd asome (delay)
  const delaySeconds = 4.0;

  const passRef = useRef(0);
  const lastDirectionRef = useRef(-1); // Empieza hacia la izquierda

  useFrame((state) => {
    // Retardo inicial
    let t = state.clock.elapsedTime - delaySeconds;
    if (t < 0) t = 0; // Se queda congelado fuera de pantalla hasta que t supere delaySeconds

    const totalCycleDistance = config.rangeX * 2; 

    // Al sumarle + config.rangeX forzamos a que inicie la animación en la VUELTA (de derecha a izquierda)
    const distanceTraveled = (t * config.speed + config.rangeX) % totalCycleDistance;

    let posX: number;
    let direction: number;

    if (distanceTraveled < config.rangeX) {
      // Ida: moviéndose hacia la derecha
      posX = config.position.x + distanceTraveled;
      direction = 1;
    } else {
      // Vuelta: moviéndose hacia la izquierda (EMPIEZA AQUÍ)
      posX = config.position.x + config.rangeX - (distanceTraveled - config.rangeX);
      direction = -1;
    }

    if (direction !== lastDirectionRef.current) {
      passRef.current += 1;
      lastDirectionRef.current = direction;
    }

    const heightOffset = Math.sin(passRef.current * 0.9) * config.heightVariation;

    if (groupRef.current) {
      groupRef.current.position.x = posX;
      groupRef.current.position.y = config.position.y + heightOffset;
      groupRef.current.position.z = camera.position.z + config.position.z;
    }
    if (meshRef.current) {
      meshRef.current.rotation.x = config.rotation.x;
      meshRef.current.rotation.y = config.rotation.y;
      meshRef.current.rotation.z = direction === 1
        ? Math.PI / 2    
        : -Math.PI / 2;  
    }
  });

  return (
    <group ref={groupRef} position={[config.position.x, config.position.y, config.position.z]}>
      {/* Luz ambiental propia para el destructor */}
      <pointLight position={[0, -10, 10]} intensity={3} color="#00C2FF" />

      <mesh ref={meshRef} geometry={geometry} scale={config.scale}>
        <meshStandardMaterial
          color="#00C2FF"  // Mismo color azul cyán que el resto de la flota
          wireframe={true}
          transparent={true}
          opacity={0.06}
          fog={false}
        />
      </mesh>
    </group>
  );
}
