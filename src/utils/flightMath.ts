import * as THREE from 'three';

export function getFlightPosition(t: number, seed: number, cameraZ: number): THREE.Vector3 {
  const time = t * 1.5 + seed * 100;
  
  // Extraemos factores del seed para crear órbitas únicas
  // Con esto obligamos a que diferentes semillas traten rutas totalmente diferentes 
  // (anchas, cerradas, erráticas) en lugar de la misma ruta desplazada.
  const routeModX = 1 + (seed % 5) * 0.1;
  const routeModY = 1 + (seed % 3) * 0.2;
  const radX = 35 + (seed % 4) * 5;
  const radY = 20 + (seed % 3) * 8;

  // Lissajous curve con modificadores orgánicos
  const x = Math.sin(time * 0.4 * routeModX) * radX + Math.sin(time * 0.7) * 15;
  const y = Math.cos(time * 0.5 * routeModY) * radY + Math.sin(time * 0.3) * 10;
  
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
