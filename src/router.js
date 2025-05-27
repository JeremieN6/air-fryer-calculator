import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from './pages/LandingPage.vue'
import CalculateurPage from './pages/CalculateurPage.vue'
import FonctionnalitePage from './pages/FonctionnalitePage.vue'
import BlogPage from './pages/BlogPage.vue'
import BlogContentPage from './pages/BlogContentPage.vue'
import PolitiqueConfidentialitePage from './pages/PolitiqueConfidentialitePage.vue'

const routes = [
  { path: '/', component: LandingPage,
    meta: {
      title: 'Temps de Cuisson AirFryTime 🍗',
      description: 'Obtenez instantanément le temps et la température de cuisson de vos aliments au air fryer grâce à notre IA.'
    }
   },
  { path: '/calculateur-cuisson-air-fryer', component: CalculateurPage,
    meta: {
      title: 'Temps de Cuisson AirFryTime 🍗 | Calculateur',
      description: 'Obtenez instantanément le temps et la température de cuisson de vos aliments au air fryer grâce à notre IA.'
    }
   },
  { path: '/fonctionnalites', component: FonctionnalitePage,
    meta: {
      title: 'Temps de Cuisson AirFryTime 🍗 | Fonctionnalités',
      description: 'Obtenez instantanément le temps et la température de cuisson de vos aliments au air fryer grâce à notre IA.'
    }
   },
   { path: '/blog', component: BlogPage,
    meta: {
      title: 'Temps de Cuisson AirFryTime 🍗 | Blog',
      description: 'Obtenez instantanément le temps et la température de cuisson de vos aliments au air fryer grâce à notre IA.'
    }
   },
   { path: '/blog/:slug', name: 'BlogContent', component: BlogContentPage,
    meta: {
      title: 'Temps de Cuisson AirFryTime 🍗 | Blog Content',
      description: 'Obtenez instantanément le temps et la température de cuisson de vos aliments au air fryer grâce à notre IA.'
    }
   },
   { path: '/politique-de-confidentialite', component: PolitiqueConfidentialitePage,
    meta: {
      title: 'Temps de Cuisson AirFryTime 🍗 | Politique de Confidentialité',
      description: 'Obtenez instantanément le temps et la température de cuisson de vos aliments au air fryer grâce à notre IA.'
    }
   },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
