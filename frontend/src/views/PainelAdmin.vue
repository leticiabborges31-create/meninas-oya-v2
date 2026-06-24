<template>
  <PainelShell titulo="Painel Administrativo" @logout="logout">
    <template #icon>
      <svg class="icon-header" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M12 3v1m0 16v1m9-9h-1m-16 0H1M20.485 3.515l-.707.707M5.222 18.778l-.707.707M20.485 20.485l-.707-.707M5.222 5.222l-.707-.707M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
      </svg>
    </template>

    <!-- ABAS -->
    <template #nav>
      <button
        v-for="aba in abas"
        :key="aba.key"
        @click="abaAtiva = aba.key"
        :class="['nav-item', { ativo: abaAtiva === aba.key }]"
      >
        <svg class="icon-aba" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <g v-if="aba.key === 'pendentes'">
            <circle cx="12" cy="12" r="10"/>
            <polyline points="12 6 12 12 16 14"/>
          </g>
          <g v-if="aba.key === 'atividades'">
            <rect x="3" y="3" width="18" height="18" rx="2"/>
            <path d="M9 11h6M9 15h6"/>
          </g>
          <g v-if="aba.key === 'alunos'">
            <circle cx="12" cy="8" r="4"/>
            <path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/>
          </g>
          <g v-if="aba.key === 'professores'">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
            <circle cx="9" cy="7" r="4"/>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
          </g>
          <g v-if="aba.key === 'escolas'">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
            <polyline points="9 22 9 12 15 12 15 22"/>
          </g>
        </svg>
        <span class="nav-label">{{ aba.label }}</span>
        <span v-if="aba.key === 'pendentes' && pendentes.length > 0" class="nav-badge">{{ pendentes.length }}</span>
      </button>
    </template>

      <!-- ======= ABA PENDENTES ======= -->
      <div v-if="abaAtiva === 'pendentes'">
        <div class="secao-card">
          <div class="secao-header">
            <svg class="icon-secao" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"/>
              <polyline points="12 6 12 12 16 14"/>
            </svg>
            <h2 class="secao-titulo">Professores aguardando aprovação</h2>
            <span v-if="pendentes.length" class="badge-count">{{ pendentes.length }}</span>
          </div>

          <div v-if="pendentes.length === 0" class="vazio">
            <svg class="icon-vazio" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
            Nenhum cadastro pendente.
          </div>

          <div v-else class="pendentes-lista">
            <div v-for="p in pendentes" :key="p.id" class="pendente-card">
              <!-- Linha principal -->
              <div class="pendente-info">
                <div class="pendente-avatar">{{ p.nome?.[0]?.toUpperCase() ?? '?' }}</div>
                <div class="pendente-dados">
                  <p class="pendente-nome">{{ p.nome }}</p>
                  <p class="pendente-email">{{ p.email }}</p>
                </div>
              </div>

              <!-- Chips de metadados -->
              <div class="pendente-meta">
                <span class="meta-chip">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                  {{ formatCpf(p.cpf) }}
                </span>
                <span class="meta-chip">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  {{ p.cidade?.nome ? p.cidade.nome + ' / ' + p.cidade.uf : p.cidade?.uf || '—' }}
                </span>
                <span class="meta-chip">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                  {{ p.escola }}
                </span>
                <span v-if="p.idade" class="meta-chip">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M6 20v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg>
                  {{ p.idade }} anos
                </span>
                <a v-if="p.linkCurriculoLattes" :href="p.linkCurriculoLattes" target="_blank" rel="noopener" class="meta-chip meta-chip--link">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
                  Lattes
                </a>
              </div>

              <!-- Ações -->
              <div class="pendente-acoes">
                <button @click="aprovarProfessor(p.id)" class="btn-aprovar">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  Aprovar
                </button>
                <button @click="rejeitarProfessor(p.id)" class="btn-rejeitar">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                  Rejeitar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ======= ABA ATIVIDADES ======= -->
      <div v-if="abaAtiva === 'atividades'">

        <!-- LISTA DE ATIVIDADES -->
        <div class="secao-card">
          <div class="secao-header">
            <svg class="icon-secao" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="3" width="18" height="18" rx="2"/>
              <path d="M9 11h6M9 15h6"/>
            </svg>
            <h2 class="secao-titulo">Atividades</h2>
            <button @click="mostrarFormAtividade = !mostrarFormAtividade" class="btn-novo">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="14" height="14"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              {{ mostrarFormAtividade ? 'Cancelar' : 'Nova Atividade' }}
            </button>
          </div>

          <!-- FORMULÁRIO COLAPSÁVEL -->
          <div v-if="mostrarFormAtividade" class="form-bloco">
            <div class="form-grid">
              <div class="form-group">
                <label>Título</label>
                <input v-model="atividade.titulo" type="text" placeholder="Título da atividade" class="form-input" />
              </div>
              <div class="form-group">
                <label>Data</label>
                <input v-model="atividade.data" type="date" class="form-input" />
              </div>
              <div class="form-group full">
                <label>Descrição</label>
                <textarea v-model="atividade.descricao" placeholder="Descrição detalhada..." class="form-textarea" rows="4"></textarea>
              </div>
              <div class="form-group">
                <label>Professor Responsável</label>
                <select v-model="atividade.professorId" class="form-input">
                  <option value="">Selecione um professor</option>
                  <option v-for="p in professores" :key="p.id" :value="p.id">{{ p.nome }}</option>
                </select>
              </div>
              <div class="form-group">
                <label class="checkbox-label">
                  <input type="checkbox" v-model="atividade.temLocalizacao" class="checkbox-input" />
                  Tem localização?
                </label>
                <input
                  v-if="atividade.temLocalizacao"
                  v-model="atividade.localizacao"
                  type="text"
                  placeholder="Ex: UFMA-CCET, Sala 10"
                  class="form-input mt-sm"
                />
              </div>
              <div class="form-group full">
                <label>Imagem 1</label>
                <div class="file-upload">
                  <input type="file" @change="e => atividade.foto = e.target.files[0]" accept="image/*" class="file-input" id="foto-atividade" />
                  <label for="foto-atividade" class="file-label">
                    <svg class="icon-file" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                      <polyline points="17 8 12 3 7 8"/>
                      <line x1="12" y1="3" x2="12" y2="15"/>
                    </svg>
                    {{ atividade.foto ? atividade.foto.name : 'Clique para selecionar imagem' }}
                  </label>
                </div>
              </div>
              <div class="form-group full">
                <label>Imagem 2 (opcional)</label>
                <div class="file-upload">
                  <input type="file" @change="e => atividade.foto2 = e.target.files[0]" accept="image/*" class="file-input" id="foto2-atividade" />
                  <label for="foto2-atividade" class="file-label">
                    <svg class="icon-file" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                      <polyline points="17 8 12 3 7 8"/>
                      <line x1="12" y1="3" x2="12" y2="15"/>
                    </svg>
                    {{ atividade.foto2 ? atividade.foto2.name : 'Clique para selecionar segunda imagem' }}
                  </label>
                </div>
              </div>
            </div>
            <button @click="salvarAtividade" class="btn-salvar">
              <svg class="icon-btn" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2z"/>
                <polyline points="17 6 12 13 7 8"/>
              </svg>
              Publicar Atividade
            </button>
            <div v-if="sucessoAtividade" class="sucesso-msg">
              <svg class="icon-msg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              Atividade salva com sucesso!
            </div>
          </div>

          <!-- TABELA DE ATIVIDADES -->
          <div v-if="listaAtividades.length === 0 && !mostrarFormAtividade" class="vazio">
            <svg class="icon-vazio" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 11h6M9 15h6"/>
            </svg>
            Nenhuma atividade cadastrada.
          </div>
          <table v-else-if="listaAtividades.length > 0" class="tabela">
            <thead>
              <tr>
                <th>Título</th>
                <th>Data</th>
                <th>Professor</th>
                <th>Localização</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="a in listaAtividades" :key="a.id">
                <td>{{ a.titulo }}</td>
                <td>{{ formatarData(a.data) }}</td>
                <td>{{ a.professorNome || '—' }}</td>
                <td>{{ a.localizacao || '—' }}</td>
                <td class="acoes-col">
                  <button @click="abrirEditarAtividade(a)" class="btn-editar" title="Editar">
                    <svg class="icon-delete" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                    </svg>
                  </button>
                  <button @click="deletarAtividade(a.id)" class="btn-apagar" title="Apagar">
                    <svg class="icon-delete" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
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

      <!-- ======= ABA ALUNOS ======= -->
      <div v-if="abaAtiva === 'alunos'">
        <!-- LISTA DE ALUNOS -->
        <div class="secao-card">
          <div class="secao-header">
            <svg class="icon-secao" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="8" r="4"/>
              <path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/>
            </svg>
            <h2 class="secao-titulo">Alunos</h2>
            <button @click="mostrarFormAluno = !mostrarFormAluno" class="btn-novo">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="14" height="14"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              {{ mostrarFormAluno ? 'Cancelar' : 'Novo Aluno' }}
            </button>
          </div>

          <!-- FORMULÁRIO COLAPSÁVEL -->
          <div v-if="mostrarFormAluno" class="form-bloco">
            <div class="form-grid">
              <div class="form-group">
                <label>Nome</label>
                <input v-model="aluno.nome" type="text" placeholder="Nome completo" class="form-input" />
              </div>
              <div class="form-group">
                <label>Idade</label>
                <input v-model="aluno.idade" type="number" placeholder="Idade" class="form-input" />
              </div>
              <div class="form-group">
                <label>Cidade</label>
                <CidadeSelect v-model="aluno.cidadeId" placeholder="Digite a cidade..." input-id="aluno-cidade" />
              </div>
              <div class="form-group">
                <label>Instituição</label>
                <select v-model="aluno.escolaId" class="form-input">
                  <option value="">Selecione a instituição</option>
                  <option v-for="e in escolas" :key="e.id" :value="e.id">{{ e.nome }} ({{ e.cidade?.uf || '' }})</option>
                </select>
              </div>
            </div>
            <button @click="salvarAluno" class="btn-salvar">
              <svg class="icon-btn" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2z"/>
                <polyline points="17 6 12 13 7 8"/>
              </svg>
              Cadastrar Aluno
            </button>
            <div v-if="sucessoAluno" class="sucesso-msg">
              <svg class="icon-msg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              Aluno cadastrado com sucesso!
            </div>
          </div>

          <!-- TABELA DE ALUNOS -->
          <div v-if="alunos.length === 0 && !mostrarFormAluno" class="vazio">
            <svg class="icon-vazio" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.35-4.35"/>
            </svg>
            Nenhum aluno cadastrado.
          </div>
          <table v-else-if="alunos.length > 0" class="tabela">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Idade</th>
                <th>UF</th>
                <th>Escola</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="a in alunos" :key="a.id">
                <td>{{ a.nome }}</td>
                <td>{{ a.idade }}</td>
                <td>{{ a.cidade ? a.cidade.nome + ' / ' + a.cidade.uf : '—' }}</td>
                <td>{{ a.escola?.nome || '—' }}</td>
                <td>
                  <button @click="deletarAluno(a.id)" class="btn-apagar" title="Apagar">
                    <svg class="icon-delete" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <polyline points="3 6 5 6 21 6"/>
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                      <line x1="10" y1="11" x2="10" y2="17"/>
                      <line x1="14" y1="11" x2="14" y2="17"/>
                    </svg>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- ======= ABA PROFESSORES ======= -->
      <div v-if="abaAtiva === 'professores'">
        <div class="secao-card">
          <div class="secao-header">
            <svg class="icon-secao" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
            <h2 class="secao-titulo">Lista de Professores</h2>
          </div>
          <div v-if="professores.length === 0" class="vazio">
            <svg class="icon-vazio" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.35-4.35"/>
            </svg>
            Nenhum professor cadastrado.
          </div>
          <table v-else class="tabela">
            <thead>
              <tr>
                <th>Email</th>
                <th>Nome</th>
                <th>CPF</th>
                <th>UF</th>
                <th>Instituição</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="p in professores" :key="p.id">
                <td>{{ p.email }}</td>
                <td>{{ p.nome }}</td>
                <td>{{ p.cpf }}</td>
                <td>{{ p.cidade ? p.cidade.nome + ' / ' + p.cidade.uf : '—' }}</td>
                <td>{{ p.escola }}</td>
                <td><span :class="['badge-status', p.status?.toLowerCase()]">{{ p.status }}</span></td>
                <td class="acoes">
                  <button @click="abrirEditar(p)" class="btn-acao btn-editar" title="Editar">
                    <svg class="icon-delete" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                    </svg>
                  </button>
                  <button @click="abrirResetSenha(p)" class="btn-acao btn-senha" title="Resetar senha">
                    <svg class="icon-delete" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                    </svg>
                  </button>
                  <button @click="deletarProfessor(p.id)" class="btn-apagar" title="Apagar">
                    <svg class="icon-delete" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
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

      <!-- ======= ABA ESCOLAS ======= -->
      <div v-if="abaAtiva === 'escolas'">
        <div class="secao-card">
          <div class="secao-header">
            <svg class="icon-secao" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
              <polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
            <h2 class="secao-titulo">Instituições Participantes</h2>
            <button @click="mostrarFormEscola = !mostrarFormEscola" class="btn-novo">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="14" height="14"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              {{ mostrarFormEscola ? 'Cancelar' : 'Nova Instituição' }}
            </button>
          </div>

          <!-- FORMULÁRIO COLAPSÁVEL -->
          <div v-if="mostrarFormEscola" class="form-bloco">
            <div class="form-grid">
              <div class="form-group">
                <label>Nome</label>
                <input v-model="escola.nome" type="text" placeholder="Ex: UFMA" class="form-input" />
              </div>
              <div class="form-group">
                <label>Tipo</label>
                <select v-model="escola.tipo" class="form-input">
                  <option value="">Selecione o tipo</option>
                  <option value="ESCOLA_PUBLICA">Escola Pública</option>
                  <option value="ESCOLA_PRIVADA">Escola Privada</option>
                  <option value="UNIVERSIDADE">Universidade</option>
                  <option value="INSTITUTO">Instituto Federal</option>
                </select>
              </div>
              <div class="form-group">
                <label>Cidade</label>
                <CidadeSelect v-model="escola.cidadeId" placeholder="Digite a cidade..." input-id="escola-cidade" />
              </div>
              <div class="form-group full">
                <label>E-mail de contato (opcional)</label>
                <input v-model="escola.emailContato" type="email" placeholder="contato@escola.edu.br" class="form-input" />
              </div>
              <div class="form-group full">
                <label>Nível Educacional</label>
                <div class="radio-group">
                  <label class="radio-option"><input type="radio" v-model="escola.nivelEducacional" value="EDUCACAO_BASICA" /> Educação Básica</label>
                  <label class="radio-option"><input type="radio" v-model="escola.nivelEducacional" value="ENSINO_SUPERIOR" /> Ensino Superior</label>
                </div>
              </div>
              <div class="form-group full">
                <label>Natureza</label>
                <div class="radio-group">
                  <label class="radio-option"><input type="radio" v-model="escola.natureza" value="PUBLICA" /> Pública</label>
                  <label class="radio-option"><input type="radio" v-model="escola.natureza" value="PRIVADA" /> Privada</label>
                  <label class="radio-option"><input type="radio" v-model="escola.natureza" value="COMUNITARIA" /> Comunitária</label>
                </div>
              </div>
              <div class="form-group full">
                <label>Esfera Administrativa</label>
                <div class="radio-group">
                  <label class="radio-option"><input type="radio" v-model="escola.esferaAdministrativa" value="MUNICIPAL" /> Municipal</label>
                  <label class="radio-option"><input type="radio" v-model="escola.esferaAdministrativa" value="ESTADUAL" /> Estadual</label>
                  <label class="radio-option"><input type="radio" v-model="escola.esferaAdministrativa" value="FEDERAL" /> Federal</label>
                  <label class="radio-option"><input type="radio" v-model="escola.esferaAdministrativa" value="OUTRO" /> Outro</label>
                </div>
              </div>
            </div>
            <button @click="salvarEscola" class="btn-salvar">
              <svg class="icon-btn" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2z"/>
                <polyline points="17 6 12 13 7 8"/>
              </svg>
              Cadastrar Instituição
            </button>
          </div>

          <!-- TABELA DE INSTITUIÇÕES -->
          <div v-if="escolas.length === 0 && !mostrarFormEscola" class="vazio">
            <svg class="icon-vazio" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
            </svg>
            Nenhuma instituição cadastrada.
          </div>
          <table v-else-if="escolas.length > 0" class="tabela">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Tipo</th>
                <th>Cidade / UF</th>
                <th>Alunas</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="e in escolas" :key="e.id">
                <td>{{ e.nome }}</td>
                <td>{{ tipoLabel(e.tipo) }}</td>
                <td>{{ e.cidade ? e.cidade.nome + ' / ' + e.cidade.uf : '—' }}</td>
                <td>
                  <span class="badge-count">{{ e.totalAlunos }}</span>
                </td>
                <td class="acoes">
                  <button @click="abrirEditarEscola(e)" class="btn-acao btn-editar" title="Editar">
                    <svg class="icon-delete" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                    </svg>
                  </button>
                  <button @click="deletarEscola(e.id)" class="btn-apagar" title="Apagar">
                    <svg class="icon-delete" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
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

      <!-- MODAL EDITAR ESCOLA -->
      <div v-if="modalEdicaoEscola" class="modal-overlay" @click.self="modalEdicaoEscola = false">
        <div class="modal-card">
          <div class="modal-header">
            <h3>Editar Escola</h3>
            <button @click="modalEdicaoEscola = false" class="modal-fechar">&times;</button>
          </div>
          <div class="form-grid">
            <div class="form-group">
              <label>Nome</label>
              <input v-model="editandoEscola.nome" type="text" class="form-input" />
            </div>
            <div class="form-group">
              <label>Tipo</label>
              <select v-model="editandoEscola.tipo" class="form-input">
                <option value="ESCOLA_PUBLICA">Escola Pública</option>
                <option value="ESCOLA_PRIVADA">Escola Privada</option>
                <option value="UNIVERSIDADE">Universidade</option>
                <option value="INSTITUTO">Instituto Federal</option>
              </select>
            </div>
            <div class="form-group">
              <label>Cidade</label>
              <CidadeSelect v-model="editandoEscola.cidadeId" placeholder="Digite a cidade..." input-id="editar-escola-cidade" />
            </div>
            <div class="form-group full">
              <label>E-mail de contato</label>
              <input v-model="editandoEscola.emailContato" type="email" class="form-input" />
            </div>
            <div class="form-group full">
              <label>Nível Educacional</label>
              <div class="radio-group">
                <label class="radio-option"><input type="radio" v-model="editandoEscola.nivelEducacional" value="EDUCACAO_BASICA" /> Educação Básica</label>
                <label class="radio-option"><input type="radio" v-model="editandoEscola.nivelEducacional" value="ENSINO_SUPERIOR" /> Ensino Superior</label>
              </div>
            </div>
            <div class="form-group full">
              <label>Natureza</label>
              <div class="radio-group">
                <label class="radio-option"><input type="radio" v-model="editandoEscola.natureza" value="PUBLICA" /> Pública</label>
                <label class="radio-option"><input type="radio" v-model="editandoEscola.natureza" value="PRIVADA" /> Privada</label>
                <label class="radio-option"><input type="radio" v-model="editandoEscola.natureza" value="COMUNITARIA" /> Comunitária</label>
              </div>
            </div>
            <div class="form-group full">
              <label>Esfera Administrativa</label>
              <div class="radio-group">
                <label class="radio-option"><input type="radio" v-model="editandoEscola.esferaAdministrativa" value="MUNICIPAL" /> Municipal</label>
                <label class="radio-option"><input type="radio" v-model="editandoEscola.esferaAdministrativa" value="ESTADUAL" /> Estadual</label>
                <label class="radio-option"><input type="radio" v-model="editandoEscola.esferaAdministrativa" value="FEDERAL" /> Federal</label>
                <label class="radio-option"><input type="radio" v-model="editandoEscola.esferaAdministrativa" value="OUTRO" /> Outro</label>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button @click="salvarEdicaoEscola" class="btn-salvar">Salvar</button>
            <button @click="modalEdicaoEscola = false" class="btn-cancelar">Cancelar</button>
          </div>
        </div>
      </div>

      <!-- MODAL EDITAR PROFESSOR -->
      <div v-if="modalEdicao" class="modal-overlay" @click.self="modalEdicao = false">
        <div class="modal-card">
          <div class="modal-header">
            <h3>Editar Professor</h3>
            <button @click="modalEdicao = false" class="modal-fechar">&times;</button>
          </div>
          <div class="form-grid">
            <div class="form-group">
              <label>Nome</label>
              <input v-model="editando.nome" type="text" class="form-input" />
            </div>
            <div class="form-group">
              <label>Email</label>
              <input v-model="editando.email" type="email" class="form-input" />
            </div>
            <div class="form-group">
              <label>Idade</label>
              <input v-model="editando.idade" type="number" class="form-input" />
            </div>
            <div class="form-group">
              <label>Cidade</label>
              <CidadeSelect v-model="editando.cidadeId" placeholder="Digite a cidade..." input-id="editar-prof-cidade" />
            </div>
            <div class="form-group full">
              <label>Escola</label>
              <input v-model="editando.escola" type="text" class="form-input" />
            </div>
            <div class="form-group full">
              <label>Link do Lattes</label>
              <input v-model="editando.linkCurriculoLattes" type="url" class="form-input" />
            </div>
          </div>
          <div class="modal-footer">
            <button @click="salvarEdicao" class="btn-salvar">Salvar</button>
            <button @click="modalEdicao = false" class="btn-cancelar">Cancelar</button>
          </div>
        </div>
      </div>

      <!-- MODAL RESET SENHA -->
      <div v-if="modalSenha" class="modal-overlay" @click.self="modalSenha = false">
        <div class="modal-card modal-card--sm">
          <div class="modal-header">
            <h3>Resetar Senha</h3>
            <button @click="modalSenha = false" class="modal-fechar">&times;</button>
          </div>
          <p class="modal-subtitulo">Professor: <strong>{{ resetando.nome }}</strong></p>
          <div class="form-group">
            <label>Nova senha</label>
            <input v-model="resetando.novaSenha" type="password" placeholder="Mínimo 8 caracteres" class="form-input" />
          </div>
          <div class="modal-footer">
            <button @click="confirmarResetSenha" class="btn-salvar">Confirmar</button>
            <button @click="modalSenha = false" class="btn-cancelar">Cancelar</button>
          </div>
        </div>
      </div>

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

      <!-- MODAL CONFIRMAÇÃO GENÉRICO -->
      <div v-if="confirmModal.show" class="modal-overlay" @click.self="confirmModal.show = false">
        <div class="modal-card modal-card--sm modal-confirm">
          <div class="confirm-icon" :class="confirmModal.variante">
            <svg v-if="confirmModal.variante === 'danger'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
            <svg v-else-if="confirmModal.variante === 'success'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
            <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          </div>
          <h3 class="confirm-titulo">{{ confirmModal.titulo }}</h3>
          <p class="confirm-mensagem">{{ confirmModal.mensagem }}</p>
          <div class="modal-footer">
            <button @click="confirmModal.show = false" class="btn-cancelar">Cancelar</button>
            <button @click="executarConfirm" :class="['btn-confirm', confirmModal.variante]">{{ confirmModal.labelOk }}</button>
          </div>
        </div>
      </div>

      <!-- TOAST -->
      <transition name="toast-fade">
        <div v-if="toast.show" :class="['toast', toast.variante]">
          <svg v-if="toast.variante === 'sucesso'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
          <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/></svg>
          {{ toast.mensagem }}
        </div>
      </transition>





  </PainelShell>
</template>

<script>
import PainelShell from '@/components/PainelShell.vue'
import CidadeSelect from '@/components/CidadeSelect.vue'

const API = "https://meninas-oya-v2.onrender.com"

export default {
  components: { PainelShell, CidadeSelect },
  data() {
    return {
      abaAtiva: 'pendentes',
      abas: [
        { key: 'pendentes', label: 'Pendentes' },
        { key: 'atividades', label: 'Atividades' },
        { key: 'alunos', label: 'Alunos' },
        { key: 'professores', label: 'Professores' },
        { key: 'escolas', label: 'Instituições' }
      ],
      atividade: { titulo: '', data: '', descricao: '', temLocalizacao: false, localizacao: '', foto: null, foto2: null, professorId: '' },
      aluno: { nome: '', idade: '', cidadeId: null, escolaId: '' },
      professor: { email: '', cpf: '', senha: '', nome: '', idade: '', cidadeId: null, escola: '', linkCurriculoLattes: '' },
      editando: { id: null, email: '', nome: '', idade: '', cidadeId: null, escola: '', linkCurriculoLattes: '' },
      resetando: { id: null, nome: '', novaSenha: '' },
      modalEdicao: false,
      modalSenha: false,
      confirmModal: { show: false, titulo: '', mensagem: '', variante: 'warning', labelOk: 'Confirmar', _resolve: null },
      toast: { show: false, mensagem: '', variante: 'sucesso' },
      escolas: [],
      escola: { nome: '', tipo: '', cidadeId: null, emailContato: '', nivelEducacional: '', natureza: '', esferaAdministrativa: '' },
      editandoEscola: { id: null, nome: '', tipo: '', cidadeId: null, emailContato: '', nivelEducacional: '', natureza: '', esferaAdministrativa: '' },
      modalEdicaoEscola: false,
      mostrarFormEscola: false,
      alunos: [],
      professores: [],
      pendentes: [],
      listaAtividades: [],
      editandoAtividade: { id: null, titulo: '', data: '', descricao: '', localizacao: '', temLocalizacao: false, foto: null, foto2: null },
      modalEdicaoAtividade: false,
      mostrarFormAtividade: false,
      mostrarFormAluno: false,
      sucessoAtividade: false,
      sucessoAluno: false,
      sucessoProfessor: false
    }
  },

  mounted() {
    if (localStorage.getItem("logado") !== "true") {
      this.$router.push("/admin")
      return
    }
    this.carregarAlunos()
    this.carregarProfessores()
    this.carregarPendentes()
    this.carregarListaAtividades()
    this.carregarEscolas()
  },

  watch: {
    abaAtiva(nova) {
      if (nova === 'pendentes') this.carregarPendentes()
      else if (nova === 'atividades') this.carregarListaAtividades()
      else if (nova === 'alunos') this.carregarAlunos()
      else if (nova === 'professores') this.carregarProfessores()
      else if (nova === 'escolas') this.carregarEscolas()
    }
  },

  methods: {
    token() {
      return localStorage.getItem("token")
    },

    formatCpf(cpf) {
      if (!cpf) return '—'
      const d = cpf.replace(/\D/g, '')
      if (d.length !== 11) return cpf
      return d.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
    },

    mostrarToast(mensagem, variante = 'sucesso') {
      this.toast = { show: true, mensagem, variante }
      setTimeout(() => { this.toast.show = false }, 3500)
    },

    abrirConfirm({ titulo, mensagem, variante = 'warning', labelOk = 'Confirmar' }) {
      return new Promise(resolve => {
        this.confirmModal = { show: true, titulo, mensagem, variante, labelOk, _resolve: resolve }
      })
    },

    executarConfirm() {
      this.confirmModal.show = false
      if (this.confirmModal._resolve) this.confirmModal._resolve(true)
    },

    // ATIVIDADES
    async carregarListaAtividades() {
      try {
        const response = await fetch(`${API}/atividades`, {
          headers: { "Authorization": `Bearer ${this.token()}` }
        })
        if (!response.ok) return
        const dados = await response.json()
        this.listaAtividades = dados.sort((a, b) => new Date(b.data || 0) - new Date(a.data || 0))
      } catch (e) { console.error(e) }
    },

    formatarData(data) {
      if (!data) return ''
      const [ano, mes, dia] = data.split('-')
      return `${dia}/${mes}/${ano}`
    },

    async deletarAtividade(id) {
      const ok = await this.abrirConfirm({ titulo: 'Apagar atividade', mensagem: 'Tem certeza que deseja apagar esta atividade?', variante: 'danger', labelOk: 'Apagar' })
      if (!ok) return
      try {
        const response = await fetch(`${API}/atividades/${id}`, {
          method: 'DELETE',
          headers: { "Authorization": `Bearer ${this.token()}` }
        })
        if (!response.ok) throw new Error(await response.text())
        this.listaAtividades = this.listaAtividades.filter(a => a.id !== id)
        this.mostrarToast('Atividade removida.')
      } catch (e) { this.mostrarToast('Erro ao apagar: ' + e.message, 'erro') }
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

        const response = await fetch(`${API}/atividades/${this.editandoAtividade.id}`, {
          method: 'PUT',
          headers: { 'Authorization': `Bearer ${this.token()}` },
          body: formData
        })
        if (!response.ok) throw new Error(await response.text())
        this.modalEdicaoAtividade = false
        await this.carregarListaAtividades()
        this.mostrarToast('Atividade atualizada!')
      } catch (e) { this.mostrarToast('Erro ao atualizar: ' + e.message, 'erro') }
    },

    async salvarAtividade() {
      try {
        const formData = new FormData()
        formData.append("titulo", this.atividade.titulo)
        formData.append("descricao", this.atividade.descricao)
        formData.append("data", this.atividade.data)
        if (this.atividade.temLocalizacao && this.atividade.localizacao) formData.append("localizacao", this.atividade.localizacao)
        if (this.atividade.foto) formData.append("foto", this.atividade.foto)
        if (this.atividade.foto2) formData.append("foto2", this.atividade.foto2)
        if (this.atividade.professorId) formData.append("professorId", this.atividade.professorId)

        const response = await fetch(`${API}/atividades`, {
          method: "POST",
          headers: { "Authorization": `Bearer ${this.token()}` },
          body: formData
        })
        if (!response.ok) throw new Error(await response.text())

        this.atividade = { titulo: '', data: '', descricao: '', temLocalizacao: false, localizacao: '', foto: null, foto2: null, professorId: '' }
        this.mostrarFormAtividade = false
        await this.carregarListaAtividades()
        this.mostrarToast('Atividade publicada com sucesso!')
      } catch (e) {
        this.mostrarToast('Erro ao salvar atividade: ' + e.message, 'erro')
      }
    },

    // ALUNOS
    async carregarAlunos() {
      try {
        const response = await fetch(`${API}/api/alunos`, {
          headers: { "Authorization": `Bearer ${this.token()}` }
        })
        if (!response.ok) return
        this.alunos = await response.json()
      } catch (e) { console.error(e) }
    },

    async salvarAluno() {
      try {
        const response = await fetch(`${API}/api/alunos`, {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${this.token()}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            nome: this.aluno.nome,
            idade: parseInt(this.aluno.idade),
            cidadeId: this.aluno.cidadeId,
            escolaId: this.aluno.escolaId || null
          })
        })
        if (!response.ok) throw new Error(await response.text())

        this.aluno = { nome: '', idade: '', cidadeId: null, escolaId: '' }
        this.mostrarFormAluno = false
        await this.carregarAlunos()
        this.mostrarToast('Aluna cadastrada com sucesso!')
      } catch (e) {
        this.mostrarToast('Erro: ' + e.message, 'erro')
      }
    },

    async deletarAluno(id) {
      const ok = await this.abrirConfirm({
        titulo: 'Apagar aluno?',
        mensagem: 'Esta ação não pode ser desfeita.',
        variante: 'danger',
        labelOk: 'Apagar'
      })
      if (!ok) return
      try {
        await fetch(`${API}/api/alunos/${id}`, {
          method: "DELETE",
          headers: { "Authorization": `Bearer ${this.token()}` }
        })
        this.alunos = this.alunos.filter(a => a.id !== id)
        this.mostrarToast('Aluno removido com sucesso.')
      } catch (e) {
        this.mostrarToast('Erro ao apagar: ' + e.message, 'erro')
      }
    },

    // PENDENTES (professores aguardando aprovacao)
    async carregarPendentes() {
      try {
        const response = await fetch(`${API}/api/professores/pendentes`, {
          headers: { "Authorization": `Bearer ${this.token()}` }
        })
        if (!response.ok) return
        this.pendentes = await response.json()
      } catch (e) { console.error(e) }
    },

    async aprovarProfessor(id) {
      const ok = await this.abrirConfirm({
        titulo: 'Aprovar professor?',
        mensagem: 'O professor poderá fazer login após a aprovação.',
        variante: 'success',
        labelOk: 'Aprovar'
      })
      if (!ok) return
      try {
        const response = await fetch(`${API}/api/professores/${id}/aprovar`, {
          method: "PUT",
          headers: { "Authorization": `Bearer ${this.token()}` }
        })
        if (!response.ok) throw new Error(await response.text())
        this.pendentes = this.pendentes.filter(p => p.id !== id)
        await this.carregarProfessores()
        this.mostrarToast('Professor aprovado com sucesso!')
      } catch (e) { this.mostrarToast('Erro ao aprovar: ' + e.message, 'erro') }
    },

    async rejeitarProfessor(id) {
      const ok = await this.abrirConfirm({
        titulo: 'Rejeitar cadastro?',
        mensagem: 'O professor não poderá fazer login no sistema.',
        variante: 'danger',
        labelOk: 'Rejeitar'
      })
      if (!ok) return
      try {
        const response = await fetch(`${API}/api/professores/${id}/rejeitar`, {
          method: "PUT",
          headers: { "Authorization": `Bearer ${this.token()}` }
        })
        if (!response.ok) throw new Error(await response.text())
        this.pendentes = this.pendentes.filter(p => p.id !== id)
        this.mostrarToast('Cadastro rejeitado.')
      } catch (e) { this.mostrarToast('Erro ao rejeitar: ' + e.message, 'erro') }
    },

    // PROFESSORES
    async carregarProfessores() {
      try {
        const response = await fetch(`${API}/api/professores`, {
          headers: { "Authorization": `Bearer ${this.token()}` }
        })
        if (!response.ok) return
        this.professores = await response.json()
      } catch (e) { console.error(e) }
    },

    abrirEditar(p) {
      this.editando = {
        id: p.id,
        email: p.email,
        nome: p.nome,
        idade: p.idade,
        cidadeId: p.cidade?.id || null,
        escola: p.escola,
        linkCurriculoLattes: p.linkCurriculoLattes
      }
      this.modalEdicao = true
    },

    async salvarEdicao() {
      try {
        const body = {
          email: this.editando.email,
          nome: this.editando.nome,
          idade: parseInt(this.editando.idade),
          cidadeId: this.editando.cidadeId,
          escola: this.editando.escola,
          linkCurriculoLattes: this.editando.linkCurriculoLattes
        }
        const response = await fetch(`${API}/api/professores/${this.editando.id}`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${this.token()}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(body)
        })
        if (!response.ok) throw new Error(await response.text())
        this.modalEdicao = false
        await this.carregarProfessores()
      } catch (e) { alert('Erro ao salvar: ' + e.message) }
    },

    abrirResetSenha(p) {
      this.resetando = { id: p.id, nome: p.nome, novaSenha: '' }
      this.modalSenha = true
    },

    async confirmarResetSenha() {
      if (this.resetando.novaSenha.length < 8) {
        alert('A senha deve ter pelo menos 8 caracteres.')
        return
      }
      try {
        const response = await fetch(`${API}/api/professores/${this.resetando.id}/reset-senha`, {
          method: 'PATCH',
          headers: {
            'Authorization': `Bearer ${this.token()}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ novaSenha: this.resetando.novaSenha })
        })
        if (!response.ok) throw new Error(await response.text())
        this.modalSenha = false
        this.mostrarToast(`Senha de ${this.resetando.nome} redefinida!`)
      } catch (e) { this.mostrarToast('Erro ao resetar senha: ' + e.message, 'erro') }
    },

    async deletarProfessor(id) {
      const ok = await this.abrirConfirm({
        titulo: 'Apagar professor?',
        mensagem: 'Todos os dados deste professor serão removidos permanentemente.',
        variante: 'danger',
        labelOk: 'Apagar'
      })
      if (!ok) return
      try {
        await fetch(`${API}/api/professores/${id}`, {
          method: "DELETE",
          headers: { "Authorization": `Bearer ${this.token()}` }
        })
        this.professores = this.professores.filter(p => p.id !== id)
        this.mostrarToast('Professor removido.')
      } catch (e) {
        this.mostrarToast('Erro ao apagar: ' + e.message, 'erro')
      }
    },

    // ESCOLAS
    async carregarEscolas() {
      try {
        const response = await fetch(`${API}/api/escolas`, {
          headers: { "Authorization": `Bearer ${this.token()}` }
        })
        if (!response.ok) return
        this.escolas = await response.json()
      } catch (e) { console.error(e) }
    },

    async salvarEscola() {
      try {
        const response = await fetch(`${API}/api/escolas`, {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${this.token()}`, 'Content-Type': 'application/json' },
          body: JSON.stringify(this.escola)
        })
        if (!response.ok) throw new Error(await response.text())
        this.escola = { nome: '', tipo: '', cidadeId: null, emailContato: '', nivelEducacional: '', natureza: '', esferaAdministrativa: '' }
        this.mostrarFormEscola = false
        await this.carregarEscolas()
        this.mostrarToast('Instituição cadastrada com sucesso!')
      } catch (e) { this.mostrarToast('Erro: ' + e.message, 'erro') }
    },

    abrirEditarEscola(e) {
      this.editandoEscola = {
        id: e.id,
        nome: e.nome,
        tipo: e.tipo,
        cidadeId: e.cidade?.id || null,
        emailContato: e.emailContato,
        nivelEducacional: e.nivelEducacional || '',
        natureza: e.natureza || '',
        esferaAdministrativa: e.esferaAdministrativa || ''
      }
      this.modalEdicaoEscola = true
    },

    async salvarEdicaoEscola() {
      try {
        const response = await fetch(`${API}/api/escolas/${this.editandoEscola.id}`, {
          method: 'PUT',
          headers: { 'Authorization': `Bearer ${this.token()}`, 'Content-Type': 'application/json' },
          body: JSON.stringify({
            nome: this.editandoEscola.nome,
            tipo: this.editandoEscola.tipo,
            cidadeId: this.editandoEscola.cidadeId,
            emailContato: this.editandoEscola.emailContato,
            nivelEducacional: this.editandoEscola.nivelEducacional || null,
            natureza: this.editandoEscola.natureza || null,
            esferaAdministrativa: this.editandoEscola.esferaAdministrativa || null
          })
        })
        if (!response.ok) throw new Error(await response.text())
        this.modalEdicaoEscola = false
        await this.carregarEscolas()
        this.mostrarToast('Instituição atualizada!')
      } catch (e) { this.mostrarToast('Erro: ' + e.message, 'erro') }
    },

    async deletarEscola(id) {
      const ok = await this.abrirConfirm({
        titulo: 'Apagar escola?',
        mensagem: 'Só é possível excluir escolas sem alunas vinculadas.',
        variante: 'danger',
        labelOk: 'Apagar'
      })
      if (!ok) return
      try {
        const response = await fetch(`${API}/api/escolas/${id}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${this.token()}` }
        })
        if (!response.ok) {
          const body = await response.json().catch(() => ({}))
          throw new Error(body.message || 'Erro ao apagar')
        }
        this.escolas = this.escolas.filter(e => e.id !== id)
        this.mostrarToast('Escola removida.')
      } catch (e) { this.mostrarToast(e.message, 'erro') }
    },

    tipoLabel(tipo) {
      const map = {
        ESCOLA_PUBLICA: 'Escola Pública',
        ESCOLA_PRIVADA: 'Escola Privada',
        UNIVERSIDADE: 'Universidade',
        INSTITUTO: 'Instituto Federal'
      }
      return map[tipo] || tipo
    },

    logout() {
      localStorage.removeItem("logado")
      localStorage.removeItem("token")
      localStorage.removeItem("usuario")
      this.$router.push("/admin")
    }
  }
}
</script>

<style scoped>
/* Estilos locais — wrapper/header/logout ficam no PainelShell */
.icon-header { width: 1.75rem; height: 1.75rem; color: var(--oya-glow); }

.icon-btn,
.icon-aba,
.icon-secao,
.icon-msg,
.icon-file,
.icon-delete,
.icon-link,
.icon-vazio {
  width: 1.1rem;
  height: 1.1rem;
  flex-shrink: 0;
}

/* ── NAV SIDEBAR ─────────────────────────────────────── */
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

.nav-item:hover {
  background: rgba(255, 255, 255, 0.07);
  color: var(--oya-mint);
}

.nav-item.ativo {
  background: rgba(217, 79, 30, 0.18);
  color: var(--oya-warm);
}

.nav-label {
  flex: 1;
}

.nav-badge {
  margin-left: auto;
  min-width: 1.25rem;
  height: 1.25rem;
  padding: 0 0.3rem;
  background: var(--oya-ember);
  color: #fff;
  border-radius: 99px;
  font-size: 0.7rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
}

/* ── SECAO CARD ──────────────────────────────────────── */
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

.btn-novo {
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.45rem 1rem;
  background: var(--oya-ember);
  color: #fff;
  border: none;
  border-radius: var(--radius-pill);
  font-size: 0.8rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;
}
.btn-novo:hover { background: var(--oya-char); }

.form-bloco {
  border-top: 1.5px solid var(--oya-fog);
  padding-top: 1.25rem;
  margin-bottom: 1.25rem;
}

.icon-secao { width: 1.1rem; height: 1.1rem; color: var(--oya-ember); }

.secao-titulo {
  font-family: var(--font-display);
  font-size: 1.15rem;
  color: var(--oya-forest);
}

.secao-descricao {
  margin-bottom: 1rem;
  color: var(--oya-stone);
  line-height: 1.6;
  font-size: 0.9rem;
}

/* ── FORMULÁRIO ──────────────────────────────────────── */
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

.radio-group {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  padding: 0.4rem 0;
}

.radio-option {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.85rem;
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
}

.form-input:focus,
.form-textarea:focus {
  border-color: rgba(217, 79, 30, 0.5);
  box-shadow: 0 0 0 3px rgba(217, 79, 30, 0.08);
  background: #fff;
}

.form-textarea { resize: vertical; min-height: 130px; }

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
  box-shadow: 0 10px 26px rgba(217, 79, 30, 0.25);
}

.sucesso-msg {
  margin-top: 1rem;
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  padding: 0.75rem 1rem;
  border-radius: var(--radius-md);
  background: rgba(107, 170, 138, 0.1);
  border: 0.5px solid rgba(74, 122, 98, 0.2);
  color: var(--oya-sage);
  font-weight: 500;
  font-size: 0.875rem;
}

/* ── TABELA ──────────────────────────────────────────── */
.vazio {
  padding: 2rem 1rem;
  text-align: center;
  color: var(--oya-steel);
  display: grid;
  justify-items: center;
  gap: 0.75rem;
  font-size: 0.9rem;
}

.icon-vazio { width: 1.6rem; height: 1.6rem; color: var(--oya-ember); }

.tabela {
  width: 100%;
  border-collapse: collapse;
}

.tabela thead th {
  text-align: left;
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--oya-steel);
  padding: 0 0 0.85rem;
  border-bottom: 0.5px solid var(--oya-fog);
  font-weight: 500;
}

.tabela tbody td {
  padding: 0.9rem 0.25rem 0.9rem 0;
  border-bottom: 0.5px solid var(--oya-fog);
  color: var(--oya-char);
  vertical-align: middle;
  font-size: 0.875rem;
}

.btn-editar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.2rem;
  height: 2.2rem;
  border: none;
  border-radius: var(--radius-pill);
  background: rgba(26, 58, 42, 0.07);
  color: var(--oya-forest);
  cursor: pointer;
  transition: background 0.2s;
}
.btn-editar:hover { background: rgba(26, 58, 42, 0.15); }

.btn-apagar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.2rem;
  height: 2.2rem;
  border: none;
  border-radius: var(--radius-pill);
  background: rgba(217, 79, 30, 0.08);
  color: var(--oya-ember);
  cursor: pointer;
  transition: background 0.2s;
}

.btn-apagar:hover { background: rgba(217, 79, 30, 0.14); }

.acoes, .acoes-col { display: flex; gap: 0.4rem; align-items: center; }

.btn-acao {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.2rem;
  height: 2.2rem;
  border: none;
  border-radius: var(--radius-pill);
  cursor: pointer;
  transition: background 0.2s;
}

.btn-editar { background: rgba(74, 122, 98, 0.1); color: var(--oya-sage); }
.btn-editar:hover { background: rgba(74, 122, 98, 0.18); }
.btn-senha  { background: rgba(255, 176, 138, 0.15); color: var(--oya-ember); }
.btn-senha:hover  { background: rgba(255, 176, 138, 0.25); }

.badge-status {
  display: inline-block;
  padding: 0.2rem 0.6rem;
  border-radius: var(--radius-pill);
  font-size: 0.7rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.badge-status.aprovado  { background: rgba(107, 170, 138, 0.12); color: var(--oya-sage); }
.badge-status.pendente  { background: rgba(255, 176, 138, 0.15); color: var(--oya-ember); }
.badge-status.rejeitado { background: rgba(217, 79, 30, 0.1);    color: var(--oya-ember); }

/* ── MODAL ───────────────────────────────────────────── */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(15, 34, 24, 0.6);
  backdrop-filter: blur(4px);
  z-index: 200;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}

.modal-card {
  background: #fff;
  border-radius: var(--radius-lg);
  padding: 2rem;
  width: 100%;
  max-width: 640px;
  box-shadow: 0 32px 80px rgba(15, 34, 24, 0.22);
  border: 0.5px solid var(--oya-fog);
}

.modal-card--sm { max-width: 420px; }

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.25rem;
}

.modal-header h3 {
  font-family: var(--font-display);
  font-size: 1.1rem;
  color: var(--oya-forest);
}

.modal-fechar {
  background: none;
  border: none;
  font-size: 1.4rem;
  line-height: 1;
  color: var(--oya-silver);
  cursor: pointer;
  padding: 0 0.25rem;
  font-family: var(--font-body);
}

.modal-fechar:hover { color: var(--oya-ember); }

.modal-subtitulo {
  margin-bottom: 1rem;
  color: var(--oya-stone);
  font-size: 0.9rem;
}

.modal-footer {
  display: flex;
  gap: 0.75rem;
  margin-top: 1.5rem;
  padding-top: 1.25rem;
  border-top: 1px solid var(--oya-fog);
  justify-content: flex-end;
  align-items: center;
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
  color: var(--oya-stone);
  font-weight: 500;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background 0.2s;
  font-family: var(--font-body);
  width: 140px;
  height: 2.5rem;
  flex: none;
}

.btn-cancelar:hover { background: var(--oya-bg); }

.link-lattes {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  color: var(--oya-ember);
  font-weight: 500;
}
.link-lattes:hover { text-decoration: underline; }

/* ── MODAL CONFIRMAÇÃO ───────────────────────────────── */
.modal-confirm { text-align: center; padding: 2rem; }

.confirm-icon {
  width: 3.2rem;
  height: 3.2rem;
  border-radius: 50%;
  display: grid;
  place-items: center;
  margin: 0 auto 1.1rem;
}

.confirm-icon svg { width: 1.4rem; height: 1.4rem; }

.confirm-icon.danger  { background: rgba(217, 79, 30, 0.1); color: var(--oya-ember); }
.confirm-icon.success { background: rgba(107, 170, 138, 0.12); color: var(--oya-sage); }
.confirm-icon.warning { background: rgba(255, 176, 138, 0.15); color: var(--oya-ember); }

.confirm-titulo {
  font-family: var(--font-display);
  font-size: 1.1rem;
  color: var(--oya-forest);
  margin: 0 0 0.5rem;
}

.confirm-mensagem {
  font-size: 0.88rem;
  color: var(--oya-steel);
  margin: 0;
  line-height: 1.5;
}

.btn-confirm {
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: var(--radius-pill);
  font-weight: 500;
  font-size: 0.875rem;
  cursor: pointer;
  transition: background 0.2s, transform 0.2s, box-shadow 0.2s;
  font-family: var(--font-body);
}

.btn-confirm.danger  { background: var(--oya-ember); color: #fff; }
.btn-confirm.success { background: var(--oya-forest); color: #fff; }
.btn-confirm.warning { background: var(--oya-ember); color: #fff; }
.btn-confirm:hover { transform: translateY(-1px); box-shadow: 0 8px 20px rgba(0,0,0,0.12); }

/* ── TOAST ───────────────────────────────────────────── */
.toast {
  position: fixed;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.8rem 1.5rem;
  border-radius: var(--radius-pill);
  font-weight: 500;
  font-size: 0.875rem;
  z-index: 999;
  box-shadow: 0 8px 28px rgba(0,0,0,0.18);
  white-space: nowrap;
}

.toast svg { width: 1rem; height: 1rem; flex-shrink: 0; }
.toast.sucesso { background: var(--oya-forest); color: var(--oya-mint); }
.toast.erro    { background: var(--oya-ember);  color: #fff; }

.toast-fade-enter-active, .toast-fade-leave-active { transition: opacity 0.3s, transform 0.3s; }
.toast-fade-enter-from, .toast-fade-leave-to { opacity: 0; transform: translateX(-50%) translateY(12px); }

/* ── PENDENTES ───────────────────────────────────────── */
.badge-count {
  margin-left: auto;
  min-width: 1.5rem;
  height: 1.5rem;
  padding: 0 0.4rem;
  background: var(--oya-ember);
  color: #fff;
  border-radius: var(--radius-pill);
  font-size: 0.72rem;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.pendentes-lista {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.pendente-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.15rem;
  border: 0.5px solid var(--oya-fog);
  border-radius: var(--radius-md);
  background: #fff;
  transition: box-shadow 0.2s, border-color 0.2s;
  flex-wrap: wrap;
}

.pendente-card:hover {
  border-color: rgba(217, 79, 30, 0.2);
  box-shadow: 0 6px 20px rgba(217, 79, 30, 0.06);
}

.pendente-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex: 0 0 220px;
  min-width: 0;
}

.pendente-avatar {
  flex-shrink: 0;
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 50%;
  background: var(--oya-forest);
  color: var(--oya-mint);
  font-size: 0.9rem;
  font-weight: 500;
  display: grid;
  place-items: center;
}

.pendente-dados { min-width: 0; }

.pendente-nome {
  font-weight: 500;
  color: var(--oya-forest);
  font-size: 0.9rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0;
}

.pendente-email {
  font-size: 0.78rem;
  color: var(--oya-steel);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0;
}

.pendente-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  flex: 1;
}

.meta-chip {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.25rem 0.6rem;
  background: var(--oya-bg);
  border-radius: var(--radius-pill);
  font-size: 0.75rem;
  color: var(--oya-stone);
  font-weight: 500;
  text-decoration: none;
}

.meta-chip svg { width: 0.8rem; height: 0.8rem; flex-shrink: 0; }

.meta-chip--link {
  background: rgba(217, 79, 30, 0.08);
  color: var(--oya-ember);
}

.meta-chip--link:hover {
  background: rgba(217, 79, 30, 0.14);
  text-decoration: underline;
}

.pendente-acoes {
  display: flex;
  gap: 0.5rem;
  flex-shrink: 0;
}

.btn-aprovar,
.btn-rejeitar {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: var(--radius-pill);
  font-size: 0.8rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s, transform 0.2s, box-shadow 0.2s;
  font-family: var(--font-body);
}

.btn-aprovar svg,
.btn-rejeitar svg { width: 0.85rem; height: 0.85rem; flex-shrink: 0; }

.btn-aprovar {
  background: var(--oya-forest);
  color: var(--oya-mint);
}

.btn-aprovar:hover {
  background: var(--oya-sage);
  transform: translateY(-1px);
}

.btn-rejeitar {
  background: rgba(217, 79, 30, 0.08);
  color: var(--oya-ember);
}

.btn-rejeitar:hover {
  background: rgba(217, 79, 30, 0.14);
  transform: translateY(-1px);
}

@media (max-width: 900px) {
  .form-grid { grid-template-columns: 1fr; }
  .tabela { display: block; overflow-x: auto; }
}

@media (max-width: 640px) {
  .btn-salvar { width: 100%; justify-content: center; }
  .secao-card { padding: 1.1rem; }
  .pendente-card { flex-direction: column; align-items: flex-start; }
  .pendente-info { flex: unset; width: 100%; }
  .pendente-acoes { width: 100%; }
  .btn-aprovar, .btn-rejeitar { flex: 1; justify-content: center; }
}
</style>
