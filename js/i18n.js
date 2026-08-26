/* ============================================================
   i18n.js — Idioma de la interfaz (ES/EN)
   ------------------------------------------------------------
   • t(clave): traducción de cadenas del shell (escritorio,
     barra de tareas, menú Inicio, apagado)
   • El idioma se persiste en localStorage ('svr_lang') y el
     cambio se aplica recargando la vista actual.
   ============================================================ */

const KEY = 'svr_lang';

const DICT = {
  es: {
    'app.about': 'Sobre mí',
    'app.projects': 'Proyectos',
    'app.certs': 'Certificaciones',
    'app.contact': 'Contacto',
    'app.cv': 'CV.txt',
    'app.terminal': 'Símbolo del sistema',
    'app.settings': 'Propiedades',
    'app.museum': 'juego.exe',
    'recycle': 'Papelera',
    'start.title': 'Portafolio 95',
    'start.play': 'Entrar al juego…',
    'start.shutdown': 'Apagar…',
    'shutdown.line1': 'Es ahora seguro apagar su equipo.',
    'shutdown.line2': 'Haz clic en cualquier parte para reiniciar',
    'open.prefix': 'Abrir',
    'tray.battery': 'Batería',
    'tray.volume': 'Volumen',
    'tray.lang': 'Cambiar idioma / Change language',
    'cvpdf.title': 'CV.pdf',
    'cvpdf.open': 'Abrir PDF',
    'cvpdf.download': 'Descargar CV.pdf',
    'certs.view': 'Ver credencial',
    'certs.empty': 'Todavía no hay certificaciones.<br>Edita <b>js/data/portfolio.js</b> y añádelas.',
    'locale': 'es-MX',
  },
  en: {
    'app.about': 'About me',
    'app.projects': 'Projects',
    'app.certs': 'Certifications',
    'app.contact': 'Contact',
    'app.cv': 'CV.txt',
    'app.terminal': 'MS-DOS Prompt',
    'app.settings': 'Settings',
    'app.museum': 'game.exe',
    'recycle': 'Recycle Bin',
    'start.title': 'Portfolio 95',
    'start.play': 'Enter game…',
    'start.shutdown': 'Shut down…',
    'shutdown.line1': 'It is now safe to turn off your computer.',
    'shutdown.line2': 'Click anywhere to restart',
    'open.prefix': 'Open',
    'tray.battery': 'Battery',
    'tray.volume': 'Volume',
    'tray.lang': 'Cambiar idioma / Change language',
    'cvpdf.open': 'Open PDF',
    'cvpdf.download': 'Download CV.pdf',
    'cvpdf.title': 'CV.pdf',
    'certs.view': 'View credential',
    'certs.empty': 'No certifications yet.<br>Edit <b>js/data/portfolio.js</b> to add them.',
    'locale': 'en-US',
  },
};

export function getLang() {
  const v = localStorage.getItem(KEY);
  return v === 'en' ? 'en' : 'es';
}

/** Cambia el idioma y recarga para re-renderizar todo el shell */
export function setLang(lang) {
  localStorage.setItem(KEY, lang === 'en' ? 'en' : 'es');
  location.reload();
}

export function t(key) {
  return DICT[getLang()][key] ?? DICT.es[key] ?? key;
}
