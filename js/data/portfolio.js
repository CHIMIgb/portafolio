/* ============================================================
   portfolio.js — ⭐ FUENTE ÚNICA DE DATOS DEL PORTAFOLIO
   ------------------------------------------------------------
   TODO tu contenido vive aquí. El escritorio Y el juego 3D
   se generan automáticamente desde este archivo.
   ============================================================ */

export const profile = {
  name: 'Adrián Gallardo Buenrostro',
  shortName: 'CHIMI',
  role: 'Software Engineer & Fullstack Developer',
  tagline: 'El núcleo tiene que aguantar',
  location: 'Nayarit, México',
  email: 'chimi.7zip@gmail.com',
  phone: '+52 323 101 3548',
  avatar: null,
  bio: [
    'Software Engineer y Full Stack Developer apasionado por la tecnología y el desarrollo de soluciones digitales modernas. Desarrollo soluciones de extremo a extremo: desde la planeación, creación de esquemas de flujo y diseño de base de datos, hasta el desarrollo y el deployment en producción.',
    'He desarrollado proyectos en solitario y en equipo, tanto para el gobierno como para empresas particulares, lo que me permite adaptarme rápido a cualquier entorno y tecnología.',
    'Lo que guía mi forma de construir sistemas es simple: el núcleo tiene que aguantar. Una API bien diseñada debería poder conectar cualquier frontend sin que haya que tocar lo de adentro.',
  ],
  education: [
    {
      degree: 'Ingeniería en Desarrollo y Gestión de Software',
      school: 'Universidad Tecnológica de la Costa',
      period: 'Agosto 2024 – Abril 2026',
    },
    {
      degree: 'TSU en Tecnologías de la Información — Área Desarrollo de Software Multiplataforma',
      school: 'Universidad Tecnológica de la Costa',
      period: 'Agosto 2022 – Julio 2024',
    },
  ],
  languages: [
    { lang: 'Español', level: 'Nativo' },
    { lang: 'Inglés', level: 'Técnico (lectura y comprensión de documentación)' },
  ],
  cvUrl: 'assets/documents/CV_Adrian_GB.pdf',
  cvUrlEn: 'assets/documents/CV_Adrian_GB-EN.pdf',
};

export const experience = [
  {
    company: 'SEPEN — Servicios de Educación Pública del Estado de Nayarit',
    role: 'Desarrollador Full Stack',
    location: 'Tepic, Nayarit',
    period: 'Enero 2026 – Abril 2026',
    highlights: [
      'Reemplacé el 100% del proceso manual de traspaso de cargos con el Sistema de Entrega-Recepción (SERS), digitalizando la operación de 1 Dirección General, 4 Direcciones y ~45 Departamentos.',
      'Estructuré el control de acceso mediante un módulo RBAC con 8 roles institucionales, 22 permisos granulares y 4 niveles de alcance organizacional.',
      'Aseguré el cumplimiento de la LGPDPPSO con una cadena de custodia criptográfica SHA-256 (Merkle Tree) y verificación forense en 3 fases.',
      'Escalé el procesamiento de jerarquías organizacionales a complejidad O(1) con Materialized Path y tareas asíncronas en Celery/Redis.',
    ],
  },
  {
    company: 'CROV — Sistema PRASE',
    role: 'Desarrollador Full Stack',
    location: 'Tepic, Nayarit',
    period: 'Julio 2025 – Diciembre 2025',
    highlights: [
      'Eliminé el riesgo de pérdida de datos en una plataforma de gestión de pólizas de seguros con 100–500 pólizas activas en 3 ciudades.',
      'Amplié la plataforma con nuevos módulos y formularios en React (Next.js / NestJS) conectados a APIs REST.',
      'Sostuve la estabilidad del sistema en producción mediante separación correcta de ambientes dev/prod.',
    ],
  },
  {
    company: 'Instituto Estatal de Educación Normal',
    role: 'Desarrollador Backend',
    location: 'Tepic, Nayarit',
    period: 'Abril 2025 – Octubre 2025',
    highlights: [
      'Entregué una API REST completa para el seguimiento de 100–500 egresados, habilitando estadísticas en tiempo real sobre inserción laboral.',
      'Protegí el acceso de ~30 usuarios con autenticación JWT, control de acceso por roles y CRUD completo.',
    ],
  },
  {
    company: 'Industrial Las Norteñas S.A. de C.V.',
    role: 'Desarrollador Full Stack',
    location: 'Tepic, Nayarit',
    period: 'Abril 2024 – Marzo 2025',
    highlights: [
      'Eliminé una semana de retraso en el pago a más de 60 supervisores de zona con un sistema web de cálculo de comisiones.',
      'Reduje a cero los errores de cálculo y elevé la transparencia comercial mediante flujos de aprobación y reportes personalizados.',
    ],
  },
];

export const socials = [
  { id: 'github',    label: 'GitHub',    url: 'https://github.com/CHIMIgb' },
  { id: 'linkedin',  label: 'LinkedIn',  url: 'https://www.linkedin.com/in/adrian-gallardo-24791a3a6/' },
  { id: 'instagram', label: 'Instagram', url: 'https://www.instagram.com/chimi_gb' },
];

export const skills = [
  { category: 'Backend',        items: ['Node.js', 'NestJS', 'Express', 'APIs REST', 'Python · Django REST Framework', 'Celery/Redis', 'PHP', 'Flight'] },
  { category: 'Frontend',       items: ['React', 'Next.js', 'Angular', 'JavaScript ES6+', 'HTML5', 'CSS3', 'Vue', 'Tailwind'] },
  { category: 'Bases de Datos', items: ['PostgreSQL', 'MySQL', 'SQL Server'] },
  { category: 'IoT & Hardware', items: ['Arduino', 'C++'] },
  { category: 'Herramientas',   items: ['Git', 'GitHub', 'Postman', 'Docker'] },
  { category: 'Seguridad & Despliegue', items: ['SHA-256 / Merkle Tree', 'Criptografía aplicada', 'Separación dev/prod', 'OWASP', 'Arquitectura en capas'] },
];

/**
 * PROYECTOS — cada entrada aparece:
 *   • En el escritorio (icono directo + app "Proyectos")
 *   • En el juego 3D (cuadro interactivo auto-generado)
 * icon: icono de escritorio (assets/icons/)
 */
export const projects = [
  {
    id: 'roms-vault',
    title: 'ROMs Vault',

    short: 'Catálogo de 100+ juegos retro con emulación en navegador y descarga.',
    description: [
      'Plataforma web con catálogo de más de 100 juegos retro de múltiples consolas (PSP, PS2, N64, GBA, NES, SNES, Game Boy, Nintendo DS, Dreamcast, Saturn, Genesis).',
      'Sistema de emulación en navegador para reproducir títulos directamente en línea, módulo de descarga de archivos.',
      'Filtrado por plataforma, género y región, ordenamiento dinámico y métricas de descargas y partidas jugadas.',
    ],
    tech: ['JavaScript', 'Docker', 'EmulatorJS', 'Vercel'],
    images: [
      'assets/images/roms-vault/screenshot-1.png',
      'assets/images/roms-vault/screenshot-2.png',
      'assets/images/roms-vault/screenshot-3.png',
    ],
    images: [
      'assets/images/roms-vault/screenshot-1.png',
      'assets/images/roms-vault/screenshot-2.png',
      'assets/images/roms-vault/screenshot-3.png',
    ],
    screenshot: null,
    liveUrl: 'https://roms-vault.vercel.app/',
    repoUrl: 'https://github.com/CHIMIgb/ROMs-Vault',
    featured: true,
    icon: 'assets/icons/cd_music-32x32.png',
  },
  {
    id: 'desarrollo-urbano',
    title: 'UrbanPlan 3D',

    short: 'Plataforma para el diseño y planeación urbana con visualización 3D dinámica.',
    description: [
      'Plataforma para el diseño y planeación urbana con visualización 3D dinámica.',
      'Reduje a segundos el modelado de secciones completas de una ciudad, permitiendo visualizar la escala real de los edificios respecto a su entorno.',
      'Integré renderizado GIS/3D con MapLibre GL JS y Turf.js sobre datos satelitales y OSM, con interfaz "Glassmorphism" en Vanilla JS.',
      'API REST en Node.js/Express con JWT, Bcrypt y PostgreSQL 16 (JSONB).',
      'Métricas normativas en tiempo real: COS, CUS, área verde, altura máxima, población estimada.',
    ],
    tech: ['JavaScript', 'MapLibre GL', 'Turf.js', 'Node.js / Express', 'PostgreSQL 16', 'Docker'],
    images: [
      'assets/images/urbanplan/screenshot-1.png',
      'assets/images/urbanplan/screenshot-2.png',
      'assets/images/urbanplan/screenshot-3.png',
    ],
    screenshot: null,
    liveUrl: 'https://desarrollo-urbano-app.vercel.app/',
    repoUrl: 'https://github.com/CHIMIgb/Desarrollo-Urbano',
    featured: true,
    icon: 'assets/icons/paint-32x32.png',
  },
  {
    id: 'ar-canvas',
    title: 'AR Canvas',

    short: 'Aplicación de Realidad Aumentada para dibujar en el aire usando gestos de mano.',
    description: [
      'Aplicación de Realidad Aumentada que permite dibujar en el aire utilizando las manos, sin ratón ni teclado.',
      'Detecta gestos complejos en tiempo real para cambiar pinceles, colores, grosor y borrar contenido de forma orgánica.',
      'Arquitectura limpia con OpenCV, MediaPipe y NumPy. Exporta a PNG y GIF animado.',
    ],
    tech: ['Python', 'OpenCV', 'MediaPipe', 'NumPy', 'ImageIO'],
    images: [],
    screenshot: null,
    repoUrl: 'https://github.com/CHIMIgb/AR-Canvas',
    featured: true,
    icon: 'assets/icons/globe-32x32.png',
  },
  {
    id: 'visor3d',
    title: 'Visor3D',

    short: 'Visor de modelos 3D controlado por gestos de mano con cámara web.',
    description: [
      'Aplicación de escritorio interactiva en Python que permite cargar y manipular modelos 3D usando gestos de mano detectados por cámara web.',
      'Interfaz gestual: rotación, panorámica, zoom, cambio de modos. Soporta vista dividida, HUD holográfico y Realidad Aumentada básica.',
      'Multi-modelo (hasta 5 simultáneos), paleta de colores, iluminación dinámica, planos de sección de corte y capturas de pantalla.',
    ],
    tech: ['Python', 'PyOpenGL', 'GLFW', 'MediaPipe', 'OpenCV', 'Trimesh'],
    images: [],
    screenshot: null,
    repoUrl: 'https://github.com/CHIMIgb/Visor3D',
    featured: true,
    icon: 'assets/icons/computer-32x32.png',
  },
  {
    id: 'raycaster',
    title: 'RayCaster',

    short: 'Motor de raycasting estilo Wolfenstein en vanilla JavaScript con Canvas 2D.',
    description: [
      'Motor de raycasting puro en vanilla JavaScript con Canvas 2D — cero frameworks, cero build step.',
      'Renderizado en tiempo real de un laberinto con texturas, sprites y movimiento fluido.',
      'Basado en el tutorial de Lode Vandevenne, extendido con texturas, billboard y sistema de colisiones.',
    ],
    tech: ['JavaScript', 'Canvas 2D', 'HTML5', 'Vanilla JS'],
    images: [],
    screenshot: null,
    repoUrl: 'https://github.com/CHIMIgb/RayCast.js',
    featured: true,
    icon: 'assets/icons/media-32x32.png',
  },
];

/**
 * CERTIFICACIONES — aparecen en el escritorio (app "Certificaciones")
 * y en el CV.txt. url: enlace a la credencial verificable (opcional).
 */
export const certifications = [];

/** Configuración de vistas */
export const settings = {
  bootEnabled: true,
  crtEffectDefault: false,
};
