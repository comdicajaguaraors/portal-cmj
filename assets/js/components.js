/* ============================================================
   CMJ Portal v3 — Componentes Dinâmicos (Header + Rodapé)
   ============================================================ */

const CMJ = {

  base: (function() {
    const p = window.location.pathname;
    if (p.includes('/admin/') || p.includes('/pages/')) return '../';
    return './';
  })(),

  /* ── SVG ICONS ──────────────────────────────────────── */
  icons: {
    facebook:  `<svg viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>`,
    instagram: `<svg viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>`,
    youtube:   `<svg viewBox="0 0 24 24"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="var(--gov-2)"/></svg>`,
    whatsapp:  `<svg viewBox="0 0 24 24"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>`,
    resolucoes:`<svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>`,
    atas:      `<svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>`,
    editais:   `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`,
    calendario:`<svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`,
    transp:    `<svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`,
    legislacao:`<svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
    ouvidoria: `<svg viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>`,
    contato:   `<svg viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.41 2 2 0 0 1 3.6 1.23h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.96a16 16 0 0 0 6 6l.92-.92a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.5 17z"/></svg>`,
    brasao:    `<svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
    dash:      `<svg viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>`,
    news:      `<svg viewBox="0 0 24 24"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>`,
    settings:  `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>`,
  },

  svg(name, extraStyle) {
    const s = this.icons[name] || '';
    if (!s) return '';
    const style = extraStyle ? ` style="${extraStyle}"` : '';
    return s.replace('<svg ', `<svg fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"${style} `);
  },

  /* ── HEADER ────────────────────────────────────────── */
  renderHeader() {
    const b = this.base;
    const navItems = [
      { label: 'Início', href: b + 'index.html' },
      { label: 'Institucional', href: '#', sub: [
        { label: 'Quem Somos',     href: b + 'pages/quem-somos.html'   },
        { label: 'Mesa Diretora',  href: b + 'pages/mesa-diretora.html'},
        { label: 'Conselheiros',   href: b + 'pages/conselheiros.html' },
        { label: 'Legislação',     href: b + 'pages/legislacao.html'   },
      ]},
      { label: 'Documentos', href: '#', sub: [
        { label: 'Resoluções e Deliberações', href: b + 'pages/resolucoes.html'},
        { label: 'Atas das Reuniões',         href: b + 'pages/atas.html'      },
        { label: 'Editais',                   href: b + 'pages/editais.html'   },
      ]},
      { label: 'Notícias',      href: b + 'pages/noticias.html'     },
      { label: 'Calendário',    href: b + 'pages/calendario.html'   },
      { label: 'Transparência', href: b + 'pages/transparencia.html'},
      { label: 'Ouvidoria',     href: b + 'pages/ouvidoria.html'    },
      { label: 'Contato',       href: b + 'pages/contato.html'      },
    ];

    const navHtml = navItems.map(item => {
      if (item.sub) {
        const subs = item.sub.map(s =>
          `<a href="${s.href}">${s.label}</a>`
        ).join('');
        return `<li>
          <a href="${item.href}" aria-haspopup="true" aria-expanded="false">
            ${item.label} <span class="nav-chev" aria-hidden="true">▾</span>
          </a>
          <div class="nav-drop" role="menu">${subs}</div>
        </li>`;
      }
      return `<li><a href="${item.href}">${item.label}</a></li>`;
    }).join('');

    const html = `
    <div class="barra-gov" role="banner">
      <div class="container">
        <div class="barra-gov-inner">
          <div class="barra-gov-left">
            <a href="https://www.jaguarao.rs.gov.br" target="_blank" rel="noopener noreferrer">
              🏛 Prefeitura de Jaguarão
            </a>
            <span class="div" aria-hidden="true"></span>
            <a href="${b}pages/transparencia.html">Transparência</a>
            <span class="div" aria-hidden="true"></span>
            <a href="${b}pages/ouvidoria.html">Ouvidoria</a>
          </div>
          <div class="barra-gov-right">
            <div class="acess-ctrl" role="group" aria-label="Tamanho da fonte">
              <button data-acao="diminuir" title="Diminuir fonte" aria-label="Diminuir fonte">A-</button>
              <button data-acao="normal"   title="Tamanho normal" aria-label="Tamanho normal">A</button>
              <button data-acao="aumentar" title="Aumentar fonte" aria-label="Aumentar fonte">A+</button>
            </div>
            <nav class="social-bar" aria-label="Redes sociais">
              <a href="#" aria-label="Facebook"  title="Facebook" target="_blank" rel="noopener">${this.svg('facebook')}</a>
              <a href="#" aria-label="Instagram" title="Instagram" target="_blank" rel="noopener">${this.svg('instagram')}</a>
              <a href="#" aria-label="YouTube"   title="YouTube" target="_blank" rel="noopener">${this.svg('youtube')}</a>
            </nav>
          </div>
        </div>
      </div>
    </div>

    <header class="site-header" role="banner">
      <div class="container">
        <div class="header-inner">
          <a href="${b}index.html" class="logo-link" aria-label="Conselho Municipal de Jaguarão/RS — Página inicial">
            <div class="logo-mark" aria-hidden="true">${this.svg('brasao', 'width:28px;height:28px;color:var(--ouro-lt);stroke-width:1.5')}</div>
            <div class="logo-text">
              <span class="logo-sigla">CMJ</span>
              <span class="logo-org">Conselho Municipal</span>
              <span class="logo-cidade">Jaguarão / RS</span>
            </div>
            <div class="header-divider" aria-hidden="true"></div>
            <span class="header-slogan">Portal Oficial de Políticas Públicas</span>
          </a>

          <nav class="nav-wrap" id="navWrap" aria-label="Menu principal">
            <ul class="nav-list" role="menubar">
              ${navHtml}
            </ul>
          </nav>

          <div id="nav-overlay" aria-hidden="true"></div>

          <button class="menu-toggle" id="menuToggle"
                  aria-label="Abrir menu de navegação"
                  aria-expanded="false"
                  aria-controls="navWrap">
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>
    </header>`;

    const el = document.getElementById('site-header');
    if (el) el.innerHTML = html;
  },

  /* ── RODAPÉ ────────────────────────────────────────── */
  renderFooter() {
    const b = this.base;
    const html = `
    <footer class="footer" role="contentinfo">
      <div class="container">
        <div class="footer-grid">

          <div class="footer-brand">
            <a href="${b}index.html" class="logo-link" style="text-decoration:none" aria-label="Página inicial">
              <div class="logo-mark" aria-hidden="true"
                   style="width:44px;height:44px;font-size:1.2rem">
                ${this.svg('brasao','width:22px;height:22px;color:var(--ouro-lt);stroke-width:1.5')}
              </div>
              <div class="logo-text">
                <span class="logo-sigla" style="color:#fff">CMJ</span>
                <span class="logo-org">Conselho Municipal</span>
                <span class="logo-cidade">Jaguarão / RS</span>
              </div>
            </a>
            <p>Órgão colegiado deliberativo comprometido com a transparência,
               a participação social e a formulação de políticas públicas para
               o município de Jaguarão/RS.</p>
            <nav class="footer-social" aria-label="Redes sociais">
              <a href="#" aria-label="Facebook"  title="Facebook"  target="_blank" rel="noopener">${this.svg('facebook')}</a>
              <a href="#" aria-label="Instagram" title="Instagram" target="_blank" rel="noopener">${this.svg('instagram')}</a>
              <a href="#" aria-label="YouTube"   title="YouTube"   target="_blank" rel="noopener">${this.svg('youtube')}</a>
              <a href="#" aria-label="WhatsApp"  title="WhatsApp"  target="_blank" rel="noopener">${this.svg('whatsapp')}</a>
            </nav>
          </div>

          <div class="footer-col">
            <h4>Institucional</h4>
            <ul>
              <li><a href="${b}pages/quem-somos.html">Quem Somos</a></li>
              <li><a href="${b}pages/mesa-diretora.html">Mesa Diretora</a></li>
              <li><a href="${b}pages/conselheiros.html">Conselheiros</a></li>
              <li><a href="${b}pages/legislacao.html">Legislação</a></li>
              <li><a href="${b}pages/transparencia.html">Transparência</a></li>
            </ul>
          </div>

          <div class="footer-col">
            <h4>Documentos</h4>
            <ul>
              <li><a href="${b}pages/resolucoes.html">Resoluções</a></li>
              <li><a href="${b}pages/atas.html">Atas de Reuniões</a></li>
              <li><a href="${b}pages/editais.html">Editais</a></li>
              <li><a href="${b}pages/noticias.html">Notícias</a></li>
              <li><a href="${b}pages/calendario.html">Calendário</a></li>
            </ul>
          </div>

          <div class="footer-col">
            <h4>Contato</h4>
            <ul>
              <li><a href="tel:555332610000">📞 (53) 3261-XXXX</a></li>
              <li><a href="mailto:conselho@jaguarao.rs.gov.br">✉ conselho@jaguarao.rs.gov.br</a></li>
              <li><a href="${b}pages/ouvidoria.html">📬 Ouvidoria</a></li>
              <li><a href="${b}pages/contato.html">💬 Fale Conosco</a></li>
              <li><a href="${b}admin/index.html">🔐 Área Restrita</a></li>
            </ul>
          </div>

        </div>

        <div class="footer-base">
          <p>© ${new Date().getFullYear()} Conselho Municipal de Jaguarão/RS
             — Todos os direitos reservados</p>
          <p>Desenvolvido com HTML5 · CSS3 · JavaScript · JSON
             — GitHub Pages (hospedagem gratuita)</p>
          <span class="lgpd-pill">🔒 Dados protegidos pela LGPD</span>
        </div>
      </div>
    </footer>

    <button id="back-top" aria-label="Voltar ao topo da página" title="Voltar ao topo">↑</button>`;

    const el = document.getElementById('site-footer');
    if (el) el.innerHTML = html;
  },

  init() {
    this.renderHeader();
    this.renderFooter();
  }
};
