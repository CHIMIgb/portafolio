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

  // Manual very subtle animation
  useFrame((state) => {
    if (meshRef.current) {
      // Tiny breathe
      meshRef.current.position.y += Math.sin(state.clock.getElapsedTime() + index) * 0.001;
      // Oscillate around the tilt angle
      meshRef.current.rotation.y = tiltAngle + Math.sin(state.clock.getElapsedTime() * 0.5 + index) * 0.01;
    }
  });

  return (
    <group position={project.position} ref={meshRef} rotation={[0, tiltAngle, 0]}>
      {/* Main Project Card - More square-ish [4, 4.5] like the reference */}
      <mesh 
        onPointerOver={() => setHovered(true)} 
        onPointerOut={() => setHovered(false)}
      >
        <planeGeometry args={[4, 4.5]} />
        <meshStandardMaterial 
          color={hovered ? "#00C2FF" : "#0D0D0D"} 
          metalness={0.9} 
          roughness={0.1} 
          transparent 
          opacity={0.98} 
        />
      </mesh>
      
      {/* Project Image */}
      <Image 
        url={imageUrl} 
        transparent
        opacity={0.9}
        scale={[3.8, 3.8]}
        position={[0, 0.2, 0.02]}
        grayscale={hovered ? 0 : 0.4}
      />
      
      {/* Base/Stand like in the reference image */}
      <mesh position={[0, -2.3, 0]}>
        <boxGeometry args={[4.2, 0.1, 0.2]} />
        <meshBasicMaterial color="#00C2FF" transparent opacity={hovered ? 0.8 : 0.3} />
      </mesh>
      
      {/* Subtle Glow Frame */}
      <mesh position={[0, 0, -0.01]}>
        <planeGeometry args={[4.1, 4.6]} />
        <meshBasicMaterial 
          color="#00C2FF" 
          transparent 
          opacity={hovered ? 0.3 : 0.1} 
        />
      </mesh>
      
      {/* Title Text - Placed at top in reference */}
      <Text
        position={[0, 2.5, 0]}
        fontSize={0.25}
        color="white"
        anchorX="center"
      >
        {project.title}
      </Text>
      
      {/* Tech tags - Discrete */}
      <group position={[0, -1.9, 0.03]}>
        {project.tech.slice(0, 3).map((t, i) => (
          <Text
            key={t}
            position={[(i - 1) * 1.3, 0, 0]}
            fontSize={0.12}
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
              padding: "10px 20px", 
              borderRadius: "2px", 
              fontWeight: "bold",
              fontSize: "0.8rem",
              cursor: "pointer",
              boxShadow: "0 0 30px rgba(0, 194, 255, 0.6)",
              whiteSpace: "nowrap",
              letterSpacing: "0.1em",
              textTransform: "uppercase"
            }}
            onClick={() => window.open(project.link, "_blank")}
          >
            Explorar Proyecto
          </div>
        </Html>
      )}
    </group>
  );
}
