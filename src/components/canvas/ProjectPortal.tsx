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

  // Manual subtle floating animation
  useFrame((state) => {
    if (meshRef.current) {
      // Gentle vertical sway
      meshRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.5 + index) * 0.1;
      // Soft rhythmic rotation
      meshRef.current.rotation.y = tiltAngle + Math.sin(state.clock.getElapsedTime() * 0.3 + index) * 0.02;
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
          color={hovered ? "#00C2FF" : "#0D0D0D"} 
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
        opacity={0.9}
        scale={[4.2, 4.2]}
        position={[0, 0.25, 0.02]}
        grayscale={hovered ? 0 : 0.4}
      />
      
      {/* Subtle Glow Frame */}
      <mesh position={[0, 0, -0.01]}>
        <planeGeometry args={[4.6, 5.1]} />
        <meshBasicMaterial 
          color="#00C2FF" 
          transparent 
          opacity={hovered ? 0.3 : 0.1} 
        />
      </mesh>
      
      {/* Title Text */}
      <Text
        position={[0, 2.8, 0]}
        fontSize={0.25}
        color="white"
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
            color="#00C2FF"
            anchorX="center"
            fillOpacity={hovered ? 1 : 0.6}
          >
            {t}
          </Text>
        ))}
      </group>
      
      {/* Explorer Button */}
      {hovered && (
        <Html position={[0, 0, 0.2]} center transform distanceFactor={5}>
          <div 
            style={{ 
              background: "rgba(0, 194, 255, 0.9)", 
              color: "#000", 
              padding: "10px 25px", 
              borderRadius: "50px", 
              fontWeight: "bold",
              fontSize: "0.9rem",
              cursor: "pointer",
              boxShadow: "0 0 30px rgba(0, 194, 255, 0.6)",
              whiteSpace: "nowrap",
              letterSpacing: "0.1em",
              textTransform: "uppercase"
            }}
            onClick={() => window.open(project.link, "_blank")}
          >
            Ver Proyecto
          </div>
        </Html>
      )}
    </group>
  );
}
