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
  const imageUrl = `https://picsum.photos/seed/${project.id}/600/400`;

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <group position={project.position} ref={meshRef}>
        {/* Main Project Card / Frame */}
        <mesh 
          onPointerOver={() => setHovered(true)} 
          onPointerOut={() => setHovered(false)}
        >
          <planeGeometry args={[4, 2.5]} />
          <meshStandardMaterial 
            color={hovered ? "#00C2FF" : "#1A1A1A"} 
            metalness={0.8} 
            roughness={0.2} 
            transparent 
            opacity={0.9} 
          />
        </mesh>
        
        {/* Project Image */}
        <Image 
          url={imageUrl} 
          transparent
          opacity={0.8}
          scale={[3.8, 2.3]}
          position={[0, 0, 0.01]}
          grayscale={hovered ? 0 : 0.5}
        />
        
        {/* Glow Frame */}
        <mesh position={[0, 0, -0.01]}>
          <planeGeometry args={[4.1, 2.6]} />
          <meshBasicMaterial color="#00C2FF" transparent opacity={hovered ? 0.4 : 0.1} />
        </mesh>
        
        {/* Title Text */}
        <Text
          position={[0, 2, 0]}
          fontSize={0.3}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          {project.title}
        </Text>
        
        {/* Tech tags as small plane indicators */}
        <group position={[0, -1.8, 0]}>
          {project.tech.slice(0, 3).map((t, i) => (
            <Text
              key={t}
              position={[(i - 1) * 1.2, 0, 0]}
              fontSize={0.15}
              color="#00C2FF"
              anchorX="center"
            >
              {t}
            </Text>
          ))}
        </group>
        
        {/* Detail Button (Html for easier interaction) */}
        {hovered && (
          <Html position={[0, 0, 0.1]} center transform distanceFactor={5}>
            <div 
              style={{ 
                background: "var(--accent-primary)", 
                color: "var(--primary-dark)", 
                padding: "10px 20px", 
                borderRadius: "5px", 
                fontWeight: "bold",
                cursor: "pointer",
                whiteSpace: "nowrap"
              }}
              onClick={() => window.open(project.link, "_blank")}
            >
              Ver {project.title}
            </div>
          </Html>
        )}
      </group>
    </Float>
  );
}
