# 🎯 Roadmap de Mejoras del Portafolio — CHIMI

> **URL en Producción:** https://chimi-portfolio.vercel.app  
> **Repositorio:** https://github.com/CHIMIgb/portafolio  
> **Fecha de Análisis:** 18 de Abril, 2026

---

## Estado Actual — Evaluación de Reclutador TI

| Aspecto | Nota | Estado |
|---|---|---|
| Primera impresión visual | 10/10 | ✅ Impacto máximo, inolvidable |
| Habilidad técnica demostrada | 8/10 | ✅ WebGL + React + Three.js + Deploy |
| Cantidad de proyectos | 4/10 | ❌ Solo 2 proyectos listados |
| Profesionalismo del CV | 3/10 | ❌ Es un `.docx`, debe ser PDF |
| Presencia en LinkedIn | 0/10 | ❌ No existe perfil |
| Documentación en GitHub (READMEs) | 5/10 | ⚠️ Borradores creados, falta copiarlos |
| Formulario de contacto (EmailJS) | 9/10 | ✅ Funcional con efecto holográfico |
| Responsive / Móvil | 7/10 | ✅ Funcional, lento por modelos 3D |

---

## Prioridad URGENTE (Esta Semana)

### 1. Convertir CV a PDF
- [ ] Abrir `CV.docx` y exportarlo como PDF profesional (máx. 1 página)
- [ ] Diseño limpio: sin bordes decorativos, sin foto (para mercado internacional), links clicables
- [ ] Renombrar a `CV_CHIMI_Backend_Developer.pdf`
- [ ] Reemplazar el archivo en `public/CV/` del portafolio
- [ ] Actualizar las referencias en `HUD.tsx` y `AboutModal.tsx` de `.docx` a `.pdf`
- [ ] Hacer commit, push, y Vercel se actualiza solo

### 2. Copiar los README Profesionales a los Repos de GitHub
Los borradores ya están generados en tu carpeta del portafolio:

- [ ] Abrir `ROMS_VAULT_README_DRAFT.md` del portafolio
- [ ] Ir al repo [ROMs-Vault](https://github.com/CHIMIgb/ROMs-Vault), editar el `README.md` y pegar el contenido
- [ ] Abrir `DESARROLLO_URBANO_README_DRAFT.md` del portafolio
- [ ] Ir al repo [Desarrollo-Urbano](https://github.com/CHIMIgb/Desarrollo-Urbano), editar el `README.md` y pegar el contenido

> [!IMPORTANT]
> Un reclutador técnico SIEMPRE abre tu GitHub. Si ve un README vacío o genérico, piensa: "Este chico no documenta su código" y te descarta instantáneamente.

### 3. Crear Perfil de LinkedIn
- [ ] Registrarte en [linkedin.com](https://linkedin.com)
- [ ] Foto de perfil profesional (no selfie, no avatar)
- [ ] Titular: `Backend Developer | API Architect | Full Stack`
- [ ] Experiencia: Listar tus trabajos freelance como experiencia REAL (no como "proyectos personales")
- [ ] Enlace del portafolio: `https://chimi-portfolio.vercel.app` en la sección "Sitio web"
- [ ] Agregar los proyectos ROMs Vault y Desarrollo Urbano como "Projects"

> [!WARNING]
> El 90% de los reclutadores de TI viven en LinkedIn. Si no tienes perfil, directamente no existes para ellos.

---

## Prioridad ALTA (Este Mes)

### 4. Agregar Más Proyectos al Portafolio (mínimo 2-3 más)

Actualmente solo tienes 2 proyectos. Un reclutador necesita ver consistencia y variedad. Ideas de proyectos backend que puedes construir en un fin de semana:

- [ ] **API REST Pura con Swagger/OpenAPI:** Un sistema de autenticación JWT completo con roles y permisos. Sin frontend. Solo la API documentada con Swagger UI. Demuestra que puedes construir el núcleo sin necesitar la cara bonita.
- [ ] **Microservicio Útil:** Un acortador de URLs, un sistema de webhooks, o una API de agregación de datos. Pequeño, limpio, desplegado en Railway o Render con Docker.
- [ ] **Proyecto con NestJS o Flight PHP:** Para demostrar que dominas frameworks estructurados, no solo Express.js básico.

> [!TIP]
> No tienen que ser proyectos enormes. Un reclutador prefiere ver 5 proyectos pequeños bien documentados que 1 proyecto gigante sin README.

### 5. Obtener Dominio Profesional Gratuito
- [ ] Aplicar al [GitHub Student Developer Pack](https://education.github.com/pack) (necesitas correo `.edu` o credencial estudiantil)
  - Dominio `.tech` gratis 1 año (vía get.tech)
  - Dominio `.me` gratis 1 año (vía Namecheap)
- [ ] Alternativa permanente gratis: [is-a.dev](https://www.is-a.dev/) → `chimi.is-a.dev`
- [ ] Conectar el dominio a Vercel (Settings → Domains → Add)

---

## Prioridad MEDIA (Próximos 2-3 Meses)

### 6. Optimización de Rendimiento Móvil
- [ ] Evaluar si los modelos STL se pueden convertir a `.glb` (formato más liviano y optimizado para web)
- [ ] Implementar carga condicional: en móviles mostrar solo 1 nave en vez de 3
- [ ] Considerar usar `@react-three/drei` `useDetectGPU()` para adaptar calidad automáticamente

### 7. Mejorar SEO y Metadatos
- [ ] Agregar meta tags Open Graph (para que al compartir el link en WhatsApp/Twitter se vea una preview con imagen)
- [ ] Agregar un `favicon.ico` personalizado (actualmente usa el default de Next.js)
- [ ] Configurar el `<title>` dinámico de la página

### 8. Eliminar la Palabra "Estudiante" de la Bio
- [ ] Reescribir el primer párrafo del AboutModal para posicionarte como profesional
- [ ] Cambiar: *"Actualmente soy un estudiante..."*
- [ ] Por algo como: *"Desarrollador Backend & Full Stack con experiencia en proyectos reales de producción..."*

> [!CAUTION]
> Para RRHH, "Estudiante" = "No tiene tiempo 8 horas al día" o "Me va a pedir permisos para exámenes". A menos que busques internships específicamente, quita esa palabra.

---

## Prioridad BAJA (Mejoras Futuras)

### 9. Internacionalización (i18n)
- [ ] Agregar toggle Español/Inglés para expandir tu alcance a empresas internacionales

### 10. Analítica
- [ ] Integrar Vercel Analytics (gratuito) para saber cuánta gente visita tu portafolio
- [ ] Monitorear qué botones hacen clic (proyectos, contacto, CV)

### 11. Blog Técnico (Opcional pero Poderoso)
- [ ] Agregar una sección de artículos técnicos cortos
- [ ] Escribir sobre cómo diseñaste la arquitectura de tus APIs
- [ ] Esto posiciona tu perfil como "líder de pensamiento" en el nicho backend

---

## Archivos Clave del Proyecto

| Archivo | Propósito |
|---|---|
| `src/components/dom/HUD.tsx` | Menú principal, botones, footer, descarga CV |
| `src/components/dom/AboutModal.tsx` | Biografía y stacks tecnológicos |
| `src/components/dom/ContactModal.tsx` | Formulario EmailJS |
| `src/components/dom/ProjectsModal.tsx` | Grid de proyectos |
| `src/data/projects.ts` | Datos de proyectos (agregar nuevos aquí) |
| `src/types/project.ts` | Interfaz TypeScript del proyecto |
| `src/styles/hologram.css` | Todos los estilos + media queries |
| `.env` | Llaves de EmailJS |
| `ROMS_VAULT_README_DRAFT.md` | README profesional para copiar al repo |
| `DESARROLLO_URBANO_README_DRAFT.md` | README profesional para copiar al repo |

---

> **Nota Final:** Tu portafolio es la mejor carta de presentación visual que existe de un desarrollador en tu nivel. Pero una carta bonita sin contenido detrás es solo papel. Llena los huecos de esta lista y serás imparable. 💪
