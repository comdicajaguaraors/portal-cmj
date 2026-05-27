#!/usr/bin/env node
/* ============================================================
   CMJ Portal — build-data.js
   Lê os arquivos .md gerados pelo Decap CMS e regenera os
   arquivos JSON em /data/ que o frontend consome.

   USO:
     node build-data.js

   Execute este script sempre que o Decap CMS salvar conteúdo
   (ou configure como GitHub Action para rodar automaticamente).
   ============================================================ */

const fs   = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname);

/* ── Parser de frontmatter YAML simples ── */
function parseFrontmatter(text) {
  const match = text.match(/^---\s*\n([\s\S]*?)\n---/);
  if (!match) return { body: text };

  const yaml  = match[1];
  const body  = text.slice(match[0].length).trim();
  const data  = {};

  yaml.split('\n').forEach(line => {
    const colonIdx = line.indexOf(':');
    if (colonIdx === -1) return;
    const key   = line.slice(0, colonIdx).trim();
    let   value = line.slice(colonIdx + 1).trim();

    if ((value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }

    if      (value === 'true')  value = true;
    else if (value === 'false') value = false;
    else if (value === 'null' || value === '~') value = null;
    else if (!isNaN(value) && value !== '') value = Number(value);

    data[key] = value;
  });

  if (body) data.body = body;
  return data;
}

/* ── Ler todos os .md de uma pasta ── */
function lerColecao(pasta) {
  const dir = path.join(ROOT, pasta);
  if (!fs.existsSync(dir)) {
    console.warn(`  ⚠  Pasta não encontrada: ${pasta}`);
    return [];
  }
  const arquivos = fs.readdirSync(dir).filter(f => f.endsWith('.md'));
  return arquivos.map(arquivo => {
    const texto = fs.readFileSync(path.join(dir, arquivo), 'utf8');
    return parseFrontmatter(texto);
  });
}

/* ── Garantir que a pasta data/ existe ── */
const dataDir = path.join(ROOT, 'data');
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

/* ── NOTÍCIAS ── */
console.log('\n📰 Processando notícias…');
let noticias = lerColecao('_noticias');
noticias.sort((a, b) => (b.data || '').localeCompare(a.data || ''));
// Garantir IDs sequenciais se não definidos
noticias = noticias.map((n, i) => ({
  id:           n.id || (i + 1),
  titulo:       n.titulo || '',
  resumo:       n.resumo || '',
  categoria:    n.categoria || 'comunicado',
  data:         n.data ? String(n.data).split('T')[0] : '',
  destaque:     !!n.destaque,
  imagem:       n.imagem || null,
  imagem_emoji: n.imagem_emoji || '📋',
}));
fs.writeFileSync(path.join(dataDir, 'noticias.json'), JSON.stringify(noticias, null, 2));
console.log(`  ✅ ${noticias.length} notícias → data/noticias.json`);

/* ── RESOLUÇÕES ── */
console.log('\n📋 Processando resoluções…');
let resolucoes = lerColecao('_resolucoes');
resolucoes.sort((a, b) => (b.data || '').localeCompare(a.data || ''));
resolucoes = resolucoes.map(r => ({
  id:       r.id || 0,
  numero:   r.numero || '',
  ementa:   r.ementa || '',
  data:     r.data ? String(r.data).split('T')[0] : '',
  ano:      r.ano || new Date().getFullYear(),
  situacao: r.situacao || 'vigente',
  arquivo:  r.arquivo_pdf || r.arquivo || '',
}));
fs.writeFileSync(path.join(dataDir, 'resolucoes.json'), JSON.stringify(resolucoes, null, 2));
console.log(`  ✅ ${resolucoes.length} resoluções → data/resolucoes.json`);

/* ── REUNIÕES ── */
console.log('\n📅 Processando reuniões…');
let reunioes = lerColecao('_reunioes');
reunioes.sort((a, b) => (b.data || '').localeCompare(a.data || ''));
reunioes = reunioes.map((r, i) => ({
  id:     r.id || (i + 1),
  tipo:   r.tipo || 'ordinaria',
  titulo: r.titulo || '',
  data:   r.data ? String(r.data).split('T')[0] : '',
  hora:   r.hora || '19:00',
  local:  r.local || 'Câmara Municipal de Jaguarão',
  pauta:  r.pauta || '',
  status: r.status || 'agendada',
}));
fs.writeFileSync(path.join(dataDir, 'reunioes.json'), JSON.stringify(reunioes, null, 2));
console.log(`  ✅ ${reunioes.length} reuniões → data/reunioes.json`);

/* ── ATAS ── */
console.log('\n📄 Processando atas…');
let atas = lerColecao('_atas');
atas.sort((a, b) => (b.data || '').localeCompare(a.data || ''));
atas = atas.map((a, i) => ({
  id:          a.id || (i + 1),
  numero:      a.numero || '',
  titulo:      a.titulo || '',
  data:        a.data ? String(a.data).split('T')[0] : '',
  tipo:        a.tipo || 'ordinaria',
  status:      a.status || 'publicada',
  resumo:      a.resumo || '',
  arquivo_pdf: a.arquivo_pdf || '',
}));
fs.writeFileSync(path.join(dataDir, 'atas.json'), JSON.stringify(atas, null, 2));
console.log(`  ✅ ${atas.length} atas → data/atas.json`);

/* ── EDITAIS ── */
console.log('\n📢 Processando editais…');
let editais = lerColecao('_editais');
editais.sort((a, b) => (b.data_publicacao || '').localeCompare(a.data_publicacao || ''));
editais = editais.map((e, i) => ({
  id:              e.id || (i + 1),
  numero:          e.numero || '',
  titulo:          e.titulo || '',
  objeto:          e.objeto || '',
  data_publicacao: e.data_publicacao ? String(e.data_publicacao).split('T')[0] : '',
  prazo:           e.prazo ? String(e.prazo).split('T')[0] : '',
  status:          e.status || 'aberto',
  arquivo_pdf:     e.arquivo_pdf || '',
}));
fs.writeFileSync(path.join(dataDir, 'editais.json'), JSON.stringify(editais, null, 2));
console.log(`  ✅ ${editais.length} editais → data/editais.json`);

/* ── CONFIGURAÇÕES ── */
console.log('\n⚙  Processando configurações…');
const configFile = path.join(ROOT, '_data', 'config.json');
if (fs.existsSync(configFile)) {
  const cfg = JSON.parse(fs.readFileSync(configFile, 'utf8'));
  fs.writeFileSync(path.join(dataDir, 'config.json'), JSON.stringify(cfg, null, 2));
  console.log('  ✅ config.json copiado → data/config.json');
}

const mesaFile = path.join(ROOT, '_data', 'mesa_diretora.json');
if (fs.existsSync(mesaFile)) {
  const mesa = JSON.parse(fs.readFileSync(mesaFile, 'utf8'));
  fs.writeFileSync(path.join(dataDir, 'mesa_diretora.json'), JSON.stringify(mesa, null, 2));
  console.log('  ✅ mesa_diretora.json → data/mesa_diretora.json');
}

const conselheirosFile = path.join(ROOT, '_data', 'conselheiros.json');
if (fs.existsSync(conselheirosFile)) {
  const cons = JSON.parse(fs.readFileSync(conselheirosFile, 'utf8'));
  fs.writeFileSync(path.join(dataDir, 'conselheiros.json'), JSON.stringify(cons, null, 2));
  console.log('  ✅ conselheiros.json → data/conselheiros.json');
}

console.log('\n🎉 Build concluído! Arquivos JSON atualizados em /data/\n');
