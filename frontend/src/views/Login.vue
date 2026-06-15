<template>
  <div class="login-wrapper">
    <div class="login-card">
      <!-- HEADER -->
      <div class="login-header">
        <div class="login-logo">MO</div>
        <h1 class="login-titulo">Meninas Oyá</h1>
        <p class="login-subtitulo">Acesso ao Painel</p>
      </div>

      <!-- FORMULÁRIO -->
      <form @submit.prevent="login" class="login-form">
        <div v-if="erro" class="erro-msg">{{ erro }}</div>

        <div class="form-group">
          <label class="form-label">Email ou usuário</label>
          <input 
            v-model="loginUsername" 
            type="text"
            placeholder="seu@email.com ou ADMIN"
            class="form-input"
            required
          />
        </div>

        <div class="form-group">
          <label class="form-label">Senha</label>
          <input 
            v-model="loginpassword" 
            type="password" 
            placeholder="••••••••"
            class="form-input"
            required
          />
        </div>

        <button type="submit" class="btn-login">Entrar</button>
      </form>

      <!-- RODAPÉ -->
      <div class="login-footer">
        <p class="login-text">Não tem conta? 
          <button @click="$router.push('/cadastro')" class="btn-link">Criar conta</button>
        </p>
      </div>
    </div>

    <!-- DECORAÇÃO -->
    <div class="login-decor"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginUsername: '',
      loginpassword: '',
      erro: ''
    }
  },

  methods: {
    async login() {
      this.erro = ''
      try {
        const response = await fetch("http://localhost:8080/auth", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: this.loginUsername.trim().toLowerCase(),
            password: this.loginpassword
          })
        })

        if (!response.ok) {
          const body = await response.json().catch(() => ({}))
          if (response.status === 403) {
            this.erro = body.message || 'Cadastro pendente ou rejeitado. Aguarde a aprovação.'
          } else {
            this.erro = 'Email ou senha inválidos.'
          }
          return
        }

        const data = await response.json()
        const token = data.accessToken || data.accesstoken
        localStorage.setItem("token", token)
        localStorage.setItem("logado", "true")
        localStorage.setItem("usuario", JSON.stringify({ username: this.loginUsername }))

        // Decodifica o JWT para descobrir a role
        const payload = JSON.parse(atob(token.split('.')[1]))
        const authorities = payload.authorities || ''
        if (authorities.includes('ADMIN')) {
          this.$router.push('/painel-admin')
        } else {
          this.$router.push('/painel')
        }

      } catch (error) {
        console.error("Erro no login:", error)
        this.erro = 'Erro ao conectar com o servidor.'
      }
    }
  }
}
</script>
<style scoped>
.login-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: var(--oya-deep);
  position: relative;
  overflow: hidden;
}

/* decoração de fundo */
.login-decor {
  position: absolute;
  width: 420px;
  height: 420px;
  background: rgba(217, 79, 30, 0.08);
  border-radius: 50%;
  top: -120px;
  right: -100px;
  pointer-events: none;
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
}

.login-card {
  background: #fff;
  border-radius: var(--radius-lg);
  box-shadow: 0 32px 80px rgba(0, 0, 0, 0.28);
  padding: 3rem 2.5rem;
  width: 100%;
  max-width: 420px;
  position: relative;
  z-index: 10;
  animation: slideUp 0.5s ease-out;
  border: 0.5px solid var(--oya-fog);
}

/* HEADER */
.login-header {
  text-align: center;
  margin-bottom: 2rem;
}

.login-logo {
  width: 52px;
  height: 52px;
  background: var(--oya-ember);
  border-radius: var(--radius-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-family: var(--font-display);
  font-size: 1.1rem;
  letter-spacing: -0.03em;
  margin: 0 auto 1rem;
  box-shadow: 0 8px 22px rgba(217, 79, 30, 0.28);
}

.login-titulo {
  font-family: var(--font-display);
  font-size: 1.6rem;
  color: var(--oya-forest);
  margin-bottom: 4px;
}

.login-subtitulo {
  font-size: 0.7rem;
  color: var(--oya-steel);
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 2px;
}

/* FORMULÁRIO */
.login-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.form-label {
  font-size: 0.78rem;
  font-weight: 500;
  color: var(--oya-stone);
}

.form-input {
  padding: 0.9rem 1rem;
  border: 1.5px solid var(--oya-fog);
  border-radius: var(--radius-md);
  font-size: 14px;
  font-family: var(--font-body);
  transition: border-color 0.2s, box-shadow 0.2s;
  background: #FAFAF8;
  color: var(--oya-char);
  outline: none;
}

.form-input:focus {
  border-color: rgba(217, 79, 30, 0.5);
  background: #fff;
  box-shadow: 0 0 0 3px rgba(217, 79, 30, 0.08);
}

.form-input::placeholder { color: var(--oya-silver); }

.erro-msg {
  background: rgba(217, 79, 30, 0.08);
  color: var(--oya-ember);
  border: 1px solid rgba(217, 79, 30, 0.2);
  border-radius: var(--radius-sm);
  padding: 0.7rem 1rem;
  font-size: 0.85rem;
}

/* BOTÃO LOGIN */
.btn-login {
  padding: 0.9rem 1.5rem;
  background: var(--oya-ember);
  color: #fff;
  border: none;
  border-radius: var(--radius-pill);
  font-size: 0.875rem;
  font-weight: 500;
  font-family: var(--font-body);
  cursor: pointer;
  transition: background 0.2s, transform 0.2s, box-shadow 0.2s;
  margin-top: 0.5rem;
  letter-spacing: 0.02em;
}

.btn-login:hover {
  background: var(--oya-flame);
  transform: translateY(-1px);
  box-shadow: 0 8px 22px rgba(217, 79, 30, 0.28);
}

/* RODAPÉ */
.login-footer {
  text-align: center;
  margin-top: 1.5rem;
  padding-top: 1.25rem;
  border-top: 0.5px solid var(--oya-fog);
}

.login-text { font-size: 0.85rem; color: var(--oya-steel); }

.btn-link {
  background: none;
  border: none;
  color: var(--oya-ember);
  font-weight: 500;
  cursor: pointer;
  font-family: var(--font-body);
  font-size: 0.85rem;
  margin-left: 4px;
  padding: 0;
}

.btn-link:hover { color: var(--oya-flame); text-decoration: underline; }

@media (max-width: 600px) {
  .login-card { padding: 2rem 1.5rem; margin: 1rem; }
}

</style>
