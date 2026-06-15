import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import Admin from '../views/Login.vue'
import Painel from '../views/Painel.vue'
import PainelAdmin from '../views/PainelAdmin.vue'
import Cadastro from '../views/Cadastro.vue'
import Parceria from '../views/Parceria.vue'
import Coordenacao from '../views/Coordenacao.vue'
import AtividadeLista from '../views/AtividadeLista.vue'
import AtividadeDetalhe from '../views/AtividadeDetalhe.vue'

const router = createRouter({
  history: createWebHistory(),

  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/admin', name: 'admin', component: Admin },
    { path: '/cadastro', name: 'cadastro', component: Cadastro },
    { path: '/painel', name: 'painel', component: Painel },
    { path: '/painel-admin', name: 'painel-admin', component: PainelAdmin },
    { path: '/parceria', name: 'parceria', component: Parceria },
    { path: '/coordenacao', name: 'coordenacao', component: Coordenacao },
    { path: '/atividades', name: 'atividades', component: AtividadeLista },
    { path: '/atividade/:id', name: 'atividade', component: AtividadeDetalhe }
  ]
})

router.beforeEach((to, from, next) => {
  const logado = localStorage.getItem("logado")
  if ((to.path === "/painel" || to.path === "/painel-admin") && logado !== "true") {
    next("/admin")
  } else {
    next()
  }
})

export default router