"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import { useState } from "react";
import * as THREE from "three";
import { projects } from "../../data/projects";
import ProjectPortal from "./ProjectPortal";

export default function Experience({ scroll }: { scroll: number }) {
  const { camera } = useThree();
  
  // The distance at which projects reposition themselves (leapfrog)
  const LOOP_LENGTH = 100;
  
  useFrame((state) => {
    // Persistent Z coordinate tracking (synced with page.tsx virtual offset)
    const targetZ = -(scroll * 0.05);
    
    // ULTRA-SMOOTH Camera movement (reduced from 0.1 to 0.04)
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ + 5, 0.04);
    
    // Immersive camera shake based on mouse position
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, state.mouse.x * 0.6, 0.04);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, state.mouse.y * 0.6, 0.04);
    
    // Smoothly look at the space ahead
    camera.lookAt(0, 0, targetZ - 15);
  });

  return (
    <>
      <fog attach="fog" args={["#0A0A0A", 10, 120]} />
      <ambientLight intensity={0.5} />
      
      {/* 
          Anchor Group: Fixed Stars and Lights
      */}
      <group position={[0, 0, camera.position.z]}>
        <Stars radius={200} depth={50} count={8000} factor={4} saturation={0} fade speed={0.5} />
        <pointLight position={[15, 15, 10]} intensity={2.5} color="#00C2FF" />
        <pointLight position={[-15, -15, -20]} intensity={2.5} color="#FF00F7" />
      </group>
      
      {/* 
          Leapfrog Project Portals: 
          Wider position (X = +/- 8)
      */}
      {projects.map((project, index) => (
        <ProjectPortalWithLeapfrog 
          key={project.id} 
          project={{
            ...project,
            // Move projects much farther to the sides (X = +/- 8)
            position: [
              project.position[0] >= 0 ? 8 : -8, 
              project.position[1], 
              project.position[2]
            ]
          }} 
          index={index} 
          loopLength={LOOP_LENGTH}
        />
      ))}
    </>
  );
}

// Logic for infinite project repositioning during forward travel
function ProjectPortalWithLeapfrog({ project, index, loopLength }: { project: any, index: number, loopLength: number }) {
  const { camera } = useThree();
  const [currentZ, setCurrentZ] = useState(project.position[2]);

  useFrame(() => {
    const originalZ = project.position[2];
    
    // Leapfrog math: find the correct loop index to keep the project in view
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
