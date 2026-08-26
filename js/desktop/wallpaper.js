/* ============================================================
   wallpaper.js — Fondo de pantalla del escritorio
   ------------------------------------------------------------
   Fondo degradado azul estilo Windows 98 con el logo real
   de Windows 95 cargado desde assets/images/win95-logo.png.
   Canvas insertado como primer hijo del workspace.
   ============================================================ */

function loadLogo(src) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = src;
  });
}

export async function paintWallpaper(w = 1200, h = 900) {
  const cv = document.createElement('canvas');
  cv.width = w;
  cv.height = h;
  const ctx = cv.getContext('2d');

  /* --- Gradiente lineal principal: celeste → azul marino --- */
  const grad = ctx.createLinearGradient(0, 0, 0, h);
  grad.addColorStop(0,   '#3a8fd6');
  grad.addColorStop(0.4, '#1c6db5');
  grad.addColorStop(1,   '#0a2a5e');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);

  /* --- Brillo elíptico sutil en el centro-superior --- */
  const glow = ctx.createRadialGradient(w * 0.5, h * 0.32, 0, w * 0.5, h * 0.32, h * 0.6);
  glow.addColorStop(0, 'rgba(120,190,240,0.25)');
  glow.addColorStop(0.5, 'rgba(60,140,210,0.08)');
  glow.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, w, h);

  /* --- Viñeta sutil --- */
  const vig = ctx.createRadialGradient(w / 2, h * 0.6, h * 0.3, w / 2, h * 0.6, h * 0.95);
  vig.addColorStop(0, 'rgba(0,0,0,0)');
  vig.addColorStop(1, 'rgba(0,10,40,0.22)');
  ctx.fillStyle = vig;
  ctx.fillRect(0, 0, w, h);

  /* --- Logo Windows 95 (imagen real) --- */
  const logo = await loadLogo('assets/images/wallpaper/win95-logo.png');
  if (logo) {
    const logoH = h * 0.3;
    const logoW = logoH * (logo.width / logo.height);
    const lx = (w - logoW) / 2;
    const ly = (h - logoH) / 2;
    ctx.drawImage(logo, lx, ly, logoW, logoH);
  }

  return cv;
}

/** Aplica el fondo al workspace del escritorio */
export async function mountWallpaper(workspace) {
  const cv = await paintWallpaper();
  cv.style.cssText = `
    position:absolute; inset:0;
    width:100%; height:100%;
    object-fit:cover;
    pointer-events:none;
  `;
  workspace.prepend(cv);
}
