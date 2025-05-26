<template>
        <!-- 
Install the "flowbite-typography" NPM package to apply styles and format the article content: 

URL: https://flowbite.com/docs/components/typography/ 
-->

<main class="pt-8 pb-16 lg:pt-16 lg:pb-24 bg-white dark:bg-gray-900 antialiased">
  <div class="flex justify-between px-4 mx-auto max-w-screen-xl ">
      <article class="mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
          <header class="mb-4 lg:mb-6 not-format">
              <address class="flex items-center mb-6 not-italic">
                  <div class="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                      <img class="mr-4 w-16 h-16 rounded-full" src="/./public/assets/images/moi.webp" alt="Jeremie N.">
                      <div>
                          <a href="#" rel="author" class="text-xl font-bold text-gray-900 dark:text-white">Jeremie N.</a>
                          <p class="text-base text-gray-500 dark:text-gray-400">Développeur, & CEO de AirFryTime 🍗</p>
                          <p class="text-base text-gray-500 dark:text-gray-400"><time pubdate datetime="2025-27-05" title="February 8th, 2022">May. 27, 2025</time></p>
                      </div>
                  </div>
              </address>
              <h1 class="mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl dark:text-white">...</h1>
          </header>
          <p class="lead mb-6 text-lg text-gray-700 dark:text-gray-300">...</p>

          <!-- <section v-for="(section, index) in article.sections" :key="index">
            <h2 class="mt-12 mb-6 text-2xl font-semibold text-gray-900 dark:text-white">...</h2>
            <p class="mb-6 text-gray-700 dark:text-gray-300">...</p>
          </section> -->
          <h2 class="mt-12 mb-6 text-2xl font-semibold text-gray-900 dark:text-white">Getting started with Flowbite</h2>
          <p class="mb-6 text-gray-700 dark:text-gray-300">First of all you need to understand how Flowbite works. This library is not another framework.
              Rather, it is a set of components based on Tailwind CSS that you can just copy-paste from the
              documentation.</p>
          <p class="mb-6 text-gray-700 dark:text-gray-300">It also includes a JavaScript file that enables interactive components, such as modals, dropdowns,
              and datepickers which you can optionally include into your project via CDN or NPM.</p>
          <p class="mb-6 text-gray-700 dark:text-gray-300">You can check out the <a href="https://flowbite.com/docs/getting-started/quickstart/">quickstart
                  guide</a> to explore the elements by including the CDN files into your project. But if you want
              to build a project with Flowbite I recommend you to follow the build tools steps so that you can
              purge and minify the generated CSS.</p>
          <p class="mb-6 text-gray-700 dark:text-gray-300">You'll also receive a lot of useful application UI, marketing UI, and e-commerce pages that can help
              you get started with your projects even faster. You can check out this <a
                  href="https://flowbite.com/docs/components/tables/">comparison table</a> to better understand
              the differences between the open-source and pro version of Flowbite.</p>
          <h2 class="mt-12 mb-6 text-2xl font-semibold text-gray-900 dark:text-white">When does design come in handy?</h2>
          <p class="mb-6 text-gray-700 dark:text-gray-300">While it might seem like extra work at a first glance, here are some key moments in which prototyping
              will come in handy:</p>
          <ol class="list-decimal list-inside space-y-3 text-gray-700 dark:text-gray-300">
              <li><strong>Usability testing</strong>. Does your user know how to exit out of screens? Can they
                  follow your intended user journey and buy something from the site you’ve designed? By running a
                  usability test, you’ll be able to see how users will interact with your design once it’s live;
              </li>
              <li><strong>Involving stakeholders</strong>. Need to check if your GDPR consent boxes are displaying
                  properly? Pass your prototype to your data protection team and they can test it for real;</li>
              <li><strong>Impressing a client</strong>. Prototypes can help explain or even sell your idea by
                  providing your client with a hands-on experience;</li>
              <li><strong>Communicating your vision</strong>. By using an interactive medium to preview and test
                  design elements, designers and developers can understand each other — and the project — better.
              </li>
          </ol>
          <h3 class="mt-10 mb-4 text-xl font-semibold text-gray-900 dark:text-white">Laying the groundwork for best design</h3>
          <p class="mb-6 text-gray-700 dark:text-gray-300">Before going digital, you might benefit from scribbling down some ideas in a sketchbook. This way,
              you can think things through before committing to an actual design project.</p>
          <p class="mb-6 text-gray-700 dark:text-gray-300">Let's start by including the CSS file inside the <code>head</code> tag of your HTML.</p>
          <h3 class="mt-10 mb-4 text-xl font-semibold text-gray-900 dark:text-white">Understanding typography</h3>
          <h4 class="mt-8 mb-3 text-lg font-semibold text-gray-900 dark:text-white">Type properties</h4>
          <p class="mb-6 text-gray-700 dark:text-gray-300">A typeface is a collection of letters. While each letter is unique, certain shapes are shared across
              letters. A typeface represents shared patterns across a collection of letters.</p>
          <h4 class="mt-8 mb-3 text-lg font-semibold text-gray-900 dark:text-white">Baseline</h4>
          <p class="mb-6 text-gray-700 dark:text-gray-300">A typeface is a collection of letters. While each letter is unique, certain shapes are shared across
              letters. A typeface represents shared patterns across a collection of letters.</p>
      </article>
  </div>
</main>

</template>

<!-- <script setup>
import { ref, onMounted } from 'vue'
import articlesData from './articles.json'

const article = ref(null)

onMounted(() => {
  try {
    console.log('articlesData:', articlesData) // Pour voir les données importées
    // Vérifier si articlesData existe et contient des données
    if (articlesData && articlesData.length > 0) {
      article.value = articlesData[0]
      console.log('article.value:', article.value) // Pour voir l'article assigné
    } else {
      console.error('Aucun article trouvé dans articlesData')
    }
  } catch (error) {
    console.error('Erreur lors du chargement de l\'article:', error)
  }
})
</script> -->