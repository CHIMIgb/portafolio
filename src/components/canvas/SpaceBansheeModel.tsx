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
}

export default function SpaceBansheeModel({ seed = 0, startDelay = 0, delay = 0 }: SpaceBansheeModelProps) {
  const groupRef = useRef<THREE.Group>(null);
  const innerRollRef = useRef<THREE.Group>(null);
  const slipspaceFlashRef = useRef<THREE.PointLight>(null);
  const { camera } = useThree();

  const obj = useLoader(OBJLoader, '/models/Space Banshee - 3992435/files/Body.obj');

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
          wireframe: false, // Solid look for cinematic fight
          transparent: true,
          opacity: 0.8,     // Higher opacity for visibility
          fog: false
        });
      }
    });
    return clonedObj;
  }, [obj]);

  const config = {
    scale: 3 / 15,
    rollLerp: 0.05
  };

  useFrame((state) => {
    if (!groupRef.current || !innerRollRef.current) return;
    
    const t = state.clock.getElapsedTime();
    const activeTime = t - startDelay;
    
    // --- SLIPSPACE ENTRANCE LOGIC ---
    if (activeTime < 0) {
      // Not yet jumped in
      groupRef.current.scale.setScalar(0);
      return;
    }
    
    // Flash intensity spikes on entrance, fades quickly
    if (slipspaceFlashRef.current) {
      if (activeTime < 1.5) {
        slipspaceFlashRef.current.intensity = (1.5 - activeTime) * 30; // Bright flash
      } else {
        slipspaceFlashRef.current.intensity = 0;
      }
    }
    
    // Smooth scaling up from 0 to target scale in 0.5s
    const currentScale = THREE.MathUtils.clamp(activeTime * 2, 0, 1) * config.scale;
    groupRef.current.scale.setScalar(currentScale);

    // --- FLIGHT MATH LOGIC ---
    // Apply flight delay for pursuing Sabres
    const trackTime = Math.max(0, activeTime - delay);
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
        // Keep wireframe off, just pulse intensity
        m.emissiveIntensity = pulse;
      }
    });
  });

  return (
    <group ref={groupRef}>
      {/* Slipspace arrival flash */}
      <pointLight ref={slipspaceFlashRef} distance={50} color="#FFFFFF" intensity={0} />

      <group ref={innerRollRef}>
        {/* Alignment offset to face -Z. Adjust as needed if OBJ loads backwards */}
        <group rotation={[0, 0, 0]}>
          {/* Ambient Purple Light */}
          <pointLight position={[0, 2, 0]} intensity={3} color="#714eaf" />
          
          {/* Twin Plasma Engines */}
          <group position={[0, -0.5, -0.8]}>
            <pointLight position={[-0.6, 0, 0]} intensity={12} distance={4} color="#00C2FF" />
            <pointLight position={[0.6, 0, 0]} intensity={12} distance={4} color="#00C2FF" />
            
            <Sparkles count={50} scale={[1.2, 0.5, 0.5]} size={2} speed={3} opacity={0.9} color="#00C2FF" />
          </group>

          <primitive object={bansheeObj} />
        </group>
      </group>
    </group>
  );
}
