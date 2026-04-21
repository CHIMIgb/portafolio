import { useLoader } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
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

  // Manejo de OBJ (ej. Banshee)
  if (extension === '.obj') {
    const obj = useLoader(OBJLoader, url);
    const copiedObj = useMemo(() => {
      const clone = obj.clone();
      // Verificamos si es la Banshee por la URL para darle sus colores especiales
      const isBanshee = url.toLowerCase().includes('banshee');
      
      const materialProps = isBanshee ? {
        color: "#a65fb5",
        emissive: "#59357a",
        emissiveIntensity: 0.2,
        wireframe: true,
        transparent: true,
        opacity: 0.25
      } : {
        color: "#00C2FF",
        wireframe: true,
        transparent: true,
        opacity: 0.15
      };

      clone.traverse((node) => {
        if ((node as THREE.Mesh).isMesh) {
          const mesh = node as THREE.Mesh;
          mesh.material = new THREE.MeshStandardMaterial(materialProps);
        }
      });
      return clone;
    }, [obj, url]);

    return (
      <primitive 
        object={copiedObj} 
        // Normalmente los objs pueden ser enormes o diminutos, pero Center lo ajusta
      />
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
