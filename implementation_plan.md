# Rediseño Futurista Holográfico de Ventanas y Fuentes

Esta es la propuesta detallada para implementar la estética futurista y holográfica (estilo Halo / Star Trek / Sci-Fi HUD) en las ventanas de "Contáctame" y "Sobre mí", incluyendo los pasos para importar e implementar tipografías personalizadas.

## 1. Diseño y Estética de las Ventanas (Modales)

Se rediseñarán ambos componentes (`ContactModal.tsx` y `AboutModal.tsx`) para eliminar el aspecto tradicional redondeado y aplicar un marco estilo interfaz HUD (Holographic User Interface).

**Cambios visuales propuestos:**
- **Bordes asimétricos y recortes:** Se utilizará la propiedad CSS `clip-path` para generar esquinas cortadas diagonalmente (muy común en interfaces sci-fi).
- **Colores y Resplandores (Glow):** Fondos traslúcidos en tonos cian oscuro/azul profundo (`rgba(0, 20, 30, 0.8)`), acompañados de `box-shadow` interiores y exteriores en color `#00C2FF` (Cian) y `#FF00F7` (Magenta) para emular el brillo del holograma.
- **Detalles Tecnológicos:** Se agregarán elementos decorativos inactivos como texturas de cuadrícula (grid overlay), pequeñas crucetas (`+`), corchetes `[  ]`, y textos pequeños que simulen telemetría o códigos de carga en las esquinas.

## 2. Efecto de Apertura Holográfico (Animación)

Aprovechando que ya tienes `framer-motion` instalado, se modificará la transición actual (que es de deslizar desde arriba) a una animación en tres pasos estilo proyector holográfico encendiéndose:

1. **Fase de proyector inicial:** El modal aparece como una línea horizonal muy fina de luz brillante y opacidad fluctuante (simulando un fallo o flasheo).
2. **Fase de despliegue:** La línea se expande verticalmente (`scaleY`) rápidamente hasta revelar la forma de la ventana completa.
3. **Scanlines y Estática:** Un pseudo-elemento superpuesto pasará constantemente barriendo de arriba hacia abajo (scanline) sobre el contenido.

## 3. Guía de Implementación de la Fuente (Ej. "Halo")

> [!TIP]
> **¿Cómo vamos a implementar la fuente?**
> Al usar Next.js, descargaremos el archivo y utilizaremos `next/font/local` o `@font-face` nativo. Yo haré la configuración en código, tú solo tendrás que guardar el archivo de la fuente.

**Pasos requeridos (de tu lado y mío):**

1. **Descarga:** Deberás entrar a la página (ejs. Dafont) y descargar la fuente "Halo" de Will Turnbow (o la que elijas). Te dejará un archivo `.ttf` o `.otf`.
2. **Ubicación:** Dentro de la raíz de tu proyecto, crearemos la carpeta `public/fonts/` (si no existe) y colocarás ahí tú archivo (por ejemplo: `public/fonts/Halo.ttf`).
3. **Configuración en Next.js (Lo haré yo):** 
   Configuraré el archivo padre (ej. `src/app/layout.tsx` o un módulo CSS) utilizando `next/font/local` para optimizar esa fuente e inyectarla en variables de CSS (por ejemplo, `--font-halo`).
4. **Aplicación:** Usaré esta nueva variable en los componentes (como los títulos de las ventanas y encabezados).

---

## Plan de Ejecución paso a paso

Si estás de acuerdo con el plan, procederemos de la siguiente manera:

1. **Paso 1:** Requeriré que confirmes que has descargado la fuente y la has colocado en `public/fonts/Halo.ttf` (o el nombre que tenga). Yo prepararé el código en `layout.tsx` / `globals.css` para enganchar esa fuente al portafolio.
2. **Paso 2:** Refactorizaré `AboutModal.tsx` cambiando sus clases de estilos nativos por la estructura sci-fi (agregando clip-paths, box-shadows neón y la animación de apertura holográfica con framer-motion).
3. **Paso 3:** Una vez la ventana "Sobre mí" esté lista y a tu gusto, replicaré el mismo sistema de animaciones y diseño HUD en la ventana de `ContactModal.tsx`.

## User Review Required
> [!IMPORTANT]
> **Preguntas para ti:**
> 1. ¿Estás de acuerdo con el estilo y la secuencia de animaciones propuesta?
> 2. Te pido que de ser posible **descargues la fuente "Halo.ttf"** primero, me digas exactamente en qué carpeta de tu proyecto la guardaste y qué nombre le pusiste al archivo para que yo aplique la configuración exacta.
