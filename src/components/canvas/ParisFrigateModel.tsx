"use client";

import { useRef } from 'react';
import { useFrame, useLoader, useThree } from '@react-three/fiber';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';
import * as THREE from 'three';

export default function ParisFrigateModel() {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const { camera } = useThree();

  const geometry = useLoader(STLLoader, '/models/paris-class-frigate-unsc-grafton-armada-legends-hal20240707-1-s9je8u/spacenavy90/paris-class-frigate-unsc-grafton-armada-legends-halo/paris_v2.stl');

  // ==========================================
  // VARIABLES DE CONTROL (Ajustar libremente)
  // ==========================================
  const config = {
    position: { x: -270, y: -80, z: -135 },  // Empieza fuera de pantalla por la izquierda
    rotation: { x: -Math.PI / 2, y: 0, z: Math.PI / 2 }, // Vista lateral
    scale: 1.0,
    speed: 5.0,         // Velocidad de desplazamiento (unidades/segundo)
    rangeX: 600,          // Recorrido total en X (de -200 a +200, sale por ambos lados de la pantalla)
    heightVariation: 30   // Cuánto varía la altura (Y) entre pasadas
  };

  // Ref para rastrear la pasada actual y variar la altura
  const passRef = useRef(0);
  const lastDirectionRef = useRef(1); // 1 = derecha, -1 = izquierda

  // Patrullaje con ida y vuelta, rotación 180° y altura variable
  useFrame((state) => {
    const t = state.clock.elapsedTime;

    // Calcular posición dentro del ciclo de ida y vuelta
    const totalCycleDistance = config.rangeX * 2; // ida + vuelta
    const distanceTraveled = (t * config.speed) % totalCycleDistance;

    // Determinar dirección: ida (0 → rangeX) o vuelta (rangeX → 0)
    let posX: number;
    let direction: number;

    if (distanceTraveled < config.rangeX) {
      // Ida: moviéndose hacia la derecha
      posX = config.position.x + distanceTraveled;
      direction = 1;
    } else {
      // Vuelta: moviéndose hacia la izquierda
      posX = config.position.x + config.rangeX - (distanceTraveled - config.rangeX);
      direction = -1;
    }

    // Detectar cambio de dirección para incrementar la pasada
    if (direction !== lastDirectionRef.current) {
      passRef.current += 1;
      lastDirectionRef.current = direction;
    }

    // Variar la altura en cada pasada para dinamismo
    // Usa sin del número de pasada para un patrón suave de alturas
    const heightOffset = Math.sin(passRef.current * 1.2) * config.heightVariation;

    if (groupRef.current) {
      groupRef.current.position.x = posX;
      groupRef.current.position.y = config.position.y + heightOffset;
      groupRef.current.position.z = camera.position.z + config.position.z;
    }
    if (meshRef.current) {
      meshRef.current.rotation.x = config.rotation.x;
      meshRef.current.rotation.y = config.rotation.y;
      // Rotar 180° según la dirección (proa siempre apunta al frente de avance)
      meshRef.current.rotation.z = direction === 1
        ? Math.PI / 2    // Proa hacia la derecha
        : -Math.PI / 2;  // Proa hacia la izquierda (180° girada)
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
