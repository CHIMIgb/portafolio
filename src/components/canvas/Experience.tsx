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
  
  // The distance at which the whole scene repeats perfectly
  const CYCLE_DISTANCE = 100;
  
  useFrame((state, delta) => {
    // Current scroll position handled by Lenis
    const scrolled = window.scrollY;
    
    // speed factor: 0.02 means 5000px = 100 units
    const speed = 0.02;
    
    // Calculate a repeating Z position for the camera
    const virtualZ = scrolled * speed;
    const targetZ = -(virtualZ % CYCLE_DISTANCE);
    const cameraTargetZ = targetZ + 5;
    
    // Smooth camera movement along Z
    // DETECT JUMP: If the target is far (e.g., during a scroll reset), 
    // snap instantly instead of lerping to avoid 'going back' animation.
    if (Math.abs(cameraTargetZ - camera.position.z) > CYCLE_DISTANCE / 2) {
      camera.position.z = cameraTargetZ;
    } else {
      camera.position.z = THREE.MathUtils.lerp(camera.position.z, cameraTargetZ, 0.1);
    }
    
    // Subtle camera shake/movement
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, state.mouse.x * 0.4, 0.05);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, state.mouse.y * 0.4, 0.05);
    
    // Look ahead
    camera.lookAt(0, 0, targetZ - 10);
  });

  return (
    <>
      <fog attach="fog" args={["#0A0A0A", 10, 80]} />
      <ambientLight intensity={0.2} />
      
      {/* 
          Background and Global Lights follow the camera 
          to ensure they never 'pop' during a modulo jump 
      */}
      <group position={[0, 0, camera.position.z]}>
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        <pointLight position={[10, 10, 5]} intensity={1.5} color="#00C2FF" />
        <pointLight position={[-10, -10, -35]} intensity={1.5} color="#00C2FF" />
      </group>
      
      <Corridor />
      
      {/* 
          Triple-buffered sets for perfect continuity:
          Set 0: Behind (+100)
          Set 1: Current (0)
          Set 2: Ahead (-100)
      */}
      {[1, 0, -1].map((loopOffset) => (
        <group key={`cycle-${loopOffset}`} position={[0, 0, loopOffset * CYCLE_DISTANCE]}>
          {projects.map((project, index) => (
            <ProjectPortal 
              key={`cycle-${loopOffset}-${project.id}`} 
              project={project} 
              index={index} 
            />
          ))}
        </group>
      ))}
    </>
  );
}
