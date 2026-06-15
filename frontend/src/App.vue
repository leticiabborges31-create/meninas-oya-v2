<template>
  <div class="app-shell">
    <header v-if="mostrarNavbar" class="navbar">
      <router-link to="/" class="brand">
        <img src="@/assets/logo-oia.png" alt="Meninas Oyá" class="brand-logo" />
        <div class="brand-copy">
          <strong>Meninas Oya</strong>
          <span>Rede de Apoio e Empoderamento - RAE</span>
        </div>
      </router-link>

      <nav class="menu" aria-label="Menu principal">
        <a href="#sobre" @click.prevent="navegarPara('sobre')">Sobre</a>
        <router-link to="/atividades">Atividades</router-link>
        <router-link to="/coordenacao">Coordenação</router-link>
        <router-link to="/parceria">Parceria</router-link>
        <router-link :to="rotaAdministracao" class="menu-cta">Administração</router-link>
      </nav>
    </header>

    <router-view />
  </div>
</template>

<script>
export default {
  data() {
    return {
      logado: false,
      isAdmin: false
    }
  },

  computed: {
    mostrarNavbar() {
      const rotasSemNavbar = ['/painel', '/painel-admin', '/admin', '/cadastro']
      return !rotasSemNavbar.includes(this.$route.path)
    },

    rotaAdministracao() {
      if (!this.logado) return '/admin'
      return this.isAdmin ? '/painel-admin' : '/painel'
    }
  },

  watch: {
    '$route'() {
      this.atualizarAuth()
    }
  },

  mounted() {
    this.atualizarAuth()
    this.rolarParaHash(this.$route.hash)
  },

  methods: {
    atualizarAuth() {
      this.logado = localStorage.getItem('logado') === 'true'
      if (!this.logado) { this.isAdmin = false; return }
      try {
        const token = localStorage.getItem('token')
        const payload = JSON.parse(atob(token.split('.')[1]))
        const authorities = payload.authorities || payload.scope || ''
        this.isAdmin = String(authorities).includes('ADMIN')
      } catch {
        this.isAdmin = false
      }
    },

    navegarPara(id) {
      if (this.$route.path !== '/') {
        this.$router.push({ path: '/', hash: `#${id}` });
        return;
      }

      this.rolarParaHash(`#${id}`);
    },

    rolarParaHash(hash) {
      if (!hash) return;

      const alvo = document.querySelector(hash);

      if (alvo) {
        alvo.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }
};
</script>

<style scoped>
.app-shell {
  min-height: 100vh;
}

.navbar {
  position: sticky;
  top: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  padding: 0.6rem 3.5rem;
  background: rgba(240, 237, 232, 0.92);
  backdrop-filter: blur(20px);
  border-bottom: 0.5px solid var(--oya-fog);
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  color: var(--oya-forest);
  text-decoration: none;
}

.brand-logo {
  width: 2.5rem;
  height: 2.5rem;
  object-fit: contain;
  border-radius: var(--radius-sm);
}

.brand-copy {
  display: flex;
  flex-direction: column;
}

.brand-copy strong {
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--oya-forest);
  letter-spacing: -0.02em;
}

.brand-copy span {
  color: var(--oya-steel);
  font-size: 0.7rem;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.menu {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.menu a {
  padding: 0.5rem 0.9rem;
  border-radius: var(--radius-pill);
  color: var(--oya-stone);
  text-decoration: none;
  font-size: 0.875rem;
  font-weight: 500;
  transition: background-color 0.2s, color 0.2s;
}

.menu a:hover,
.menu a.router-link-active {
  background: rgba(217, 79, 30, 0.08);
  color: var(--oya-ember);
}

.menu-cta {
  background: var(--oya-forest) !important;
  color: var(--oya-cream) !important;
  font-weight: 500;
}

.menu-cta:hover,
.menu-cta.router-link-active {
  background: var(--oya-ember) !important;
  color: #fff !important;
}

@media (max-width: 980px) {
  .navbar {
    padding: 1rem 1.25rem;
    flex-direction: column;
    align-items: stretch;
  }
  .menu { justify-content: center; }
}

@media (max-width: 640px) {
  .brand { justify-content: center; }
  .menu { gap: 0.5rem; }
  .menu a { flex: 1 1 calc(50% - 0.5rem); text-align: center; }
}
</style>
