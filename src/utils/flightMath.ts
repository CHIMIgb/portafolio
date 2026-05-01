import * as THREE from 'three';

export function getFlightPosition(t: number, seed: number, cameraZ: number): THREE.Vector3 {
  // Reducimos la velocidad base del tiempo para evitar movimientos o giros bruscos
  const time = t * 0.8 + seed * 100;
  
  // Extraemos factores del seed para crear órbitas únicas
  // Reducimos el impacto de estos factores para evitar rutas demasiado caóticas
  const routeModX = 1 + (seed % 5) * 0.05;
  const routeModY = 1 + (seed % 3) * 0.05;
  const radX = 35 + (seed % 4) * 4;
  const radY = 20 + (seed % 3) * 4;

  // Lissajous curve con frecuencias más bajas para curvas amplias y suaves
  const x = Math.sin(time * 0.25 * routeModX) * radX + Math.sin(time * 0.35) * 15;
  const y = Math.cos(time * 0.3 * routeModY) * radY + Math.sin(time * 0.2) * 10;
  
  // Z: Diving in and out of depth de forma gradual
  const zOffset = Math.sin(time * 0.4) * 30 - 35;

  return new THREE.Vector3(x, y, cameraZ + zOffset);
}

export function calculateRoll(currentPos: THREE.Vector3, nextPos: THREE.Vector3): number {
  // Calculate lateral movement (delta X) relative to world
  const deltaX = nextPos.x - currentPos.x;

  // Reducimos la sensibilidad para que el alabeo (roll) sea más fluido y no tiemble
  const sensitivity = 0.8;
  const targetRoll = -deltaX * sensitivity;

  // Clamp a unos ~60 grados (Math.PI / 3) para evitar que se pongan totalmente de lado
  return THREE.MathUtils.clamp(targetRoll, -Math.PI / 3, Math.PI / 3);
}
