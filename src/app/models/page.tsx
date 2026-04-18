import fs from 'fs';
import path from 'path';
import ModelsGallery from '../../components/gallery/ModelsGallery';

// Types for the models
export type ModelData = {
  name: string;
  url: string;
  extension: string;
};

// Función asíncrona pero sin dependencia de request para ser generada estáticamente o en cada re-render
export default async function ModelsPage() {
  const modelsDir = path.join(process.cwd(), 'public', 'models');
  let allModels: ModelData[] = [];

  try {
    // Función recursiva para encontrar todos los archivos 3D
    const scanDirectory = (dir: string) => {
      const files = fs.readdirSync(dir);
      
      for (const file of files) {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        
        if (stat.isDirectory()) {
          scanDirectory(filePath);
        } else {
          // Filtramos solo formatos de modelos 3D admitidos
          if (/\.(stl|glb|gltf|obj)$/i.test(file)) {
            // Reconstruimos la URL pública (ejemplo: '/models/carpeta/archivo.stl')
            // Utilizamos una expresión regular para partir exactamente en la carpeta 'public' del proyecto
            const relativePath = '/' + filePath.split(/public[\\/]/)[1].replace(/\\/g, '/');
            
            // Generamos un título legible basado en el nombre del archivo
            const cleanName = file
              .replace(/\.(stl|glb|gltf|obj)$/i, '') // Quitamos extensión
              .replace(/_/g, ' ') // Quitamos guiones bajos
              .replace(/-/g, ' '); // Quitamos guiones medios

            allModels.push({
              name: cleanName,
              url: relativePath,
              extension: path.extname(file).toLowerCase()
            });
          }
        }
      }
    };

    scanDirectory(modelsDir);
    
    // Sort alphabetically
    allModels.sort((a, b) => a.name.localeCompare(b.name));

  } catch (error) {
    console.error("Error al leer el directorio de modelos:", error);
  }

  return (
    <main style={{ backgroundColor: "#0A0A0A", minHeight: "100vh", color: "white" }}>
      <ModelsGallery initialModels={allModels} />
    </main>
  );
}
