<template>
  <div :class="{ dark: isDarkMode }">
    <RouterView />
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router'
import { ref } from 'vue'

const isDarkMode = ref(false)

</script>
