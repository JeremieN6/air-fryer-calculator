<template>
    <slot :isAuthorized="isBypassActive.value || userHasAccess" :handlePurchase="handlePurchase"></slot>
</template>

<script setup>
import { isBypassActive, syncBypassFromStorage } from '../stores/bypass'
import { ref, onMounted, onUnmounted } from 'vue'

const userHasAccess = ref(false)

async function checkAuthorization() {
  const token = sessionStorage.getItem('premiumToken');
  if (!token) return;
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
  } catch (error) {
    userHasAccess.value = false;
  }
}

function handleStorageEvent() {
  syncBypassFromStorage();
}

onMounted(() => {
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

console.log('isBypassActive', isBypassActive.value)
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