/* ============================================================
   apps/cv.js — CV: información + opciones de PDF en menú
   ============================================================ */

import { profile, skills, projects, experience, socials } from '../../data/portfolio.js';

export const meta = {
  id: 'cv',
  title: 'CV.txt',
  icons: { 16: 'assets/icons/notepad-16x16.png', 32: 'assets/icons/notepad-32x32.png' },
};

function buildCvText() {
  const lines = [
    profile.name.toUpperCase(),
    `${profile.role} — ${profile.location}`,
    profile.email,
    profile.phone,
    profile.socials?.github || 'GitHub: github.com/CHIMIgb',
    '='.repeat(46),
    '',
    'RESUMEN',
  ];

  for (const p of profile.bio) {
    lines.push(p, '');
  }

  if (experience.length) {
    lines.push('EXPERIENCIA PROFESIONAL');
    for (const e of experience) {
      lines.push(`  ${e.company}`);
      lines.push(`  ${e.role} — ${e.location}`);
      lines.push(`  ${e.period}`);
      for (const h of e.highlights) {
        lines.push(`  • ${h}`);
      }
      lines.push('');
    }
  }

  if (projects.length) {
    lines.push('PROYECTOS');
    for (const p of projects) {
      lines.push(`  ${p.title} (${p.year})`);
      lines.push(`  ${p.short}`);
      lines.push(`  Tech: ${p.tech.join(', ')}`);
      if (p.liveUrl) lines.push(`  ${p.liveUrl}`);
      if (p.repoUrl) lines.push(`  ${p.repoUrl}`);
      lines.push('');
    }
  }

  if (profile.education?.length) {
    lines.push('EDUCACIÓN');
    for (const ed of profile.education) {
      lines.push(`  ${ed.degree}`);
      lines.push(`  ${ed.school} — ${ed.period}`);
      lines.push('');
    }
  }

  if (profile.languages?.length) {
    lines.push('IDIOMAS');
    for (const l of profile.languages) {
      lines.push(`  ${l.lang}: ${l.level}`);
    }
    lines.push('');
  }

  lines.push('HABILIDADES');
  for (const g of skills) lines.push(`  ${g.category}: ${g.items.join(', ')}`);
  lines.push('');

  return lines.join('\n');
}

export function launch() {
  return import('../windowManager.js').then(({ wm }) => {
    const existing = wm.get(meta.id);
    if (existing) return existing.focus();

    const wrap = document.createElement('div');
    wrap.className = 'cv-wrap';

    const menubar = document.createElement('div');
    menubar.className = 'menubar';

    const mkItem = (label, onClick) => {
      const el = document.createElement('span');
      el.className = 'menubar-item';
      el.textContent = label;
      el.style.cursor = 'pointer';
      el.addEventListener('click', onClick);
      return el;
    };

    menubar.append(
      mkItem('Ver CV', () => openPdfViewer()),
      mkItem('Descargar CV', () => downloadPdf()),
    );
    wrap.append(menubar);

    const text = document.createElement('div');
    text.className = 'cv-text';
    const raw = buildCvText();
    const urlRe = /(https?:\/\/[^\s]+)/g;
    for (const ln of raw.split('\n')) {
      if (urlRe.test(ln)) {
        urlRe.lastIndex = 0;
        let last = 0;
        let m;
        while ((m = urlRe.exec(ln)) !== null) {
          text.append(document.createTextNode(ln.slice(last, m.index)));
          const a = document.createElement('a');
          a.href = m[1];
          a.target = '_blank';
          a.rel = 'noopener noreferrer';
          a.textContent = m[1];
          a.style.cssText = 'color:#0000ee;text-decoration:underline;';
          text.append(a);
          last = m.index + m[0].length;
        }
        text.append(document.createTextNode(ln.slice(last)));
      } else {
        text.append(document.createTextNode(ln));
      }
      text.append(document.createTextNode('\n'));
    }
    wrap.append(text);

    wm.create({
      id: meta.id,
      title: `${meta.title} - Bloc de notas`,
      icon: meta.icons[16],
      width: 560,
      height: 480,
      content: wrap,
    });
  });
}

function openPdfViewer() {
  import('../windowManager.js').then(({ wm }) => {
    if (wm.get('pdf-viewer')) return wm.get('pdf-viewer').focus();

    const container = document.createElement('div');
    container.style.cssText = 'height:100%;display:flex;flex-direction:column;background:#808080;';

    const toolbar = document.createElement('div');
    toolbar.className = 'menubar';
    container.append(toolbar);

    const frame = document.createElement('iframe');
    frame.src = profile.cvUrl + '#zoom=86&pagemode=none';
    frame.style.cssText = 'flex:1;border:none;width:100%;background:#fff;';
    container.append(frame);

    wm.create({
      id: 'pdf-viewer',
      title: 'CV_Adrian_GB.pdf - Visor de PDF',
      icon: 'assets/icons/notepad-16x16.png',
      width: 700,
      height: 520,
      content: container,
    });
  });
}

function downloadPdf() {
  const a = document.createElement('a');
  a.href = profile.cvUrl;
  a.download = 'CV_Adrian_GB.pdf';
  a.click();
}
