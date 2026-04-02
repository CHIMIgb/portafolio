import { useFrame } from "@react-three/fiber";
import { Float, Text, Image, Html } from "@react-three/drei";
import { useRef, useState } from "react";
import * as THREE from "three";
import { Project } from "../../types/project";
import { motion } from "framer-motion-3d";

interface ProjectPortalProps {
  project: Project;
  index: number;
}

export default function ProjectPortal({ project, index }: ProjectPortalProps) {
  const [hovered, setHovered] = useState(false);
  const [entranceProgress, setEntranceProgress] = useState(0);
  const meshRef = useRef<THREE.Group>(null);

  const imageUrl = project.image || `https://picsum.photos/seed/${project.id}/800/800`;

  // Entrance animation logic (Warp Jump)
  const ENTRANCE_DURATION = 1.6;
  const STAGGER_DELAY = 0.15;

  // Tilt towards center based on X position
  const tiltAngle = project.position[0] > 0 ? -0.3 : 0.3;

  // Enhanced multi-axis floating animation
  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime();
      const speed = 0.5;

      // Calculate localized entrance progress with stagger
      const startTrigger = index * STAGGER_DELAY;
      const rawProgress = Math.max(0, (time - startTrigger) / ENTRANCE_DURATION);
      
      // Easing (Out-Expo) for that "snap" to position
      const easedProgress = rawProgress >= 1 ? 1 : 1 - Math.pow(2, -10 * rawProgress);
      
      if (entranceProgress !== easedProgress) setEntranceProgress(easedProgress);

      // Base position for floating effect
      const baseY = Math.sin(time * speed + index) * 0.35;
      const baseX = project.position[0] + Math.cos(time * (speed * 0.8) + index) * 0.25;
      const baseZ = project.position[2] + Math.sin(time * (speed * 0.5) + index) * 0.15;

      // Warp jump interpolation: fly from center [0,0,deep] to target
      // We start slightly behind the target to feel like we are catching up
      const warpZStart = project.position[2] - 40; 
      
      meshRef.current.position.x = THREE.MathUtils.lerp(0, baseX, easedProgress);
      meshRef.current.position.y = THREE.MathUtils.lerp(0, baseY, easedProgress);
      meshRef.current.position.z = THREE.MathUtils.lerp(warpZStart, baseZ, easedProgress);

      // Rhythmic rotation
      meshRef.current.rotation.y = THREE.MathUtils.lerp(0, tiltAngle + Math.sin(time * 0.4 + index) * 0.12, easedProgress);
      meshRef.current.rotation.z = THREE.MathUtils.lerp(0, Math.sin(time * 0.3 + index) * 0.05, easedProgress);

      // Scale up during entrance
      const scaleBase = easedProgress;
      const hoverScale = hovered ? 1.08 : 1;
      const finalScale = scaleBase * hoverScale;

      meshRef.current.scale.set(
        THREE.MathUtils.lerp(meshRef.current.scale.x, finalScale, 0.1),
        THREE.MathUtils.lerp(meshRef.current.scale.y, finalScale, 0.1),
        THREE.MathUtils.lerp(meshRef.current.scale.z, finalScale, 0.1)
      );
    }
  });

  return (
    <group position={project.position} ref={meshRef} rotation={[0, tiltAngle, 0]}>
      {/* Main Project Card */}
      <mesh
        onPointerOver={() => {
          setHovered(true);
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          setHovered(false);
          document.body.style.cursor = "default";
        }}
        onClick={() => {
          if (project.link) window.open(project.link, "_blank");
        }}
      >
        <planeGeometry args={[4.5, 5]} />
        <meshStandardMaterial
          color="#111"
          metalness={0.9}
          roughness={0.1}
          transparent
          opacity={0.96}
        />
      </mesh>

      {/* Project Image */}
      <Image
        url={imageUrl}
        transparent
        opacity={1}
        scale={[4.2, 4.2]}
        position={[0, 0.25, 0.02]}
        grayscale={0}
        onClick={() => {
          if (project.link) window.open(project.link, "_blank");
        }}
      />

      {/* Internal illumination overlay */}
      <mesh position={[0, 0, 0.03]}>
        <planeGeometry args={[4.5, 5]} />
        <meshBasicMaterial
          color="#FFFFFF"
          transparent
          opacity={hovered ? 0.12 : 0}
        />
      </mesh>

      {/* Dynamic Glow Frame */}
      <mesh position={[0, 0, -0.01]}>
        <planeGeometry args={[4.6, 5.1]} />
        <meshBasicMaterial
          color="#FFFFFF"
          transparent
          opacity={hovered ? 0.35 : 0.12}
        />
      </mesh>
    </group>
  );
}
