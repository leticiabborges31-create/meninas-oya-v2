<template>
  <main class="home">

    <!-- HERO -->
    <section class="hero">
      <div class="hero-inner">
        <div class="hero-texto">
          <span class="hero-tag">Rede de Apoio e Empoderamento - RAE</span>
          <h1 class="hero-titulo">
            Inspire,<br />
            <em>Empodere</em><br />
            e Transforme
          </h1>
          <p class="hero-sub">
            O projeto Meninas Oyá incentiva meninas e mulheres nas áreas de
            Computação, Engenharia e Ciências Exatas.
          </p>
          <div class="hero-btns">
            <a href="#sobre" @click.prevent="rolar('sobre')" class="btn-primary">Conheça o projeto</a>
            <a href="#atividades" @click.prevent="rolar('atividades')" class="btn-outline">Ver atividades</a>
          </div>
        </div>
        <div class="hero-imagem">
          <div class="hero-img-wrap">
            <img
              src="https://raw.githubusercontent.com/leticiabborges31-create/-assets-images-/5455c9e515bc4ce5c6691d8819f0c0a789ff524b/assets/images/meninas_oya%20(1).svg"
              alt="Meninas Oyá"
            />
          </div>
          <div class="hero-badge">+50 mulheres impactadas</div>
        </div>
      </div>
      <div class="hero-linha"></div>
    </section>

    <!-- SOBRE -->
    <section id="sobre" class="sobre">
      <div class="sobre-inner">
        <div class="sobre-imagem">
          <div class="sobre-img-wrap">
            <img
              src="https://raw.githubusercontent.com/leticiabborges31-create/-assets-images-/5455c9e515bc4ce5c6691d8819f0c0a789ff524b/assets/images/meninas_oya%20(1).svg"
              alt="Sobre o projeto"
            />
          </div>
        </div>
        <div class="sobre-texto">
          <span class="secao-tag">Nossa missão</span>
          <h2 class="sobre-titulo">
            Uma presença forte para uma causa que importa.
          </h2>
          <p class="sobre-p">
            O projeto busca ampliar o acesso ao Ensino Superior, apoiar a permanência e
            estimular a ascensão de meninas e mulheres nas áreas de Ciências Exatas,
            Engenharias e Computação.
          </p>
          <blockquote class="sobre-quote">
            Constituir uma Rede de Apoio, Acolhimento e Empoderamento (RAAE), com
            abordagem multidisciplinar, que forneça suporte ao acesso ao Ensino Superior,
            permanência e ascensão de meninas e mulheres nas Ciências Exatas,
            Engenharias e Computação.
          </blockquote>
        </div>
      </div>
    </section>

    <!-- NÚMEROS -->
    <section class="numeros">
      <div class="numeros-inner">
        <div class="numero-item">
          <span class="numero-big">4</span>
          <span class="numero-label">Regiões do Brasil</span>
        </div>
        <div class="numero-divider"></div>
        <div class="numero-item">
          <span class="numero-big">8+</span>
          <span class="numero-label">Instituições parceiras</span>
        </div>
        <div class="numero-divider"></div>
        <div class="numero-item">
          <span class="numero-big">50+</span>
          <span class="numero-label">Mulheres impactadas</span>
        </div>
        <div class="numero-divider"></div>
        <div class="numero-item">
          <span class="numero-big">∞</span>
          <span class="numero-label">Potencial feminino</span>
        </div>
      </div>
    </section>

    <!-- ATIVIDADES -->
    <section id="atividades" class="atividades">
      <div class="atividades-header">
        <span class="secao-tag">O que fazemos</span>
        <h2 class="atividades-titulo">Atividades</h2>
      </div>

      <div class="carrossel" v-if="atividades.length > 0">
        <button class="btn-nav" @click="voltar" aria-label="Anterior">&#8592;</button>
        <div class="cards-wrap">
          <div
            class="card-ativ"
            v-for="(atividade, index) in atividadesVisiveis"
            :key="index"
            @click="abrirAtividade(atividade)"
          >
            <div class="card-num">{{ String(index + 1).padStart(2, '0') }}</div>
            <h3 class="card-titulo">{{ atividade.titulo }}</h3>
            <p class="card-desc">{{ truncar(atividade.descricao) }}</p>
            <span class="card-data">{{ atividade.data }}</span>
          </div>
        </div>
        <button class="btn-nav" @click="avancar" aria-label="Próximo">&#8594;</button>
      </div>

      <div v-else class="sem-ativ">
        <p>Nenhuma atividade cadastrada no momento.</p>
      </div>
    </section>

    <!-- REGIÕES -->
    <section id="regioes" class="regioes">
      <div class="regioes-header">
        <span class="secao-tag">Presença nacional</span>
        <h2 class="regioes-titulo">Quem lidera essa rede<br />em diferentes regiões</h2>
      </div>

      <div class="regioes-inner">
        <div class="mapa-wrap">
          <img
            src="https://raw.githubusercontent.com/leticiabborges31-create/-assets-images-/5455c9e515bc4ce5c6691d8819f0c0a789ff524b/assets/images/meninas_oya%20(1).svg"
            alt="Mapa do Brasil"
            class="mapa-img"
          />
        </div>

        <div class="estados-wrap">
          <div
            class="estado-card"
            v-for="est in estados"
            :key="est.chave"
            :class="{ aberto: estadosAbertos[est.chave] }"
          >
            <button class="estado-header" @click="toggleEstado(est.chave)">
              <span class="estado-nome">{{ est.nome }}</span>
              <span class="estado-icon">{{ estadosAbertos[est.chave] ? '−' : '+' }}</span>
            </button>
            <div class="estado-corpo" v-show="estadosAbertos[est.chave]">
              <p class="estado-uni">{{ est.universidades }}</p>
              <p class="estado-coord">{{ est.coordenadora }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FINANCIADORES -->
    <section class="financiadores">
      <div class="financiadores-inner">
        <h3 class="financiadores-titulo">Financiado por</h3>
        <div class="logos-financiadores">
          <div class="logo-item">
            <img 
              src="../assets/cnpq.png" 
              alt="CNPq - Conselho Nacional de Desenvolvimento Científico e Tecnológico"
              class="logo-financiador cnpq"
            />
          </div>
          <div class="logo-divider"></div>
          <div class="logo-item">
            <img 
              src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 100'%3E%3Crect fill='%23009600' width='50' height='100'/%3E%3Crect fill='%23FFFF00' x='50' width='50' height='100'/%3E%3Crect fill='%23003399' x='100' width='50' height='100'/%3E%3Crect fill='%23009600' x='150' width='50' height='100'/%3E%3C/svg%3E" 
              alt="Governo Federal do Brasil"
              class="logo-financiador gov"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- INSTITUIÇÕES PARTICIPANTES -->
    <section class="instituicoes" id="instituicoes">
      <div class="instituicoes-inner">
        <h2 class="instituicoes-titulo">Instituições Participantes</h2>
        <p class="instituicoes-sub">Escolas, universidades e institutos que integram o projeto</p>
        <div v-if="carregandoInstituicoes" class="inst-loading">Carregando...</div>
        <div v-else-if="instituicoes.length === 0" class="inst-vazio">Nenhuma instituição cadastrada ainda.</div>
        <div v-else class="inst-grid">
          <div v-for="inst in instituicoes" :key="inst.id" class="inst-card">
            <div class="inst-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="28" height="28">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                <polyline points="9 22 9 12 15 12 15 22"/>
              </svg>
            </div>
            <p class="inst-nome">{{ inst.nome }}</p>
            <span class="inst-tipo">{{ tipoLabel(inst.tipo) }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- RODAPÉ -->
    <footer class="rodape">
      <div class="rodape-inner">
        <div class="rodape-marca">
          <img src="@/assets/logo-oia.png" alt="Meninas Oyá" class="rodape-logo" />
          <div>
            <strong>Meninas Oyá</strong>
            <span>Rede de Apoio e Empoderamento - RAE</span>
          </div>
        </div>
        <div class="rodape-info">
          <span class="rodape-local">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            UFMA – Centro de Ciências Exatas e Tecnologia (CCET), São Luís – MA
          </span>
          <span class="rodape-email">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            contato@meninasoya.ufma.br
          </span>
          <!-- TODO: substituir # pelo link real do Instagram -->
          <a href="#" target="_blank" rel="noopener" class="rodape-instagram" aria-label="Instagram Meninas Oyá">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/></svg>
            @meninasoya
          </a>
        </div>

        <!-- Logos das realizadoras e financiadoras -->
        <div class="rodape-logos">
          <!-- TODO: adicionar logos das instituições realizadoras (ex: UFMA, IFMA) -->
          <!-- Exemplo: <img src="" alt="Nome da Instituição" class="rodape-logo-inst" /> -->

          <!-- Logo CNPq -->
          <img
            src="../assets/cnpq.png"
            alt="CNPq"
            class="rodape-logo-inst"
          />

          <!-- TODO: substituir src pela URL correta do logo MCTI -->
          <!-- <img src="" alt="MCTI - Ministério da Ciência, Tecnologia e Inovação" class="rodape-logo-inst" /> -->
        </div>

        <p class="rodape-copy">© 2025 Meninas Oyá · Todos os direitos reservados</p>
      </div>
    </footer>
  </main>
</template>

<script>
export default {
  data() {
    return {
      atividades: [],
      indiceAtual: 0,
      instituicoes: [],
      carregandoInstituicoes: false,
      estadosAbertos: {
        maranhao: false,
        bahia: false,
        sul: false,
        sudeste: false
      },
      estados: [
        { chave: 'maranhao', nome: 'Maranhão', universidades: 'UFMA / IFMA', coordenadora: 'Coord. Regina Célia de Sousa' },
        { chave: 'bahia', nome: 'Bahia', universidades: 'IFBA / UFBA', coordenadora: 'Coord. Isabelle Priscila Carneiro de Lima' },
        { chave: 'sul', nome: 'Rio Grande do Sul', universidades: 'UFSM / UFRGS', coordenadora: 'Coord. Inés Prieto Schmidt Sauerwein' },
        { chave: 'sudeste', nome: 'São Paulo', universidades: 'UFABC / UNILINS', coordenadora: 'Coord. Graciella Watanabe' }
      ]
    };
  },

  computed: {
    atividadesVisiveis() {
      if (this.atividades.length === 0) return [];
      if (this.atividades.length < 3) return this.atividades;
      return [
        this.atividades[this.indiceAtual],
        this.atividades[(this.indiceAtual + 1) % this.atividades.length],
        this.atividades[(this.indiceAtual + 2) % this.atividades.length]
      ];
    }
  },

  mounted() {
    this.carregarAtividades();
    this.carregarInstituicoes();
  },

  methods: {
    carregarAtividades() {
      fetch("https://meninas-oya-v2.onrender.com/atividades")
        .then(res => res.json())
        .then(dados => {
          this.atividades = dados.sort((a, b) => new Date(b.data) - new Date(a.data));
        })
        .catch(err => console.error("Erro ao buscar atividades:", err));
    },

    carregarInstituicoes() {
      this.carregandoInstituicoes = true;
      fetch("https://meninas-oya-v2.onrender.com/api/escolas/simples")
        .then(res => res.json())
        .then(dados => { this.instituicoes = Array.isArray(dados) ? dados : []; })
        .catch(err => console.error("Erro ao buscar instituições:", err))
        .finally(() => { this.carregandoInstituicoes = false; });
    },

    tipoLabel(tipo) {
      const map = {
        ESCOLA_PUBLICA: 'Escola Pública',
        ESCOLA_PRIVADA: 'Escola Privada',
        UNIVERSIDADE: 'Universidade',
        INSTITUTO: 'Instituto Federal'
      };
      return map[tipo] || tipo || '';
    },

    abrirAtividade(atividade) {
      this.$router.push(`/atividade/${atividade.id}`);
    },

    truncar(texto) {
      if (!texto) return ''
      const limpo = texto.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').trim()
      return limpo.length > 120 ? limpo.slice(0, 120) + '...' : limpo
    },

    avancar() {
      this.indiceAtual = (this.indiceAtual + 1) % this.atividades.length;
    },

    voltar() {
      this.indiceAtual = (this.indiceAtual - 1 + this.atividades.length) % this.atividades.length;
    },

    toggleEstado(estado) {
      this.estadosAbertos[estado] = !this.estadosAbertos[estado];
    },

    rolar(id) {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
};
</script>

<style scoped>
/* ── BASE ────────────────────────────────────────────── */
.home {
  font-family: var(--font-body);
  background: var(--oya-bg);
  color: var(--oya-char);
  overflow-x: hidden;
}

/* ── HERO ────────────────────────────────────────────── */
.hero {
  background-color: var(--oya-forest);
  height: calc(100vh - 3.5rem);
  min-height: 540px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse 60% 80% at 80% 50%, rgba(217, 79, 30, 0.18) 0%, transparent 70%),
    radial-gradient(ellipse 40% 60% at 10% 80%, rgba(107, 170, 138, 0.15) 0%, transparent 60%);
  pointer-events: none;
  z-index: 0;
}

.hero-inner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem 4rem;
  position: relative;
  z-index: 1;
}

.hero-tag {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.7rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  font-weight: 600;
  color: var(--oya-glow);
  background: rgba(255, 133, 85, 0.12);
  padding: 0.3rem 0.9rem;
  border-radius: var(--radius-pill);
  margin-bottom: 1.5rem;
}

.hero-titulo {
  font-family: var(--font-display);
  font-size: clamp(2.4rem, 5vw, 4.5rem);
  line-height: 1.05;
  color: #fff;
  margin: 0 0 1.2rem;
}

.hero-titulo em {
  font-style: italic;
  color: var(--oya-glow);
}

.hero-sub {
  font-size: 1rem;
  color: var(--oya-fern);
  line-height: 1.7;
  max-width: 440px;
  margin-bottom: 2rem;
}

.hero-btns {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.hero-imagem {
  position: relative;
  display: flex;
  justify-content: center;
}

.hero-img-wrap {
  width: 100%;
  max-width: 460px;
  aspect-ratio: 1;
  border-radius: var(--radius-lg);
  overflow: hidden;
  border: 0.5px solid rgba(107, 170, 138, 0.3);
  background: rgba(44, 82, 64, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero-img-wrap img {
  width: 85%;
  height: 85%;
  object-fit: contain;
}

.hero-badge {
  position: absolute;
  bottom: -1rem;
  left: -1rem;
  background: var(--oya-ember);
  color: #fff;
  padding: 0.75rem 1.2rem;
  border-radius: var(--radius-md);
  font-size: 0.8rem;
  font-weight: 500;
  letter-spacing: 0.02em;
  box-shadow: 0 8px 24px rgba(217, 79, 30, 0.35);
}

.hero-linha {
  height: 3px;
  background: linear-gradient(90deg, var(--oya-ember) 0%, var(--oya-fern) 100%);
}

/* ── SOBRE ────────────────────────────────────────────── */
.sobre {
  background: var(--oya-bg);
  padding: 7rem 4rem;
}

.sobre-inner {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5rem;
  align-items: center;
}

.sobre-img-wrap {
  border-radius: var(--radius-lg);
  overflow: hidden;
  background: rgba(168, 213, 192, 0.15);
  border: 0.5px solid var(--oya-fog);
  aspect-ratio: 4/5;
  display: flex;
  align-items: center;
  justify-content: center;
}

.sobre-img-wrap img {
  width: 85%;
  object-fit: contain;
}

.sobre-titulo {
  font-family: var(--font-display);
  font-size: clamp(1.9rem, 3.5vw, 2.8rem);
  line-height: 1.2;
  color: var(--oya-forest);
  margin: 0 0 1.5rem;
}

.sobre-p {
  font-size: 1rem;
  line-height: 1.8;
  color: var(--oya-stone);
  margin-bottom: 1.5rem;
}

.sobre-quote {
  border-left: 3px solid var(--oya-ember);
  padding: 1rem 1.5rem;
  margin: 0;
  background: var(--oya-sand);
  border-radius: 0 var(--radius-md) var(--radius-md) 0;
  font-size: 0.95rem;
  line-height: 1.75;
  color: var(--oya-stone);
  font-style: italic;
}

/* ── NÚMEROS ─────────────────────────────────────────── */
.numeros {
  background: var(--oya-sage);
  padding: 4rem;
}

.numeros-inner {
  max-width: 1100px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  flex-wrap: wrap;
}

.numero-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.4rem;
  flex: 1;
  min-width: 120px;
}

.numero-big {
  font-family: var(--font-display);
  font-size: clamp(2.5rem, 5vw, 4rem);
  color: var(--oya-warm);
  line-height: 1;
}

.numero-label {
  font-size: 0.7rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  font-weight: 500;
  color: var(--oya-mint);
  text-align: center;
}

.numero-divider {
  width: 0.5px;
  height: 60px;
  background: rgba(168, 213, 192, 0.25);
  flex-shrink: 0;
}

/* ── ATIVIDADES ──────────────────────────────────────── */
.atividades {
  background: rgba(168, 213, 192, 0.1);
  padding: 7rem 4rem;
}

.atividades-header {
  max-width: 1200px;
  margin: 0 auto 3.5rem;
}

.atividades-titulo {
  font-family: var(--font-display);
  font-size: clamp(2rem, 4vw, 3.2rem);
  color: var(--oya-forest);
  margin: 0;
  line-height: 1.15;
}

.carrossel {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.btn-nav {
  background: var(--oya-forest);
  color: var(--oya-mint);
  border: none;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  font-size: 1.2rem;
  cursor: pointer;
  flex-shrink: 0;
  transition: background 0.2s, transform 0.2s;
}

.btn-nav:hover {
  background: var(--oya-ember);
  transform: scale(1.08);
  color: #fff;
}

.cards-wrap {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  flex: 1;
}

.card-ativ {
  background: #fff;
  border: 0.5px solid var(--oya-fog);
  border-radius: var(--radius-lg);
  padding: 2rem;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.card-ativ:hover {
  transform: translateY(-4px);
  box-shadow: 0 16px 40px rgba(26, 58, 42, 0.1);
  border-color: var(--oya-mist);
}

.card-num {
  font-size: 0.7rem;
  color: var(--oya-ember);
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.card-titulo {
  font-family: var(--font-display);
  font-size: 1.05rem;
  color: var(--oya-forest);
  margin: 0;
  line-height: 1.35;
}

.card-desc {
  font-size: 0.9rem;
  color: var(--oya-stone);
  line-height: 1.65;
  margin: 0;
  flex: 1;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-data {
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--oya-ember);
  letter-spacing: 0.04em;
}

.sem-ativ {
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
  color: var(--oya-steel);
  font-style: italic;
  padding: 3rem;
}

/* ── REGIÕES ──────────────────────────────────────────── */
.regioes {
  background: var(--oya-bg);
  padding: 7rem 4rem;
}

.regioes-header {
  max-width: 1200px;
  margin: 0 auto 3.5rem;
}

.regioes-titulo {
  font-family: var(--font-display);
  font-size: clamp(2rem, 4vw, 3.2rem);
  color: var(--oya-forest);
  margin: 0;
  line-height: 1.2;
}

.regioes-inner {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5rem;
  align-items: start;
}

.mapa-wrap {
  border-radius: var(--radius-lg);
  overflow: hidden;
  background: rgba(168, 213, 192, 0.12);
  border: 0.5px solid var(--oya-fog);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.mapa-img {
  width: 100%;
  max-width: 420px;
  object-fit: contain;
}

.estados-wrap {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.estado-card {
  border: 0.5px solid var(--oya-fog);
  border-radius: var(--radius-md);
  overflow: hidden;
  transition: border-color 0.2s;
}

.estado-card.aberto {
  border-color: var(--oya-mist);
}

.estado-header {
  width: 100%;
  background: #fff;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.1rem 1.4rem;
  text-align: left;
  transition: background 0.15s;
}

.estado-header:hover {
  background: rgba(168, 213, 192, 0.1);
}

.estado-card.aberto .estado-header {
  background: var(--oya-sage);
}

.estado-nome {
  font-size: 0.95rem;
  font-weight: 500;
  color: var(--oya-forest);
}

.estado-card.aberto .estado-nome {
  color: var(--oya-mint);
}

.estado-icon {
  font-size: 1.4rem;
  color: var(--oya-ember);
  font-weight: 300;
  line-height: 1;
}

.estado-corpo {
  padding: 1.1rem 1.4rem;
  background: var(--oya-sand);
  border-top: 0.5px solid var(--oya-fog);
}

.estado-uni {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--oya-forest);
  margin: 0 0 0.4rem;
}

.estado-coord {
  font-size: 0.82rem;
  color: var(--oya-ember);
  font-weight: 500;
  margin: 0;
}

/* ── FINANCIADORES ──────────────────────────────────── */
.financiadores {
  background: var(--oya-sand);
  padding: 5rem 4rem;
  border-top: 0.5px solid var(--oya-fog);
}

.financiadores-inner {
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
}

.financiadores-titulo {
  font-family: var(--font-display);
  font-size: 1.5rem;
  color: var(--oya-forest);
  margin: 0 0 2.5rem;
}

.logos-financiadores {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4rem;
  flex-wrap: wrap;
}

.logo-item {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100px;
}

.logo-divider {
  width: 0.5px;
  height: 80px;
  background: var(--oya-fog);
}

.logo-financiador {
  max-width: 180px;
  max-height: 100px;
  height: auto;
  object-fit: contain;
  transition: transform 0.3s;
}

.logo-financiador:hover { transform: scale(1.05); }

/* ── RODAPÉ ──────────────────────────────────────────── */
.rodape {
  background: var(--oya-deep);
  padding: 3rem 4rem;
}

.rodape-inner {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
  flex-wrap: wrap;
}

.rodape-marca {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.rodape-logo {
  width: 2.75rem;
  height: 2.75rem;
  object-fit: contain;
  border-radius: var(--radius-sm);
  background: #fff;
  padding: 2px;
}

.rodape-marca strong { display: block; font-size: 0.9rem; color: var(--oya-cream); font-weight: 500; }
.rodape-marca span  { font-size: 0.75rem; color: var(--oya-fern); display: block; }
.rodape-copy { font-size: 0.78rem; color: var(--oya-steel); }

.rodape-info {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.rodape-local,
.rodape-email {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.8rem;
  color: var(--oya-fern);
}

.rodape-email a {
  color: var(--oya-fern);
  text-decoration: none;
}
.rodape-email a:hover { text-decoration: underline; }

/* ── RESPONSIVO ──────────────────────────────────────── */
@media (max-width: 900px) {
  .hero-inner,
  .sobre-inner,
  .regioes-inner {
    grid-template-columns: 1fr;
    gap: 3rem;
    padding: 4rem 1.5rem;
  }

  .hero { min-height: auto; }
  .hero-imagem { order: -1; }
  .hero-img-wrap { max-width: 300px; margin: 0 auto; }

  .sobre,
  .atividades,
  .regioes,
  .financiadores { padding: 4rem 1.5rem; }

  .numeros { padding: 3rem 1.5rem; }
  .numeros-inner { justify-content: center; }
  .numero-divider { display: none; }

  .cards-wrap { grid-template-columns: 1fr; }
  .carrossel { flex-direction: column; }

  .logos-financiadores { gap: 2rem; }
  .logo-divider { display: none; }
  .logo-financiador { max-width: 140px; max-height: 80px; }

  .rodape { padding: 2.5rem 1.5rem; }
  .rodape-inner { flex-direction: column; text-align: center; }
}

/* ── HERO ────────────────────────────────────────────── */
.hero {
  background-color: var(--oya-forest) !important;
  height: calc(100vh - 3.5rem);
  min-height: 540px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse 60% 80% at 80% 50%, rgba(217, 95, 28, 0.2) 0%, transparent 70%),
    radial-gradient(ellipse 40% 60% at 10% 80%, rgba(74, 138, 66, 0.2) 0%, transparent 60%);
  pointer-events: none;
  z-index: 0;
}

.hero-inner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem 4rem;
  position: relative;
  z-index: 1;
}

.hero-tag {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.72rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  font-weight: 600;
  color: var(--oya-flame);
  background: rgba(217, 79, 30, 0.1);
  padding: 0.3rem 0.85rem;
  border-radius: var(--radius-pill);
  margin-bottom: 1.5rem;
}

.hero-titulo {
  font-size: clamp(2.4rem, 5vw, 4.5rem);
  font-weight: 800;
  line-height: 1.05;
  color: var(--oya-cream) !important;
  margin: 0 0 1.2rem;
  letter-spacing: -0.03em;
}

.hero-titulo em {
  font-style: italic;
  color: var(--oya-flame);
}

.hero-sub {
  font-size: 1rem;
  color: rgba(240, 237, 232, 0.72) !important;
  line-height: 1.7;
  max-width: 440px;
  margin-bottom: 2rem;
  font-weight: 400;
}

.hero-btns {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.btn-primary {
  background: var(--oya-ember);
  color: #fff !important;
  padding: 0.85rem 1.75rem;
  border-radius: var(--radius-pill);
  text-decoration: none;
  font-size: 0.875rem;
  letter-spacing: 0.02em;
  font-weight: 500;
  transition: background 0.2s, transform 0.2s, box-shadow 0.2s;
}

.btn-primary:hover {
  background: var(--oya-flame);
  transform: translateY(-2px);
  box-shadow: 0 10px 28px rgba(217, 79, 30, 0.28);
}

.btn-outline {
  border: 1.5px solid rgba(240, 237, 232, 0.35);
  color: var(--oya-cream) !important;
  padding: 0.85rem 1.75rem;
  border-radius: 999px;
  text-decoration: none;
  font-size: 0.875rem;
  font-weight: 600;
  transition: border-color 0.2s, background 0.2s;
}

.btn-outline:hover {
  border-color: rgba(240, 237, 232, 0.65);
  background: rgba(240, 237, 232, 0.08);
}

.hero-imagem {
  position: relative;
  display: flex;
  justify-content: center;
}

.hero-img-wrap {
  width: 100%;
  max-width: 460px;
  aspect-ratio: 1;
  border-radius: 2rem;
  overflow: hidden;
  border: 0.5px solid rgba(217, 79, 30, 0.25);
  background: rgba(74, 122, 98, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero-img-wrap img {
  width: 85%;
  height: 85%;
  object-fit: contain;
}

.hero-badge {
  position: absolute;
  bottom: -1rem;
  left: -1rem;
  background: var(--oya-ember);
  color: #fff !important;
  padding: 0.75rem 1.2rem;
  border-radius: 1rem;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.02em;
  box-shadow: 0 8px 24px rgba(217, 79, 30, 0.35);
}

.hero-linha {
  height: 4px;
  background: linear-gradient(90deg, var(--oya-ember) 0%, var(--oya-fern) 100%);
}

/* ── SOBRE ────────────────────────────────────────────── */
.sobre {
  background: var(--oya-bg);
  padding: 7rem 4rem;
}

.sobre-inner {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5rem;
  align-items: center;
}

.sobre-img-wrap {
  border-radius: var(--radius-lg);
  overflow: hidden;
  background: var(--oya-cream);
  border: 0.5px solid var(--oya-fog);
  aspect-ratio: 4/5;
  display: flex;
  align-items: center;
  justify-content: center;
}

.sobre-img-wrap img {
  width: 85%;
  object-fit: contain;
}

.secao-tag {
  display: inline-block;
  font-size: 0.72rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  font-weight: 500;
  color: var(--oya-ember);
  background: rgba(217, 79, 30, 0.08);
  padding: 0.28rem 0.75rem;
  border-radius: var(--radius-pill);
  margin-bottom: 1.2rem;
}

.sobre-titulo {
  font-family: var(--font-display);
  font-size: clamp(1.9rem, 3.5vw, 2.8rem);
  line-height: 1.2;
  color: var(--oya-forest);
  margin: 0 0 1.5rem;
  letter-spacing: -0.025em;
}

.sobre-p {
  font-size: 1rem;
  line-height: 1.8;
  color: var(--oya-stone);
  margin-bottom: 1.5rem;
}

.sobre-quote {
  border-left: 3px solid var(--oya-ember);
  padding: 1rem 1.5rem;
  margin: 0;
  background: var(--oya-sand);
  border-radius: 0 var(--radius-md) var(--radius-md) 0;
  font-size: 1rem;
  line-height: 1.75;
  color: var(--oya-char);
  font-style: italic;
}

/* ── NÚMEROS ─────────────────────────────────────────── */
.numeros {
  background: var(--oya-sage);
  padding: 4rem;
}

.numeros-inner {
  max-width: 1100px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  flex-wrap: wrap;
}

.numero-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.4rem;
  flex: 1;
  min-width: 120px;
}

.numero-big {
  font-family: var(--font-display);
  font-size: clamp(2.5rem, 5vw, 4rem);
  color: var(--oya-warm);
  line-height: 1;
  letter-spacing: -0.03em;
}

.numero-label {
  font-size: 0.72rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  font-weight: 500;
  color: rgba(240, 237, 232, 0.6);
  text-align: center;
}

.numero-divider {
  width: 1px;
  height: 60px;
  background: rgba(240, 237, 232, 0.18);
  flex-shrink: 0;
}

/* ── ATIVIDADES ──────────────────────────────────────── */
.atividades {
  background: var(--oya-cream);
  padding: 7rem 4rem;
}

.atividades-header {
  max-width: 1200px;
  margin: 0 auto 3.5rem;
}

.atividades-titulo {
  font-family: var(--font-display);
  font-size: clamp(2rem, 4vw, 3.2rem);
  color: var(--oya-forest);
  margin: 0;
  letter-spacing: -0.03em;
}

.carrossel {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.btn-nav {
  background: var(--oya-sage);
  color: #fff;
  border: none;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  font-size: 1.2rem;
  cursor: pointer;
  flex-shrink: 0;
  transition: background 0.2s, transform 0.2s;
}

.btn-nav:hover {
  background: var(--oya-ember);
  transform: scale(1.08);
}

.cards-wrap {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  flex: 1;
}

.card-ativ {
  background: #fff;
  border: 0.5px solid var(--oya-fog);
  border-radius: var(--radius-lg);
  padding: 2rem;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.card-ativ:hover {
  transform: translateY(-4px);
  box-shadow: 0 16px 40px rgba(26, 58, 42, 0.1);
  border-color: var(--oya-mist);
}

.card-num {
  font-size: 0.72rem;
  color: var(--oya-ember);
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.card-titulo {
  font-family: var(--font-display);
  font-size: 1.05rem;
  color: var(--oya-forest);
  margin: 0;
  line-height: 1.35;
}

.card-desc {
  font-size: 0.9rem;
  color: var(--oya-stone);
  line-height: 1.65;
  margin: 0;
  flex: 1;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-data {
  font-size: 0.78rem;
  font-weight: 500;
  color: var(--oya-ember);
  letter-spacing: 0.04em;
}

.sem-ativ {
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
  color: var(--oya-stone);
  font-style: italic;
  padding: 3rem;
}

/* ── REGIÕES ──────────────────────────────────────────── */
.regioes {
  background: var(--oya-bg);
  padding: 7rem 4rem;
}

.regioes-header {
  max-width: 1200px;
  margin: 0 auto 3.5rem;
}

.regioes-titulo {
  font-family: var(--font-display);
  font-size: clamp(2rem, 4vw, 3.2rem);
  color: var(--oya-forest);
  margin: 0;
  letter-spacing: -0.03em;
  line-height: 1.2;
}

.regioes-inner {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5rem;
  align-items: start;
}

.mapa-wrap {
  border-radius: var(--radius-lg);
  overflow: hidden;
  background: var(--oya-cream);
  border: 0.5px solid var(--oya-fog);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.mapa-img {
  width: 100%;
  max-width: 420px;
  object-fit: contain;
}

.estados-wrap {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.estado-card {
  border: 0.5px solid var(--oya-fog);
  border-radius: var(--radius-md);
  overflow: hidden;
  transition: border-color 0.2s;
}

.estado-card.aberto {
  border-color: var(--oya-mist);
}

.estado-header {
  width: 100%;
  background: var(--oya-bg);
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.2rem 1.5rem;
  text-align: left;
  transition: background 0.15s;
  font-family: var(--font-body);
}

.estado-header:hover {
  background: var(--oya-cream);
}

.estado-card.aberto .estado-header {
  background: var(--oya-sage);
}

.estado-nome {
  font-size: 0.95rem;
  font-weight: 500;
  color: var(--oya-forest);
}

.estado-card.aberto .estado-nome {
  color: var(--oya-cream) !important;
}

.estado-icon {
  font-size: 1.35rem;
  color: var(--oya-ember);
  font-weight: 300;
  line-height: 1;
}

.estado-corpo {
  padding: 1.2rem 1.5rem;
  background: var(--oya-sand);
  border-top: 0.5px solid rgba(217, 79, 30, 0.12);
}

.estado-uni {
  font-family: var(--font-display);
  font-size: 0.95rem;
  color: var(--oya-forest);
  margin: 0 0 0.35rem;
}

.estado-coord {
  font-size: 0.82rem;
  color: var(--oya-ember);
  font-weight: 500;
  margin: 0;
}

/* ── FINANCIADORES ──────────────────────────────────── */
.financiadores {
  background: var(--oya-sand);
  padding: 5rem 4rem;
  border-top: 0.5px solid var(--oya-fog);
}

.financiadores-inner {
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
}

.financiadores-titulo {
  font-family: var(--font-display);
  font-size: 1.5rem;
  color: var(--oya-forest);
  margin: 0 0 2.5rem;
  letter-spacing: -0.02em;
}

.logos-financiadores {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4rem;
  flex-wrap: wrap;
}

.logo-item {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100px;
}

.logo-divider {
  width: 1px;
  height: 80px;
  background: var(--oya-fog);
}

.logo-financiador {
  max-width: 180px;
  max-height: 100px;
  height: auto;
  object-fit: contain;
  transition: transform 0.3s, filter 0.3s;
}

.logo-financiador:hover {
  transform: scale(1.05);
}

/* ── RODAPÉ ──────────────────────────────────────────── */
.rodape {
  background: var(--oya-deep);
  padding: 3rem 4rem;
}

.rodape-inner {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
  flex-wrap: wrap;
}

.rodape-marca {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.rodape-mo {
  display: grid;
  place-items: center;
  width: 2.75rem;
  height: 2.75rem;
  border-radius: var(--radius-sm);
  background: var(--oya-ember);
  color: #fff;
  font-weight: 600;
  font-size: 0.9rem;
  letter-spacing: 0.04em;
}

.rodape-marca strong {
  display: block;
  font-size: 0.95rem;
  color: var(--oya-cream);
}

.rodape-marca span {
  font-size: 0.78rem;
  color: rgba(240, 237, 232, 0.5);
}

.rodape-copy {
  font-size: 0.75rem;
  font-weight: 400;
  color: rgba(240, 237, 232, 0.38);
  letter-spacing: 0.03em;
  margin: 0;
}

/* ── RESPONSIVO ──────────────────────────────────────── */
@media (max-width: 900px) {
  .hero-inner,
  .sobre-inner,
  .regioes-inner {
    grid-template-columns: 1fr;
    gap: 3rem;
    padding: 4rem 1.5rem;
  }

  .hero { min-height: auto; }
  .hero-imagem { order: -1; }
  .hero-img-wrap { max-width: 300px; margin: 0 auto; }

  .sobre,
  .atividades,
  .regioes,
  .financiadores { padding: 4rem 1.5rem; }

  .numeros { padding: 3rem 1.5rem; }
  .numeros-inner { justify-content: center; }
  .numero-divider { display: none; }

  .cards-wrap { grid-template-columns: 1fr; }
  .carrossel { flex-direction: column; }

  .logos-financiadores { gap: 2rem; }
  
  .logo-divider {
    display: none;
  }
  
  .logo-financiador {
    max-width: 140px;
    max-height: 80px;
  }

  .rodape { padding: 2.5rem 1.5rem; }
  .rodape-inner { flex-direction: column; text-align: center; }
}

.rodape-instagram {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.82rem;
  color: var(--oya-steel);
  text-decoration: none;
  transition: color 0.15s;
}
.rodape-instagram:hover { color: var(--oya-ember); }

.rodape-logos {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  flex-wrap: wrap;
  margin-top: 1rem;
}

.rodape-logo-inst {
  height: 36px;
  width: auto;
  object-fit: contain;
  filter: grayscale(0.3);
  opacity: 0.85;
  transition: opacity 0.2s;
}

.rodape-logo-inst:hover { opacity: 1; filter: none; }

.instituicoes { background: #fff; padding: 5rem 4rem; border-top: 0.5px solid var(--oya-fog); }
.instituicoes-inner { max-width: 1200px; margin: 0 auto; }
.instituicoes-titulo { font-family: var(--font-display); font-size: 2rem; color: var(--oya-forest); margin-bottom: 0.5rem; }
.instituicoes-sub { font-size: 1rem; color: var(--oya-steel); margin-bottom: 2.5rem; }
.inst-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 1.25rem; }
.inst-card { border: 0.5px solid var(--oya-fog); border-radius: var(--radius-md, 0.75rem); padding: 1.5rem 1.25rem; text-align: center; background: var(--oya-sand, #faf8f5); transition: box-shadow 0.2s; }
.inst-card:hover { box-shadow: 0 4px 18px rgba(26,58,42,0.1); }
.inst-icon { color: var(--oya-ember); margin-bottom: 0.75rem; }
.inst-nome { font-weight: 600; font-size: 0.95rem; color: var(--oya-forest); margin-bottom: 0.35rem; }
.inst-tipo { font-size: 0.78rem; color: var(--oya-steel); }
.inst-loading, .inst-vazio { color: var(--oya-steel); font-size: 0.95rem; padding: 1rem 0; }
</style>
