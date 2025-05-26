import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from './pages/LandingPage.vue'
import CalculateurPage from './pages/CalculateurPage.vue'
import FonctionnalitePage from './pages/FonctionnalitePage.vue'

const routes = [
  { path: '/', component: LandingPage },
  { path: '/calculateur-cuisson-air-fryer', component: CalculateurPage },
  { path: '/fonctionnalites', component: FonctionnalitePage },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
