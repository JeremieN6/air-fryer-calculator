import { ref } from 'vue'

const isBypassActive = ref(localStorage.getItem('bypassActive') === 'true')

// Ajoute cette fonction pour forcer la synchro depuis le localStorage
export function syncBypassFromStorage() {
  // Toujours relire la valeur du localStorage
  isBypassActive.value = localStorage.getItem('bypassActive') === 'true'
}

export function activateBypass() {
  isBypassActive.value = true
  localStorage.setItem('bypassActive', 'true')
  // Déclenche un event pour tous les onglets
  window.dispatchEvent(new Event('storage'))
}

export function deactivateBypass() {
  isBypassActive.value = false
  localStorage.removeItem('bypassActive')
  window.dispatchEvent(new Event('storage'))
}

export { isBypassActive }