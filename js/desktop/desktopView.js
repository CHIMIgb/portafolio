/* ============================================================
   desktopView.js — Escritorio: iconos + taskbar
   ------------------------------------------------------------
   • Iconos con selección (1 click/tap) y apertura (2º click,
     doble-click en mouse) — patrón clásico Win95 adaptado a táctil
   • Click en el fondo deselecciona
   Devuelve función cleanup (desuscribe taskbar y listeners).
   ============================================================ */

import { mountTaskbar } from './taskbar.js';
import { APPS, launchApp, openRecycleBin } from './apps/registry.js';
import { projects } from '../data/portfolio.js';
import { t } from '../i18n.js';
import { mountWallpaper } from './wallpaper.js';

const DESK_ORDER = ['about', 'certs', 'contact'];

export function mountDesktop(workspace) {
  /* ---------- Fondo de pantalla ---------- */
  mountWallpaper(workspace);

  /* ---------- Iconos ---------- */
  const iconsLayer = document.createElement('div');
  iconsLayer.style.cssText = `
    position:absolute; inset:0 0 var(--taskbar-h) 0;
    display:flex; flex-direction:column; padding:10px;
  `;
  workspace.append(iconsLayer);

  // Fila superior: columna de apps/general + columna de proyectos
  const topRow = document.createElement('div');
  topRow.style.cssText = `display:flex; align-items:flex-start; gap:14px;`;
  iconsLayer.append(topRow);

  const mainCol = document.createElement('div');
  const projCol = document.createElement('div');
  for (const col of [mainCol, projCol]) {
    col.style.cssText = `
      display:flex; flex-direction:column; gap:6px;
    `;
    topRow.append(col);
  }

  // Fila inferior pegada al fondo: MS-DOS Prompt y juego.exe lado a lado
  const bottomRow = document.createElement('div');
  bottomRow.style.cssText = `display:flex; gap:14px; margin-top:auto;`;
  iconsLayer.append(bottomRow);

  // Papelera: esquina inferior derecha
  const binSlot = document.createElement('div');
  binSlot.style.cssText = `position:absolute; right:10px; bottom:10px;`;
  iconsLayer.append(binSlot);

  const clearSelection = () =>
    iconsLayer.querySelectorAll('.desk-icon.selected')
      .forEach((el) => el.classList.remove('selected'));

  function makeDeskIcon({ label, icon16, onOpen, container = mainCol }) {
    const el = document.createElement('div');
    el.className = 'desk-icon';
    el.tabIndex = 0;                              // navegable con Tab
    el.setAttribute('role', 'button');
    el.setAttribute('aria-label', `${t('open.prefix')} ${label}`);
    el.innerHTML = `<img src="${icon16}" alt="">`;
    const lab = document.createElement('span');
    lab.className = 'desk-label';
    lab.textContent = label;
    el.append(lab);

    const open = () => { clearSelection(); onOpen(); };

    el.addEventListener('click', () => {
      if (el.classList.contains('selected')) open();
      else { clearSelection(); el.classList.add('selected'); }
    });
    el.addEventListener('dblclick', open);
    el.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); }
    });

    container.append(el);
    return el;
  }

  // Apps registradas
  for (const id of DESK_ORDER) {
    makeDeskIcon({
      label: t(`app.${id}`),
      icon16: APPS[id].meta.icons[32],
      onOpen: () => launchApp(id),
    });
  }

  // Un icono por proyecto, en su propia columna
  for (const p of projects) {
    makeDeskIcon({
      label: p.title,
      icon16: p.icon ?? APPS.projects.meta.icons[32],
      onOpen: () => launchApp('projects', { selectId: p.id }),
      container: projCol,
    });
  }

  // CV en PDF (abrir / descargar)
  makeDeskIcon({
    label: 'CV.pdf',
    icon16: 'assets/icons/notepad-32x32.png',
    onOpen: () => launchApp('cv'),
  });

  // MS-DOS Prompt y juego.exe: abajo, uno al lado del otro
  makeDeskIcon({
    label: t('app.terminal'),
    icon16: APPS.terminal.meta.icons[32],
    onOpen: () => launchApp('terminal'),
    container: bottomRow,
  });

  makeDeskIcon({
    label: 'juego.exe',
    icon16: APPS.museum.meta.icons[32],
    onOpen: () => launchApp('museum'),
    container: bottomRow,
  });

  // Papelera (esquina inferior derecha)
  makeDeskIcon({
    label: t('recycle'),
    icon16: 'assets/icons/recycle-32x32.png',
    onOpen: openRecycleBin,
    container: binSlot,
  });

  // Click en el fondo del escritorio deselecciona
  workspace.addEventListener('pointerdown', onBackground);
  function onBackground(e) {
    if (!e.target.closest('.desk-icon')) clearSelection();
  }

  /* ---------- Taskbar ---------- */
  const cleanupTaskbar = mountTaskbar(workspace);

  return () => {
    cleanupTaskbar();
    workspace.removeEventListener('pointerdown', onBackground);
  };
}
