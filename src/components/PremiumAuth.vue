<template>
    <slot :isAuthorized="isAuthorized" :handlePurchase="handlePurchase"></slot>
</template>

<script setup>
import { isBypassActive, syncBypassFromStorage } from '../stores/bypass'
import { ref, onMounted, onUnmounted, computed, watch } from 'vue'

const userHasAccess = ref(false)

// Computed pour la logique d'autorisation
const isAuthorized = computed(() => {
  const bypassActive = isBypassActive.value;
  const hasAccess = userHasAccess.value;
  // console.log('PremiumAuth - Bypass actif:', bypassActive, 'User has access:', hasAccess);
  return bypassActive || hasAccess;
});

// Watcher pour débugger les changements
watch(isBypassActive, (newValue) => {
  // console.log('PremiumAuth - isBypassActive changed to:', newValue);
}, { immediate: true });

watch(isAuthorized, (newValue) => {
  // console.log('PremiumAuth - isAuthorized changed to:', newValue);
}, { immediate: true });

async function checkAuthorization() {
  const token = sessionStorage.getItem('premiumToken');
  if (!token) {
    // console.log('PremiumAuth - No token found');
    return;
  }
  try {
    const response = await fetch('/.netlify/functions/verifyToken', {
      method: 'POST',
      body: JSON.stringify({
        token,
        ua: navigator.userAgent
      })
    });
    const { authorized } = await response.json();
    userHasAccess.value = authorized;
    // console.log('PremiumAuth - Token verification result:', authorized);
  } catch (error) {
    // console.log('PremiumAuth - Token verification error:', error);
    userHasAccess.value = false;
  }
}

function handleStorageEvent() {
  // console.log('PremiumAuth - Storage event detected, syncing bypass');
  syncBypassFromStorage();
}

onMounted(() => {
  // console.log('PremiumAuth - Component mounted');
  syncBypassFromStorage();
  window.addEventListener('storage', handleStorageEvent);
  checkAuthorization();
});

onUnmounted(() => {
  window.removeEventListener('storage', handleStorageEvent);
});

async function handlePurchase() {
  try {
    const response = await fetch('/.netlify/functions/create-checkout-session', {
      method: 'POST',
      body: JSON.stringify({
        ua: navigator.userAgent
      })
    });
    const { url, token } = await response.json();
    if (token) sessionStorage.setItem('premiumToken', token);
    window.location.href = url;
  } catch (error) {
    alert('Erreur lors de la création de la session Stripe');
  }
}
</script>

<style scoped>
.premium-content-blur {
  position: relative;
  filter: blur(4px);
  pointer-events: none;
}

.premium-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.7);
}

.premium-content {
  text-align: center;
  color: white;
  padding: 2rem;
  background: rgba(0, 0, 0, 0.8);
  border-radius: 8px;
  max-width: 400px;
}

.premium-button {
  background: #4CAF50;
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1.1rem;
  margin-top: 1rem;
  transition: background 0.3s;
}

.premium-button:hover {
  background: #45a049;
}
</style> 