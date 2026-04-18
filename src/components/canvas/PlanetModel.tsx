"use client";

import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

export default function PlanetModel() {
  const planetRef = useRef<THREE.Group>(null);
  const { camera, size } = useThree();
  
  // Cargamos el modelo GLB
  const { scene } = useGLTF('/models/planet mars/planet_mars_-_nasa_mars_landing_2021.glb');

  useFrame((state) => {
    if (planetRef.current) {
      // 1. Rotación viva sobre su propio eje (muy lenta para que parezca un planeta masivo)
      planetRef.current.rotation.y += 0.0005;

      // 2. Colocar en la esquina Inferior Derecha (Bottom-Right) HASTA EL FRENTE
      // Empujamos MUCHO más a la derecha (+12) y MUCHO más abajo (-10)
      planetRef.current.position.x = camera.position.x + 14;
      planetRef.current.position.y = camera.position.y - 10;
      
      // Lo acercamos muchísimo a la cámara para que esté "en frente"
      planetRef.current.position.z = camera.position.z - 12;
    }
  });

  return (
    <group ref={planetRef}>
      {/* Luz intensa imitando el destello del Sol asomándose por el borde superior izquierdo del planeta */}
      <pointLight position={[-8, 6, 4]} intensity={12} color="#FFFFFF" distance={50} />
      {/* Luz de relleno azulada/espacial para la zona de sombra */}
      <ambientLight intensity={0.2} color="#00C2FF" />
      
      {/* 
        Aumentamos masivamente la escala a 10.
        Al ser tan grande y estar en (14, -10), solo veremos su esquina superior izquierda,
        ocupando todo el rincón inferior derecho de la pantalla.
      */}
      <primitive 
        object={scene} 
        scale={10} 
        // Inclinamos el planeta para que se vea su hemisferio superior iluminado
        rotation={[0.3, 0, 0.3]}
      />
    </group>
  );
}
