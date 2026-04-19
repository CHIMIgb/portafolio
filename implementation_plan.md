# 🎯 Hacer el Portafolio Profesional sin Sacrificar la Creatividad

Corregir los 7 problemas identificados en `portfolio_review.md` manteniendo la estética Halo sci-fi que te diferencia.

---

## Resumen de Cambios

| # | Problema | Solución |
|---|---|---|
| 1 | Proyectos no visibles sin scroll | Nuevo botón **"PROYECTOS"** en el HUD que abre un modal holográfico con todos los proyectos |
| 2 | Proyectos sin profundidad | Cards dentro del modal con descripción, tech stack, links a GitHub y al proyecto live |
| 3 | Links sociales son `#` placeholder | Reemplazar con tus URLs reales de GitHub e Instagram |
| 4 | Temática Halo mal balanceada | El contenido profesional (proyectos, bio, contacto) ahora está al frente; la estética Halo es el diferenciador visual |
| 5 | Sin responsive/mobile | Media queries completas + layout adaptativo para el HUD y modales |
| 6 | Formulario usa `mailto:` | Integración con **EmailJS** (envío real sin backend propio) |
| 7 | \"Sobre mí\" genérico | Bio reescrita con espacio para tu historia real |

---

## User Review Required

> [!IMPORTANT]
> **Necesito tu información personal para completar estos cambios:**
> 1. **Tu URL de GitHub** (ej: `https://github.com/CHIMIgb`)
> 2. **Tu URL de Instagram** (o la red social que prefieras)
> 3. **Tu bio real**: ¿Cuántos años de experiencia tienes? ¿Eres estudiante, freelance, empleado? ¿En qué industria? ¿Algún logro concreto?
> 4. **¿Tienes repos públicos de GitHub para los proyectos?** Necesito los URLs para linkear desde las project cards
> 5. **¿Quieres usar EmailJS?** Es gratis hasta 200 emails/mes. Si prefieres otra opción dime cuál.
> 6. **¿Tienes un CV/Resumé en PDF?** Para agregar botón de descarga en el HUD

> [!WARNING]
> Mientras no me des los datos reales, usaré placeholders marcados con `TODO_CHIMI` para que puedas buscarlos y reemplazarlos fácilmente.

---

## Proposed Changes

### Componente: ProjectsModal (NUEVO)

Un nuevo modal holográfico que muestra todos los proyectos con contexto profesional completo.

#### [NEW] [ProjectsModal.tsx](file:///c:/Users/chimi/Documents/GitHub/portafolio/src/components/dom/ProjectsModal.tsx)

- Modal holográfico reutilizando el sistema de tracers/flash/panel del `ContactModal` y `AboutModal`
- Grid de **project cards** con:
  - Nombre del proyecto con icono
  - Descripción condensada (2-3 líneas)
  - Tech stack como badges holográficos
  - Botón "Ver Proyecto" → link al deploy
  - Botón "Código" → link al repo de GitHub
  - Badge de "Featured" para proyectos destacados
- Layout: grid de 2 columnas en desktop, 1 en mobile
- Scroll interno con scrollbar holográfico

---

### Componente: HUD (Navegación Principal)

#### [MODIFY] [HUD.tsx](file:///c:/Users/chimi/Documents/GitHub/portafolio/src/components/dom/HUD.tsx)

Cambios:
1. **Agregar botón "PROYECTOS"** entre "CONTÁCTAME" y "SOBRE MÍ"
2. **Agregar botón "CV"** (descarga de PDF) — pequeño, junto a los social links en el footer
3. **Reemplazar `href="#"`** en GitHub e Instagram con URLs reales
4. **Agregar lógica** de apertura/cierre para el `ProjectsModal`
5. **Responsive**: media queries para repositionar nav en mobile (bottom nav en lugar de top-left)

---

### Componente: AboutModal (Bio Reescrita)

#### [MODIFY] [AboutModal.tsx](file:///c:/Users/chimi/Documents/GitHub/portafolio/src/components/dom/AboutModal.tsx)

Cambios:
1. **Reescribir la bio** con estructura más profesional:
   - Quién eres (nombre real o alias + rol)
   - Años de experiencia y contexto (estudiante/freelance/empleado)
   - Enfoque y especialización
   - Lo que te diferencia (la integración de múltiples tecnologías)
2. **Agregar sección "Experiencia"** debajo del bio con tu contexto profesional
3. Mantener la sección de tech stacks intacta

---

### Componente: ContactModal (EmailJS)

#### [MODIFY] [ContactModal.tsx](file:///c:/Users/chimi/Documents/GitHub/portafolio/src/components/dom/ContactModal.tsx)

Cambios:
1. **Reemplazar `mailto:`** con integración EmailJS
2. Agregar feedback visual: estado de envío (loading spinner holográfico, success, error)
3. **Reemplazar `href="#"`** en links sociales con URLs reales
4. Reset del formulario después de envío exitoso

---

### Estilos: Responsive + Project Cards

#### [MODIFY] [hologram.css](file:///c:/Users/chimi/Documents/GitHub/portafolio/src/styles/hologram.css)

Cambios:
1. **Nuevas clases** para project cards holográficas (`.holo-project-card`, `.holo-project-grid`, `.holo-tech-badge`, `.holo-project-link`)
2. **Media queries extendidas** (`max-width: 768px` y `max-width: 480px`) para:
   - HUD navigation repositionado (abajo-izquierda o menú hamburguesa)
   - Modal panels a 95% width en mobile
   - Project grid 1 columna en mobile
   - Font sizes adaptativos
   - Skill grid columns reducidas

#### [MODIFY] [globals.css](file:///c:/Users/chimi/Documents/GitHub/portafolio/src/app/globals.css)

- Agregar media queries globales para el HUD fixed overlay en mobile

---

### Datos: Proyectos con GitHub links

#### [MODIFY] [project.ts](file:///c:/Users/chimi/Documents/GitHub/portafolio/src/types/project.ts)

- Agregar campo `github?: string` al interface

#### [MODIFY] [projects.ts](file:///c:/Users/chimi/Documents/GitHub/portafolio/src/data/projects.ts)

- Agregar `github` URLs a cada proyecto (con placeholders `TODO_CHIMI` si no los tengo)

---

### Dependencia: EmailJS

#### [MODIFY] [package.json](file:///c:/Users/chimi/Documents/GitHub/portafolio/package.json)

- Instalar `@emailjs/browser` para envío de emails desde el frontend

---

## Open Questions

> [!IMPORTANT]
> 1. **¿Cuáles son tus URLs reales?** GitHub, Instagram, LinkedIn, etc.
> 2. **¿Cuál es tu historia profesional?** Para la bio del "Sobre mí"
> 3. **¿Tienes un PDF de CV** que pueda agregar a `/public/`?
> 4. **¿Repos de GitHub de tus proyectos?** Para las project cards
> 5. **¿Quieres que configure EmailJS o prefieres otro servicio?**

---

## Verification Plan

### Automated Tests
- `npm run build` — Verificar que compila sin errores
- Verificar con el browser tool que:
  - El botón "PROYECTOS" abre el modal correctamente
  - Las project cards muestran toda la información
  - Los links de GitHub/Instagram funcionan
  - El formulario de contacto envía correctamente (o muestra el flow)
  - Todo se ve bien en viewport de 375px (mobile) y 1440px (desktop)

### Manual Verification
- Recorrer todos los modales y verificar la animación de tracers
- Verificar que el responsive no rompe la escena 3D
- Confirmar que la estética Halo se mantiene pero el contenido profesional domina
