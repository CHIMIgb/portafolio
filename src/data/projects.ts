import { Project } from "../types/project";

export const projects: Project[] = [
  {
    id: "roms-vault",
    title: "ROMs Vault",
    description: "Plataforma web completa para descubrir, descargar y ejecutar juegos retro directamente en el navegador. Integra EmulatorJS para emulación online sin instalaciones, con soporte para múltiples consolas clásicas y streaming de ISOs grandes desde Google Drive.",
    tech: ["PHP", "JavaScript", "Docker", "EmulatorJS", "Google Drive API", "PostgreSQL", "CSS"],
    category: ["html", "javascript", "css", "php"],
    link: "https://roms-vault.up.railway.app/",
    featured: true,
    icon: "gamepad",
    image: "/roms-vault.png",
    consoles: ["PSP", "PS1", "N64", "GBA", "GBC", "NES", "SNES", "Sega Genesis"],
  },
  {
    id: "desarrollo-urbano",
    title: "Desarrollo Urbano",
    description: "Plataforma para planificación y diseño urbano interactivo. Permite análisis de métricas espaciales, edición en base a lotes y visualización en un entorno 3D dinámico. Incluye un sistema robusto de CI/CD para automatizar pruebas y despliegues.",
    tech: ["JavaScript", "MapLibre GL", "Node.js / Express", "PostgreSQL / Supabase", "Docker"],
    category: ["javascript", "nodejs", "postgresql", "python", "docker"],
    link: "https://desarrollo-urbano.onrender.com/",
    featured: true,
    icon: "city",
    image: "/urban-plan3d.png",
  },
];
