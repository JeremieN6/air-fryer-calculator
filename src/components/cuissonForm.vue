<template>
  <div class="bg-white dark:bg-gray-900">
    <div class="py-8 px-4 mx-auto max-w-screen-lg sm:py-16 lg:px-6">
      <h1 class="mb-4 text-3xl font-extrabold text-center tracking-tight leading-none text-gray-900 md:text-4xl lg:text-5xl dark:text-white">Calculateur de temps de cuisson <br> (AirFryTime 🍗🍟)</h1>
      <p class="mb-8 text-lg font-normal text-center text-gray-500 lg:text-xl sm:px-16 xl:px-28 dark:text-gray-400">Ici chez AirFryTime  nous nous focalisons sur la proposition de recette et de conseils de préparation et de temps de cuission personalisés, pour maximiser votre expérience avec votre Air Fryer.</p>
<form @submit.prevent="envoyerRequete" class="space-y-4">
  <div class="mb-5">
      <label for="base-input" class="block mb-2 text-sm font-medium text-left text-gray-900 dark:text-white">Aliment</label>
      <input v-model="aliment" type="text" id="base-input" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Ex : Poulet, Frites..." required>
  </div>

  <div class="mb-5">
    <label for="base-input" class="block mb-2 text-sm font-medium text-left text-gray-900 dark:text-white">Saisissez le poids et/ou la quantité (une seule valeur est possible) :</label>
    <div class="flex flex-row justify-center items-center w-full my-5 gap-5">
      <div class=" w-1/2">
          <label for="base-input" class="block mb-2 text-sm font-medium text-left text-gray-900 dark:text-white">Poids</label>
          <input v-model="poids" type="number" id="base-input" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  placeholder="Ex : 300g">
      </div>
      <div class=" w-1/2">
          <label for="base-input" class="block mb-2 text-sm font-medium text-left text-gray-900 dark:text-white">Quantité</label>
          <input v-model="quantite" type="number" id="base-input" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  placeholder="Ex : 2 pièces">
      </div>
    
    </div>  
  </div>


  <div class="mb-5">
    <label for="etatAvantCuisson" class="block mb-2 text-sm font-medium text-left text-gray-900 dark:text-white">Etat</label>
    <select v-model="etat" id="etatAvantCuisson" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
      <option value="Cru">Cru</option>
      <option value="Congelé">Congelé</option>
    </select>
  </div>

  <div class="mb-5">
    <label class="block mb-2 text-sm font-medium text-left text-gray-900 dark:text-white">Type de cuisson souhaitée</label>
    <select v-model="typeCuisson" id="cuissonType" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
      <option value="Normal">Normal</option>
      <option value="Croustillant">Croustillant</option>
      <option value="Moelleux">Moelleux</option>
      <option value="Grillé">Grillé</option>
    </select>
  </div>

  <div>
    <label class="block mb-2 text-sm font-medium text-left text-gray-900 dark:text-white">Modèle d'air fryer (facultatif)</label>
    <input v-model="modele" type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Ex : Cosori, Ninja..." />
  </div>

  <div class="flex justify-center items-center">
    <button type="submit" :disabled="chargement" class="inline-flex justify-center items-center py-3 px-5 font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900 cursor-pointer w-full">
      {{ chargement ? 'Chargement...' : 'Calculer le temps de cuisson' }}
    </button>
  </div>
</form>

<!-- Loader -->
<div v-if="chargement" class="flex justify-center items-center mt-6">
  <svg class="animate-spin h-8 w-8 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
    <path class="opacity-75" fill="currentColor"
      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"/>
  </svg>
  <span class="ml-2 text-blue-600 font-semibold">Chargement...</span>
</div>

<div v-if="resultatVisible" class="mt-10" ref="exportElement">
  <div class="text-center mb-6">
    <h3 class="text-lg font-semibold text-gray-800 dark:text-white">Calculateur AirFryTime 🍗 • Résultat de cuisson personnalisé</h3>
  </div>
  <h2 class="text-2xl font-bold mb-4">Résultat</h2>
  <div class="flex flex-col md:flex-row justify-center items-start md:items-center my-5 gap-5">
    <div class="block w-full md:w-1/3 p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
      <p class="font-normal text-gray-700 dark:text-gray-400">Aliment</p>
      <div class="flex items-center justify-between">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{{ resultat.aliment }}</h5>
        <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
          <path fill="currentColor" fill-rule="evenodd" d="M21 11.0001c0-.8815-.3799-1.6731-.984-2.22145.5031-1.33846.2177-2.97144-.9813-3.94213-1.059-.8574-2.4761-.97568-3.6271-.42051-.2908-.39083-.6632-.70423-1.0895-.93179-.8229-.43923-1.8026-.53949-2.7413-.35637-1.2172.23745-2.18257 1.03558-2.68037 2.07405-.08983-.05265-.18224-.10165-.27714-.14661-.86027-.40752-1.89128-.46242-2.91449.05292-1.40603.70815-2.13029 2.35257-1.84394 3.8504-.16121.14468-.30525.31046-.42787.49818C3.13246 9.91685 3 10.4482 3 11.0001c0 .5506.445.9972.99497.9999H20.005c.55-.0027.995-.4493.995-.9999Zm-6.8905-.7654c-.2294-.50238-.8227-.72362-1.325-.49417-.5024.22945-1.0956.00821-1.3251-.49415-.2294-.50237-.0082-1.09562.4942-1.32507 1.5071-.68836 3.2868-.02463 3.9752 1.48247.2294.50236.0082 1.09562-.4942 1.32502-.5024.2295-1.0956.0083-1.3251-.4941Z" clip-rule="evenodd"/>
          <path fill="currentColor" d="M20.3593 15.2241c.2828-.5949-.195-1.2241-.8537-1.2241H4.49439c-.6587 0-1.1365.6292-.85371 1.2241.85327 1.7951 2.4178 3.2323 4.33593 4.0722V20c0 .5523.44772 1 1 1h6.04679c.5523 0 1-.4477 1-1v-.7037c1.9181-.8399 3.4827-2.2771 4.3359-4.0722Z"/>
        </svg>
      </div>
    </div>

      <div class="block w-full md:w-1/3 p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
        <p class="font-normal text-gray-700 dark:text-gray-400">Temps de cuisson</p>
        <div class="flex items-center justify-between">
          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{{ resultat.temps }}</h5>
          <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
            <path fill-rule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z" clip-rule="evenodd"/>
          </svg>
        </div>
      </div>
    
      <div class="block w-full md:w-1/3 p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
        <p class="font-normal text-gray-700 dark:text-gray-400">Température</p>
        <div class="flex items-center justify-between">
          <PremiumAuth v-slot="{ isAuthorized, handlePurchase }">
            <h5 :class="['mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white', !isAuthorized ? 'custom-blur-premium' : '']">{{ resultat.temperature }}</h5>
            <svg :class="['w-6 h-6 text-gray-800 dark:text-white', !isAuthorized ? 'custom-blur-premium' : '']" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
            <path fill-rule="evenodd" d="M13 3a1 1 0 1 0-2 0v2a1 1 0 1 0 2 0V3ZM6.343 4.929A1 1 0 0 0 4.93 6.343l1.414 1.414a1 1 0 0 0 1.414-1.414L6.343 4.929Zm12.728 1.414a1 1 0 0 0-1.414-1.414l-1.414 1.414a1 1 0 0 0 1.414 1.414l1.414-1.414ZM12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm-9 4a1 1 0 1 0 0 2h2a1 1 0 1 0 0-2H3Zm16 0a1 1 0 1 0 0 2h2a1 1 0 1 0 0-2h-2ZM7.757 17.657a1 1 0 1 0-1.414-1.414l-1.414 1.414a1 1 0 1 0 1.414 1.414l1.414-1.414Zm9.9-1.414a1 1 0 0 0-1.414 1.414l1.414 1.414a1 1 0 0 0 1.414-1.414l-1.414-1.414ZM13 19a1 1 0 1 0-2 0v2a1 1 0 1 0 2 0v-2Z" clip-rule="evenodd"/>
            </svg>
          </PremiumAuth>
        </div>
      </div>
  </div>

  
    <div class="w-full p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
      <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white mb-2">Préparation</h5>
      <PremiumAuth v-slot="{ isAuthorized, handlePurchase }">
        <p :class="['font-normal text-gray-700 dark:text-gray-400', !isAuthorized ? 'custom-blur-premium' : '']">{{ resultat.preparation }}</p>
      </PremiumAuth>
    </div>
</div>

<PremiumAuth v-slot="{ isAuthorized, handlePurchase }">
  <div v-if="resultatVisible" :class="['mt-6 flex justify-center gap-4', !isAuthorized ? 'custom-blur-premium' : '']">
    <button
      @click="telechargerPng"
      class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 transition"
    >
      📸 Télécharger en PNG
    </button>
    <button
      @click="telechargerPdf"
      class="text-blue-600 border border-blue-600 hover:bg-blue-600 hover:text-white font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 text-center dark:text-blue-600 dark:hover:bg-blue-700 dark:hover:text-white transition"
    >
      📄 Télécharger en PDF
    </button>

    <button
      @click="genererEtAfficherQrCode"
      class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 transition"
    >
      📱 Partager le QR Code
    </button>
  </div>
</PremiumAuth>


<section v-if="showQr" class="bg-white dark:bg-gray-900">
    <div class="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
        <div class="font-light text-gray-500 sm:text-lg dark:text-gray-400">
            <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Flashez le QR Code pour partager les informations</h2>
            <p class="mb-4">Partage instantanément les temps de cuisson et conseils de préparation Air Fryer avec tes proches. Scannez ce QR Code pour envoyer les infos directement à ta famille ou tes amis, que ce soit par message, mail ou réseaux sociaux. </p>
            <p>Plus besoin de tout répéter : un scan suffit pour qu'ils aient tout sous la main, où qu'ils soient, sur tous leurs appareils. Facile, rapide, pratique, et sans perte d'infos. Un simple geste pour partager l'essentiel.</p>
        </div>
        <div class="flex justify-center items-center mt-8">
          <div class="flex items-center justify-center my-5"> 
            <PremiumAuth v-slot="{ isAuthorized, handlePurchase }">
            <div :class="['max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700', !isAuthorized ? 'custom-blur-premium' : '']">
                <a href="#">
                    <img :src="qrCodeUrl" class="rounded-t-lg w-full" alt="QR Code">
                </a>
                <!-- <div class="p-5">
                    <a href="#">
                        <h5 class="mb-2 text-xl font-bold text-center tracking-tight text-gray-900 dark:text-white">Flashez le QR Code pour le partager</h5>
                    </a>
                    <p class="mb-3 font-normal text-center text-gray-700 dark:text-gray-400">Scan le QR Code pour partager le temps de cuisson et les conseils de préparation à ta famille et tes amis</p>
                </div> -->
                <div class="p-5">
                  <button
                  @click="telechargerQrCode"
                  class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 w-full dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 transition"
                >
                  📥 Télécharger le QR Code
                </button>
                </div>
            </div>
          </PremiumAuth>
          </div>
        </div>
    </div>
</section>


<div v-if="erreur" class="mt-4 text-red-500">{{ erreur }}</div>

<PremiumAuth v-slot="{ isAuthorized, handlePurchase }">
  <div v-if="resultatVisible && !isAuthorized" class="w-full p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 mt-4 text-center">
    <h3 class="text-xl font-bold mb-2 text-gray-900 dark:text-white">Débloquez toutes les fonctions premium</h3>
    <p class="mb-4 text-gray-700 dark:text-gray-300">
      Accédez au temps de cuisson, conseils, téléchargements et partage QR code pour 24h après paiement unique.
    </p>
    <button
      @click="handlePurchase"
      class="inline-flex items-center px-6 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 transition"
    >
      Débloque l'accès premium pour 0,99€
    </button>
  </div>
</PremiumAuth>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick, watch, onMounted, onUnmounted } from 'vue'
import PremiumAuth from './PremiumAuth.vue'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import QRCode from 'qrcode'
import { syncBypassFromStorage } from '../stores/bypass'

const aliment = ref('')
const poids = ref('')
const quantite = ref('')
const etat = ref('Cru')
const typeCuisson = ref('Croustillant')
const modele = ref('')
const chargement = ref(false)
const resultatVisible = ref(false)
const resultat = ref({
  aliment: '',
  temps: '',
  temperature: '',
  preparation: ''
})

const exportElement = ref(null)

const qrCodeUrl = ref('')
const showQr = ref(false)

const envoyerRequete = async () => {
  resultatVisible.value = false
  chargement.value = true

  const apiBaseUrl = import.meta.env.VITE_API_URL || '/.netlify/functions/';

  try {
    const response = await fetch(`${apiBaseUrl}cuisson`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        aliment: aliment.value,
        poids: poids.value,
        quantite: quantite.value,
        etat: etat.value,
        typeCuisson: typeCuisson.value,
        modele: modele.value
      })
    })

    const data = await response.json()

    // Analyse du résultat IA
    const texte = data.result || ''
    resultat.value.aliment = texte.match(/Aliment\s*:\s*(.+?)\s*\(/)?.[1] || aliment.value
    resultat.value.temps = texte.match(/Temps de cuisson\s*:\s*(.+)/)?.[1] || 'Non précisé'
    resultat.value.temperature = texte.match(/Température\s*:\s*(.+)/)?.[1] || 'Non précisée'
    resultat.value.preparation = texte.match(/Préparation\s*:\s*([\s\S]*)/)?.[1]?.replace(/---/g, '').trim() || 'Non précisée'

    const baseUrl = window.location.origin + window.location.pathname
    const qrParams = new URLSearchParams({
      aliment: resultat.value.aliment,
      temps: resultat.value.temps,
      temperature: resultat.value.temperature,
      preparation: resultat.value.preparation,
      // Ajoute ce que tu veux afficher
    })
    const finalUrl = `${baseUrl}?${qrParams.toString()}`
    qrCodeUrl.value = await QRCode.toDataURL(finalUrl)
    showQr.value = true

    resultatVisible.value = true
  } catch (err) {
    console.error('Erreur IA:', err)
    alert('Erreur lors du traitement.')
  } finally {
    chargement.value = false
  }
}

const telechargerPng = async () => {
  const html2canvas = (await import('html2canvas')).default
  const el = exportElement.value

  el.classList.add('export-style') // ➕ ajout du style temporaire
  await nextTick()


  if (!el) return alert("Élément non trouvé")

  const canvas = await html2canvas(el, {
    scale: 2, // meilleure qualité
    useCORS: true
  })

  const image = canvas.toDataURL('image/png')
  const link = document.createElement('a')
  link.href = image
  link.download = 'resultat-cuisson-airfrytime.png'
  link.click()

  el.classList.remove('export-style') // ➖ suppression après capture
}

const telechargerPdf = async () => {
  const [html2canvasModule, jsPDFModule] = await Promise.all([
    import('html2canvas'),
    import('jspdf')
  ])
  const html2canvas = html2canvasModule.default
  const jsPDF = jsPDFModule.default
  const el = exportElement.value

  el.classList.add('export-style')
  await nextTick()

  if (!el) return alert("Élément non trouvé")
  const canvas = await html2canvas(el, { scale: 2, useCORS: true })
  const imgData = canvas.toDataURL('image/png')

  const pdf = new jsPDF('p', 'mm', 'a4')
  const pdfWidth = pdf.internal.pageSize.getWidth() - 20 // 10px de marge de chaque côté
  const pdfHeight = (canvas.height * pdfWidth) / canvas.width

  pdf.addImage(imgData, 'PNG', 10, 10, pdfWidth, pdfHeight)
  pdf.save('resultat-cuisson-airfrytime.pdf')

  el.classList.remove('export-style')
}

const telechargerQrCode = async () => {
  try {
    const response = await fetch(qrCodeUrl.value)
    const blob = await response.blob()
    const url = URL.createObjectURL(blob)

    const a = document.createElement('a')
    a.href = url
    a.download = 'qr-code-airfrytime.png'
    a.click()

    URL.revokeObjectURL(url)
  } catch (e) {
    alert("Erreur lors du téléchargement du QR code")
    console.error(e)
  }
}

const genererEtAfficherQrCode = async () => {
  const baseUrl = window.location.origin + window.location.pathname
  const qrParams = new URLSearchParams({
    aliment: resultat.value.aliment,
    temps: resultat.value.temps,
    temperature: resultat.value.temperature,
    preparation: resultat.value.preparation
  })
  const finalUrl = `${baseUrl}?${qrParams.toString()}`
  qrCodeUrl.value = await QRCode.toDataURL(finalUrl)
  showQr.value = true
}

onMounted(() => {
  // console.log('CuissonForm - Component mounted, syncing bypass state');
  syncBypassFromStorage()
  window.addEventListener('storage', syncBypassFromStorage)

  // Forcer une synchronisation après un délai pour s'assurer que l'état est correct
  setTimeout(() => {
    syncBypassFromStorage();
    // console.log('CuissonForm - Delayed sync completed');
  }, 100);

  const query = new URLSearchParams(window.location.search)
  if (query.has('aliment')) {
    resultatVisible.value = true
    resultat.value = {
      aliment: query.get('aliment') || '',
      temps: query.get('temps') || '',
      temperature: query.get('temperature') || '',
      preparation: query.get('preparation') || 'Non précisée'
    }
  }
})

onUnmounted(() => {
  window.removeEventListener('storage', syncBypassFromStorage)
})

</script>

<style scoped>
  .export-style {
    max-width: 900px;
    margin-left: auto;
    margin-right: auto;
    padding: 2rem 1rem;
    background: white;
    border-radius: 0.5rem;
  }
  .custom-blur-premium{
    filter: blur(6px);
    user-select: none;
    pointer-events: none;
  }
</style>
