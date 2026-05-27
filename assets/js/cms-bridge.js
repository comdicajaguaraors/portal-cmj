/* ============================================================
   CMJ CMS BRIDGE v1.0
   Lê os arquivos gerados pelo Decap CMS (_noticias/, _resolucoes/, etc.)
   e popula as variáveis JavaScript para o frontend.

   COMO FUNCIONA:
   - O Decap CMS salva cada item como arquivo .md com frontmatter YAML
   - Este script lê todos esses arquivos via fetch e converte para JSON
   - O frontend usa esses dados normalmente

   USO: inclua este script nas páginas que exibem conteúdo dinâmico.
   ============================================================ */

const CMSBridge = {

  base: (function() {
    const p = window.location.pathname;
    if (p.includes('/pages/') || p.includes('/admin/')) return '../';
    return './';
  })(),

  /* Cache de sessão para evitar múltiplas requisições */
  _cache: {},

  /* ── Parsear frontmatter YAML simples ── */
  parseFrontmatter(text) {
    const match = text.match(/^---\s*\n([\s\S]*?)\n---/);
    if (!match) return { body: text };

    const yaml = match[1];
    const body = text.slice(match[0].length).trim();
    const data = {};

    // Parser YAML simples (suporta strings, números, booleans, datas)
    yaml.split('\n').forEach(line => {
      const colonIdx = line.indexOf(':');
      if (colonIdx === -1) return;
      const key   = line.slice(0, colonIdx).trim();
      let   value = line.slice(colonIdx + 1).trim();

      // Remover aspas
      if ((value.startsWith('"') && value.endsWith('"')) ||
          (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }

      // Converter tipos
      if (value === 'true')  value = true;
      else if (value === 'false') value = false;
      else if (value === 'null' || value === '~') value = null;
      else if (!isNaN(value) && value !== '') value = Number(value);

      data[key] = value;
    });

    if (body) data.body = body;
    return data;
  },

  /* ── Buscar lista de arquivos de uma collection ── */
  async fetchCollection(colecao) {
    const cacheKey = `cms-${colecao}`;
    if (this._cache[cacheKey]) return this._cache[cacheKey];

    try {
      /* Tenta carregar índice da coleção */
      const indexUrl = `${this.base}_${colecao}/index.json`;
      const res = await fetch(indexUrl);
      if (res.ok) {
        const data = await res.json();
        this._cache[cacheKey] = data;
        return data;
      }
    } catch(e) { /* fallback abaixo */ }

    /* Fallback: usar JSON original da pasta data/ */
    try {
      const dataUrl = `${this.base}data/${colecao}.json`;
      const res = await fetch(dataUrl);
      if (res.ok) {
        const data = await res.json();
        this._cache[cacheKey] = data;
        return data;
      }
    } catch(e) {
      console.warn(`[CMSBridge] Não foi possível carregar ${colecao}:`, e);
    }

    return [];
  },

  /* ── Carregar notícias ── */
  async noticias() {
    return this.fetchCollection('noticias');
  },

  /* ── Carregar resoluções ── */
  async resolucoes() {
    return this.fetchCollection('resolucoes');
  },

  /* ── Carregar reuniões ── */
  async reunioes() {
    return this.fetchCollection('reunioes');
  },

  /* ── Carregar atas ── */
  async atas() {
    return this.fetchCollection('atas');
  },

  /* ── Carregar editais ── */
  async editais() {
    return this.fetchCollection('editais');
  },

  /* ── Formatar data ── */
  fmtData(iso) {
    if (!iso) return '—';
    const d = String(iso).split('T')[0];
    const [y, m, day] = d.split('-');
    const meses = ['jan','fev','mar','abr','mai','jun',
                   'jul','ago','set','out','nov','dez'];
    return `${day}/${meses[+m - 1]}/${y}`;
  },

  fmtDataLonga(iso) {
    if (!iso) return '—';
    const d = String(iso).split('T')[0];
    return new Date(d + 'T12:00:00')
      .toLocaleDateString('pt-BR', { day:'2-digit', month:'long', year:'numeric' });
  }
};

/* Exportar globalmente */
window.CMSBridge = CMSBridge;
