"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { Stars, Sparkles } from "@react-three/drei";
import { useState } from "react";
import * as THREE from "three";
import { projects } from "../../data/projects";
import ProjectPortal from "@/components/canvas/ProjectPortal";

export default function Experience({ scroll }: { scroll: number }) {
  const { camera } = useThree();

  // The distance at which projects reposition themselves (leapfrog)
  const LOOP_LENGTH = 100;

  useFrame((state) => {
    // Persistent Z coordinate tracking (synced with page.tsx virtual offset)
    const targetZ = -(scroll * 0.05);

    // GENTLE movement (lerp = 0.03) for a more static/stable feeling
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ + 7, 0.03);

    // Minimal horizontal sway
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, state.mouse.x * 0.3, 0.02);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, state.mouse.y * 0.3, 0.02);

    // Look ahead with a wider perspective
    camera.lookAt(0, 0, targetZ - 20);
  });

  return (
    <>
      <fog attach="fog" args={["#0A0A0A", 10, 100]} />
      <ambientLight intensity={0.6} />

      {/* 
          Deep Space Environment: Stars + Dynamic Sparkles (Twinkling)
      */}
      <group position={[0, 0, camera.position.z]}>
        <Stars radius={250} depth={50} count={9000} factor={4} saturation={0} fade speed={0.4} />
        
        {/* Adding individual twinkling stars with noise */}
        <Sparkles 
          count={500} 
          scale={150} 
          size={1.5} 
          speed={0.5} 
          opacity={0.8} 
          noise={1} 
          color="#00C2FF" 
        />
        <Sparkles 
          count={300} 
          scale={200} 
          size={1} 
          speed={0.2} 
          opacity={0.5} 
          noise={0.5} 
          color="#FFF" 
        />

        <pointLight position={[10, 10, 10]} intensity={3} color="#00C2FF" />
        <pointLight position={[-10, -10, -20]} intensity={3} color="#FF00F7" />
      </group>

      {/* 
          Leapfrog Project Portals: 
          Wonderland-style staggered layout (Widened to X = +/- 6)
      */}
      {projects.map((project, index) => (
        <ProjectPortalWithLeapfrog
          key={project.id}
          project={{
            ...project,
            // Staggered layout with more central space
            position: [
              project.position[0] >= 0 ? 4.5 : -4.5,
              0,
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
      project={{ ...project, position: [project.position[0], project.position[1], currentZ] }}
      index={index}
    />
  );
}
