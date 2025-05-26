<template>
    <section>
      <LP_Header />
      <h1 class="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Fonctionnalités de
        AirFryTime </h1>
      <LP_Features />
      <LP_Testimonials />
      <LP_FAQ />
      <LP_Footer />
    </section>
  </template>

<script setup>
    import LP_Header from '../components/LP_Header.vue'
    import LP_Features from '../components/LP_Features.vue'
    import LP_Testimonials from '../components/LP_Testimonials.vue'
    import LP_FAQ from '../components/LP_FAQ.vue'
    import LP_Footer from '../components/LP_Footer.vue'
</script>