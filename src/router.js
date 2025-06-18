import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from './pages/LandingPage.vue'
import CalculateurPage from './pages/CalculateurPage.vue'
import BypassPage from './pages/BypassPage.vue';
import FonctionnalitePage from './pages/FonctionnalitePage.vue'
import BlogPage from './pages/BlogPage.vue'
import BlogContentPage from './pages/BlogContentPage.vue'
import PolitiqueConfidentialitePage from './pages/PolitiqueConfidentialitePage.vue'
import Success from './pages/stripe/Success.vue'
import Cancel from './pages/stripe/Cancel.vue'


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
   { path: '/success', component: Success,
    meta: {
      title: 'Temps de Cuisson AirFryTime 🍗 | Success',
      description: 'Obtenez instantanément le temps et la température de cuisson de vos aliments au air fryer grâce à notre IA.'
    }
   },
   { path: '/cancel', component: Cancel,
    meta: {
      title: 'Temps de Cuisson AirFryTime 🍗 | Cancel',
      description: 'Obtenez instantanément le temps et la température de cuisson de vos aliments au air fryer grâce à notre IA.'
    }
   },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

if (import.meta.env.VITE_ENABLE_BYPASS === 'true') {
  router.addRoute({
    path: '/calculateur-cuisson-air-fryer/bypass-mode',
    name: 'Bypass',
    component: BypassPage,
    meta: {
      title: 'Temps de Cuisson AirFryTime 🍗 | Calculateur Admin',
      description: 'Obtenez instantanément le temps et la température de cuisson de vos aliments au air fryer grâce à notre IA.'
    }
  });
}

export default router
