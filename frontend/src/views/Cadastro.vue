<template>
  <div class="cadastro-page">
    <div class="cadastro-card">

      <div class="card-header">
        <div class="header-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
            <circle cx="9" cy="7" r="4"/>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
          </svg>
        </div>
        <div>
          <h1 class="card-titulo">Cadastro de Professor</h1>
          <p class="card-subtitulo">
            Seu cadastro ficará pendente de aprovação pela coordenação.
          </p>
        </div>
      </div>

      <div v-if="sucesso" class="feedback sucesso-card">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
          <polyline points="22 4 12 14.01 9 11.01"/>
        </svg>
        <div>
          <strong>Cadastro enviado!</strong>
          <p>Aguarde a aprovação da coordenação para acessar o sistema.</p>
        </div>
      </div>

      <div v-if="erroGeral" class="feedback erro-card">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <circle cx="12" cy="12" r="10"/>
          <line x1="12" y1="8" x2="12" y2="12"/>
          <line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
        <p>{{ erroGeral }}</p>
      </div>

      <form v-if="!sucesso" @submit.prevent="cadastrar" class="form-grid" novalidate>

        <AppInput
          v-model="form.nome"
          label="Nome completo"
          placeholder="Seu nome completo"
          required
          :error="erros.nome"
        />

        <AppInput
          v-model="form.email"
          label="Email"
          type="email"
          placeholder="seu@email.com"
          required
          :error="erros.email"
        />

        <AppInput
          v-model="form.cpf"
          label="CPF"
          placeholder="000.000.000-00"
          maxlength="14"
          required
          :error="erros.cpf"
        />

        <div class="form-group">
          <label class="form-label">Período de Vigência</label>
          <div class="periodo-wrap">
            <div class="periodo-field">
              <span class="periodo-label">Início</span>
              <input v-model="form.periodoVigenciaInicio" type="date" class="form-input-native" />
            </div>
            <span class="periodo-sep">–</span>
            <div class="periodo-field">
              <span class="periodo-label">Fim</span>
              <input v-model="form.periodoVigenciaFim" type="date" class="form-input-native" />
            </div>
          </div>
        </div>

        <CidadeSelect
          v-model="form.cidadeId"
          label="Cidade"
          placeholder="Digite o nome da sua cidade..."
          input-id="cadastro-cidade"
          class="full"
        />
        <p v-if="erros.cidadeId" class="erro-campo">{{ erros.cidadeId }}</p>

        <AppInput
          v-model="form.escola"
          label="Instituição onde leciona"
          placeholder="Nome da instituição"
          required
          :error="erros.escola"
          class="full"
        />

        <AppInput
          v-model="form.linkCurriculoLattes"
          label="Currículo Lattes"
          type="url"
          placeholder="https://lattes.cnpq.br/..."
          :error="erros.linkCurriculoLattes"
          class="full"
        />

        <div class="divider" />

        <AppInput
          v-model="form.senha"
          label="Senha de acesso"
          :type="mostrarSenha ? 'text' : 'password'"
          placeholder="Mínimo 8 caracteres"
          minlength="8"
          required
          :error="erros.senha"
          class="full"
        >
          <template #suffix>
            <button type="button" class="toggle-senha" @click="mostrarSenha = !mostrarSenha" tabindex="-1">
              <svg v-if="!mostrarSenha" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                <circle cx="12" cy="12" r="3"/>
              </svg>
              <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
                <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
                <line x1="1" y1="1" x2="23" y2="23"/>
              </svg>
            </button>
          </template>
        </AppInput>

        <AppButton type="submit" variant="secondary" :loading="enviando" full class="full btn-submit">
          {{ enviando ? 'Enviando...' : 'Criar conta' }}
        </AppButton>

        <p class="link-login">
          Já tem conta?
          <router-link to="/admin">Fazer login</router-link>
        </p>

      </form>

      <div v-if="sucesso" class="sucesso-acoes">
        <AppButton variant="primary" full @click="$router.push('/admin')">
          Ir para o login
        </AppButton>
      </div>

    </div>
  </div>
</template>

<script>
import AppInput from '@/components/AppInput.vue'
import AppButton from '@/components/AppButton.vue'
import CidadeSelect from '@/components/CidadeSelect.vue'
import api from '@/service/api'

const FORM_VAZIO = () => ({
  nome: '', email: '', cpf: '',
  periodoVigenciaInicio: '', periodoVigenciaFim: '',
  cidadeId: null, escola: '', linkCurriculoLattes: '', senha: ''
})

export default {
  name: 'CadastroProfessor',
  components: { AppInput, AppButton, CidadeSelect },

  watch: {
    'form.cpf'(val) {
      const d = val.replace(/\D/g, '').slice(0, 11)
      let m = d
      if      (d.length > 9) m = d.replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})/, '$1.$2.$3-$4')
      else if (d.length > 6) m = d.replace(/(\d{3})(\d{3})(\d{1,3})/, '$1.$2.$3')
      else if (d.length > 3) m = d.replace(/(\d{3})(\d{1,3})/, '$1.$2')
      if (m !== val) this.form.cpf = m
    }
  },

  data() {
    return {
      form: FORM_VAZIO(),
      erros: {},
      erroGeral: '',
      sucesso: false,
      enviando: false,
      mostrarSenha: false
    }
  },

  methods: {

    validar() {
      const e = {}
      if (!this.form.nome.trim())       e.nome  = 'Nome obrigatório'
      if (!this.form.email.trim())      e.email = 'Email obrigatório'
      if (this.form.cpf.replace(/\D/g, '').length !== 11) e.cpf = 'CPF inválido'
      if (!this.form.cidadeId)          e.cidadeId = 'Selecione uma cidade'
      if (!this.form.escola.trim())     e.escola = 'Escola obrigatória'
      if (this.form.senha.length < 8)   e.senha = 'Mínimo de 8 caracteres'
      this.erros = e
      return Object.keys(e).length === 0
    },

    async cadastrar() {
      this.erroGeral = ''
      if (!this.validar()) return

      this.enviando = true
      try {
        await api.post('/api/professores/cadastro', {
          ...this.form,
          cpf: this.form.cpf.replace(/\D/g, '')
        })
        this.sucesso = true
        this.form = FORM_VAZIO()
      } catch (err) {
        this.erroGeral =
          err.response?.data?.message ||
          err.response?.data?.detail ||
          'Erro ao cadastrar. Verifique os dados e tente novamente.'
      } finally {
        this.enviando = false
      }
    }
  }
}
</script>

<style scoped>
.cadastro-page {
  min-height: 100vh;
  background: var(--oya-bg);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 1rem;
}

.cadastro-card {
  width: 100%;
  max-width: 560px;
  background: #fff;
  border: 0.5px solid var(--oya-fog);
  border-radius: var(--radius-lg);
  padding: 2.25rem 2.5rem;
  box-shadow: 0 8px 40px rgba(15, 34, 24, 0.08);
}

/* Header */
.card-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.75rem;
}

.header-icon {
  flex-shrink: 0;
  width: 3rem;
  height: 3rem;
  border-radius: var(--radius-md);
  background: var(--oya-ember);
  display: grid;
  place-items: center;
  box-shadow: 0 8px 20px rgba(217, 79, 30, 0.22);
}

.header-icon svg { width: 1.35rem; height: 1.35rem; color: #fff; }

.card-titulo {
  font-family: var(--font-display);
  font-size: 1.35rem;
  color: var(--oya-forest);
  margin-bottom: 0.15rem;
}

.card-subtitulo {
  font-size: 0.875rem;
  color: var(--oya-steel);
}

/* Período de vigência e vínculo */
.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  grid-column: 1 / -1;
}

.form-label {
  font-size: 0.82rem;
  font-weight: 500;
  color: var(--oya-stone);
}

.periodo-wrap {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.periodo-field {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  flex: 1;
  min-width: 130px;
}

.periodo-label {
  font-size: 0.75rem;
  color: var(--oya-steel);
}

.form-input-native {
  border: 1px solid var(--oya-fog);
  border-radius: var(--radius-sm);
  padding: 0.55rem 0.75rem;
  font-size: 0.9rem;
  color: var(--oya-forest);
  background: #fff;
  width: 100%;
}

.form-input-native:focus {
  outline: none;
  border-color: var(--oya-accent, #7c3aed);
}

.periodo-sep {
  font-size: 1.1rem;
  color: var(--oya-steel);
  padding-top: 1.2rem;
}

.radio-group {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.radio-option {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.875rem;
  color: var(--oya-stone);
  cursor: pointer;
}

.radio-option input[type="radio"] {
  accent-color: var(--oya-accent, #7c3aed);
  width: 1rem;
  height: 1rem;
  cursor: pointer;
}

/* Feedback */
.feedback {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 1rem 1.1rem;
  border-radius: var(--radius-md);
  margin-bottom: 1.5rem;
  font-size: 0.9rem;
}

.feedback svg { width: 1.2rem; height: 1.2rem; flex-shrink: 0; margin-top: 1px; }

.sucesso-card {
  background: rgba(107, 170, 138, 0.1);
  border: 0.5px solid rgba(74, 122, 98, 0.2);
  color: var(--oya-sage);
}

.sucesso-card svg { color: var(--oya-fern); }
.sucesso-card strong { display: block; margin-bottom: 0.2rem; }

.erro-card {
  background: rgba(217, 79, 30, 0.06);
  border: 0.5px solid rgba(217, 79, 30, 0.2);
  color: var(--oya-ember);
}

.erro-card svg { color: var(--oya-ember); }

/* Form grid */
.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.form-grid :deep(.full) { grid-column: 1 / -1; }
.full { grid-column: 1 / -1; }

.divider {
  grid-column: 1 / -1;
  border-top: 0.5px solid var(--oya-fog);
  margin: 0.25rem 0;
}

/* Show password toggle */
.toggle-senha {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  color: var(--oya-silver);
  pointer-events: all;
}

.toggle-senha svg { width: 1.1rem; height: 1.1rem; }
.toggle-senha:hover { color: var(--oya-ember); }

.btn-submit { margin-top: 0.5rem; }

.link-login {
  grid-column: 1 / -1;
  text-align: center;
  font-size: 0.875rem;
  color: var(--oya-steel);
  margin-top: -0.25rem;
}

.link-login a {
  color: var(--oya-ember);
  font-weight: 500;
  text-decoration: none;
}

.link-login a:hover { text-decoration: underline; }

.sucesso-acoes { margin-top: 1.5rem; }

@media (max-width: 520px) {
  .cadastro-card {
    padding: 1.75rem 1.25rem;
    border-radius: var(--radius-md);
  }

  .form-grid { grid-template-columns: 1fr; }

  .form-grid :deep(.full) { grid-column: 1; }
}
</style>
