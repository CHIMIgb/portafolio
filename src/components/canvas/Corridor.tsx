"use client";

import { useThree } from "@react-three/fiber";
import * as THREE from "three";

export default function Corridor({ scroll }: { scroll: number }) {
  const { camera } = useThree();
  
  // The distance at which rings repeat
  const RING_SPACING = 5;
  const TOTAL_RINGS = 30; // Number of rings visible at once

  return (
    <group>
      {/* 
          Leapfrog Floor: 
          Moves in chunks of 200 units to stay under the camera 
      */}
      <FloorAnchor cameraZ={camera.position.z} />

      {/* 
          Leapfrog Digital Rings:
          Each ring handles its own repositioning
      */}
      {Array.from({ length: TOTAL_RINGS }).map((_, i) => (
        <LeapfrogRing 
          key={i} 
          index={i} 
          spacing={RING_SPACING} 
          cameraZ={camera.position.z} 
        />
      ))}
    </group>
  );
}

function FloorAnchor({ cameraZ }: { cameraZ: number }) {
  const floorLength = 200;
  // Calculate which chunk of 200 units we should be in
  // Margin of 100 units to avoid pop-in
  const loopOffset = Math.floor((cameraZ + 100) / floorLength);
  const zPos = loopOffset * floorLength - 100;

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, zPos]}>
      <planeGeometry args={[20, floorLength, 20, 20]} />
      <meshStandardMaterial 
        color="#00C2FF" 
        wireframe 
        transparent 
        opacity={0.05} 
      />
    </mesh>
  );
}

function LeapfrogRing({ index, spacing, cameraZ }: { index: number, spacing: number, cameraZ: number }) {
  const originalZ = -index * spacing;
  const loopLength = spacing * 30; // Total span of all rings
  
  // Calculate leapfrog position: jump 150 units ahead when passed
  const loopOffset = Math.floor((cameraZ - originalZ + 10) / loopLength);
  const currentZ = originalZ + (loopOffset * loopLength);

  return (
    <mesh position={[0, 0, currentZ]}>
      <ringGeometry args={[2.9, 3, 64]} />
      <meshBasicMaterial color="#00C2FF" transparent opacity={0.3} side={THREE.DoubleSide} />
    </mesh>
  );
}
