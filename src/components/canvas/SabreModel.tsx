"use client";

import { useRef, useMemo } from 'react';
import { useFrame, useLoader, useThree } from '@react-three/fiber';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';
import { Edges } from '@react-three/drei';
import * as THREE from 'three';
import { getFlightPosition, calculateRoll } from '@/utils/flightMath';

interface SabreModelProps {
  seed?: number;
  delay?: number;
  isStatic?: boolean;
}

export default function SabreModel({ seed = 0, delay = 0.5, isStatic = false }: SabreModelProps) {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const innerRollRef = useRef<THREE.Group>(null);

  // Laser System Refs
  const laserRef = useRef<THREE.Mesh>(null);
  const muzzleFlashRef = useRef<THREE.PointLight>(null);
  // Control individual de ráfagas
  const shotStateRef = useRef({
    lastShot: -10,
    burstsLeft: 0,
    lastBurstCooldown: -10,
    nextCooldownTarget: 2 + Math.random() * 3
  });

  const { camera } = useThree();

  const geometry = useLoader(STLLoader, '/models/Halo Sabre - 4834338/files/Sabre_2.stl');

  useMemo(() => {
    geometry.computeVertexNormals();
  }, [geometry]);

  const config = {
    scale: 1.6 / 15,
    rollLerp: 0.05,
    speed: 3.0
  };

  useFrame((state) => {
    if (!groupRef.current || !innerRollRef.current) return;
    if (isStatic) return;

    const t = state.clock.getElapsedTime();

    const trackTime = Math.max(0, (t - delay) * config.speed);
    const lookAheadTime = trackTime + 0.1;

    const currentPos = getFlightPosition(trackTime, seed, camera.position.z);
    const nextPos = getFlightPosition(lookAheadTime, seed, camera.position.z);

    groupRef.current.position.copy(currentPos);
    groupRef.current.lookAt(nextPos);

    const targetRoll = calculateRoll(currentPos, nextPos);

    innerRollRef.current.rotation.z = THREE.MathUtils.lerp(
      innerRollRef.current.rotation.z,
      targetRoll,
      config.rollLerp
    );

    // --- SHOOTING LOGIC ---
    const shotState = shotStateRef.current;

    if (shotState.burstsLeft <= 0) {
      if (t - shotState.lastBurstCooldown > shotState.nextCooldownTarget) {
        // Cuando termina la recarga de 5-10s, decide ALEATORIAMENTE si disparará 
        // o si saltará el turno (para que no disparen todas)
        if (Math.random() > 0.2) { // 80% de probabilidad de disparar
          shotState.burstsLeft = Math.floor(Math.random() * 3) + 3; // Ráfagas un poco más largas
          shotState.lastShot = t;
          shotState.burstsLeft--;
        } else {
          // Salta el turno: inicia otro cooldown corto
          shotState.lastBurstCooldown = t;
          shotState.nextCooldownTarget = 2 + Math.random() * 3;
        }
      }
    } else {
      // Disparando dentro de la ráfaga
      const rapidFireRate = 0.05;
      if (t - shotState.lastShot > rapidFireRate) {
        shotState.lastShot = t;
        shotState.burstsLeft--;

        if (shotState.burstsLeft <= 0) {
          // Terminó la ráfaga, iniciamos cooldown corto
          shotState.lastBurstCooldown = t;
          shotState.nextCooldownTarget = 2 + Math.random() * 3;
        }
      }
    }

    const timeSinceShot = t - shotState.lastShot;

    // Animar disparo durante los primeros 0.2 segundos posteriores a jalar el gatillo
    if (timeSinceShot < 0.2) {
      const progress = timeSinceShot / 0.2; // 0 to 1

      const fireDist = -(progress * 150); // Aumentado de 80 a 150 para velocidad hipersónica
      const opacityOut = 1 - progress;

      if (laserRef.current) {
        // En el STL del Sabre, el morro apunta hacia Y negativo local
        laserRef.current.position.y = fireDist;
        laserRef.current.scale.y = 1 + (progress * 5);
        (laserRef.current.material as THREE.MeshBasicMaterial).opacity = opacityOut;
      }

      if (muzzleFlashRef.current) {
        muzzleFlashRef.current.intensity = opacityOut * 25;
      }
    } else {
      if (laserRef.current) (laserRef.current.material as THREE.MeshBasicMaterial).opacity = 0;
      if (muzzleFlashRef.current) muzzleFlashRef.current.intensity = 0;
    }
  });

  return (
    <group ref={groupRef}>
      <group ref={innerRollRef}>
        <group rotation={[-Math.PI / 2, 0, 0]}>
          <pointLight position={[0, 0, 5]} intensity={4} color="#e2e8f0" />

          <mesh ref={meshRef} geometry={geometry} scale={config.scale}>
            <meshStandardMaterial
              color="#e2e8f0"
              emissive="#475569"
              emissiveIntensity={0.5}
              metalness={0.7}
              roughness={0.3}
              wireframe={false}
              transparent={false}
              fog={false}
            />
            <Edges threshold={15} color="#0f172a" />
          </mesh>

          {/* WEAPONS SYSTEM (Muzzle flash + Lasers) */}
          <group position={[0, -10, 0]}> {/* Movido más hacia adelante (de -5 a -10) */}
            <pointLight ref={muzzleFlashRef} distance={40} color="#FFD700" intensity={0} />

            {/* Proyectil naranja cinético único en el centro */}
            <mesh ref={laserRef} position={[0, 0, 0]}>
              <cylinderGeometry args={[0.1, 0.1, 1.5]} />
              <meshBasicMaterial color="#FF4500" transparent opacity={0} depthWrite={false} blending={THREE.AdditiveBlending} />
            </mesh>
          </group>
        </group>
      </group>
    </group>
  );
}
