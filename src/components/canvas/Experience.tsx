"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { Float, Stars } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";
import { projects } from "../../data/projects";
import ProjectPortal from "./ProjectPortal";
import Corridor from "./Corridor";

export default function Experience() {
  const { camera } = useThree();
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  
  // Z distance of the whole experience
  const MAX_Z = -80;
  
  useFrame((state, delta) => {
    // Get scroll progress from native window scroll (synced with Lenis)
    const scrolled = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const offset = Math.max(0, Math.min(1, scrolled / maxScroll));
    
    // Smooth camera movement along Z
    const targetZ = offset * MAX_Z;
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ + 5, 0.1);
    
    // Subtle camera shake/movement
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, state.mouse.x * 0.5, 0.05);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, state.mouse.y * 0.5, 0.05);
    
    // Look ahead slightly
    camera.lookAt(0, 0, targetZ - 10);
  });

  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={1.5} color="#00C2FF" />
      <pointLight position={[-10, -10, -30]} intensity={1.5} color="#00C2FF" />
      
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      
      <Corridor />
      
      {projects.map((project, index) => (
        <ProjectPortal 
          key={project.id} 
          project={project} 
          index={index} 
        />
      ))}
    </>
  );
}
