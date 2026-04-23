"use client";

import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Center } from '@react-three/drei';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import STLViewer from './STLViewer';
import SabreModel from '../canvas/SabreModel';
import SpaceBansheeModel from '../canvas/SpaceBansheeModel';

type ModelData = {
  name: string;
  url: string;
  extension: string;
};

export default function ModelsGallery({ initialModels }: { initialModels: ModelData[] }) {
  const [selectedModel, setSelectedModel] = useState<ModelData | null>(initialModels[0] || null);

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw', overflow: 'hidden' }}>
      {/* Sidebar List */}
      <div style={{ 
        width: '350px', 
        height: '100%', 
        background: 'rgba(10, 10, 10, 0.9)', 
        borderRight: '1px solid rgba(0, 194, 255, 0.2)',
        display: 'flex',
        flexDirection: 'column',
        backdropFilter: 'blur(10px)',
        zIndex: 10
      }}>
        <div style={{ padding: '30px 20px', borderBottom: '1px solid rgba(0, 194, 255, 0.1)' }}>
          <Link href="/" style={{ textDecoration: 'none', color: '#00C2FF', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', letterSpacing: '0.1em', marginBottom: '20px' }}>
            <ArrowLeft size={16} />
            VOLVER AL SISTEMA
          </Link>
          <h1 style={{ color: 'white', fontSize: '20px', letterSpacing: '0.15em', fontWeight: 600, margin: 0, textTransform: 'uppercase' }}>
            Base de Datos Naves Halo
          </h1>
          <p style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '12px', marginTop: '10px', letterSpacing: '0.1em' }}>
            {initialModels.length} REGISTROS CARGADOS
          </p>
        </div>
        
        <div style={{ flex: 1, overflowY: 'auto', padding: '10px 0' }}>
          {initialModels.map((model, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedModel(model)}
              style={{
                width: '100%',
                textAlign: 'left',
                padding: '15px 20px',
                background: selectedModel?.url === model.url ? 'rgba(0, 194, 255, 0.1)' : 'transparent',
                border: 'none',
                borderLeft: selectedModel?.url === model.url ? '3px solid #00C2FF' : '3px solid transparent',
                color: selectedModel?.url === model.url ? '#00C2FF' : 'rgba(255, 255, 255, 0.7)',
                fontSize: '12px',
                letterSpacing: '0.1em',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                textTransform: 'uppercase'
              }}
              onMouseEnter={(e) => {
                if (selectedModel?.url !== model.url) e.currentTarget.style.color = '#FFF';
              }}
              onMouseLeave={(e) => {
                if (selectedModel?.url !== model.url) e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)';
              }}
            >
              {model.name}
            </button>
          ))}
        </div>
      </div>

      {/* Main 3D Canvas */}
      <div style={{ flex: 1, position: 'relative', background: '#050505' }}>
        {selectedModel ? (
          <>
            <div style={{ position: 'absolute', top: '30px', right: '40px', zIndex: 10, textAlign: 'right' }}>
              <h2 style={{ color: '#00C2FF', fontSize: '24px', letterSpacing: '0.2em', textTransform: 'uppercase', margin: 0 }}>
                {selectedModel.name}
              </h2>
              <p style={{ color: 'rgba(255, 255, 255, 0.4)', fontSize: '12px', letterSpacing: '0.1em', marginTop: '5px' }}>
                ANALÍTICA HOLOGRÁFICA ACTIVADA
              </p>
            </div>
            
            <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
              <color attach="background" args={['#050505']} />
              <ambientLight intensity={0.5} />
              <directionalLight position={[10, 10, 5]} intensity={1} color="#00C2FF" />
              <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#FF00F7" />
              
              {/* Controles para rotar alrededor de la figura */}
              <OrbitControls makeDefault autoRotate autoRotateSpeed={0.5} />
              
              <Center>
                {selectedModel.name.toLowerCase().includes('sabre') ? (
                  <SabreModel isStatic={true} />
                ) : selectedModel.name.toLowerCase().includes('banshee') ? (
                  <SpaceBansheeModel isStatic={true} />
                ) : (
                  <STLViewer url={selectedModel.url} extension={selectedModel.extension} />
                )}
              </Center>
            </Canvas>
          </>
        ) : (
          <div style={{ display: 'flex', height: '100%', justifyContent: 'center', alignItems: 'center', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.2em' }}>
            SELECCIONE UN REGISTRO
          </div>
        )}
      </div>
    </div>
  );
}
