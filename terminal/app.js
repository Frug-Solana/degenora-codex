const bootLines = [
  'PILLSBURG LAB :: SYSTEM SECURITY INTERFACE',
  'VERSION       :: 4.0.5 (ALPHA)',
  'READY         :: TRUE',
  '',
  'ACCESS        :: PUBLIC',
  'MODE          :: READ ONLY',
  'SYNC          :: ACTIVE',
  '',
  'TYPE HELP',
];

const routes = {
  HELP: {
    title: 'HELP',
    cards: [
      { t: 'MAP', d: 'Open Degenora map artifact' },
      { t: 'REPORTS', d: 'Browse field reports' },
      { t: 'LAB', d: 'Pillsburg lab files' },
      { t: 'SPECIMENS', d: 'Specimen dossier template' },
    ],
  },
  MAP: {
    title: 'MAP',
    cards: [
      { t: 'Degenora map', d: 'codex/map.md', href: '../codex/map.md' },
    ],
  },
  REPORTS: {
    title: 'REPORTS',
    cards: [
      { t: '0001 Arrival', d: 'field-reports/0001-arrival.md', href: '../field-reports/0001-arrival.md' },
      { t: '0002 Verdant Expanse', d: 'field-reports/0002-verdant-expanse.md', href: '../field-reports/0002-verdant-expanse.md' },
      { t: '0003 Bag Check', d: 'field-reports/0003-bag-check.md', href: '../field-reports/0003-bag-check.md' },
      { t: '0004 Base Camp', d: 'field-reports/0004-base-camp.md', href: '../field-reports/0004-base-camp.md' },
    ],
  },
  LAB: {
    title: 'LAB',
    cards: [
      { t: 'Pillsburg Lab', d: 'codex/pillsburg-lab.md', href: '../codex/pillsburg-lab.md' },
      { t: 'Terminal 7-B', d: 'lore/terminal-7b.md', href: '../lore/terminal-7b.md' },
    ],
  },
  SPECIMENS: {
    title: 'SPECIMENS',
    cards: [
      { t: 'Dossier template', d: 'specimens/_template.md', href: '../specimens/_template.md' },
    ],
  },
};

function setBoot(){
  const el = document.getElementById('bootText');
  let i = 0;
  const tick = () => {
    el.textContent = bootLines.slice(0, i).join('\n');
    i++;
    if (i <= bootLines.length) setTimeout(tick, 70);
  };
  tick();
}

function renderView(key){
  const k = (key || 'HELP').toUpperCase();
  const route = routes[k] || routes.HELP;
  document.getElementById('viewTitle').textContent = route.title;
  const body = document.getElementById('viewBody');
  body.innerHTML = '';
  for (const c of route.cards){
    const card = document.createElement('div');
    card.className = 'card';
    const t = document.createElement(c.href ? 'a' : 'div');
    t.className = 't';
    t.textContent = c.t;
    if (c.href){
      t.href = c.href;
      t.target = '_blank';
      t.rel = 'noreferrer';
    }
    const d = document.createElement('div');
    d.className = 'd mono';
    d.textContent = c.d;
    card.appendChild(t);
    card.appendChild(d);
    body.appendChild(card);
  }
}

function setQuick(){
  const q = document.getElementById('quickLinks');
  const items = [
    { k: 'CODEX', v: 'repo', href: 'https://github.com/Frug-Solana/degenora-codex' },
    { k: 'MAP', v: 'artifact', href: '../codex/map.md' },
    { k: 'REPORTS', v: 'index', href: '../field-reports/README.md' },
  ];
  for (const it of items){
    const row = document.createElement('div');
    row.className = 'link';
    const a = document.createElement('a');
    a.className = 'k mono';
    a.href = it.href;
    a.target = '_blank';
    a.rel = 'noreferrer';
    a.textContent = it.k;
    const v = document.createElement('div');
    v.className = 'v mono';
    v.textContent = it.v;
    row.appendChild(a);
    row.appendChild(v);
    q.appendChild(row);
  }
}

function setClock(){
  const el = document.getElementById('clock');
  const pad = (n) => String(n).padStart(2,'0');
  setInterval(() => {
    const d = new Date();
    el.textContent = `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
  }, 250);
}

function bindCmd(){
  const input = document.getElementById('cmd');
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter'){
      const raw = input.value.trim();
      input.value = '';
      if (!raw) return;
      renderView(raw);
    }
  });
}

setBoot();
setQuick();
setClock();
bindCmd();
renderView('HELP');
