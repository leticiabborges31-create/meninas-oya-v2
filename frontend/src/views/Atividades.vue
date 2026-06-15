<template>
  <div class="atividades-wrapper">
    <div class="atividades-header">
      <h1 class="atividades-titulo">Atividades</h1>
      <p class="atividades-subtitulo">Confira nossas atividades mais recentes</p>
    </div>

    <!-- LOADING -->
    <div v-if="carregando" class="loading">
      <span>Carregando...</span>
    </div>

    <!-- LISTA -->
    <div v-else-if="atividades.length > 0" class="lista-atividades">
      <div
        v-for="atividade in atividades"
        :key="atividade.id"
        class="card-atividade"
      >
        <!-- IMAGEM -->
        <div class="card-imagem" v-if="atividade.id">
          <img
            :src="`http://localhost:8080/atividades/${atividade.id}/foto`"
            :alt="atividade.titulo"
            @error="e => e.target.style.display='none'"
          />
        </div>

        <!-- CONTEÚDO -->
        <div class="card-conteudo">
          <div class="card-topo">
            <span class="card-data">📅 {{ formatarData(atividade.data) }}</span>
            <!-- ÍCONES (só aparece se logado) -->
            <div class="card-acoes" v-if="isLogado">
              <button @click="editar(atividade)" class="btn-editar" title="Editar">✏️</button>
              <button @click="apagar(atividade.id)" class="btn-apagar" title="Apagar">🗑️</button>
            </div>
          </div>
          <h2 class="card-titulo">{{ atividade.titulo }}</h2>
          <p class="card-descricao">{{ atividade.descricao }}</p>
        </div>
      </div>
    </div>

    <!-- VAZIO -->
    <div v-else class="vazio">
      <p>Nenhuma atividade encontrada.</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      atividades: [],
      carregando: true,
      isLogado: false
    }
  },

  mounted() {
    this.isLogado = localStorage.getItem("logado") === "true"
    this.carregarAtividades()
  },

  methods: {
    async carregarAtividades() {
      try {
        const response = await fetch("http://localhost:8080/atividades")
        if (!response.ok) throw new Error("Erro ao buscar atividades")
        const dados = await response.json()
        this.atividades = dados.sort((a, b) => new Date(b.data || 0) - new Date(a.data || 0))
      } catch (error) {
        console.error("Erro ao carregar atividades:", error)
      } finally {
        this.carregando = false
      }
    },

    formatarData(data) {
      if (!data) return ''
      const [ano, mes, dia] = data.split('-')
      return `${dia}/${mes}/${ano}`
    },

    editar(atividade) {
      localStorage.setItem("atividade_editando", JSON.stringify(atividade))
      this.$router.push("/painel")
    },

    async apagar(id) {
      if (!confirm("Tem certeza que deseja apagar esta atividade?")) return
      try {
        const token = localStorage.getItem("token")
        const response = await fetch(`http://localhost:8080/atividades/${id}`, {
          method: "DELETE",
          headers: {
            "Authorization": `Bearer ${token}`
          }
        })
        if (!response.ok) throw new Error("Erro ao apagar")
        this.atividades = this.atividades.filter(a => a.id !== id)
      } catch (error) {
        alert("Erro ao apagar atividade: " + error.message)
      }
    }
  }
}
</script>

<style scoped>
.atividades-wrapper {
  max-width: 800px;
  margin: 0 auto;
  padding: 3rem 1.25rem;
  font-family: var(--font-body);
}

.atividades-header {
  text-align: center;
  margin-bottom: 2.5rem;
}

.atividades-titulo {
  font-family: var(--font-display);
  font-size: 2rem;
  color: var(--oya-forest);
  margin-bottom: 0.5rem;
}

.atividades-subtitulo {
  font-size: 0.95rem;
  color: var(--oya-steel);
}

/* LISTA */
.lista-atividades {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* CARD */
.card-atividade {
  background: #fff;
  border-radius: var(--radius-lg);
  box-shadow: 0 2px 12px rgba(26,58,42,0.06);
  overflow: hidden;
  transition: transform 0.25s, box-shadow 0.25s, border-color 0.25s;
  border-left: 3px solid var(--oya-ember);
  border-top: 0.5px solid var(--oya-fog);
  border-right: 0.5px solid var(--oya-fog);
  border-bottom: 0.5px solid var(--oya-fog);
}

.card-atividade:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 32px rgba(26,58,42,0.1);
  border-left-color: var(--oya-flame);
}

/* IMAGEM */
.card-imagem img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

/* CONTEÚDO */
.card-conteudo {
  padding: 24px;
}

.card-topo {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.card-data {
  font-size: 0.75rem;
  color: var(--oya-ember);
  font-weight: 500;
  letter-spacing: 0.04em;
}

/* AÇÕES */
.card-acoes {
  display: flex;
  gap: 8px;
}

.btn-editar,
.btn-apagar {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 18px;
  padding: 4px 8px;
  border-radius: 8px;
  transition: background 0.2s;
}

.btn-editar:hover {
  background: var(--oya-sand);
}

.btn-apagar:hover {
  background: rgba(217, 79, 30, 0.08);
}

.card-titulo {
  font-family: var(--font-display);
  font-size: 1.15rem;
  color: var(--oya-forest);
  margin-bottom: 0.6rem;
}

.card-descricao {
  font-size: 0.9rem;
  color: var(--oya-stone);
  line-height: 1.65;
}

/* LOADING / VAZIO */
.loading,
.vazio {
  text-align: center;
  padding: 4rem 1.25rem;
  color: var(--oya-steel);
  font-size: 0.95rem;
}

/* RESPONSIVO */
@media (max-width: 600px) {
  .atividades-titulo {
    font-size: 26px;
  }

  .card-conteudo {
    padding: 16px;
  }

  .card-titulo {
    font-size: 17px;
  }
}
</style>