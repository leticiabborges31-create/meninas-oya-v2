<template>
  <div class="detalhe-wrapper">
    <!-- Carregando -->
    <div v-if="carregando" class="detalhe-loading">Carregando...</div>

    <!-- Atividade encontrada -->
    <div v-else-if="atividade" class="detalhe-container">
      <div class="detalhe-nav">
        <button class="btn-voltar" @click="$router.push('/atividades')">
          ← Voltar para atividades
        </button>
      </div>

      <!-- Foto principal -->
      <div class="detalhe-hero" v-if="temFoto">
        <img
          :src="`http://localhost:8080/atividades/${atividade.id}/foto`"
          :alt="atividade.titulo"
          class="detalhe-foto"
          @error="temFoto = false"
        />
      </div>

      <article class="detalhe-artigo">
        <div class="detalhe-meta-topo">
          <span class="detalhe-data">📅 {{ formatarData(atividade.data) }}</span>
          <span v-if="atividade.localizacao" class="detalhe-local">📍 {{ atividade.localizacao }}</span>
        </div>

        <h1 class="detalhe-titulo">{{ atividade.titulo }}</h1>

        <p class="detalhe-descricao">{{ stripHtml(atividade.descricao) }}</p>

        <!-- Segunda foto -->
        <div class="detalhe-foto2-bloco" v-if="temFoto2">
          <img
            :src="`http://localhost:8080/atividades/${atividade.id}/foto2`"
            :alt="atividade.titulo"
            class="detalhe-foto2"
            @error="temFoto2 = false"
          />
        </div>

        <div class="detalhe-rodape">
          <div class="detalhe-professor" v-if="atividade.professorNome">
            <span class="professor-label">👩‍🏫 Responsável</span>
            <span class="professor-nome">{{ atividade.professorNome }}</span>
          </div>
        </div>
      </article>
    </div>

    <!-- Não encontrado -->
    <div v-else class="detalhe-vazio">
      <p>Atividade não encontrada.</p>
      <button class="btn-voltar" @click="$router.push('/atividades')">← Voltar para atividades</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      atividade: null,
      carregando: true,
      temFoto: true,
      temFoto2: true
    }
  },

  mounted() {
    this.carregarAtividade()
  },

  methods: {
    async carregarAtividade() {
      const id = this.$route.params.id
      try {
        const response = await fetch(`http://localhost:8080/atividades/${id}`)
        if (!response.ok) throw new Error("Não encontrada")
        this.atividade = await response.json()
      } catch (error) {
        console.error("Erro ao carregar atividade:", error)
        this.atividade = null
      } finally {
        this.carregando = false
      }
    },

    formatarData(data) {
      if (!data) return ''
      const [ano, mes, dia] = data.split('-')
      return `${dia}/${mes}/${ano}`
    },

    stripHtml(html) {
      if (!html) return ''
      return html.replace(/<[^>]*>/g, '').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&nbsp;/g, ' ').trim()
    }
  }
}
</script>

<style scoped>
.detalhe-wrapper {
  font-family: var(--font-body);
  background: var(--oya-cream, #faf9f5);
  min-height: 100vh;
  padding-bottom: 4rem;
}

.detalhe-loading {
  text-align: center;
  padding: 4rem;
  color: var(--oya-steel);
}

.detalhe-nav {
  max-width: 760px;
  margin: 0 auto;
  padding: 1.5rem 1.5rem 0;
}

.btn-voltar {
  background: none;
  border: none;
  color: var(--oya-ember);
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  padding: 0;
  transition: color 0.2s;
}
.btn-voltar:hover { color: var(--oya-forest); }

.detalhe-hero {
  width: 100%;
  max-height: 420px;
  overflow: hidden;
  margin-top: 1.25rem;
}

.detalhe-foto {
  width: 100%;
  height: 420px;
  object-fit: cover;
  display: block;
}

.detalhe-artigo {
  max-width: 760px;
  margin: 2rem auto 0;
  padding: 0 1.5rem;
}

.detalhe-meta-topo {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  align-items: center;
  margin-bottom: 0.75rem;
}

.detalhe-data {
  font-size: 0.82rem;
  font-weight: 500;
  color: var(--oya-ember);
}

.detalhe-local {
  font-size: 0.82rem;
  color: var(--oya-steel);
  background: var(--oya-fog, #f0eeea);
  padding: 0.2rem 0.65rem;
  border-radius: 999px;
}

.detalhe-titulo {
  font-family: var(--font-display);
  font-size: 2rem;
  color: var(--oya-forest);
  line-height: 1.25;
  margin-bottom: 1.25rem;
}

.detalhe-descricao {
  font-size: 1rem;
  color: var(--oya-char);
  line-height: 1.8;
  white-space: pre-line;
  margin-bottom: 2rem;
}

.detalhe-foto2-bloco {
  margin-bottom: 2rem;
  border-radius: var(--radius-lg);
  overflow: hidden;
}

.detalhe-foto2 {
  width: 100%;
  max-height: 360px;
  object-fit: cover;
  display: block;
}

.detalhe-rodape {
  border-top: 1px solid var(--oya-fog, #ece9e1);
  padding-top: 1.25rem;
}

.detalhe-professor {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.professor-label {
  font-size: 0.78rem;
  color: var(--oya-steel);
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.professor-nome {
  font-size: 0.95rem;
  font-weight: 500;
  color: var(--oya-forest);
}

.detalhe-vazio {
  text-align: center;
  padding: 4rem 1.5rem;
  color: var(--oya-steel);
}

@media (max-width: 600px) {
  .detalhe-titulo { font-size: 1.5rem; }
  .detalhe-foto { height: 240px; }
}
</style>
