/* ============================================================
   taskbar.js — Barra de tareas Windows 95
   ------------------------------------------------------------
   • Botón Inicio: SOLO al hacer clic abre el menú desplegable
     (dropdown sobre el botón) con los accesos directos
   • Botones de ventanas abiertas (toggle clásico)
   • Bandeja: batería, volumen, idioma ES/EN y reloj real
   Devuelve una función cleanup para el cambio de vista.
   ============================================================ */

import { on, wm } from './windowManager.js';
import { APPS, launchApp } from './apps/registry.js';
import { t, getLang, setLang } from '../i18n.js';

const ICON = 'assets/icons/windows-16x16.png';

/* ---------- Reloj de la bandeja ---------- */
function startClock(clockEl) {
  const fmt = new Intl.DateTimeFormat(t('locale'), {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
  const tick = () => { clockEl.textContent = fmt.format(new Date()); };
  tick();
  const timer = setInterval(tick, 15000);
  return () => clearInterval(timer);
}

/* ---------- Pantalla de apagado ---------- */
function showShutdown() {
  const screen = document.createElement('div');
  screen.className = 'shutdown-screen';
  screen.innerHTML = `
    <div>${t('shutdown.line1')}</div>
    <small>${t('shutdown.line2')}</small>
  `;
  screen.addEventListener('click', () => {
    screen.remove();
    location.hash = '#/boot';
    location.reload();               // reinicio completo → secuencia de arranque
  });
  document.body.append(screen);
}

/* ============================================================
   Menú Inicio — dropdown sobre el botón (sin ventana)
   ============================================================ */
function buildStartMenu() {
  const menu = document.createElement('div');
  menu.className = 'start-menu';
  menu.hidden = true;

  const side = document.createElement('div');
  side.className = 'start-menu-side';
  side.textContent = t('start.title');

  const items = document.createElement('div');
  items.className = 'menu-items';

  const addItem = ({ label, icon, action }) => {
    if (!label) {
      const sep = document.createElement('div');
      sep.className = 'menu-sep';
      items.append(sep);
      return;
    }
    const el = document.createElement('div');
    el.className = 'menu-item';
    el.tabIndex = 0;
    el.setAttribute('role', 'menuitem');
    if (icon) el.innerHTML = `<img src="${icon}" alt="">`;
    el.append(label);
    // La acción se ejecuta vía delegación (abajo); guardamos el comando
    if (action) el.dataset.action = action;
    items.append(el);
  };

  for (const id of ['about', 'projects', 'certs', 'cv', 'contact', 'terminal', 'settings']) {
    addItem({ label: t(`app.${id}`), icon: APPS[id].meta.icons[16], action: id });
  }

  addItem({ label: null });                                    // separador
  addItem({ label: t('app.museum'), icon: APPS.museum.meta.icons[16], action: 'museum' });
  addItem({ label: 'CV.pdf', icon: 'assets/icons/notepad-16x16.png', action: 'cv-pdf' });
  addItem({ label: null });
  addItem({ label: t('start.shutdown'), icon: 'assets/icons/settings-16x16.png', action: 'shutdown' });

  menu.append(side, items);
  menu.setAttribute('role', 'menu');
  menu.setAttribute('aria-label', t('start.title'));

  // Delegación: click o Enter/Espacio sobre un item
  function activate(e) {
    const item = e.target.closest('.menu-item');
    if (!item || !item.dataset.action) return;
    if (e.type === 'keydown' && e.key !== 'Enter' && e.key !== ' ') return;
    e.preventDefault();
    const cmd = item.dataset.action;

    menu.hidden = true;
    menu.dispatchEvent(new CustomEvent('menuclosed'));

    if (cmd === 'shutdown') showShutdown();
    else if (cmd === 'cv-pdf') launchApp('cv');
    else launchApp(cmd);
  }

  menu.addEventListener('click', activate);
  menu.addEventListener('keydown', activate);

  return menu;
}

/* ---------- Botones de tarea ---------- */
function bindTaskButtons(container) {
  const buttons = new Map();

  function makeBtn(id) {
    if (buttons.has(id)) return buttons.get(id);
    const win = wm.get(id);
    if (!win) return null;

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'task-btn';
    if (win.icon) btn.innerHTML = `<img src="${win.icon}" alt="" width="16" height="16">`;
    const span = document.createElement('span');
    span.textContent = win.title;
    btn.append(span);

    btn.addEventListener('click', () => {
      const w = wm.get(id);
      if (!w) return;
      if (w.minimized) return w.restore();
      if (wm.active() === w) return w.minimize();
      w.focus();
    });

    container.append(btn);
    buttons.set(id, btn);
    return btn;
  }

  // Ventanas ya abiertas antes de montar la barra
  for (const id of wm.windows.keys()) {
    const btn = makeBtn(id);
    btn?.classList.toggle('active', wm.active()?.id === id);
  }

  const offs = [
    on('open', ({ id }) => makeBtn(id)),
    on('close', ({ id }) => { buttons.get(id)?.remove(); buttons.delete(id); }),
    on('focus', ({ id }) =>
      [...buttons].forEach(([bid, b]) => b.classList.toggle('active', bid === id))),
    on('minimize', ({ id }) => buttons.get(id)?.classList.remove('active')),
    on('restore', ({ id }) => buttons.get(id)?.classList.add('active')),
    on('title', ({ id, title }) => {
      const b = buttons.get(id);
      if (b) b.querySelector('span').textContent = title;
    }),
  ];

  return () => offs.forEach((off) => off());
}

/* ============================================================
   Bandeja: batería · volumen · idioma
   ============================================================ */

/* --- Batería (Battery Status API con fallback estático) --- */
function mountBattery(tray) {
  const el = document.createElement('span');
  el.className = 'tray-btn tray-battery';
  el.title = t('tray.battery');
  el.setAttribute('role', 'img');
  tray.append(el);

  const render = (level, charging) => {
    const pct = Math.round(level * 100);
    el.innerHTML = `
      <svg width="20" height="12" viewBox="0 0 22 12" aria-hidden="true">
        <rect x="0.5" y="0.5" width="18" height="11" rx="1.5"
              fill="#fff" stroke="#000"/>
        <rect x="2" y="2" width="${Math.max(15 * level, 1)}" height="8"
              fill="${charging ? '#1c5c34' : pct <= 20 ? '#a00' : '#000'}"/>
        <rect x="19.5" y="3.5" width="2" height="5" rx="0.5" fill="#000"/>
      </svg>
      <span>${pct}%</span>
    `;
  };

  if (!navigator.getBattery) {
    render(1, true);                    // escritorio sin API → llena
    return () => {};
  }

  let cleanup = () => {};
  navigator.getBattery().then((bat) => {
    const upd = () => render(bat.level, bat.charging);
    upd();
    bat.addEventListener('levelchange', upd);
    bat.addEventListener('chargingchange', upd);
    cleanup = () => {
      bat.removeEventListener('levelchange', upd);
      bat.removeEventListener('chargingchange', upd);
    };
  }).catch(() => render(1, true));

  return () => cleanup();
}


/* --- Idioma ES/EN --- */
function mountLangToggle(tray) {
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'tray-btn tray-lang';
  btn.title = t('tray.lang');
  btn.textContent = getLang().toUpperCase();
  btn.addEventListener('click', () => {
    setLang(getLang() === 'es' ? 'en' : 'es');
  });
  tray.append(btn);
}

/* ============================================================
   Montaje principal — devuelve función cleanup
   ============================================================ */
export function mountTaskbar(workspace) {
  const bar = document.createElement('div');
  bar.className = 'taskbar';

  const startBtn = document.createElement('button');
  startBtn.type = 'button';
  startBtn.className = 'start-btn';
  startBtn.innerHTML = `<img src="${ICON}" alt="">`;
  startBtn.append(getLang() === 'es' ? 'Inicio' : 'Start');

  const tasks = document.createElement('div');
  tasks.className = 'task-buttons';

  const tray = document.createElement('div');
  tray.className = 'tray';
  const clock = document.createElement('span');
  clock.className = 'tray-clock';
  tray.append(clock);

  bar.append(startBtn, tasks, tray);
  workspace.append(bar);

  /* --- Menú Inicio (dropdown sobre el botón) --- */
  const menu = buildStartMenu();
  workspace.append(menu);

  function setOpen(open) {
    menu.hidden = !open;
    startBtn.classList.toggle('active', open);
  }
  const isOpen = () => !menu.hidden;

  startBtn.addEventListener('click', () => {     setOpen(!isOpen()); });
  menu.addEventListener('menuclosed', () => setOpen(false));

  // Cerrar al hacer click fuera / Escape
  const outside = (e) => {
    if (!isOpen()) return;
    if (!e.target.closest('.start-menu') && !e.target.closest('.start-btn')) setOpen(false);
  };
  const onKey = (e) => { if (e.key === 'Escape' && isOpen()) setOpen(false); };
  document.addEventListener('pointerdown', outside);
  document.addEventListener('keydown', onKey);

  const stopClock = startClock(clock);
  const unbindTasks = bindTaskButtons(tasks);
  const stopBattery = mountBattery(tray);
  mountLangToggle(tray);

  return () => {
    stopClock();
    unbindTasks();
    stopBattery();
    document.removeEventListener('pointerdown', outside);
    document.removeEventListener('keydown', onKey);
    bar.remove();
    menu.remove();
  };
}
