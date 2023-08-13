<script setup>
import { ref, onMounted, computed } from 'vue'
import { RouterLink } from 'vue-router'

import { Bars3Icon, XMarkIcon, SunIcon, MoonIcon } from '@heroicons/vue/24/solid'
import { useStore } from 'vuex'

const Links = [
  {
    title: 'صفحه اصلی',
    route: '/'
  },
  {
    title: 'درباره ما',
    route: '/about'
  },
  {
    title: 'ارتباط با ما',
    route: '/contactUs'
  },
  {
    title: 'شرایط استفاده',
    route: '/terms_of_Use'
  }
]

const store = useStore()

let _sm_nav = ref(false)

const darkMode = computed(() => store.state.darkMode)

onMounted(() => {
  store.commit('getMode')
})
</script>

<template>
  <header class="p-3">
    <div class="container relative flex items-center justify-between mx-auto">
      <div class="flex items-center">
        <div class="w-11 sm:w-40 ml-8">
          <img
            src="./../assets/img/Logo/full_logo.svg"
            class="hidden sm:block dark:sm:hidden"
            alt="لوگو"
          />
          <img
            src="./../assets/img/Logo/full_logo_dark.svg"
            class="hidden dark:sm:block"
            alt="لوگو"
          />
          <img src="./../assets/img/Logo/logo.svg" class="block sm:hidden" alt="لوگو" />
        </div>
        <nav
          class="absolute dark:text-white bg-white dark:bg-slate-800 dark:md:bg-transparent dark:border-none w-11/12 transition-all top-20 border shadow-lg p-5 rounded-lg -translate-x-1/2 z-50 md:block md:static duration-500 md:border-none md:shadow-none md:w-auto md:translate-x-0 md:bg-transparent"
          :class="{ 'left-1/2': _sm_nav, '-left-96': !_sm_nav }"
        >
          <ul
            class="flex flex-col md:flex-row md:space-x-5 space-y-2 md:space-y-0 md:space-x-reverse"
          >
            <li
              v-for="(item, index) in Links"
              :key="index"
              class="hover:mr-2 md:hover:mr-0 transition-all"
            >
              <router-link :to="item.route">{{ item.title }}</router-link>
            </li>
          </ul>
        </nav>
        <button class="md:hidden" @click="_sm_nav = !_sm_nav">
          <Bars3Icon class="w-6 h-6 dark:text-white" v-if="!_sm_nav" />
          <XMarkIcon class="w-6 h-6 dark:text-white" v-if="_sm_nav" />
        </button>
      </div>
      <div class="flex items-center">
        <span class="ml-2">
          <!-- <vs-tooltip color="#146d1e" text="حالت روشن" position="right"> -->
          <SunIcon
            v-if="darkMode"
            class="w-6 h-6 dark:text-white"
            @click="store.commit('setMode', false)"
          />
          <!-- </vs-tooltip> -->
          <!-- <vs-tooltip color="#146d1e" text="حالت تاریک" position="right"> -->
          <MoonIcon
            v-if="!darkMode"
            class="w-6 h-6 dark:text-white"
            @click="store.commit('setMode', true)"
          />
          <!-- </vs-tooltip> -->
        </span>
        <button
          class="py-2 px-4 rounded-full text-white bg-maincolor"
          @click="$router.push('/dashboard')"
        >
          {{ store.state.isAuthenticated ? 'حساب کاربری' : 'ورود به حساب' }}
        </button>
      </div>
    </div>
  </header>
</template>

<style></style>
