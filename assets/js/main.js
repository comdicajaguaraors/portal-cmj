/* ============================================================
   CMJ Portal v3 — JavaScript Principal
   Cookie LGPD · Menu · CMS JSON · Formulários · Acessibilidade
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── COOKIE LGPD ──────────────────────────────────────── */
  if (!localStorage.getItem('cmj-cookie-ok')) {
    const banner = document.createElement('div');
    banner.id = 'cookie-banner';
    banner.innerHTML = `
      <p>Este portal utiliza cookies estritamente necessários para o funcionamento.
         Não coletamos dados para fins comerciais. Saiba mais na
         <a href="${CMJData.base}pages/transparencia.html">Política de Privacidade</a>.</p>
      <div class="cookie-btns">
        <button class="btn-cookie-ok" id="cookie-ok">Aceitar</button>
        <button class="btn-cookie-rej" id="cookie-rej">Recusar opcionais</button>
      </div>`;
    document.body.appendChild(banner);
    document.getElementById('cookie-ok').onclick  = () => { localStorage.setItem('cmj-cookie-ok','1'); banner.remove(); };
    document.getElementById('cookie-rej').onclick = () => { localStorage.setItem('cmj-cookie-ok','0'); banner.remove(); };
  }

  /* ── MENU — inicializa após components.js injetar o header ── */
  setTimeout(initMenu, 80);
  setTimeout(initDropsMobile, 110);
  setTimeout(markActive, 130);

  function initMenu() {
    const toggle  = document.getElementById('menuToggle');
    const navWrap = document.getElementById('navWrap');
    const overlay = document.getElementById('nav-overlay');

    function fechar() {
      navWrap?.classList.remove('open');
      toggle?.classList.remove('ativo');
      toggle?.setAttribute('aria-expanded', 'false');
      if (overlay) overlay.style.display = 'none';
      document.body.style.overflow = '';
      document.querySelectorAll('.nav-drop.open').forEach(d => d.classList.remove('open'));
    }

    toggle?.addEventListener('click', () => {
      const isOpen = navWrap.classList.toggle('open');
      toggle.classList.toggle('ativo', isOpen);
      toggle.setAttribute('aria-expanded', String(isOpen));
      if (overlay) overlay.style.display = isOpen ? 'block' : 'none';
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    overlay?.addEventListener('click', fechar);
    document.addEventListener('keydown', e => { if (e.key === 'Escape') fechar(); });

    /* fechar menu ao clicar em link de página */
    document.querySelectorAll('.nav-list a:not([href="#"])').forEach(link => {
      if (!link.nextElementSibling?.classList.contains('nav-drop')) {
        link.addEventListener('click', fechar);
      }
    });
  }

  function initDropsMobile() {
    if (window.innerWidth > 768) return;
    document.querySelectorAll('.nav-list > li > a').forEach(link => {
      if (link.nextElementSibling?.classList.contains('nav-drop')) {
        link.addEventListener('click', e => {
          e.preventDefault();
          link.nextElementSibling.classList.toggle('open');
        });
      }
    });
  }

  function markActive() {
    const pg = window.location.pathname.split('/').pop() || 'index.html';
    if (!pg) return;
    document.querySelectorAll('.nav-list > li > a').forEach(link => {
      const href = link.getAttribute('href') || '';
      if (href !== '#' && href.includes(pg)) link.closest('li')?.classList.add('ativo');
    });
  }

  /* ── VOLTAR AO TOPO ───────────────────────────────────── */
  const backTop = document.getElementById('back-top');
  if (backTop) {
    window.addEventListener('scroll', () => backTop.classList.toggle('show', window.scrollY > 400), { passive: true });
    backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  /* ── ACESSIBILIDADE — FONTE ───────────────────────────── */
  let fontSize = parseInt(localStorage.getItem('cmj-font') || '16');
  document.documentElement.style.fontSize = fontSize + 'px';
  setTimeout(() => {
    document.querySelectorAll('.acess-ctrl button').forEach(btn => {
      btn.addEventListener('click', () => {
        const a = btn.dataset.acao;
        if (a === 'aumentar' && fontSize < 22) fontSize += 2;
        else if (a === 'diminuir' && fontSize > 12) fontSize -= 2;
        else if (a === 'normal') fontSize = 16;
        document.documentElement.style.fontSize = fontSize + 'px';
        localStorage.setItem('cmj-font', fontSize);
      });
    });
  }, 160);

  /* ── ANIMAÇÕES DE ENTRADA ─────────────────────────────── */
  if ('IntersectionObserver' in window) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.style.opacity = '1';
          e.target.style.transform = 'translateY(0)';
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.07 });

    const selectors = '.news-card,.transp-card,.meeting-item,.doc-item,.stat-card,.admin-stat';
    document.querySelectorAll(selectors).forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(16px)';
      el.style.transition = 'opacity .4s ease, transform .4s ease';
      obs.observe(el);
    });
  }

  /* ── TOAST ────────────────────────────────────────────── */
  window.showToast = function(msg, tipo = 'ok') {
    const t = document.createElement('div');
    t.className = `toast toast-${tipo}`;
    t.setAttribute('role', 'alert');
    t.setAttribute('aria-live', 'polite');
    t.textContent = msg;
    document.body.appendChild(t);
    setTimeout(() => { t.style.animation = 'toastIn .25s ease reverse'; setTimeout(() => t.remove(), 250); }, 4000);
  };

  /* ── VALIDAÇÃO DE FORMULÁRIOS ─────────────────────────── */
  function validarEmail(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }

  function validarForm(form) {
    let ok = true;
    form.querySelectorAll('[required]').forEach(field => {
      const val = field.value.trim();
      const errEl = field.parentElement.querySelector('.field-err');
      field.classList.remove('error');
      if (errEl) errEl.style.display = 'none';
      if (!val) {
        field.classList.add('error');
        if (errEl) { errEl.textContent = 'Campo obrigatório.'; errEl.style.display = 'block'; }
        ok = false;
      } else if (field.type === 'email' && !validarEmail(val)) {
        field.classList.add('error');
        if (errEl) { errEl.textContent = 'E-mail inválido.'; errEl.style.display = 'block'; }
        ok = false;
      } else if (field.type === 'checkbox' && !field.checked) {
        if (errEl) { errEl.textContent = 'Você precisa aceitar para continuar.'; errEl.style.display = 'block'; }
        ok = false;
      }
    });
    return ok;
  }

  document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      if (validarForm(form)) {
        showToast('✅ Mensagem enviada com sucesso! Retornaremos em breve.', 'ok');
        form.reset();
        form.querySelectorAll('.error').forEach(f => f.classList.remove('error'));
      } else {
        showToast('Por favor, corrija os campos destacados.', 'err');
      }
    });
    /* Limpar erro ao digitar */
    form.querySelectorAll('input, textarea, select').forEach(f => {
      f.addEventListener('input', () => {
        f.classList.remove('error');
        const errEl = f.parentElement.querySelector('.field-err');
        if (errEl) errEl.style.display = 'none';
      });
    });
  });

  /* ── FILTROS GENÉRICOS (data-filtro / data-categoria) ──── */
  document.querySelectorAll('[data-filtro]').forEach(btn => {
    btn.addEventListener('click', function() {
      const grupo = this.closest('[role="group"]') || this.closest('.filter-bar') || document.body;
      grupo.querySelectorAll('[data-filtro]').forEach(b => b.classList.remove('active', 'ativo'));
      this.classList.add('active');
      const filtro  = this.dataset.filtro;
      const isTodos = filtro === 'todos' || filtro === 'todas';
      document.querySelectorAll('[data-categoria]').forEach(item => {
        const cats = (item.dataset.categoria || '').split(' ');
        item.style.display = (isTodos || cats.includes(filtro)) ? '' : 'none';
      });
    });
  });

  /* ── CARREGADOR JSON (CMS) ────────────────────────────── */
  window.CMJData = window.CMJData || {};

  Object.assign(window.CMJData, {
    base: (() => {
      const p = window.location.pathname;
      if (p.includes('/admin/')) return '../';
      if (p.includes('/pages/')) return '../';
      return './';
    })(),

    async load(file) {
      /* Usa cache de sessão para evitar múltiplas requisições */
      const cacheKey = 'cmj-json-' + file;
      const cached = sessionStorage.getItem(cacheKey);
      if (cached) return JSON.parse(cached);
      try {
        const res = await fetch(this.base + 'data/' + file);
        if (!res.ok) throw new Error(res.status);
        const data = await res.json();
        sessionStorage.setItem(cacheKey, JSON.stringify(data));
        return data;
      } catch(err) {
        console.warn('[CMJData] Erro ao carregar', file, err.message);
        return null;
      }
    },

    /* Invalida cache após escrita no admin */
    clearCache(file) {
      sessionStorage.removeItem('cmj-json-' + file);
    },

    fmtData(iso) {
      if (!iso) return '';
      const [y,m,d] = iso.split('-');
      const meses = ['jan','fev','mar','abr','mai','jun','jul','ago','set','out','nov','dez'];
      return `${d}/${meses[+m-1]}/${y}`;
    },
    fmtDataLonga(iso) {
      if (!iso) return '';
      return new Date(iso + 'T12:00:00')
        .toLocaleDateString('pt-BR', { day:'2-digit', month:'long', year:'numeric' });
    },
    corCat(cat) {
      return { deliberacao:'tag-blue', reuniao:'tag-green', parceria:'tag-green',
               evento:'tag-gold', comunicado:'tag-gray' }[cat] || 'tag-gray';
    },
    labelCat(cat) {
      return { deliberacao:'Deliberação', reuniao:'Reunião', parceria:'Parceria',
               evento:'Evento', comunicado:'Comunicado' }[cat] || cat;
    }
  });

  /* ── RENDERIZAÇÕES HOME ───────────────────────────────── */
  renderNewsHome();
  renderResolucoesHome();
  renderReunioesHome();

  async function renderNewsHome() {
    const destaqueEl = document.getElementById('noticia-destaque');
    const gridEl     = document.getElementById('noticias-grid');
    if (!destaqueEl && !gridEl) return;

    const noticias = await CMJData.load('noticias.json');
    if (!noticias) return;

    const destaque = noticias.find(n => n.destaque) || noticias[0];
    const demais   = noticias.filter(n => n.id !== destaque.id).slice(0, 3);

    if (destaqueEl && destaque) {
      destaqueEl.innerHTML = `
        <div class="news-feat-img" aria-hidden="true" style="font-size:5rem">${destaque.imagem_emoji || '📰'}</div>
        <div class="news-feat-body">
          <div style="display:flex;gap:8px;margin-bottom:10px;flex-wrap:wrap">
            <span class="tag tag-gold">⭐ Destaque</span>
            <span class="tag ${CMJData.corCat(destaque.categoria)}">${CMJData.labelCat(destaque.categoria)}</span>
          </div>
          <p style="font-size:var(--t-xs);color:var(--n-400);margin-bottom:8px">
            📅 ${CMJData.fmtDataLonga(destaque.data)}
          </p>
          <h2><a href="${CMJData.base}pages/noticias.html">${destaque.titulo}</a></h2>
          <p>${destaque.resumo}</p>
          <a href="${CMJData.base}pages/noticias.html" class="btn btn-primary btn-sm">
            Ler notícia completa →
          </a>
        </div>`;
    }

    if (gridEl) {
      gridEl.className = 'news-grid';
      gridEl.innerHTML = demais.map(n => `
        <article class="news-card" data-categoria="${n.categoria}">
          <div class="news-img">
            <span class="news-img-icon" aria-hidden="true">${n.imagem_emoji || '📰'}</span>
            <span class="news-date-pill">📅 ${CMJData.fmtData(n.data)}</span>
          </div>
          <div class="news-body">
            <div style="display:flex;gap:6px;flex-wrap:wrap">
              <span class="tag ${CMJData.corCat(n.categoria)}">${CMJData.labelCat(n.categoria)}</span>
            </div>
            <h3><a href="${CMJData.base}pages/noticias.html">${n.titulo}</a></h3>
            <p>${n.resumo}</p>
          </div>
          <div class="news-foot">
            <span class="news-foot-date">${CMJData.fmtData(n.data)}</span>
            <a href="${CMJData.base}pages/noticias.html" class="read-more">Ler mais →</a>
          </div>
        </article>`).join('');
    }
  }

  async function renderResolucoesHome() {
    const el = document.getElementById('resolucoes-lista');
    if (!el) return;
    const data = await CMJData.load('resolucoes.json');
    if (!data) return;
    el.className = 'doc-list';
    el.innerHTML = data.slice(0, 5).map(r => `
      <a href="${r.arquivo ? '../' + r.arquivo : '#'}" class="doc-item"
         ${r.arquivo ? 'download' : ''} aria-label="Resolução nº ${r.numero}">
        <div class="doc-icon">PDF</div>
        <div class="doc-info">
          <strong>Resolução nº ${r.numero} — ${r.ementa}</strong>
          <span>Publicado em ${CMJData.fmtData(r.data)}
            · <span class="tag tag-${r.situacao === 'vigente' ? 'vigente' : 'historico'}"
                    style="padding:1px 6px">${r.situacao}</span>
          </span>
        </div>
        <div class="doc-dl" aria-hidden="true">↓</div>
      </a>`).join('');
  }

  async function renderReunioesHome() {
    const el = document.getElementById('reunioes-lista');
    if (!el) return;
    const data = await CMJData.load('reunioes.json');
    if (!data) return;
    const proximas = data.filter(r => r.status === 'agendada').slice(0, 3);
    const meses = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'];
    el.className = 'meeting-list';
    el.innerHTML = proximas.map(r => {
      const [,m,d] = r.data.split('-');
      return `
        <div class="meeting-item">
          <div class="meeting-cal">
            <div class="meeting-mon">${meses[+m-1]}</div>
            <div class="meeting-day">${d}</div>
          </div>
          <div class="meeting-info">
            <span class="meeting-badge badge-${r.tipo === 'ordinaria' ? 'ord' : 'ext'}">
              ${r.tipo === 'ordinaria' ? 'Ordinária' : 'Extraordinária'}
            </span>
            <h4>${r.titulo}</h4>
            <p>${r.pauta}</p>
            <span class="meeting-where">📍 ${r.local} · ${r.hora}</span>
          </div>
        </div>`;
    }).join('');
  }

});

/* ============================================================
   EXTENSÕES v3.1 — Atas, Editais, Config dinâmica
   ============================================================ */

/* ── RENDERIZAR ATAS NA PÁGINA ─────────────────────────── */
async function renderAtasPage() {
  const el = document.getElementById('atas-lista');
  if (!el) return;
  const atas = await CMJData.load('atas.json');
  if (!atas || !atas.length) return;

  el.className = 'doc-list';
  el.innerHTML = atas.map(a => `
    <a href="${a.arquivo_pdf || '#'}" class="doc-item"
       ${a.arquivo_pdf ? 'download' : ''}
       data-categoria="${a.tipo} ${String(a.data).slice(0,4)}">
      <div class="doc-icon">PDF</div>
      <div class="doc-info">
        <strong>${a.titulo || 'Ata nº ' + a.numero}</strong>
        <span>Publicado em ${CMJData.fmtData(a.data)}
              · ${a.tipo === 'ordinaria' ? 'Reunião Ordinária' : 'Reunião Extraordinária'}
        </span>
      </div>
      <div class="doc-dl" aria-hidden="true">↓</div>
    </a>`).join('');
}

/* ── RENDERIZAR EDITAIS NA PÁGINA ──────────────────────── */
async function renderEditaisPage() {
  const abertos    = document.getElementById('editais-abertos');
  const encerrados = document.getElementById('editais-encerrados');
  if (!abertos && !encerrados) return;

  const editais = await CMJData.load('editais.json');
  if (!editais || !editais.length) return;

  const abertosData    = editais.filter(e => e.status === 'aberto');
  const encerradosData = editais.filter(e => e.status !== 'aberto');

  function renderLista(lista) {
    if (!lista.length) return '<p style="color:var(--n-400);font-size:var(--t-base);padding:var(--sp-4)">Nenhum edital no momento.</p>';
    return lista.map(e => `
      <a href="${e.arquivo_pdf || '#'}" class="doc-item"
         ${e.arquivo_pdf ? 'download' : ''}>
        <div class="doc-icon" style="background:var(--verde-lt);color:var(--verde-dk)">PDF</div>
        <div class="doc-info">
          <strong>Edital nº ${e.numero} — ${e.titulo}</strong>
          <span>Publicado em ${CMJData.fmtData(e.data_publicacao)}
                ${e.prazo ? ' · Prazo: ' + CMJData.fmtData(e.prazo) : ''}
                · <span class="tag tag-${e.status === 'aberto' ? 'green' : 'gray'}"
                        style="padding:1px 6px">${e.status}</span>
          </span>
        </div>
        <div class="doc-dl" aria-hidden="true">↓</div>
      </a>`).join('');
  }

  if (abertos)    { abertos.className    = 'doc-list'; abertos.innerHTML    = renderLista(abertosData); }
  if (encerrados) { encerrados.className = 'doc-list'; encerrados.innerHTML = renderLista(encerradosData); }
}

/* ── CARREGAR CONFIG DINÂMICA (telefone, email, aviso) ─── */
async function aplicarConfig() {
  const cfg = await CMJData.load('config.json');
  if (!cfg) return;

  /* Substituir placeholders de contato nos elementos da página */
  document.querySelectorAll('[data-config]').forEach(el => {
    const campo = el.dataset.config;
    if (cfg[campo]) el.textContent = cfg[campo];
  });

  /* Exibir aviso no topo se configurado */
  if (cfg.aviso_topo) {
    const avisoBanner = document.querySelector('.aviso-topo-dinamico');
    if (avisoBanner) {
      avisoBanner.textContent = cfg.aviso_topo;
      avisoBanner.style.display = '';
    }
  }

  /* Atualizar links de redes sociais */
  if (cfg.facebook) {
    document.querySelectorAll('a[aria-label="Facebook"]').forEach(a => {
      if (cfg.facebook.startsWith('http')) a.href = cfg.facebook;
    });
  }
  if (cfg.instagram) {
    document.querySelectorAll('a[aria-label="Instagram"]').forEach(a => {
      if (cfg.instagram.startsWith('http')) a.href = cfg.instagram;
    });
  }
  if (cfg.youtube) {
    document.querySelectorAll('a[aria-label="YouTube"]').forEach(a => {
      if (cfg.youtube.startsWith('http')) a.href = cfg.youtube;
    });
  }
}

/* ── RENDERIZAR CONSELHEIROS DINÂMICOS ──────────────────── */
async function renderConselheirosDinamico() {
  const gridPP  = document.getElementById('grid-poder-publico');
  const gridSC  = document.getElementById('grid-sociedade-civil');
  if (!gridPP && !gridSC) return;

  const data = await CMJData.load('conselheiros.json');
  if (!data || !data.conselheiros) return;

  function renderCard(c) {
    const isSup = c.tipo === 'suplente';
    const bgClass = c.segmento === 'sociedade-civil' ? 'verde' : '';
    return `
      <div class="c-card" data-categoria="${c.segmento} ${c.tipo}">
        <div class="c-avatar ${bgClass} ${isSup ? 'suplente' : ''}">${c.iniciais || '?'}</div>
        <h4>${c.nome}</h4>
        <div class="cargo">${c.cargo}</div>
        <span class="tag ${c.segmento === 'poder-publico' ? 'tag-blue' : 'tag-green'}"
              style="margin-top:var(--sp-2)">
          ${isSup ? 'Suplente' : 'Titular'}
        </span>
      </div>`;
  }

  const pp = data.conselheiros.filter(c => c.segmento === 'poder-publico');
  const sc = data.conselheiros.filter(c => c.segmento === 'sociedade-civil');

  if (gridPP) gridPP.innerHTML = pp.map(renderCard).join('');
  if (gridSC) gridSC.innerHTML = sc.map(renderCard).join('');
}

/* ── RENDERIZAR MESA DIRETORA DINÂMICA ──────────────────── */
async function renderMesaDiretoraDinamica() {
  const grid = document.getElementById('mesa-diretora-grid');
  if (!grid) return;

  const data = await CMJData.load('mesa_diretora.json');
  if (!data || !data.membros) return;

  grid.innerHTML = data.membros.map(m => `
    <div class="mesa-card">
      <div class="mesa-topo">
        <div class="mesa-foto" aria-hidden="true">👤</div>
        <h3>${m.nome}</h3>
        <span class="mesa-cargo">${m.cargo}</span>
      </div>
      <div class="mesa-body">
        <p>${m.descricao || ''}</p>
        <p class="seg"><strong>Segmento:</strong> ${m.segmento || ''}</p>
        ${m.email ? `<a href="mailto:${m.email}">✉ ${m.email}</a>` : ''}
      </div>
    </div>`).join('');
}

/* ── RENDERIZAR TODAS AS RESOLUÇÕES NA PÁGINA ───────────── */
async function renderResolucoesPage() {
  const tbody = document.getElementById('res-tbody');
  const total = document.getElementById('res-total');
  if (!tbody) return;

  const data = await CMJData.load('resolucoes.json');
  if (!data) return;

  window._todasResolucoes = data;

  if (total) total.textContent = `${data.length} resolução(ões) encontrada(s)`;
  tbody.innerHTML = data.map(r => `
    <tr data-ano="${r.ano}">
      <td><strong style="color:var(--gov-3)">Nº ${r.numero}</strong></td>
      <td>${r.ementa}</td>
      <td>${CMJData.fmtData(r.data)}</td>
      <td><span class="tag tag-${r.situacao === 'vigente' ? 'vigente' : 'historico'}">${r.situacao}</span></td>
      <td style="text-align:center">
        ${r.arquivo
          ? `<a href="${r.arquivo}" download class="btn btn-primary btn-sm">↓ PDF</a>`
          : '<span style="font-size:var(--t-xs);color:var(--n-400)">Em breve</span>'}
      </td>
    </tr>`).join('');
}

/* ── RENDERIZAR NOTÍCIAS NA PÁGINA DE NOTÍCIAS ──────────── */
async function renderNoticiasPage() {
  const grid = document.getElementById('not-grid');
  if (!grid) return;

  const data = await CMJData.load('noticias.json');
  if (!data) return;

  window._todasNoticias = data;
  grid.className = 'news-grid';
  grid.innerHTML = data.map(n => `
    <article class="news-card" data-categoria="${n.categoria}">
      <div class="news-img">
        ${n.imagem
          ? `<img src="${n.imagem}" alt="${n.titulo}" style="width:100%;height:100%;object-fit:cover">`
          : `<span class="news-img-icon" aria-hidden="true">${n.imagem_emoji || '📰'}</span>`}
        <span class="news-date-pill">📅 ${CMJData.fmtData(n.data)}</span>
      </div>
      <div class="news-body">
        <div style="display:flex;gap:6px;flex-wrap:wrap">
          <span class="tag ${CMJData.corCat(n.categoria)}">${CMJData.labelCat(n.categoria)}</span>
          ${n.destaque ? '<span class="tag tag-gold">⭐ Destaque</span>' : ''}
        </div>
        <h3><a href="#">${n.titulo}</a></h3>
        <p>${n.resumo}</p>
      </div>
      <div class="news-foot">
        <span class="news-foot-date">${CMJData.fmtData(n.data)}</span>
        <a href="#" class="read-more">Ler mais →</a>
      </div>
    </article>`).join('');
}

/* ── INICIALIZAR TUDO AO CARREGAR ───────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  aplicarConfig();
  renderAtasPage();
  renderEditaisPage();
  renderConselheirosDinamico();
  renderMesaDiretoraDinamica();
  renderResolucoesPage();
  renderNoticiasPage();
});
