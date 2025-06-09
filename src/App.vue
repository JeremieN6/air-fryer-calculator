<template>
  <div :class="{ dark: isDarkMode }">
    <div>
      <div v-if="isBypassActive" class="bg-yellow-100 text-yellow-800 text-sm text-center py-2">
        ⚠️ Mode sans restriction actif (admin/dev)
      </div>
    </div>
    <RouterView />
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router'
import { ref } from 'vue'
import { isBypassActive } from './stores/bypass';

const isDarkMode = ref(false)

onMounted(() => {
  window.addEventListener('storage', syncBypassFromStorage)
  syncBypassFromStorage()
})

onUnmounted(() => {
  window.removeEventListener('storage', syncBypassFromStorage)
})

console.log('isBypassActive', isBypassActive.value)

</script>
