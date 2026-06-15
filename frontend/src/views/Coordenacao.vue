<script setup>
import carolinaFoto from '../assets/carolina.png'
import graciellaFoto from '../assets/graciella.png'
import inesFoto from '../assets/ines.png'
import isabelleFoto from '../assets/isabelle.png'
import reginaFoto from '../assets/regina.png'

const coordenadoras = [
  {
    nome: 'Carolina Pereira Aranha',
    lattes: 'https://lattes.cnpq.br/',
    regiao: 'Geral',
    foto: carolinaFoto,
  },
  {
    nome: 'Graciella Watanabe',
    lattes: 'https://lattes.cnpq.br/',
    regiao: 'São Paulo',
    foto: graciellaFoto,
  },
  {
    nome: ' Inés Prieto Schmidt Sauerwein',
    lattes: 'https://lattes.cnpq.br/',
    regiao: 'Rio Grande do Sul',
    foto: inesFoto,
  },
  {
    nome: 'Isabelle Priscila Carneiro de Lima',
    lattes: 'https://lattes.cnpq.br/',
    regiao: 'Bahia',
    foto: isabelleFoto,
  },
  {
    nome: 'Regina Célia de Sousa ',
    lattes: 'https://lattes.cnpq.br/',
    regiao: 'Maranhão',
    foto: reginaFoto,
  },
]
</script>

<template>
  <main class="coord-page">

    <!-- HEADER DA PÁGINA -->
    <section class="coord-hero">
      <div class="coord-hero-inner">
        <div class="coord-hero-texto">
          <span class="coord-tag">Coordenação</span>
          <h1 class="coord-titulo">
           As lideranças que fazem a <br />
            rede acontecer<br />
            
          </h1>
        </div>
        <div class="coord-hero-detalhe">
          <p class="coord-sub">
            Conheça as mulheres incríveis que coordenam o projeto
            Meninas Oyá em cada região do Brasil.
          </p>
          <div class="coord-linha-detalhe"></div>
        </div>
      </div>
    </section>

    <!-- GRID DE COORDENADORAS -->
    <section class="coord-grid-section">
      <div class="coord-grid">
        <article class="coord-card" v-for="(coord, i) in coordenadoras" :key="i">
          <div class="coord-foto-wrap">
            <img :src="coord.foto" :alt="coord.nome" class="coord-foto" />
            <div class="coord-regiao-badge">{{ coord.regiao }}</div>
          </div>
          <div class="coord-info">
            <h3 class="coord-nome">{{ coord.nome }}</h3>
            <a :href="coord.lattes" target="_blank" rel="noopener noreferrer" class="coord-lattes">
              <span>Currículo Lattes</span>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2.5 9.5L9.5 2.5M9.5 2.5H4M9.5 2.5V8" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </a>
          </div>
        </article>
      </div>
    </section>

  </main>
</template>



<style scoped>
.coord-page {
  background: var(--oya-bg);
  font-family: var(--font-body);
  color: var(--oya-char);
}

/* ── HERO ──────────────────────────────────────────────── */
.coord-hero {
  background-color: var(--oya-forest);
  padding: 7rem 4rem 5rem;
  position: relative;
  overflow: hidden;
}

.coord-hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse 50% 80% at 90% 50%, rgba(217, 79, 30, 0.18) 0%, transparent 65%),
    radial-gradient(ellipse 40% 60% at 5% 90%, rgba(107, 170, 138, 0.2) 0%, transparent 60%);
  pointer-events: none;
}

.coord-hero-inner {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  position: relative;
  z-index: 1;
}

.coord-tag {
  display: inline-flex;
  align-items: center;
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

.coord-titulo {
  font-family: var(--font-display);
  font-size: clamp(2.4rem, 5vw, 4rem);
  line-height: 1.1;
  color: var(--oya-cream);
  margin: 0;
}

.coord-titulo em {
  font-style: italic;
  color: var(--oya-glow);
}

.coord-sub {
  font-size: 1rem;
  line-height: 1.75;
  color: var(--oya-fern);
  margin-bottom: 2rem;
}

.coord-linha-detalhe {
  height: 2px;
  width: 80px;
  background: linear-gradient(90deg, var(--oya-ember), var(--oya-fern));
  border-radius: 2px;
}

/* ── GRID ──────────────────────────────────────────────── */
.coord-grid-section {
  padding: 5rem 4rem 7rem;
  background: var(--oya-bg);
}

.coord-grid {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(210px, 1fr));
  gap: 1.5rem;
}

.coord-card {
  display: flex;
  flex-direction: column;
  background: #fff;
  border: 0.5px solid var(--oya-fog);
  border-radius: var(--radius-lg);
  overflow: hidden;
  transition: transform 0.25s, box-shadow 0.25s, border-color 0.25s;
}

.coord-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 20px 48px rgba(26, 58, 42, 0.1);
  border-color: rgba(217, 79, 30, 0.25);
}

.coord-foto-wrap {
  position: relative;
  aspect-ratio: 1;
  background: var(--oya-cream);
  overflow: hidden;
}

.coord-foto {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.5s ease;
}

.coord-card:hover .coord-foto {
  transform: scale(1.06);
}

.coord-regiao-badge {
  position: absolute;
  top: 0.75rem;
  left: 0.75rem;
  background: rgba(217, 79, 30, 0.92);
  backdrop-filter: blur(4px);
  color: #fff;
  font-size: 0.65rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 0.28rem 0.7rem;
  border-radius: var(--radius-pill);
}

.coord-info {
  padding: 1.1rem 1.25rem 1.4rem;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  flex: 1;
  justify-content: space-between;
}

.coord-nome {
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--oya-forest);
  margin: 0;
  line-height: 1.35;
}

.coord-lattes {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  align-self: flex-start;
  font-size: 0.72rem;
  font-weight: 500;
  color: var(--oya-ember);
  background: rgba(217, 79, 30, 0.08);
  padding: 0.3rem 0.8rem;
  border-radius: var(--radius-pill);
  text-decoration: none;
  transition: background 0.18s, color 0.18s;
}

.coord-lattes:hover {
  background: rgba(217, 79, 30, 0.14);
  color: var(--oya-flame);
}

/* ── RESPONSIVO ──────────────────────────────────────── */
@media (max-width: 900px) {
  .coord-hero {
    padding: 5rem 1.5rem 4rem;
  }

  .coord-hero-inner {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .coord-grid-section {
    padding: 4rem 1.5rem;
  }

  .coord-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .coord-grid {
    grid-template-columns: 1fr;
  }
}
</style>
