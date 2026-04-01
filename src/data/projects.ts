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
    consoles: ["PSP", "PS1", "N64", "GBA", "GBC", "NES", "SNES", "Sega Genesis"],
    position: [-2, 0, -10]
  },
  {
    id: "desarrollo-urbano",
    title: "SaaS de Desarrollo Urbano",
    description: "Plataforma para planificación y diseño urbano interactivo. Permite análisis de métricas espaciales, edición en base a lotes y visualización en un entorno 3D dinámico. Incluye un sistema robusto de CI/CD para automatizar pruebas y despliegues.",
    tech: ["JavaScript", "MapLibre GL", "Node.js / Express", "PostgreSQL / Supabase", "Docker"],
    category: ["javascript", "nodejs", "postgresql", "python", "docker"],
    link: "https://desarrollo-urbano.onrender.com/",
    featured: true,
    icon: "city",
    position: [2, 0, -25]
  },
  {
    id: "generador-menus",
    title: "Generador de Menús PDF",
    description: "Solución que automatiza la creación de menús digitales e impresos para restaurantes. Resuelve el problema de la falta de actualización constante en cartas físicas y la dificultad para gestionar cambios de precios y disponibilidad.",
    tech: ["HTML", "JavaScript", "CSS"],
    category: ["html", "javascript", "css"],
    link: "https://chimigb.github.io/Generador-de-menus-digitales/",
    icon: "utensils",
    position: [-2, 0, -40]
  },
  {
    id: "sistema-tickets",
    title: "Sistema de Tickets de Soporte",
    description: "Sistema inteligente para crear, clasificar y dar seguimiento a tickets de soporte o incidencias. Resuelve el problema de la pérdida de tickets, falta de priorización y dificultad para medir tiempos de respuesta en equipos de soporte.",
    tech: ["HTML", "JavaScript", "CSS"],
    category: ["html", "javascript", "css"],
    link: "https://chimigb.github.io/sistema-de-tickets/",
    icon: "ticket-alt",
    position: [2, 0, -55]
  },
  {
    id: "colorbrand",
    title: "ColorBrand - Generador de Paletas",
    description: "Aplicación web que analiza imágenes subidas por usuarios y extrae paletas de colores armónicas. Resuelve el problema de diseñadores y desarrolladores para encontrar combinaciones de colores coherentes a partir de imágenes de referencia.",
    tech: ["HTML", "JavaScript", "CSS", "Análisis de imagen"],
    category: ["html", "javascript", "css"],
    link: "https://chimigb.github.io/generar-paletas-de-colores/",
    icon: "palette",
    position: [-2, 0, -70]
  }
];
