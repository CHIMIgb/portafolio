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
  
  // Example image placeholder if the user hasn't provided one yet
  const imageUrl = `https://picsum.photos/seed/${project.id}/800/600`;

  return (
    <Float 
      speed={1.5} 
      rotationIntensity={0.2} 
      floatIntensity={1} 
      floatingRange={[-0.2, 0.2]}
    >
      <group position={project.position} ref={meshRef}>
        {/* Main Project Card / Frame - LARGER SIZE [6, 3.75] */}
        <mesh 
          onPointerOver={() => setHovered(true)} 
          onPointerOut={() => setHovered(false)}
        >
          <planeGeometry args={[6, 3.75]} />
          <meshStandardMaterial 
            color={hovered ? "#00C2FF" : "#111111"} 
            metalness={0.9} 
            roughness={0.1} 
            transparent 
            opacity={0.95} 
          />
        </mesh>
        
        {/* Project Image - SCALED UP */}
        <Image 
          url={imageUrl} 
          transparent
          opacity={0.85}
          scale={[5.8, 3.55]}
          position={[0, 0, 0.02]}
          grayscale={hovered ? 0 : 0.6}
        />
        
        {/* Neon Glow Frame */}
        <mesh position={[0, 0, -0.01]}>
          <planeGeometry args={[6.1, 3.85]} />
          <meshBasicMaterial 
            color="#00C2FF" 
            transparent 
            opacity={hovered ? 0.6 : 0.2} 
          />
        </mesh>
        
        {/* Title Text - Back to default font for stability */}
        <Text
          position={[0, 2.8, 0]}
          fontSize={0.4}
          color="white"
          anchorX="center"
        >
          {project.title}
        </Text>
        
        {/* Tech tags */}
        <group position={[0, -2.5, 0]}>
          {project.tech.slice(0, 4).map((t, i) => (
            <Text
              key={t}
              position={[(i - 1.5) * 1.5, 0, 0]}
              fontSize={0.2}
              color="#00C2FF"
              anchorX="center"
            >
              {t}
            </Text>
          ))}
        </group>
        
        {/* Detail Button */}
        {hovered && (
          <Html position={[0, 0, 0.2]} center transform distanceFactor={5}>
            <div 
              style={{ 
                background: "var(--accent-primary)", 
                color: "var(--primary-dark)", 
                padding: "15px 30px", 
                borderRadius: "50px", 
                fontWeight: "bold",
                fontSize: "1.2rem",
                cursor: "pointer",
                boxShadow: "0 0 20px rgba(0, 194, 255, 0.5)",
                whiteSpace: "nowrap",
                transition: "all 0.3s ease"
              }}
              onClick={() => window.open(project.link, "_blank")}
            >
              EXPLORAR
            </div>
          </Html>
        )}
      </group>
    </Float>
  );
}
