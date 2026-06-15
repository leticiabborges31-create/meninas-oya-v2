<template>
  <main class="parceria-page">

    <!-- HERO -->
    <section class="parceria-hero">
      <div class="parceria-hero-inner">
        <div class="parceria-hero-texto">
          <span class="parceria-tag">Parceiros</span>
          <h1 class="parceria-titulo">
            Instituições que<br />
            <em>acreditam</em> na causa
          </h1>
        </div>
        <div class="parceria-hero-detalhe">
          <p class="parceria-sub">
            Universidades, institutos e organizações que caminham junto com o
            projeto Meninas Oyá para ampliar o protagonismo feminino nas ciências.
          </p>
          <div class="parceria-linha-detalhe"></div>
        </div>
      </div>
    </section>

    <!-- GRID -->
    <section class="parceria-grid-section">
      <div class="parceria-grid">

        <a href="https://portal.ifma.edu.br/inicio/" target="_blank" rel="noopener" class="parceiro-card">
          <div class="parceiro-logo-wrap">
            <img :src="ifma" alt="IFMA" />
          </div>
          <p class="parceiro-nome">IFMA</p>
          <span class="parceiro-link">Ver site ↗</span>
        </a>

        <a href="https://ufba.br/" target="_blank" rel="noopener" class="parceiro-card">
          <div class="parceiro-logo-wrap">
            <img :src="ufba" alt="UFBA" />
          </div>
          <p class="parceiro-nome">UFBA</p>
          <span class="parceiro-link">Ver site ↗</span>
        </a>

        <a href="https://www.ufrgs.br/site/" target="_blank" rel="noopener" class="parceiro-card">
          <div class="parceiro-logo-wrap">
            <img :src="ufrgs" alt="UFRGS" />
          </div>
          <p class="parceiro-nome">UFRGS</p>
          <span class="parceiro-link">Ver site ↗</span>
        </a>

        <a href="https://unilins.edu.br/" target="_blank" rel="noopener" class="parceiro-card">
          <div class="parceiro-logo-wrap">
            <img :src="unilins" alt="UNILINS" />
          </div>
          <p class="parceiro-nome">UNILINS</p>
          <span class="parceiro-link">Ver site ↗</span>
        </a>

        <a href="https://www.instagram.com/casafloreserma/" target="_blank" rel="noopener" class="parceiro-card">
          <div class="parceiro-logo-wrap">
            <img :src="casaflorescer" alt="Casa Florescer" />
          </div>
          <p class="parceiro-nome">Casa Florescer</p>
          <span class="parceiro-link">Ver perfil ↗</span>
        </a>

        <a href="https://sesicasaraodaindustria.fiema.org.br/" target="_blank" rel="noopener" class="parceiro-card">
          <div class="parceiro-logo-wrap">
            <img :src="casarao" alt="Casarão Indústria" />
          </div>
          <p class="parceiro-nome">Casarão Indústria</p>
          <span class="parceiro-link">Ver site ↗</span>
        </a>

        <a href="https://www.anhanguera.com/" target="_blank" rel="noopener" class="parceiro-card">
          <div class="parceiro-logo-wrap">
            <img :src="anhanguera" alt="Anhanguera" />
          </div>
          <p class="parceiro-nome">Anhanguera</p>
          <span class="parceiro-link">Ver site ↗</span>
        </a>

        <a href="https://www.instagram.com/peads.educar" target="_blank" rel="noopener" class="parceiro-card">
          <div class="parceiro-logo-wrap">
            <img :src="peads" alt="peads" />
          </div>
          <p class="parceiro-nome">Peads</p>
          <span class="parceiro-link">Ver site ↗</span>
        </a>



      </div>
    </section>
<!-- APOIO -->
<section class="parceria-apoio-section">
  <div class="parceria-apoio-inner">
    <h2 class="parceria-apoio-titulo">Apoio</h2>

    <div class="parceria-grid">
      <a href="https://www.saoluis.ma.gov.br/" target="_blank" rel="noopener" class="parceiro-card">
        <div class="parceiro-logo-wrap">
          <img :src="prefeiturasaoluis" alt="prefeitura são luis" />
        </div>
        <p class="parceiro-nome">Prefeitura de São Luís</p>
        <span class="parceiro-link">Ver site ↗</span>
      </a>

      <a href="https://www.alcantara.ma.gov.br/" target="_blank" rel="noopener" class="parceiro-card">
        <div class="parceiro-logo-wrap">
          <img :src="prefeituraalcantara" alt="prefeitura municipal de alcantara" />
        </div>
        <p class="parceiro-nome">Prefeitura Municipal de Alcantara</p>
        <span class="parceiro-link">Ver site ↗</span>
      </a>

      <a href="https://www.beneditoleite.ma.gov.br/" target="_blank" rel="noopener" class="parceiro-card">
        <div class="parceiro-logo-wrap">
          <img :src="prefeiturabeneditoleite" alt="prefeitura municipal de benedito leite" />
        </div>
        <p class="parceiro-nome">Prefeitura Municipal de Benedito Leite</p>
        <span class="parceiro-link">Ver site ↗</span>
      </a>

      <a href="https://www.cantanhede.ma.gov.br/" target="_blank" rel="noopener" class="parceiro-card">
        <div class="parceiro-logo-wrap">
          <img :src="prefeituracantanhede" alt="prefeitura municipal de cantanhede" />
        </div>
        <p class="parceiro-nome">Prefeitura Municipal de Cantanhede</p>
        <span class="parceiro-link">Ver site ↗</span>
      </a>
    </div>
  </div>
</section>
<!-- REALIZAÇÃO -->
<section class="parceria-realizacao-section">
  <div class="parceria-realizacao-inner">
    <h2 class="parceria-realizacao-titulo">Realização</h2>

    <div class="parceria-grid">
      <a href="https://portais.ufma.br/PortalUfma/" target="_blank" rel="noopener" class="parceiro-card">
        <div class="parceiro-logo-wrap">
          <img :src="ufma" alt="UNIVERSIDADE FEDERAL DO MARANHÃO" />
        </div>
        <p class="parceiro-nome">UFMA</p>
        <span class="parceiro-link">Ver site ↗</span>
      </a>

      <a href="https://www.ufabc.edu.br/" target="_blank" rel="noopener" class="parceiro-card">
        <div class="parceiro-logo-wrap">
          <img :src="ufbac" alt="UFABC" />
        </div>
        <p class="parceiro-nome">UFABC</p>
        <span class="parceiro-link">Ver site ↗</span>
      </a>

      <a href="https://portal.ifba.edu.br/" target="_blank" rel="noopener" class="parceiro-card">
        <div class="parceiro-logo-wrap">
          <img :src="ifba" alt="IFBA" />
        </div>
        <p class="parceiro-nome">IFBA</p>
        <span class="parceiro-link">Ver site ↗</span>
      </a>

      <a href="https://www.ufsm.br/" target="_blank" rel="noopener" class="parceiro-card">
        <div class="parceiro-logo-wrap">
          <img :src="ufsm" alt="universidade federal santa maria" />
        </div>
        <p class="parceiro-nome">UFSM</p>
        <span class="parceiro-link">Ver site ↗</span>
      </a>


    </div>
  </div>
</section>




    <!-- RODAPÉ -->
    <footer class="rodape">
      <div class="rodape-inner">
        <div class="rodape-marca">
          <span class="rodape-mo">MO</span>
          <div>
            <strong>Meninas Oyá</strong>
            <span>Rede de Apoio e Empoderamento - RAE</span>
          </div>
        </div>
        <p class="rodape-copy">© 2025 Meninas Oyá · Todos os direitos reservados</p>
      </div>
    </footer>

  </main>
</template>

<script>
import ifma from '@/assets/ifma.png'
import ufba from '@/assets/ufba.png'
import ufrgs from '@/assets/ufrgs.png'
import unilins from '@/assets/unilins.png'
import casaflorescer from '@/assets/casaflorescer.png'
import casarao from '@/assets/casarao.png'
import anhanguera from '@/assets/anhanguero-logo.png'
import peads from '@/assets/peadsoficial.png'
import prefeiturasaoluis from '@/assets/prefeituradesaoluis.webp'
import prefeituraalcantara from '@/assets/alcantara.png'
import prefeiturabeneditoleite from '@/assets/prefeiturabeneditoleite.png'
import prefeituracantanhede from '@/assets/cantanhede.png'
import ufma from '@/assets/ufma.png'
import ufbac from '@/assets/ufabc.png'
import ifba from '@/assets/ifba.png'
import ufsm from '@/assets/santamaria.jpg'

export default {
  data() {
    return { ifma, ufba, ufrgs, unilins, casaflorescer, casarao, anhanguera, peads, prefeiturasaoluis, prefeituraalcantara, prefeiturabeneditoleite, prefeituracantanhede, ufma, ufbac, ifba, ufsm }
  }
}

</script>

<style scoped>
.parceria-page {
  background: var(--oya-bg);
  font-family: var(--font-body);
  color: var(--oya-char);
}

/* ── HERO ──────────────────────────────────────────────── */
.parceria-hero {
  background-color: var(--oya-forest);
  padding: 7rem 4rem 5rem;
  position: relative;
  overflow: hidden;
}

.parceria-hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse 50% 80% at 90% 50%, rgba(217, 79, 30, 0.18) 0%, transparent 65%),
    radial-gradient(ellipse 40% 60% at 5% 90%, rgba(107, 170, 138, 0.2) 0%, transparent 60%);
  pointer-events: none;
}

.parceria-hero-inner {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  position: relative;
  z-index: 1;
}

.parceria-tag {
  display: inline-flex;
  align-items: center;
  font-size: 0.7rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  font-weight: 600;
  color: var(--oya-glow);
  background: rgba(217, 79, 30, 0.1);
  padding: 0.3rem 0.9rem;
  border-radius: var(--radius-pill);
  margin-bottom: 1.5rem;
}

.parceria-titulo {
  font-family: var(--font-display);
  font-size: clamp(2.4rem, 5vw, 4rem);
  line-height: 1.1;
  color: var(--oya-cream);
  margin: 0;
}

.parceria-titulo em {
  font-style: italic;
  color: var(--oya-glow);
}

.parceria-sub {
  font-size: 1rem;
  line-height: 1.75;
  color: var(--oya-fern);
  margin-bottom: 2rem;
}

.parceria-linha-detalhe {
  height: 2px;
  width: 80px;
  background: linear-gradient(90deg, var(--oya-ember), var(--oya-fern));
  border-radius: 2px;
}

/* ── GRID ──────────────────────────────────────────────── */
.parceria-grid-section {
  padding: 5rem 4rem 7rem;
}

.parceria-grid {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 1.5rem;
}

.parceiro-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  padding: 2rem 1.5rem 1.5rem;
  background: #fff;
  border: 0.5px solid var(--oya-fog);
  border-radius: var(--radius-lg);
  text-decoration: none;
  color: inherit;
  transition: transform 0.22s, box-shadow 0.22s, border-color 0.22s;
}

.parceiro-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 16px 40px rgba(26, 58, 42, 0.08);
  border-color: rgba(217, 79, 30, 0.25);
}

.parceiro-logo-wrap {
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.parceiro-logo-wrap img {
  max-width: 100%;
  max-height: 70px;
  object-fit: contain;
  filter: grayscale(20%);
  transition: filter 0.22s ease;
}

.parceiro-card:hover .parceiro-logo-wrap img {
  filter: grayscale(0%);
}

.parceiro-nome {
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--oya-forest);
  margin: 0;
  text-align: center;
}

.parceiro-link {
  font-size: 0.72rem;
  font-weight: 500;
  color: var(--oya-ember);
  letter-spacing: 0.02em;
}

/* ── APOIO ──────────────────────────────────────────────── */
.parceria-apoio-section {
  padding: 5rem 4rem 7rem;
}

.parceria-apoio-inner {
  max-width: 1200px;
  margin: 0 auto;
}

.parceria-apoio-titulo {
  font-family: var(--font-display);
  font-size: clamp(2rem, 4vw, 3rem);
  line-height: 1.1;
  color: var(--oya-forest);
  margin: 0 0 2rem 0;
  text-align: left;
}

/* ── REALIZAÇÃO ──────────────────────────────────────────────── */
.parceria-realizacao-section {
  padding: 5rem 4rem 7rem;
}

.parceria-realizacao-inner {
  max-width: 1200px;
  margin: 0 auto;
}

.parceria-realizacao-titulo {
  font-family: var(--font-display);
  font-size: clamp(2rem, 4vw, 3rem);
  line-height: 1.1;
  color: var(--oya-forest);
  margin: 0 0 2rem 0;
  text-align: left;
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
  gap: 0.75rem;
}

.rodape-mo {
  display: grid;
  place-items: center;
  width: 2.25rem;
  height: 2.25rem;
  border-radius: var(--radius-sm);
  background: var(--oya-ember);
  color: #fff;
  font-family: var(--font-display);
  font-size: 0.85rem;
}

.rodape-marca strong {
  display: block;
  font-size: 0.9rem;
  color: var(--oya-cream);
  font-weight: 500;
}

.rodape-marca span {
  font-size: 0.75rem;
  color: var(--oya-fern);
}

.rodape-copy {
  font-size: 0.78rem;
  color: var(--oya-steel);
  margin: 0;
}

/* ── RESPONSIVO ──────────────────────────────────────── */
@media (max-width: 900px) {
  .parceria-hero { padding: 5rem 1.5rem 4rem; }
  .parceria-hero-inner { grid-template-columns: 1fr; gap: 2rem; }
  .parceria-grid-section { padding: 4rem 1.5rem; }
  .parceria-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 480px) {
  .parceria-grid { grid-template-columns: 1fr; }
}
</style>
