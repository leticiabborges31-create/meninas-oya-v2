<template>
  <div class="shell">
    <!-- Overlay mobile -->
    <transition name="overlay-fade">
      <div v-if="sidebarAberta" class="sidebar-overlay" @click="sidebarAberta = false" />
    </transition>

    <!-- SIDEBAR -->
    <aside class="sidebar" :class="{ 'sidebar--aberta': sidebarAberta }">
      <div class="sidebar-brand">
        <img src="@/assets/logo-oia.png" class="brand-logo-img" alt="Meninas Oyá" />
        <div class="brand-info">
          <span class="brand-nome">Meninas Oyá</span>
          <span class="brand-sub">{{ titulo }}</span>
        </div>
      </div>

      <nav class="sidebar-nav">
        <slot name="nav" />
      </nav>

      <div class="sidebar-footer">
        <button @click="$emit('logout')" class="sidebar-logout">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
            <polyline points="16 17 21 12 16 7"/>
            <line x1="21" y1="12" x2="9" y2="12"/>
          </svg>
          <span>Sair</span>
        </button>
      </div>
    </aside>

    <!-- CORPO -->
    <div class="shell-body">
      <!-- TOPBAR -->
      <header class="topbar">
        <button class="btn-menu" @click="sidebarAberta = !sidebarAberta" aria-label="Menu">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20">
            <line x1="3" y1="6" x2="21" y2="6"/>
            <line x1="3" y1="12" x2="21" y2="12"/>
            <line x1="3" y1="18" x2="21" y2="18"/>
          </svg>
        </button>

        <div class="topbar-brand"></div>

        <div class="topbar-actions" ref="perfilRef">
          <button class="user-btn" @click="dropdownAberto = !dropdownAberto" :title="usuario.username || titulo">
            <span class="user-inicial">{{ (usuario.username || titulo).charAt(0).toUpperCase() }}</span>
          </button>

          <transition name="dropdown-fade">
            <div v-if="dropdownAberto" class="perfil-dropdown">
              <div class="perfil-topo">
                <div class="perfil-avatar">{{ (usuario.username || titulo).charAt(0).toUpperCase() }}</div>
                <div class="perfil-info">
                  <span class="perfil-nome">{{ usuario.username || titulo }}</span>
                  <span :class="['perfil-role', usuario.isAdmin ? 'role-admin' : 'role-professor']">{{ usuario.isAdmin ? 'Administrador' : 'Professor' }}</span>
                </div>
              </div>
              <div class="perfil-divider" />
              <button class="perfil-sair" @click="$emit('logout')">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="15" height="15">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                  <polyline points="16 17 21 12 16 7"/>
                  <line x1="21" y1="12" x2="9" y2="12"/>
                </svg>
                Sair
              </button>
            </div>
          </transition>
        </div>
      </header>

      <!-- CONTEÚDO -->
      <main class="shell-main">
        <slot />
      </main>
    </div>

    <!-- BOTÃO FLUTUANTE: IR PARA O SITE -->
    <router-link to="/" class="fab-site" title="Ir para o site">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20">
        <circle cx="12" cy="12" r="10"/>
        <line x1="2" y1="12" x2="22" y2="12"/>
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      </svg>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'PainelShell',
  props: {
    titulo: { type: String, required: true },
    subtitulo: { type: String, default: 'Meninas Oyá' }
  },
  emits: ['logout'],
  data() {
    return {
      sidebarAberta: false,
      dropdownAberto: false,
      usuario: { username: '', isAdmin: false }
    }
  },
  mounted() {
    this.carregarUsuario()
    document.addEventListener('click', this.fecharDropdown)
  },
  beforeUnmount() {
    document.removeEventListener('click', this.fecharDropdown)
  },
  methods: {
    carregarUsuario() {
      const token = localStorage.getItem('token')
      if (!token) return
      try {
        const payload = JSON.parse(atob(token.split('.')[1]))
        this.usuario.username = payload.sub || ''
        const auth = String(payload.authorities || payload.scope || '')
        this.usuario.isAdmin = auth.includes('ADMIN')
      } catch {}
    },
    fecharDropdown(e) {
      if (this.$refs.perfilRef && !this.$refs.perfilRef.contains(e.target)) {
        this.dropdownAberto = false
      }
    }
  }
}
</script>

<style scoped>
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

/* ── SHELL ───────────────────────────────────────────── */
.shell {
  display: flex;
  min-height: 100vh;
  background: var(--oya-bg);
  color: var(--oya-char);
  font-family: var(--font-body);
}

/* ── SIDEBAR ─────────────────────────────────────────── */
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  width: 240px;
  height: 100vh;
  background: var(--oya-forest);
  display: flex;
  flex-direction: column;
  z-index: 100;
  transition: transform 0.28s cubic-bezier(0.4, 0, 0.2, 1);
}

.sidebar-brand {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1.4rem 1.1rem 1.15rem;
  border-bottom: 0.5px solid rgba(168, 213, 192, 0.12);
  flex-shrink: 0;
}

.brand-logo-img {
  width: 2.1rem;
  height: 2.1rem;
  border-radius: 8px;
  object-fit: contain;
  flex-shrink: 0;
  background: #fff;
}

.brand-info {
  display: flex;
  flex-direction: column;
  min-width: 0;
  gap: 0.1rem;
}

.brand-nome {
  color: var(--oya-cream);
  font-family: var(--font-display);
  font-size: 0.9rem;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.2;
}

.brand-sub {
  color: var(--oya-fern);
  font-size: 0.7rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.sidebar-nav {
  flex: 1;
  padding: 0.85rem 0.65rem;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  overflow-y: auto;
}

.sidebar-footer {
  padding: 0.85rem 0.65rem;
  border-top: 0.5px solid rgba(168, 213, 192, 0.12);
  flex-shrink: 0;
}

.sidebar-logout {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  width: 100%;
  padding: 0.65rem 0.85rem;
  border: none;
  border-radius: var(--radius-md);
  background: rgba(217, 79, 30, 0.1);
  color: rgba(255, 130, 80, 0.85);
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;
  font-family: var(--font-body);
}

.sidebar-logout:hover { background: rgba(217, 79, 30, 0.2); color: #fff; }

/* ── OVERLAY MOBILE ──────────────────────────────────── */
.sidebar-overlay {
  position: fixed;
  inset: 0;
  background: rgba(15, 34, 24, 0.55);
  z-index: 99;
  backdrop-filter: blur(2px);
}

.overlay-fade-enter-active,
.overlay-fade-leave-active { transition: opacity 0.25s; }
.overlay-fade-enter-from,
.overlay-fade-leave-to { opacity: 0; }

/* ── CORPO ───────────────────────────────────────────── */
.shell-body {
  margin-left: 240px;
  flex: 1;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* ── TOPBAR ──────────────────────────────────────────── */
.topbar {
  position: sticky;
  top: 0;
  z-index: 50;
  height: 56px;
  background: #fff;
  border-bottom: 0.5px solid var(--oya-fog);
  display: flex;
  align-items: center;
  padding: 0 1.25rem;
  gap: 0.75rem;
  flex-shrink: 0;
}

.btn-menu {
  display: none;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border: none;
  background: transparent;
  color: var(--oya-stone);
  cursor: pointer;
  border-radius: var(--radius-md);
  flex-shrink: 0;
  transition: background 0.2s;
}
.btn-menu:hover { background: var(--oya-bg); }

.topbar-brand {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex: 1;
}

.topbar-logo-img {
  height: 2rem;
  width: auto;
  object-fit: contain;
  display: block;
}

/* ── FAB SITE ────────────────────────────────────── */
.fab-site {
  position: fixed;
  bottom: 1.75rem;
  right: 1.75rem;
  z-index: 200;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background: var(--oya-forest);
  color: var(--oya-mint);
  display: grid;
  place-items: center;
  box-shadow: 0 4px 18px rgba(15, 34, 24, 0.28);
  transition: background 0.2s, transform 0.2s, box-shadow 0.2s;
  text-decoration: none;
}

.fab-site:hover {
  background: var(--oya-ember);
  color: #fff;
  transform: translateY(-3px);
  box-shadow: 0 8px 24px rgba(217, 79, 30, 0.3);
}

.topbar-actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.user-btn {
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background: var(--oya-forest);
  color: var(--oya-mint);
  display: grid;
  place-items: center;
  cursor: pointer;
  transition: background 0.2s;
  flex-shrink: 0;
  border: none;
  font-family: var(--font-display);
}
.user-btn:hover { background: var(--oya-ember); }

.user-inicial {
  font-size: 0.8rem;
  font-weight: 700;
  color: inherit;
  line-height: 1;
}

/* ── DROPDOWN PERFIL ──────────────────────────── */
.topbar-actions { position: relative; }

.perfil-dropdown {
  position: absolute;
  top: calc(100% + 0.65rem);
  right: 0;
  width: 220px;
  background: #fff;
  border: 0.5px solid var(--oya-fog);
  border-radius: var(--radius-lg);
  box-shadow: 0 12px 40px rgba(15, 34, 24, 0.14);
  overflow: hidden;
  z-index: 300;
}

.perfil-topo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
}

.perfil-avatar {
  width: 2.4rem;
  height: 2.4rem;
  border-radius: 50%;
  background: var(--oya-forest);
  color: var(--oya-mint);
  font-family: var(--font-display);
  font-size: 1rem;
  font-weight: 700;
  display: grid;
  place-items: center;
  flex-shrink: 0;
}

.perfil-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  min-width: 0;
}

.perfil-nome {
  font-weight: 600;
  font-size: 0.875rem;
  color: var(--oya-forest);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.perfil-role {
  display: inline-block;
  padding: 0.15rem 0.5rem;
  border-radius: var(--radius-pill);
  font-size: 0.68rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.role-admin    { background: rgba(217, 79, 30, 0.1);   color: var(--oya-ember); }
.role-professor { background: rgba(107, 170, 138, 0.12); color: var(--oya-sage);  }

.perfil-divider {
  height: 0.5px;
  background: var(--oya-fog);
  margin: 0;
}

.perfil-sair {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  width: 100%;
  padding: 0.85rem 1rem;
  border: none;
  background: transparent;
  color: var(--oya-stone);
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.15s, color 0.15s;
  font-family: var(--font-body);
}

.perfil-sair:hover {
  background: rgba(217, 79, 30, 0.06);
  color: var(--oya-ember);
}

.dropdown-fade-enter-active,
.dropdown-fade-leave-active { transition: opacity 0.15s, transform 0.15s; }
.dropdown-fade-enter-from,
.dropdown-fade-leave-to { opacity: 0; transform: translateY(-6px); }

/* ── MAIN ────────────────────────────────────────────── */
.shell-main {
  flex: 1;
  padding: 1.5rem;
  display: grid;
  gap: 1.5rem;
  align-content: start;
}

/* ── RESPONSIVE ──────────────────────────────────────── */
@media (max-width: 768px) {
  .sidebar {
    transform: translateX(-100%);
  }
  .sidebar--aberta {
    transform: translateX(0);
  }
  .shell-body {
    margin-left: 0;
  }
  .btn-menu {
    display: flex;
  }
  .topbar-nome {
    font-size: 0.88rem;
  }
}
</style>
