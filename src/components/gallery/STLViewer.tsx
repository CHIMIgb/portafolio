import { useLoader } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';
import * as THREE from 'three';
import { Suspense, useMemo } from 'react';

export default function STLViewer({ url, extension }: { url: string; extension: string }) {
  return (
    <Suspense fallback={<FallbackMesh />}>
      <Model url={url} extension={extension} />
    </Suspense>
  );
}

function FallbackMesh() {
  return (
    <mesh>
      <sphereGeometry args={[1, 16, 16]} />
      <meshBasicMaterial color="#00C2FF" wireframe />
    </mesh>
  );
}

function Model({ url, extension }: { url: string; extension: string }) {
  // Manejo de STL
  if (extension === '.stl') {
    const geometry = useLoader(STLLoader, url);
    return (
      <mesh geometry={geometry} rotation={[-Math.PI / 2, 0, 0]}>
        <meshStandardMaterial 
          color="#00C2FF" 
          wireframe={true} 
          transparent={true} 
          opacity={0.15} 
        />
      </mesh>
    );
  }

  // Manejo de GLB / GLTF
  if (extension === '.glb' || extension === '.gltf') {
    const { scene } = useGLTF(url);
    
    // Clonamos la escena para iterar sus mallas sin alterar el original del caché
    const copiedScene = useMemo(() => scene.clone(), [scene]);
    
    // Opcional: forzar material holográfico en los nodos GLB
    copiedScene.traverse((node) => {
      if ((node as THREE.Mesh).isMesh) {
        const mesh = node as THREE.Mesh;
        mesh.material = new THREE.MeshStandardMaterial({
          color: "#00C2FF",
          wireframe: true,
          transparent: true,
          opacity: 0.15
        });
      }
    });

    return <primitive object={copiedScene} />;
  }

  return null;
}
