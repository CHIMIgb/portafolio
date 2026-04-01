"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import { useState } from "react";
import * as THREE from "three";
import { projects } from "../../data/projects";
import ProjectPortal from "./ProjectPortal";
import Corridor from "./Corridor";

export default function Experience({ scroll }: { scroll: number }) {
  const { camera } = useThree();
  
  // The length of one full project cycle in 3D units
  const LOOP_LENGTH = 100;
  
  useFrame((state) => {
    // Persistent Z coordinate mapping (matching speed in page.tsx)
    const targetZ = -(scroll * 0.05);
    
    // Smooth camera movement towards the target
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ + 5, 0.1);
    
    // Subtle camera shake based on mouse
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, state.mouse.x * 0.5, 0.05);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, state.mouse.y * 0.5, 0.05);
    
    // Look ahead of the current position
    camera.lookAt(0, 0, targetZ - 10);
  });

  return (
    <>
      <fog attach="fog" args={["#0A0A0A", 10, 80]} />
      <ambientLight intensity={0.2} />
      
      {/* 
          Static Background Group:
          This group follows the camera position exactly,
          making the Stars and Lights appear fixed relative to the viewer.
      */}
      <group position={[0, 0, camera.position.z]}>
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        <pointLight position={[10, 10, 5]} intensity={1.5} color="#00C2FF" />
        <pointLight position={[-10, -10, -35]} intensity={1.5} color="#00C2FF" />
      </group>
      
      <Corridor scroll={scroll} />
      
      {/* 
          Leapfrog Projects: 
          Instead of rendering sets, each project re-positions itself
          when passed by the camera.
      */}
      {projects.map((project, index) => (
        <ProjectPortalWithLeapfrog 
          key={project.id} 
          project={project} 
          index={index} 
          loopLength={LOOP_LENGTH}
        />
      ))}
    </>
  );
}

// Internal component for handling the 'leapfrog' repositioning logic
function ProjectPortalWithLeapfrog({ project, index, loopLength }: { project: any, index: number, loopLength: number }) {
  const { camera } = useThree();
  const [currentZ, setCurrentZ] = useState(project.position[2]);

  useFrame(() => {
    const originalZ = project.position[2];
    
    // Leapfrog formula: calculate the loop depth to place the project in front of the camera
    const loopOffset = Math.floor((camera.position.z - originalZ + 20) / loopLength);
    const targetZ = originalZ + (loopOffset * loopLength);
    
    if (currentZ !== targetZ) {
      setCurrentZ(targetZ);
    }
  });

  return (
    <ProjectPortal 
      project={{...project, position: [project.position[0], project.position[1], currentZ]}} 
      index={index} 
    />
  );
}
