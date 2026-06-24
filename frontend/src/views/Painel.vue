<template>
  <PainelShell titulo="Painel do Professor" @logout="logout">
    <template #nav>
      <!-- Dashboard -->
      <button class="nav-item" :class="{ ativo: abaAtiva === 'dashboard' }" @click="abaAtiva = 'dashboard'">
        <svg class="icon-aba" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="3" y="3" width="7" height="7" rx="1"/>
          <rect x="14" y="3" width="7" height="7" rx="1"/>
          <rect x="3" y="14" width="7" height="7" rx="1"/>
          <rect x="14" y="14" width="7" height="7" rx="1"/>
        </svg>
        <span class="nav-label">Dashboard</span>
      </button>
      <!-- Atividades -->
      <button class="nav-item" :class="{ ativo: abaAtiva === 'atividades' }" @click="abaAtiva = 'atividades'; carregarMinhasAtividades()">
        <svg class="icon-aba" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="3" y="3" width="18" height="18" rx="2"/>
          <path d="M9 11h6M9 15h6"/>
        </svg>
        <span class="nav-label">Atividades</span>
      </button>
      <!-- Meu Perfil -->
      <button class="nav-item" :class="{ ativo: abaAtiva === 'perfil' }" @click="abaAtiva = 'perfil'; carregarPerfil()">
        <svg class="icon-aba" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
          <circle cx="12" cy="7" r="4"/>
        </svg>
        <span class="nav-label">Meu Perfil</span>
      </button>
      <!-- Meus Alunos -->
      <button class="nav-item" :class="{ ativo: abaAtiva === 'alunos' }" @click="abaAtiva = 'alunos'; carregarMeusAlunos()">
        <svg class="icon-aba" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="8" r="4"/>
          <path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/>
        </svg>
        <span class="nav-label">Meus estudantes</span>
      </button>
    </template>
    <template #icon>
      <svg class="icon-header" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    </template>

    <!-- â”€â”€ DASHBOARD â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ -->
    <div v-if="abaAtiva === 'dashboard'">
      <div class="dash-grid">
        <!-- Status -->
        <div class="dash-card">
          <div class="dash-card-icon ic-status">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
              <polyline points="22 4 12 14.01 9 11.01"/>
            </svg>
          </div>
          <div class="dash-card-info">
            <span class="dash-label">Status do Cadastro</span>
            <span class="status-badge" :class="statusClass">{{ perfilStatus || '—' }}</span>
          </div>
        </div>

        <!-- Total Atividades -->
        <div class="dash-card">
          <div class="dash-card-icon ic-ativ">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="3" width="18" height="18" rx="2"/>
              <path d="M9 11h6M9 15h6"/>
            </svg>
          </div>
          <div class="dash-card-info">
            <span class="dash-label">Atividades Publicadas</span>
            <span class="dash-valor">{{ minhasAtividades.length }}</span>
          </div>
        </div>

        <!-- IdentificaÃ§Ã£o -->
        <div class="dash-card dash-card-wide">
          <div class="dash-card-icon ic-perfil">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
          </div>
          <div class="dash-card-info">
            <span class="dash-label">Identificação</span>
            <span class="dash-valor-nome">{{ perfilNome || '—' }}</span>
            <span class="dash-sub">{{ perfilEmail }}</span>
            <span v-if="perfilUf" class="dash-sub">{{ perfilEscola || 'Sem escola vinculada' }} · {{ perfilUf }}</span>
          </div>
        </div>

        <!-- Lattes -->
        <div class="dash-card dash-card-wide">
          <div class="dash-card-icon ic-lattes">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
            </svg>
          </div>
          <div class="dash-card-info">
            <span class="dash-label">Currículo Lattes</span>
            <a v-if="perfilLattes" :href="perfilLattes" target="_blank" rel="noopener" class="lattes-link">Ver Lattes</a>
            <span v-else class="dash-sub">Não cadastrado</span>
          </div>
        </div>
      </div>
    </div>

    <!-- â”€â”€ ATIVIDADES â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ -->
    <div v-else-if="abaAtiva === 'atividades'">
      <!-- Lista de atividades -->
      <div class="secao-card mb-md">
        <div class="secao-header">
          <svg class="icon-secao" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/>
            <rect x="9" y="3" width="6" height="4" rx="1"/>
          </svg>
          <h2 class="secao-titulo">Minhas Atividades</h2>
        </div>

        <div v-if="carregandoAtividades" class="loading-msg">Carregando...</div>
        <div v-else-if="minhasAtividades.length === 0" class="vazio-msg">Nenhuma atividade publicada ainda.</div>
        <div v-else class="table-wrapper">
          <table class="ativ-table">
            <thead>
              <tr>
                <th>Título</th>
                <th>Data</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="a in minhasAtividades" :key="a.id">
                <td class="ativ-titulo">{{ a.titulo }}</td>
                <td class="ativ-data">{{ formatarData(a.data) }}</td>
                <td class="ativ-acoes">
                  <button class="btn-editar" @click="abrirEditarAtividade(a)" title="Editar atividade">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                    </svg>
                  </button>
                  <button class="btn-apagar" @click="deletarAtividade(a.id)" title="Excluir atividade">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <polyline points="3 6 5 6 21 6"/>
                      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
                      <path d="M10 11v6M14 11v6"/>
                    </svg>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- FormulÃ¡rio nova atividade -->
      <div class="secao-card">
        <div class="secao-header">
          <svg class="icon-secao" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="12" y1="5" x2="12" y2="19"/>
            <line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
          <h2 class="secao-titulo">Nova Atividade</h2>
        </div>

        <form @submit.prevent="publicar">
          <div class="form-grid">
            <div class="form-group">
              <label>Título</label>
              <input v-model="titulo" type="text" placeholder="Título da atividade" class="form-input" required />
            </div>
            <div class="form-group">
              <label>Data</label>
              <input v-model="dataNoticia" type="date" class="form-input" required />
            </div>
            <div class="form-group full">
              <label>Descrição</label>
              <textarea v-model="descricao" placeholder="Descrição detalhada..." class="form-textarea" rows="4" required></textarea>
            </div>
            <div class="form-group">
              <label class="checkbox-label">
                <input type="checkbox" v-model="temLocalizacao" class="checkbox-input" />
                Tem localização?
              </label>
              <input
                v-if="temLocalizacao"
                v-model="localizacao"
                type="text"
                placeholder="Ex: UFMA-CCET, Sala 10"
                class="form-input mt-sm"
              />
            </div>
            <div class="form-group full">
              <label>Imagem 1</label>
              <div class="file-upload">
                <input type="file" @change="e => file = e.target.files[0]" accept="image/*" class="file-input" id="foto-atividade" />
                <label for="foto-atividade" class="file-label">
                  <svg class="icon-file" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                    <polyline points="17 8 12 3 7 8"/>
                    <line x1="12" y1="3" x2="12" y2="15"/>
                  </svg>
                  {{ file ? file.name : 'Clique para selecionar imagem' }}
                </label>
              </div>
            </div>
            <div class="form-group full">
              <label>Imagem 2 (opcional)</label>
              <div class="file-upload">
                <input type="file" @change="e => file2 = e.target.files[0]" accept="image/*" class="file-input" id="foto2-atividade" />
                <label for="foto2-atividade" class="file-label">
                  <svg class="icon-file" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                    <polyline points="17 8 12 3 7 8"/>
                    <line x1="12" y1="3" x2="12" y2="15"/>
                  </svg>
                  {{ file2 ? file2.name : 'Clique para selecionar segunda imagem' }}
                </label>
              </div>
            </div>
          </div>

          <button type="submit" class="btn-salvar">
            <svg class="icon-btn" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
            Publicar Atividade
          </button>
        </form>

        <transition name="fade">
          <div v-if="publicado" class="sucesso-msg">
            <svg class="icon-msg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
            Atividade publicada com sucesso!
          </div>
        </transition>

        <transition name="fade">
          <div v-if="erroMsg" class="erro-msg">
            <svg class="icon-msg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            {{ erroMsg }}
          </div>
        </transition>
      </div>
    </div>

    <!-- â”€â”€ MEU PERFIL â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ -->
    <div v-else-if="abaAtiva === 'perfil'">
      <div class="secao-card">
        <div class="secao-header">
          <svg class="icon-secao" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
            <circle cx="12" cy="7" r="4"/>
          </svg>
          <h2 class="secao-titulo">Meu Perfil</h2>
        </div>

        <form @submit.prevent="salvarPerfil">
          <div class="form-grid">
            <div class="form-group">
              <label>Nome</label>
              <input v-model="editandoPerfil.nome" type="text" class="form-input" placeholder="Seu nome completo" />
            </div>
            <div class="form-group">
              <label>UF</label>
              <select v-model="editandoPerfil.uf" class="form-input">
                <option value="">Selecione</option>
                <option v-for="u in ufs" :key="u" :value="u">{{ u }}</option>
              </select>
            </div>
            <div class="form-group">
              <label>E-mail</label>
              <input v-model="editandoPerfil.email" type="email" class="form-input" placeholder="seu@email.com" />
            </div>
            <div class="form-group">
              <label>Nova Senha (opcional)</label>
              <input v-model="editandoPerfil.senha" type="password" class="form-input" placeholder="Mínimo 8 caracteres" autocomplete="new-password" />
            </div>
            <div class="form-group">
              <label>Escola / Instituição</label>
              <input v-model="editandoPerfil.escola" type="text" class="form-input" placeholder="Nome da sua instituição" />
            </div>
            <div class="form-group full">
              <label>Período de Vigência</label>
              <div class="periodo-wrap">
                <div class="periodo-field">
                  <span class="periodo-label">Início</span>
                  <input v-model="editandoPerfil.periodoVigenciaInicio" type="date" class="form-input" />
                </div>
                <span class="periodo-sep">–</span>
                <div class="periodo-field">
                  <span class="periodo-label">Fim</span>
                  <input v-model="editandoPerfil.periodoVigenciaFim" type="date" class="form-input" />
                </div>
              </div>
            </div>
            <div class="form-group full">
              <label>Link do Currículo Lattes</label>
              <input v-model="editandoPerfil.linkCurriculoLattes" type="url" class="form-input" placeholder="http://lattes.cnpq.br/..." />
            </div>
          </div>

          <button type="submit" class="btn-salvar">
            <svg class="icon-btn" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
            Salvar Alterações
          </button>
        </form>

        <transition name="fade">
          <div v-if="perfilSalvo" class="sucesso-msg">
            <svg class="icon-msg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
            Perfil atualizado com sucesso!
          </div>
        </transition>

        <transition name="fade">
          <div v-if="erroPerfilMsg" class="erro-msg">
            <svg class="icon-msg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            {{ erroPerfilMsg }}
          </div>
        </transition>
      </div>
    </div>

    <!-- ── MEUS ALUNOS ─────────────────────────────────────── -->
    <div v-else-if="abaAtiva === 'alunos'">
      <div class="secao-card">
        <div class="secao-header">
          <svg class="icon-secao" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="8" r="4"/>
            <path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/>
          </svg>
          <h2 class="secao-titulo">Estudantes</h2>
          <button @click="mostrarFormAluno = !mostrarFormAluno" class="btn-novo">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="13" height="13">
              <template v-if="!mostrarFormAluno"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></template>
              <template v-else><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></template>
            </svg>
            {{ mostrarFormAluno ? 'Cancelar' : 'Novo Aluno' }}
          </button>
        </div>

        <transition name="fade">
          <div v-if="sucessoAluno" class="sucesso-msg">
            <svg class="icon-msg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
            Aluno cadastrado com sucesso!
          </div>
        </transition>

        <transition name="fade">
          <div v-if="erroAlunoMsg" class="erro-msg">
            <svg class="icon-msg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            {{ erroAlunoMsg }}
          </div>
        </transition>

        <div v-if="mostrarFormAluno" class="form-bloco">
          <div class="form-grid">
            <div class="form-group">
              <label>Nome da estudante</label>
              <input v-model="novoAluno.nome" type="text" placeholder="Nome completo" class="form-input" />
            </div>
            <div class="form-group">
              <label>Instituição</label>
              <select v-model="novoAluno.escolaId" class="form-input">
                <option value="">Selecione a instituição</option>
                <option v-for="e in listaEscolas" :key="e.id" :value="e.id">{{ e.nome }}</option>
              </select>
            </div>
            <div class="form-group full">
              <label>Vínculo</label>
              <div class="radio-group">
                <label class="radio-option"><input type="radio" v-model="novoAluno.vinculo" value="BOLSISTA_ADC" /> Bolsista ADC</label>
                <label class="radio-option"><input type="radio" v-model="novoAluno.vinculo" value="BOLSISTA_ICJ" /> Bolsista ICJ</label>
                <label class="radio-option"><input type="radio" v-model="novoAluno.vinculo" value="BOLSISTA_IC" /> Bolsista IC</label>
                <label class="radio-option"><input type="radio" v-model="novoAluno.vinculo" value="VOLUNTARIA" /> Voluntária</label>
              </div>
            </div>
          </div>
          <button @click="salvarAluno" class="btn-salvar" :disabled="!novoAluno.nome.trim()">
            <svg class="icon-btn" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
            Cadastrar estudante
          </button>
        </div>

        <div v-if="meusAlunos.length === 0 && !mostrarFormAluno" class="vazio-msg">Nenhuma estudante cadastrado ainda.</div>
        <div v-else-if="meusAlunos.length > 0" class="table-wrapper">
          <table class="alunos-table">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Vínculo</th>
                <th>Instituição</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="a in meusAlunos" :key="a.id">
                <td class="aluno-nome">{{ a.nome }}</td>
                <td><span class="vinculo-badge" :class="vinculoClass(a.vinculo)">{{ vinculoLabel(a.vinculo) }}</span></td>
                <td class="aluno-escola">{{ a.escola?.nome || '—' }}</td>
                <td class="aluno-acoes">
                  <button @click="deletarAluno(a.id)" class="btn-apagar" title="Remover aluno">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="15" height="15">
                      <polyline points="3 6 5 6 21 6"/>
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                    </svg>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

  </PainelShell>

  <!-- MODAL EDITAR ATIVIDADE -->
  <div v-if="modalEdicaoAtividade" class="modal-overlay" @click.self="modalEdicaoAtividade = false">
    <div class="modal-card">
      <div class="modal-header">
        <h3>Editar Atividade</h3>
        <button @click="modalEdicaoAtividade = false" class="modal-fechar">&times;</button>
      </div>
      <div class="form-grid">
        <div class="form-group">
          <label>Título</label>
          <input v-model="editandoAtividade.titulo" type="text" class="form-input" />
        </div>
        <div class="form-group">
          <label>Data</label>
          <input v-model="editandoAtividade.data" type="date" class="form-input" />
        </div>
        <div class="form-group full">
          <label>Descrição</label>
          <textarea v-model="editandoAtividade.descricao" class="form-textarea" rows="4"></textarea>
        </div>
        <div class="form-group">
          <label class="checkbox-label">
            <input type="checkbox" v-model="editandoAtividade.temLocalizacao" class="checkbox-input" />
            Tem localização?
          </label>
          <input v-if="editandoAtividade.temLocalizacao" v-model="editandoAtividade.localizacao" type="text" placeholder="Ex: UFMA-CCET, Sala 10" class="form-input mt-sm" />
        </div>
        <div class="form-group full">
          <label>Imagem 1 (deixe vazio para manter a atual)</label>
          <input type="file" @change="e => editandoAtividade.foto = e.target.files[0]" accept="image/*" class="form-input" />
        </div>
        <div class="form-group full">
          <label>Imagem 2 (deixe vazio para manter a atual)</label>
          <input type="file" @change="e => editandoAtividade.foto2 = e.target.files[0]" accept="image/*" class="form-input" />
        </div>
      </div>
      <div class="modal-footer">
        <button @click="salvarEdicaoAtividade" class="btn-salvar">Salvar</button>
        <button @click="modalEdicaoAtividade = false" class="btn-cancelar">Cancelar</button>
      </div>
    </div>
  </div>
</template>

<script>
import PainelShell from '@/components/PainelShell.vue'

export default {
  components: { PainelShell },
  data() {
    return {
      abaAtiva: 'dashboard',

      // professor
      professorId: null,
      perfilNome: '',
      perfilEmail: '',
      perfilVigenciaInicio: '',
      perfilVigenciaFim: '',
      perfilUf: '',
      perfilEscola: '',
      perfilLattes: '',
      perfilStatus: '',

      // editar perfil
      editandoPerfil: { nome: '', email: '', senha: '', periodoVigenciaInicio: '', periodoVigenciaFim: '', uf: '', escola: '', linkCurriculoLattes: '' },
      perfilSalvo: false,
      erroPerfilMsg: '',

      // atividades
      minhasAtividades: [],
      carregandoAtividades: false,
      editandoAtividade: { id: null, titulo: '', data: '', descricao: '', localizacao: '', temLocalizacao: false, foto: null, foto2: null },
      modalEdicaoAtividade: false,

      // form nova atividade
      titulo: '',
      dataNoticia: '',
      descricao: '',
      temLocalizacao: false,
      localizacao: '',
      file: null,
      file2: null,
      publicado: false,
      erroMsg: '',

      ufs: ['AC','AL','AM','AP','BA','CE','DF','ES','GO','MA','MG','MS','MT','PA','PB','PE','PI','PR','RJ','RN','RO','RR','RS','SC','SE','SP','TO'],

      // alunos
      meusAlunos: [],
      novoAluno: { nome: '', escolaId: '', vinculo: '' },
      listaEscolas: [],
      mostrarFormAluno: false,
      sucessoAluno: false,
      erroAlunoMsg: ''
    }
  },

  computed: {
    statusClass() {
      const s = this.perfilStatus
      if (s === 'APROVADO') return 'badge-aprovado'
      if (s === 'REJEITADO') return 'badge-rejeitado'
      return 'badge-pendente'
    }
  },

  mounted() {
    if (localStorage.getItem("logado") !== "true") {
      this.$router.push("/admin")
      return
    }
    this.carregarDashboard()
  },

  methods: {
    token() {
      return localStorage.getItem("token")
    },

    async carregarDashboard() {
      try {
        const [profRes, ativRes] = await Promise.all([
          fetch("https://meninas-oya-v2.onrender.com/api/professores/me", {
            headers: { "Authorization": `Bearer ${this.token()}` }
          }),
          fetch("https://meninas-oya-v2.onrender.com/atividades/minhas", {
            headers: { "Authorization": `Bearer ${this.token()}` }
          })
        ])
        if (profRes.ok) {
          const prof = await profRes.json()
          this.professorId = prof.id
          this.perfilNome = prof.nome
          this.perfilEmail = prof.email
          this.perfilVigenciaInicio = prof.periodoVigenciaInicio || ''
          this.perfilVigenciaFim = prof.periodoVigenciaFim || ''
          this.perfilUf = prof.uf
          this.perfilEscola = prof.escola
          this.perfilLattes = prof.linkCurriculoLattes
          this.perfilStatus = prof.status
        }
        if (ativRes.ok) {
          this.minhasAtividades = await ativRes.json()
        }
      } catch (e) {
        console.error("Erro ao carregar dashboard:", e)
      }
    },

    async carregarMinhasAtividades() {
      this.carregandoAtividades = true
      try {
        const res = await fetch("https://meninas-oya-v2.onrender.com/atividades/minhas", {
          headers: { "Authorization": `Bearer ${this.token()}` }
        })
        if (res.ok) this.minhasAtividades = await res.json()
      } finally {
        this.carregandoAtividades = false
      }
    },

    async carregarPerfil() {
      if (!this.professorId) await this.carregarDashboard()
      this.editandoPerfil = {
        nome: this.perfilNome,
        email: this.perfilEmail,
        senha: '',
        periodoVigenciaInicio: this.perfilVigenciaInicio,
        periodoVigenciaFim: this.perfilVigenciaFim,
        uf: this.perfilUf,
        escola: this.perfilEscola,
        linkCurriculoLattes: this.perfilLattes
      }
    },

    abrirEditarAtividade(a) {
      this.editandoAtividade = {
        id: a.id,
        titulo: a.titulo || '',
        data: a.data || '',
        descricao: a.descricao || '',
        localizacao: a.localizacao || '',
        temLocalizacao: !!a.localizacao,
        foto: null,
        foto2: null
      }
      this.modalEdicaoAtividade = true
    },

    async salvarEdicaoAtividade() {
      try {
        const formData = new FormData()
        formData.append('titulo', this.editandoAtividade.titulo)
        formData.append('descricao', this.editandoAtividade.descricao)
        formData.append('data', this.editandoAtividade.data)
        if (this.editandoAtividade.temLocalizacao && this.editandoAtividade.localizacao)
          formData.append('localizacao', this.editandoAtividade.localizacao)
        if (this.editandoAtividade.foto) formData.append('foto', this.editandoAtividade.foto)
        if (this.editandoAtividade.foto2) formData.append('foto2', this.editandoAtividade.foto2)

        const res = await fetch(`https://meninas-oya-v2.onrender.com/atividades/${this.editandoAtividade.id}`, {
          method: 'PUT',
          headers: { 'Authorization': `Bearer ${this.token()}` },
          body: formData
        })
        if (!res.ok) throw new Error(await res.text())
        this.modalEdicaoAtividade = false
        await this.carregarMinhasAtividades()
      } catch (e) { console.error('Erro ao editar atividade:', e) }
    },

    async deletarAtividade(id) {
      if (!confirm("Deseja excluir esta atividade?")) return
      try {
        const res = await fetch(`https://meninas-oya-v2.onrender.com/atividades/${id}`, {
          method: "DELETE",
          headers: { "Authorization": `Bearer ${this.token()}` }
        })
        if (res.ok) {
          this.minhasAtividades = this.minhasAtividades.filter(a => a.id !== id)
        }
      } catch (e) {
        console.error("Erro ao deletar:", e)
      }
    },

    async publicar() {
      try {
        const formData = new FormData()
        formData.append("titulo", this.titulo)
        formData.append("descricao", this.descricao)
        formData.append("data", this.dataNoticia)
        if (this.temLocalizacao && this.localizacao) formData.append("localizacao", this.localizacao)
        if (this.file) formData.append("foto", this.file)
        if (this.file2) formData.append("foto2", this.file2)

        const res = await fetch("https://meninas-oya-v2.onrender.com/atividades", {
          method: "POST",
          headers: { "Authorization": `Bearer ${this.token()}` },
          body: formData
        })

        if (!res.ok) {
          const body = await res.json().catch(() => null)
          this.erroMsg = body?.message || body?.error || "Erro ao salvar a atividade."
          setTimeout(() => { this.erroMsg = '' }, 5000)
          return
        }

        const nova = await res.json()
        this.minhasAtividades.push(nova)
        this.erroMsg = ''
        this.publicado = true
        setTimeout(() => { this.publicado = false }, 4000)
        this.titulo = ''
        this.dataNoticia = ''
        this.descricao = ''
        this.temLocalizacao = false
        this.localizacao = ''
        this.file = null
        this.file2 = null
      } catch (e) {
        this.erroMsg = "Erro de conexÃ£o: " + e.message
        setTimeout(() => { this.erroMsg = '' }, 5000)
      }
    },

    async salvarPerfil() {
      try {
        const payload = { ...this.editandoPerfil }
        if (!payload.senha) delete payload.senha

        const res = await fetch(`https://meninas-oya-v2.onrender.com/api/professores/${this.professorId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${this.token()}`
          },
          body: JSON.stringify(payload)
        })

        if (!res.ok) {
          const body = await res.json().catch(() => null)
          this.erroPerfilMsg = body?.message || body?.error || "Erro ao salvar perfil."
          setTimeout(() => { this.erroPerfilMsg = '' }, 5000)
          return
        }

        const prof = await res.json()
        this.perfilNome = prof.nome
        this.perfilEmail = prof.email
        this.perfilVigenciaInicio = prof.periodoVigenciaInicio || ''
        this.perfilVigenciaFim = prof.periodoVigenciaFim || ''
        this.perfilUf = prof.uf
        this.perfilEscola = prof.escola
        this.perfilLattes = prof.linkCurriculoLattes
        this.erroPerfilMsg = ''
        this.perfilSalvo = true
        setTimeout(() => { this.perfilSalvo = false }, 4000)
      } catch (e) {
        this.erroPerfilMsg = "Erro de conexÃ£o: " + e.message
        setTimeout(() => { this.erroPerfilMsg = '' }, 5000)
      }
    },

    formatarData(d) {
      if (!d) return '—'
      const [y, m, day] = d.split('-')
      return `${day}/${m}/${y}`
    },

    logout() {
      localStorage.removeItem("logado")
      localStorage.removeItem("usuario")
      localStorage.removeItem("token")
      this.$router.push("/admin")
    },

    async carregarMeusAlunos() {
      try {
        const [alunosRes, escolasRes] = await Promise.all([
          fetch('https://meninas-oya-v2.onrender.com/api/alunos', {
            headers: { 'Authorization': `Bearer ${this.token()}` }
          }),
          fetch('https://meninas-oya-v2.onrender.com/api/escolas/simples')
        ])
        if (alunosRes.ok) this.meusAlunos = await alunosRes.json()
        if (escolasRes.ok) this.listaEscolas = await escolasRes.json()
      } catch (e) { console.error('Erro ao carregar alunos:', e) }
    },

    vinculoLabel(v) {
      const map = {
        'BOLSISTA_ADC': 'Bolsista ADC',
        'BOLSISTA_ICJ': 'Bolsista ICJ',
        'BOLSISTA_IC': 'Bolsista IC',
        'VOLUNTARIA': 'Voluntária',
      }
      return map[v] || '—'
    },

    vinculoClass(v) {
      const map = {
        'BOLSISTA_ADC': 'vinculo-adc',
        'BOLSISTA_ICJ': 'vinculo-icj',
        'BOLSISTA_IC': 'vinculo-ic',
        'VOLUNTARIA': 'vinculo-vol',
      }
      return map[v] || 'vinculo-null'
    },

    async salvarAluno() {
      if (!this.novoAluno.nome.trim()) return
      try {
        const res = await fetch('https://meninas-oya-v2.onrender.com/api/alunos', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.token()}`
          },
          body: JSON.stringify({
            nome: this.novoAluno.nome,
            escolaId: this.novoAluno.escolaId || null,
            vinculo: this.novoAluno.vinculo || null
          })
        })
        if (!res.ok) throw new Error(await res.text())
        this.novoAluno = { nome: '', escolaId: '', vinculo: '' }
        this.mostrarFormAluno = false
        this.erroAlunoMsg = ''
        this.sucessoAluno = true
        setTimeout(() => { this.sucessoAluno = false }, 3000)
        await this.carregarMeusAlunos()
      } catch (e) {
        this.erroAlunoMsg = 'Erro ao salvar aluno. Tente novamente.'
        setTimeout(() => { this.erroAlunoMsg = '' }, 5000)
        console.error('Erro ao salvar aluno:', e)
      }
    },

    async deletarAluno(id) {
      if (!confirm('Deseja remover este aluno?')) return
      try {
        const res = await fetch(`https://meninas-oya-v2.onrender.com/api/alunos/${id}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${this.token()}` }
        })
        if (res.ok) this.meusAlunos = this.meusAlunos.filter(a => a.id !== id)
      } catch (e) { console.error('Erro ao deletar aluno:', e) }
    }
  }
}
</script>

<style scoped>
.icon-header { width: 1.75rem; height: 1.75rem; color: var(--oya-glow); }

/* â”€â”€ NAV SIDEBAR â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
.nav-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  padding: 0.7rem 0.85rem;
  border: none;
  border-radius: var(--radius-md);
  background: transparent;
  color: rgba(168, 213, 192, 0.65);
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
  text-align: left;
  font-family: var(--font-body);
}
.nav-item:hover { background: rgba(255,255,255,0.07); color: var(--oya-mint); }
.nav-item.ativo  { background: rgba(217,79,30,0.18); color: var(--oya-warm); }
.nav-label { flex: 1; }
.icon-aba  { width: 1rem; height: 1rem; flex-shrink: 0; }

/* â”€â”€ DASHBOARD â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
.dash-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
}

.dash-card {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  background: #fff;
  border: 0.5px solid var(--oya-fog);
  border-radius: var(--radius-lg);
  padding: 1.25rem 1.5rem;
  box-shadow: 0 2px 12px rgba(26, 58, 42, 0.05);
}

.dash-card-wide { grid-column: 1 / -1; }

.dash-card-icon {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.dash-card-icon svg { width: 1.2rem; height: 1.2rem; }

.ic-status  { background: rgba(107, 170, 138, 0.12); color: var(--oya-sage); }
.ic-ativ    { background: rgba(217, 79, 30, 0.10);  color: var(--oya-ember); }
.ic-perfil  { background: rgba(26, 58, 42, 0.08);   color: var(--oya-forest); }
.ic-lattes  { background: rgba(100, 149, 237, 0.12); color: #4a7cc5; }

.dash-card-info {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  min-width: 0;
}

.dash-label {
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--oya-stone);
  font-weight: 600;
}

.dash-valor {
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--oya-forest);
  font-family: var(--font-display);
  line-height: 1;
}

.dash-valor-nome {
  font-size: 1rem;
  font-weight: 600;
  color: var(--oya-forest);
  font-family: var(--font-display);
}

.dash-sub {
  font-size: 0.82rem;
  color: var(--oya-stone);
}

.status-badge {
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.75rem;
  border-radius: 2rem;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  width: fit-content;
}

.badge-aprovado  { background: rgba(107, 170, 138, 0.15); color: #2e7d52; }
.badge-pendente  { background: rgba(220, 170, 50, 0.18);  color: #8a6400; }
.badge-rejeitado { background: rgba(217, 79, 30, 0.12);   color: var(--oya-ember); }

.lattes-link {
  font-size: 0.85rem;
  color: #4a7cc5;
  text-decoration: none;
  font-weight: 500;
}
.lattes-link:hover { text-decoration: underline; }

/* â”€â”€ ATIVIDADES TABLE â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
.mb-md { margin-bottom: 1.25rem; }

.table-wrapper { overflow-x: auto; }

.ativ-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.875rem;
}

.ativ-table th {
  text-align: left;
  padding: 0.55rem 0.75rem;
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.07em;
  color: var(--oya-stone);
  border-bottom: 1.5px solid var(--oya-fog);
}

.ativ-table td {
  padding: 0.75rem;
  border-bottom: 1px solid rgba(0,0,0,0.04);
  color: var(--oya-char);
  vertical-align: middle;
}

.ativ-table tr:last-child td { border-bottom: none; }
.ativ-table tr:hover td { background: rgba(26, 58, 42, 0.02); }

.ativ-titulo { font-weight: 500; }
.ativ-data   { color: var(--oya-stone); white-space: nowrap; }
.ativ-acoes  { width: 5rem; text-align: right; display: flex; gap: 0.25rem; justify-content: flex-end; }

.btn-editar {
  background: transparent;
  border: none;
  padding: 0.35rem;
  cursor: pointer;
  color: var(--oya-steel);
  border-radius: var(--radius-md);
  transition: color 0.15s, background 0.15s;
  display: inline-flex;
}
.btn-editar svg { width: 1rem; height: 1rem; }
.btn-editar:hover { color: var(--oya-forest); background: rgba(26,58,42,0.08); }

.btn-apagar {
  background: transparent;
  border: none;
  padding: 0.35rem;
  cursor: pointer;
  color: var(--oya-stone);
  border-radius: var(--radius-md);
  transition: color 0.15s, background 0.15s;
  display: inline-flex;
}
.btn-apagar svg { width: 1rem; height: 1rem; }
.btn-apagar:hover { color: var(--oya-ember); background: rgba(217, 79, 30, 0.08); }

/* Modal */
.modal-overlay {
  position: fixed; inset: 0;
  background: rgba(0,0,0,0.45);
  display: flex; align-items: center; justify-content: center;
  z-index: 999;
}
.modal-card {
  background: #fff;
  border-radius: var(--radius-lg, 1rem);
  padding: 2rem;
  width: min(90vw, 560px);
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 8px 40px rgba(0,0,0,0.2);
}
.modal-header {
  display: flex; align-items: center; justify-content: space-between;
  margin-bottom: 1.25rem;
}
.modal-header h3 { font-family: var(--font-display); color: var(--oya-forest); margin: 0; }
.modal-fechar {
  background: none; border: none; font-size: 1.4rem; cursor: pointer;
  color: var(--oya-steel); line-height: 1;
}
.modal-footer {
  display: flex;
  gap: 0.75rem;
  justify-content: flex-end;
  align-items: center;
  margin-top: 1.5rem;
  padding-top: 1.25rem;
  border-top: 1px solid var(--oya-fog);
}
.modal-footer .btn-salvar {
  margin-top: 0 !important;
  padding: 0.6rem 1.5rem !important;
  font-size: 0.9rem;
  border-radius: var(--radius-pill);
  width: 140px;
  height: 2.5rem;
  flex: none;
}
.btn-cancelar {
  padding: 0.6rem 1.5rem;
  border: 1.5px solid var(--oya-fog);
  border-radius: var(--radius-pill);
  background: #fff;
  cursor: pointer;
  font-size: 0.9rem;
  color: var(--oya-steel);
  font-family: var(--font-body);
  font-weight: 500;
  width: 140px;
  height: 2.5rem;
  flex: none;
  transition: background 0.2s;
}
.btn-cancelar:hover { background: var(--oya-sand); }
.form-textarea {
  width: 100%; padding: 0.6rem 0.85rem;
  border: 1.5px solid var(--oya-fog);
  border-radius: var(--radius-md);
  font-family: var(--font-body);
  font-size: 0.925rem;
  resize: vertical;
  color: var(--oya-forest);
  background: var(--oya-sand, #faf8f5);
}

.loading-msg,
.vazio-msg {
  padding: 1.5rem;
  text-align: center;
  color: var(--oya-stone);
  font-size: 0.875rem;
}

/* â”€â”€ SHARED FORM STYLES â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
.icon-btn,
.icon-secao,
.icon-msg,
.icon-file {
  width: 1.1rem;
  height: 1.1rem;
  flex-shrink: 0;
}

.secao-card {
  background: #fff;
  border: 0.5px solid var(--oya-fog);
  border-radius: var(--radius-lg);
  padding: 1.5rem;
  box-shadow: 0 4px 24px rgba(26, 58, 42, 0.06);
}

.secao-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.25rem;
}

.icon-secao { color: var(--oya-ember); }

.secao-titulo {
  font-family: var(--font-display);
  font-size: 1.15rem;
  color: var(--oya-forest);
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.form-group.full { grid-column: 1 / -1; }

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

.form-group label {
  font-size: 0.78rem;
  font-weight: 500;
  color: var(--oya-stone);
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.78rem !important;
  font-weight: 500;
  color: var(--oya-stone);
  cursor: pointer;
}

.checkbox-input {
  width: 1rem;
  height: 1rem;
  accent-color: var(--oya-ember);
  cursor: pointer;
}

.mt-sm { margin-top: 0.4rem; }

.form-input,
.form-textarea {
  width: 100%;
  padding: 0.9rem 1rem;
  border: 1.5px solid var(--oya-fog);
  border-radius: var(--radius-md);
  background: #FAFAF8;
  color: var(--oya-char);
  font-family: var(--font-body);
  font-size: 14px;
  transition: border-color 0.2s, box-shadow 0.2s;
  outline: none;
  box-sizing: border-box;
}

.form-input:focus,
.form-textarea:focus {
  border-color: rgba(217, 79, 30, 0.5);
  box-shadow: 0 0 0 3px rgba(217, 79, 30, 0.08);
  background: #fff;
}

.form-textarea {
  resize: vertical;
  min-height: 130px;
}

.file-upload { position: relative; }

.file-input {
  position: absolute;
  opacity: 0;
  pointer-events: none;
}

.file-label {
  display: inline-flex;
  align-items: center;
  gap: 0.65rem;
  width: 100%;
  min-height: 56px;
  padding: 0.9rem 1rem;
  border: 1.5px dashed rgba(217, 79, 30, 0.35);
  border-radius: var(--radius-md);
  background: var(--oya-sand);
  color: var(--oya-stone);
  cursor: pointer;
  transition: background 0.2s, border-color 0.2s;
  font-family: var(--font-body);
  font-size: 14px;
}

.file-label:hover {
  background: rgba(217, 79, 30, 0.06);
  border-color: var(--oya-ember);
}

.btn-salvar {
  margin-top: 1.25rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.55rem;
  padding: 0.9rem 1.5rem;
  border: none;
  border-radius: var(--radius-pill);
  background: var(--oya-ember);
  color: #fff;
  font-weight: 500;
  font-size: 0.875rem;
  cursor: pointer;
  transition: background 0.2s, transform 0.2s, box-shadow 0.2s;
  font-family: var(--font-body);
}

.btn-salvar:hover {
  background: var(--oya-flame);
  transform: translateY(-1px);
  box-shadow: 0 10px 28px rgba(217, 79, 30, 0.25);
}

.sucesso-msg {
  margin-top: 1rem;
  display: flex;
  align-items: flex-start;
  gap: 0.55rem;
  padding: 0.9rem 1.1rem;
  border-radius: var(--radius-md);
  background: rgba(107, 170, 138, 0.12);
  border: 1px solid rgba(74, 122, 98, 0.25);
  color: var(--oya-sage);
  font-weight: 500;
  font-size: 0.9rem;
}

.erro-msg {
  margin-top: 1rem;
  display: flex;
  align-items: flex-start;
  gap: 0.55rem;
  padding: 0.9rem 1.1rem;
  border-radius: var(--radius-md);
  background: rgba(217, 79, 30, 0.08);
  border: 1px solid rgba(217, 79, 30, 0.2);
  color: var(--oya-ember);
  font-weight: 500;
  font-size: 0.9rem;
}

.fade-enter-active, .fade-leave-active { transition: opacity 0.3s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

/* ── MEUS ALUNOS ────────────────────────────────────────── */
.btn-novo {
  margin-left: auto;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.42rem 0.85rem;
  border: 1.5px solid var(--oya-fog);
  border-radius: var(--radius-pill);
  background: #fff;
  color: var(--oya-stone);
  font-family: var(--font-body);
  font-size: 0.8rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.18s, border-color 0.18s, color 0.18s;
}
.btn-novo:hover {
  background: var(--oya-ember);
  border-color: var(--oya-ember);
  color: #fff;
}

.form-bloco {
  padding: 1.25rem;
  background: var(--oya-bg);
  border: 1px solid var(--oya-fog);
  border-radius: var(--radius-md);
  margin-bottom: 1.25rem;
}

.alunos-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.875rem;
}
.alunos-table th {
  text-align: left;
  padding: 0.55rem 0.75rem;
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.07em;
  color: var(--oya-stone);
  border-bottom: 1.5px solid var(--oya-fog);
}
.alunos-table td {
  padding: 0.75rem;
  border-bottom: 1px solid rgba(0,0,0,0.04);
  color: var(--oya-char);
  vertical-align: middle;
}
.alunos-table tr:last-child td { border-bottom: none; }
.alunos-table tr:hover td { background: rgba(26, 58, 42, 0.02); }

.aluno-nome   { font-weight: 500; }
.aluno-escola { color: var(--oya-stone); font-size: 0.85rem; }
.aluno-acoes  { width: 3rem; text-align: right; }

.vinculo-badge {
  display: inline-flex;
  align-items: center;
  padding: 0.2rem 0.65rem;
  border-radius: 2rem;
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  white-space: nowrap;
}
.vinculo-adc  { background: rgba(74, 122, 98, 0.12);   color: var(--oya-sage); }
.vinculo-icj  { background: rgba(26, 58, 42, 0.10);    color: var(--oya-forest); }
.vinculo-ic   { background: rgba(100, 149, 237, 0.12); color: #4a7cc5; }
.vinculo-vol  { background: rgba(217, 79, 30, 0.10);   color: var(--oya-ember); }
.vinculo-null { background: rgba(168, 168, 164, 0.12); color: var(--oya-steel); }

@media (max-width: 600px) {
  .dash-grid { grid-template-columns: 1fr; }
  .dash-card-wide { grid-column: 1; }
  .form-grid { grid-template-columns: 1fr; }
  .form-group.full { grid-column: 1; }
}

.file-input {
  position: absolute;
  opacity: 0;
  pointer-events: none;
}

.file-label {
  display: inline-flex;
  align-items: center;
  gap: 0.65rem;
  width: 100%;
  min-height: 56px;
  padding: 0.9rem 1rem;
  border: 1.5px dashed rgba(217, 79, 30, 0.35);
  border-radius: var(--radius-md);
  background: var(--oya-sand);
  color: var(--oya-stone);
  cursor: pointer;
  transition: background 0.2s, border-color 0.2s;
  font-family: var(--font-body);
  font-size: 14px;
}

.file-label:hover {
  background: rgba(217, 79, 30, 0.06);
  border-color: var(--oya-ember);
}

.btn-salvar {
  margin-top: 1.25rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.55rem;
  padding: 0.9rem 1.5rem;
  border: none;
  border-radius: var(--radius-pill);
  background: var(--oya-ember);
  color: #fff;
  font-weight: 500;
  font-size: 0.875rem;
  cursor: pointer;
  transition: background 0.2s, transform 0.2s, box-shadow 0.2s;
  font-family: var(--font-body);
}

.btn-salvar:hover {
  background: var(--oya-flame);
  transform: translateY(-1px);
  box-shadow: 0 10px 28px rgba(217, 79, 30, 0.25);
}

.sucesso-msg {
  margin-top: 1rem;
  display: flex;
  align-items: flex-start;
  gap: 0.55rem;
  padding: 0.9rem 1.1rem;
  border-radius: var(--radius-md);
  background: rgba(107, 170, 138, 0.12);
  border: 1px solid rgba(74, 122, 98, 0.25);
  color: var(--oya-sage);
  font-weight: 500;
  font-size: 0.9rem;
}

.erro-msg {
  margin-top: 1rem;
  display: flex;
  align-items: flex-start;
  gap: 0.55rem;
  padding: 0.9rem 1.1rem;
  border-radius: var(--radius-md);
  background: rgba(217, 79, 30, 0.08);
  border: 1px solid rgba(217, 79, 30, 0.2);
  color: var(--oya-ember);
  font-weight: 500;
  font-size: 0.9rem;
}

.fade-enter-active, .fade-leave-active { transition: opacity 0.3s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

@media (max-width: 600px) {
  .dash-grid { grid-template-columns: 1fr; }
  .dash-card-wide { grid-column: 1; }
  .form-grid { grid-template-columns: 1fr; }
  .form-group.full { grid-column: 1; }
}
</style>
