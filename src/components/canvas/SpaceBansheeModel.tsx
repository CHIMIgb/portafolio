import { useRef, useMemo } from 'react';
import { useFrame, useLoader, useThree } from '@react-three/fiber';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { Sparkles } from '@react-three/drei';
import * as THREE from 'three';

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

  // Trail System Refs
  const leftTrailRef = useRef<THREE.Mesh>(null);
  const rightTrailRef = useRef<THREE.Mesh>(null);
  
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
  };

  const flightState = useRef({
    initialized: false,
    active: false,
    direction: 1, // 1 = L->R, -1 = R->L
    yPos: 0,
    zPos: 0,
    xOffset: 0,
    speed: 40,
    lastDespawnTime: 0,
    nextSpawnDelay: delay + Math.random() * 2,
  });

  useFrame((state, delta) => {
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
    
    groupRef.current.scale.setScalar(config.scale);

    const fState = flightState.current;

    if (!fState.initialized) {
      fState.initialized = true;
      fState.lastDespawnTime = t;
    }

    // --- FLIGHT SPAWN LOGIC ---
    if (!fState.active) {
      if (t - fState.lastDespawnTime > fState.nextSpawnDelay) {
        fState.active = true;
        fState.direction = Math.random() > 0.5 ? 1 : -1;
        fState.yPos = (Math.random() - 0.5) * 40; // Altura aleatoria entre -20 y 20
        fState.zPos = camera.position.z - 30 - Math.random() * 30; // Profundidad aleatoria
        fState.speed = 40 + Math.random() * 30;
        fState.xOffset = fState.direction === 1 ? -150 : 150;
      } else {
        groupRef.current.position.set(0, 10000, 0); // Ocultar mientras espera
        return;
      }
    }

    if (fState.active) {
      fState.xOffset += fState.direction * fState.speed * delta;
      
      groupRef.current.position.set(fState.xOffset, fState.yPos, fState.zPos);
      
      // Orientación: El frente de la Banshee es +Z. 
      // Para mirar hacia +X (L->R) rotamos Math.PI/2 en Y
      // Para mirar hacia -X (R->L) rotamos -Math.PI/2 en Y
      groupRef.current.rotation.set(0, fState.direction === 1 ? Math.PI / 2 : -Math.PI / 2, 0);

      // Chequear si cruzó toda la pantalla
      if ((fState.direction === 1 && fState.xOffset > 150) || 
          (fState.direction === -1 && fState.xOffset < -150)) {
        fState.active = false;
        fState.lastDespawnTime = t;
        fState.nextSpawnDelay = 1 + Math.random() * 4; // Esperar 1 a 5 seg para reaparecer
      }
    }
      
    // --- HULL PULSE ANIMATION ---
    const pulse = Math.sin(t * 2) * 0.1 + 0.3;
    innerRollRef.current.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const m = (child as THREE.Mesh).material as THREE.MeshStandardMaterial;
        m.emissiveIntensity = pulse;
      }
    });

    // --- TRAIL ANIMATION ---
    if (leftTrailRef.current && rightTrailRef.current) {
      if (fState.active) {
        // Efecto de rastro parpadeante/vibrante
        const trailFlicker = 1 + Math.random() * 0.3;
        leftTrailRef.current.scale.y = trailFlicker; // cylinderGeometry escala Y para la longitud
        rightTrailRef.current.scale.y = trailFlicker;
        leftTrailRef.current.visible = true;
        rightTrailRef.current.visible = true;
      } else {
        leftTrailRef.current.visible = false;
        rightTrailRef.current.visible = false;
      }
    }
    
    // --- SHOOTING LOGIC ---
    if (fState.active) {
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
    } else {
      // Si no está activa, asegurarnos de que no haya lásers visibles
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

            {/* BLUE TRAILS (RASTRO AZUL) */}
            {/* El cilindro por defecto se alinea en el eje Y. Al rotar Math.PI/2 en X, apunta hacia Z. Lo desplazamos a -Z para que vaya hacia atrás. */}
            <mesh ref={leftTrailRef} position={[-0.6, 0, -4]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.08, 0.0, 8, 8]} />
              <meshBasicMaterial color="#00C2FF" transparent opacity={0.6} blending={THREE.AdditiveBlending} depthWrite={false} />
            </mesh>
            <mesh ref={rightTrailRef} position={[0.6, 0, -4]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.08, 0.0, 8, 8]} />
              <meshBasicMaterial color="#00C2FF" transparent opacity={0.6} blending={THREE.AdditiveBlending} depthWrite={false} />
            </mesh>
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
