<template>
  <div class="bg-white min-h-screen flex flex-col">
    <header class="absolute inset-x-0 top-0 z-50">
      <nav class="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div class="flex lg:flex-1">
          <a href="#" class="-m-1.5 p-1.5">
            <span class="sr-only">Your Company</span>
            <img
              class="h-8 w-auto"
              src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
              alt=""
            />
          </a>
        </div>
        <div class="lg:flex lg:gap-x-12">
          <RouterLink v-for="page in pages" :to="page.path" :key="page.name">{{
            page.name
          }}</RouterLink>
        </div>
      </nav>
    </header>

    <div class="relative isolate px-6 pt-14 lg:px-8 flex-grow flex flex-col">
      <div
        class="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        aria-hidden="true"
      >
        <div
          class="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          style="
            clip-path: polygon(
              74.1% 44.1%,
              100% 61.6%,
              97.5% 26.9%,
              85.5% 0.1%,
              80.7% 2%,
              72.5% 32.5%,
              60.2% 62.4%,
              52.4% 68.1%,
              47.5% 58.3%,
              45.2% 34.5%,
              27.5% 76.7%,
              0.1% 64.9%,
              17.9% 100%,
              27.6% 76.8%,
              76.1% 97.7%,
              74.1% 44.1%
            );
          "
        ></div>
      </div>
      <div class="mx-auto w-full max-w-2xl py-16 sm:py-24 lg:py-32 flex-grow flex flex-col">
        <div class="text-center">
          <h1 class="text-balance text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl">
            PokéDoro
          </h1>
          <p class="mt-3 text-pretty text-lg font-medium text-gray-500 sm:text-xl/8">
            Complete pomodoros, find Pokémons.
          </p>
        </div>
        <div class="mt-10 flex-grow flex flex-col">
          <RouterView />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import router from '@/router'

export default {
  components: {
    RouterLink,
    RouterView,
  },
  computed: {
    pages() {
      return router.options.routes
        .filter((route) => !route.meta?.hideInNav)
        .map((route) => ({
          name: route.name,
          path: route.path,
        }))
    },
  },
}
</script>
