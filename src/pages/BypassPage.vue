<template>
<div class="flex justify-center items-center w-full max-w-md mx-auto p-4 mt-10 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
    <form class="space-y-6">
        <h5 class="text-xl font-medium text-gray-900 dark:text-white">🔓 Activer le mode sans restriction</h5>
        <div>
            <input v-model="code" type="text" name="text" id="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Entrez votre code" />
        </div>
        <button @click.prevent="checkCode" class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Activer</button>
        <p v-if="error" class="mt-2 text-sm text-red-600 dark:text-red-500"><span class="font-medium">Oops!</span> Le code n'est pas valide.</p>
    </form>
</div>

  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { activateBypass } from '../stores/bypass';
  
  const code = ref('');
  const error = ref(false);
  const router = useRouter();
  
  function checkCode() {
  const allowed = import.meta.env.VITE_BYPASS_ALLOWED_CODES?.split(',') || [];
  if (allowed.includes(code.value.trim())) {
    activateBypass();
    // Redirection après un petit délai pour garantir la synchro du localStorage
    setTimeout(() => {
      router.push('/calculateur-cuisson-air-fryer');
    }, 100);
  } else {
    error.value = true;
  }
}
  </script>
  