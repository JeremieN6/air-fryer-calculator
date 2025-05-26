import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from './pages/LandingPage.vue'
import CalculateurPage from './pages/CalculateurPage.vue'
import FonctionnalitePage from './pages/FonctionnalitePage.vue'

const routes = [
  { path: '/', component: LandingPage,
    meta: {
      title: 'Temps de Cuisson AirFryTime 🍗',
      description: 'Obtenez instantanément le temps et la température de cuisson de vos aliments au air fryer grâce à notre IA.'
    }
   },
  { path: '/calculateur-cuisson-air-fryer', component: CalculateurPage,
    meta: {
      title: 'Temps de Cuisson AirFryTime 🍗',
      description: 'Obtenez instantanément le temps et la température de cuisson de vos aliments au air fryer grâce à notre IA.'
    }
   },
  { path: '/fonctionnalites', component: FonctionnalitePage,
    meta: {
      title: 'Temps de Cuisson AirFryTime 🍗',
      description: 'Obtenez instantanément le temps et la température de cuisson de vos aliments au air fryer grâce à notre IA.'
    }
   },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
