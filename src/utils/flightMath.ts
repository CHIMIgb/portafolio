import * as THREE from 'three';

export function getFlightPosition(t: number, seed: number, cameraZ: number): THREE.Vector3 {
  // Base speed multiplier
  const time = t * 1.5 + seed * 100;

  // Lissajous curve with offset frequencies for organic, chaotic flight
  // X: Broad sweeps across the screen
  const x = Math.sin(time * 0.4) * 35 + Math.sin(time * 0.7) * 15;
  // Y: Vertical maneuvers
  const y = Math.cos(time * 0.5) * 20 + Math.sin(time * 0.3) * 10;
  // Z: Diving in and out of depth (relative to camera)
  const zOffset = Math.sin(time * 0.6) * 30 - 35;

  return new THREE.Vector3(x, y, cameraZ + zOffset);
}

export function calculateRoll(currentPos: THREE.Vector3, nextPos: THREE.Vector3): number {
  // Calculate lateral movement (delta X) relative to world
  // A real flight model would calculate local right vector, but this approximation works well for cinematic banking.
  const deltaX = nextPos.x - currentPos.x;

  // The faster it moves left/right, the harder it banks
  const sensitivity = 1.2;
  const targetRoll = -deltaX * sensitivity;

  // Clamp to max ~75 degrees
  return THREE.MathUtils.clamp(targetRoll, -Math.PI / 2.2, Math.PI / 2.2);
}
