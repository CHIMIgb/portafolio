import { useRef, useMemo } from 'react';
import { useFrame, useLoader, useThree } from '@react-three/fiber';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { Sparkles } from '@react-three/drei';
import * as THREE from 'three';
import { getFlightPosition, calculateRoll } from '@/utils/flightMath';

interface SpaceBansheeModelProps {
  seed?: number;
  startDelay?: number;
  delay?: number;
  isStatic?: boolean;
}

export default function SpaceBansheeModel({ seed = 0, startDelay = 0, delay = 0, isStatic = false }: SpaceBansheeModelProps) {
  const groupRef = useRef<THREE.Group>(null);
  const innerRollRef = useRef<THREE.Group>(null);
  
  // Laser System Refs
  const laser1Ref = useRef<THREE.Mesh>(null);
  const laser2Ref = useRef<THREE.Mesh>(null);
  const muzzleFlashRef = useRef<THREE.PointLight>(null);
  const shotStateRef = useRef({ 
    lastShot: -10,
    burstsLeft: 0,
    lastBurstCooldown: -10,
    nextCooldownTarget: 2 + Math.random() * 3
  });
  
  const { camera } = useThree();

  const obj = useLoader(OBJLoader, '/models/Space Banshee - 3992435/files/Space_Banshee.obj');

  const bansheeObj = useMemo(() => {
    const clonedObj = obj.clone();
    let meshCount = 0;
    clonedObj.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        meshCount++;
        
        const colors = ["#a65fb5", "#714eaf", "#59357a"];
        const mainColor = colors[meshCount % colors.length];

        mesh.material = new THREE.MeshStandardMaterial({
          color: mainColor,
          emissive: mainColor,
          emissiveIntensity: 0.2,
          metalness: 0.9,
          roughness: 0.1,
          wireframe: false,
          transparent: true,
          opacity: 0.8,
          fog: false
        });
      }
    });
    return clonedObj;
  }, [obj]);

  const config = {
    scale: 6 / 15,
    rollLerp: 0.05,
    speed: 3.0
  };

  useFrame((state) => {
    if (!groupRef.current || !innerRollRef.current) return;
    
    const t = state.clock.getElapsedTime();
    
    if (isStatic) {
      groupRef.current.scale.setScalar(config.scale);
      
      const pulse = Math.sin(t * 2) * 0.1 + 0.3;
      innerRollRef.current.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const m = (child as THREE.Mesh).material as THREE.MeshStandardMaterial;
          m.emissiveIntensity = pulse;
        }
      });
      return;
    }
    
    // Al igual que los Sabres, la Banshee siempre mantiene su escala original y viaja 
    // su trayectoria matemática desde el segundo 0, entrando a la vista de forma natural.
    groupRef.current.scale.setScalar(config.scale);

    // --- FLIGHT MATH LOGIC ---
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
      
    // --- HULL PULSE ANIMATION ---
    const pulse = Math.sin(t * 2) * 0.1 + 0.3;
    innerRollRef.current.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const m = (child as THREE.Mesh).material as THREE.MeshStandardMaterial;
        m.emissiveIntensity = pulse;
      }
    });
    
    // --- SHOOTING LOGIC ---
    const shotState = shotStateRef.current;
    
    if (shotState.burstsLeft <= 0) {
      if (t - shotState.lastBurstCooldown > shotState.nextCooldownTarget) {
        if (Math.random() > 0.3) { // 70% de probabilidad de disparar
          shotState.burstsLeft = Math.floor(Math.random() * 3) + 3; 
          shotState.lastShot = t;
          shotState.burstsLeft--;
        } else {
          // Salta el turno: inicia otro cooldown corto
          shotState.lastBurstCooldown = t;
          shotState.nextCooldownTarget = 2 + Math.random() * 3;
        }
      }
    } else {
      const rapidFireRate = 0.05; 
      if (t - shotState.lastShot > rapidFireRate) {
        shotState.lastShot = t;
        shotState.burstsLeft--;
        
        if (shotState.burstsLeft <= 0) {
          shotState.lastBurstCooldown = t;
          shotState.nextCooldownTarget = 2 + Math.random() * 3;
        }
      }
    }

    const timeSinceShot = t - shotState.lastShot;
    
    if (timeSinceShot < 0.2) {
      const progress = timeSinceShot / 0.2;
      const fireDist = progress * 150; // Aumentado de 80 a 150 para velocidad hipersónica
      const opacityOut = 1 - progress;
      
      if (laser1Ref.current && laser2Ref.current) {
        // En este modelo, el frente parece ser +Z
        laser1Ref.current.position.z = fireDist;
        laser2Ref.current.position.z = fireDist;
        
        laser1Ref.current.scale.y = 1 + (progress * 5);
        laser2Ref.current.scale.y = 1 + (progress * 5);
        
        (laser1Ref.current.material as THREE.MeshBasicMaterial).opacity = opacityOut;
        (laser2Ref.current.material as THREE.MeshBasicMaterial).opacity = opacityOut;
      }
      
      if (muzzleFlashRef.current) {
        muzzleFlashRef.current.intensity = opacityOut * 25;
      }
    } else {
      if (laser1Ref.current) (laser1Ref.current.material as THREE.MeshBasicMaterial).opacity = 0;
      if (laser2Ref.current) (laser2Ref.current.material as THREE.MeshBasicMaterial).opacity = 0;
      if (muzzleFlashRef.current) muzzleFlashRef.current.intensity = 0;
    }
  });

  return (
    <group ref={groupRef}>
      <group ref={innerRollRef}>
        <group rotation={[0, 0, 0]}>
          <pointLight position={[0, 2, 0]} intensity={3} color="#714eaf" />
          
          <group position={[0, -0.5, -0.8]}>
            <pointLight position={[-0.6, 0, 0]} intensity={12} distance={4} color="#00C2FF" />
            <pointLight position={[0.6, 0, 0]} intensity={12} distance={4} color="#00C2FF" />
            
            <Sparkles count={50} scale={[1.2, 0.5, 0.5]} size={2} speed={3} opacity={0.9} color="#00C2FF" />
          </group>

          <primitive object={bansheeObj} />
          
          {/* WEAPONS SYSTEM (Muzzle flash + Lasers) */}
          <group position={[0, -0.2, 1.5]}> {/* Posicionado al frente debajo de la cabina */}
            <pointLight ref={muzzleFlashRef} distance={30} color="#9b59b6" intensity={0} />
            
            {/* Proyectiles de Plasma Morados */}
            <mesh ref={laser1Ref} position={[-0.8, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.05, 0.05, 1.5]} />
              <meshBasicMaterial color="#9b59b6" transparent opacity={0} depthWrite={false} blending={THREE.AdditiveBlending} />
            </mesh>
            <mesh ref={laser2Ref} position={[0.8, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.05, 0.05, 1.5]} />
              <meshBasicMaterial color="#9b59b6" transparent opacity={0} depthWrite={false} blending={THREE.AdditiveBlending} />
            </mesh>
          </group>
        </group>
      </group>
    </group>
  );
}
