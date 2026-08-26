/* ============================================================
   apps/certifications.js — Explorador de certificaciones
   Mismo patrón master-detail que projects.js.
   ============================================================ */

import { certifications } from '../../data/portfolio.js';
import { t } from '../../i18n.js';

export const meta = {
  id: 'certs',
  title: 'Certificaciones',
  icons: { 16: 'assets/icons/help-16x16.png', 32: 'assets/icons/help-32x32.png' },
};

function renderDetail(container, cert) {
  container.innerHTML = '';

  const title = document.createElement('h2');
  title.className = 'detail-title';
  title.textContent = cert.title;

  const year = document.createElement('p');
  year.className = 'detail-year';
  year.textContent = `${cert.issuer} · ${cert.year}`;

  container.append(title, year);

  const desc = document.createElement('div');
  desc.className = 'detail-desc';
  const p = document.createElement('p');
  p.textContent = cert.description ?? '';
  desc.append(p);
  container.append(desc);

  if (cert.url) {
    const actions = document.createElement('div');
    actions.className = 'detail-actions';
    const link = document.createElement('a');
    link.className = 'btn95 btn-link';
    link.href = cert.url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.textContent = `${t('certs.view')} ↗`;
    actions.append(link);
    container.append(actions);
  }
}

export function launch() {
  return import('../windowManager.js').then(({ wm }) => {
    if (!certifications.length) {
      wm.create({
        id: 'certs-empty',
        title: meta.title,
        icon: meta.icons[16],
        width: 380,
        height: 160,
        content: `<div class="app-pad">${t('certs.empty')}</div>`,
      });
      return;
    }

    const existing = wm.get(meta.id);
    if (existing) return existing.focus();

    let selectedId = certifications[0].id;

    const root = document.createElement('div');
    root.className = 'explorer';

    const list = document.createElement('div');
    list.className = 'explorer-list';
    list.setAttribute('role', 'listbox');

    const detail = document.createElement('div');
    detail.className = 'explorer-detail';

    const rows = new Map();

    function select(certId) {
      const c = certifications.find((x) => x.id === certId) ?? certifications[0];
      selectedId = c.id;
      for (const [id, row] of rows) row.classList.toggle('selected', id === selectedId);
      renderDetail(detail, c);
    }

    for (const c of certifications) {
      const row = document.createElement('div');
      row.className = 'explorer-row';
      row.dataset.id = c.id;
      row.setAttribute('role', 'option');
      row.innerHTML = `<img src="${meta.icons[32]}" alt="">`;

      const label = document.createElement('span');
      label.textContent = c.title;
      row.append(label);

      const yr = document.createElement('span');
      yr.className = 'row-year';
      yr.textContent = c.year;
      row.append(yr);

      rows.set(c.id, row);
      row.addEventListener('click', () => select(c.id));
      list.append(row);
    }

    root.append(list, detail);

    const win = wm.create({
      id: meta.id,
      title: meta.title,
      icon: meta.icons[16],
      width: 620,
      height: 400,
      content: root,
    });

    win._selectCert = select;
    select(selectedId);
  });
}
