"use client";

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
  const meshRef = useRef<THREE.Group>(null);
  
  const imageUrl = `https://picsum.photos/seed/${project.id}/800/800`;

  // Tilt towards center based on X position
  const tiltAngle = project.position[0] > 0 ? -0.3 : 0.3;

  // Enhanced multi-axis floating animation
  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime();
      const speed = 0.5;
      
      // Vertical sway (Y) - More pronounced
      meshRef.current.position.y = Math.sin(time * speed + index) * 0.35;
      
      // Lateral movement (X) - Drifting effect
      meshRef.current.position.x = project.position[0] + Math.cos(time * (speed * 0.8) + index) * 0.25;
      
      // Z-depth pulsing (subtle)
      meshRef.current.position.z = project.position[2] + Math.sin(time * (speed * 0.5) + index) * 0.15;
      
      // Rhythmic rotation
      meshRef.current.rotation.y = tiltAngle + Math.sin(time * 0.4 + index) * 0.12;
      meshRef.current.rotation.z = Math.sin(time * 0.3 + index) * 0.05;

      // Smooth scale on hover
      const targetScale = hovered ? 1.08 : 1;
      meshRef.current.scale.set(
        THREE.MathUtils.lerp(meshRef.current.scale.x, targetScale, 0.1),
        THREE.MathUtils.lerp(meshRef.current.scale.y, targetScale, 0.1),
        THREE.MathUtils.lerp(meshRef.current.scale.z, targetScale, 0.1)
      );
    }
  });

  return (
    <group position={project.position} ref={meshRef} rotation={[0, tiltAngle, 0]}>
      {/* Main Project Card */}
      <mesh 
        onPointerOver={() => setHovered(true)} 
        onPointerOut={() => setHovered(false)}
      >
        <planeGeometry args={[4.5, 5]} />
        <meshStandardMaterial 
          color={hovered ? "#00C2FF" : "#111"} 
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
        opacity={hovered ? 1 : 0.85}
        scale={[4.2, 4.2]}
        position={[0, 0.25, 0.02]}
        grayscale={hovered ? 0 : 0.45}
      />
      
      {/* Dynamic Glow Frame */}
      <mesh position={[0, 0, -0.01]}>
        <planeGeometry args={[4.6, 5.1]} />
        <meshBasicMaterial 
          color="#00C2FF" 
          transparent 
          opacity={hovered ? 0.5 : 0.15} 
        />
      </mesh>
      
      {/* Title Text */}
      <Text
        position={[0, 2.8, 0]}
        fontSize={0.25}
        color={hovered ? "#00C2FF" : "white"}
        anchorX="center"
      >
        {project.title}
      </Text>
      
      {/* Tech tags */}
      <group position={[0, -2.1, 0.03]}>
        {project.tech.slice(0, 3).map((t, i) => (
          <Text
            key={t}
            position={[(i - 1) * 1.5, 0, 0]}
            fontSize={0.15}
            color={hovered ? "white" : "#00C2FF"}
            anchorX="center"
            fillOpacity={hovered ? 1 : 0.6}
          >
            {t}
          </Text>
        ))}
      </group>
      
      {/* Explorer Button */}
      {hovered && (
        <Html position={[0, 0, 0.25]} center transform distanceFactor={5}>
          <div 
            style={{ 
              background: "rgba(0, 0, 0, 0.8)", 
              color: "#00C2FF", 
              padding: "12px 30px", 
              borderRadius: "4px", 
              fontWeight: "900",
              fontSize: "1rem",
              cursor: "pointer",
              border: "2px solid #00C2FF",
              boxShadow: "0 0 40px rgba(0, 194, 255, 0.8)",
              whiteSpace: "nowrap",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              animation: "pulse 1.5s infinite"
            }}
            onClick={() => window.open(project.link, "_blank")}
          >
            VER DETALLES
          </div>
        </Html>
      )}
    </group>
  );
}
