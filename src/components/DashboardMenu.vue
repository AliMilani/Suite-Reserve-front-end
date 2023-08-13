<script setup>
import { UserCircleIcon } from '@heroicons/vue/24/solid'
import { inject } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

const store = useStore()
const router = useRouter()
const vuesax = inject('$vs')

const logout = () => {
  vuesax.dialog({
    type: 'confirm',
    color: 'warning',
    title: `اطلاع رسانی`,
    acceptText: 'آره',
    cancelText: 'خیر',
    text: `آیا میخواهید از حساب کاربری خارج شوید؟`,
    accept: () => {
      store.commit('logout')
      router.push({ path: '/login' })
    }
  })
}
</script>
<template>
  <div class="w-full">
    <div class="flex">
      <div class="flex items-center">
        <UserCircleIcon class="w-9 h-9 ml-2" />
      </div>
      <div class="flex items-center">
        <!-- {{ userInfo }} -->
        <span class="w-full">همکار گرامی</span>
        <!-- <span class="w-full">12540687</span> -->
      </div>
    </div>
    <ul
      class="border mt-4 border-gray-400 dark:bg-slate-800 dark:border-slate-600 rounded-md overflow-hidden"
    >
      <li class="border-b border-gray-400 dark:border-slate-600">
        <RouterLink class="px-5 py-3 block" to="/dashboard/">رزرو اتاق </RouterLink>
      </li>
      <li class="border-b border-gray-400 dark:border-slate-600">
        <RouterLink class="px-5 py-3 block" to="/dashboard/bankTrannactions"
          >تراکنش های بانکی
        </RouterLink>
      </li>
      <li class="border-b border-gray-400 dark:border-slate-600">
        <RouterLink class="px-5 py-3 block" to="/dashboard/companions">همراهان </RouterLink>
      </li>
      <li
        @click="logout"
        class="px-5 py-3 hover:bg-red-600 hover:text-white transition-all cursor-pointer"
      >
        خروج از حساب <span class="inline md:hidden lg:inline">کاربری</span>
      </li>
    </ul>
  </div>
</template>
<style scoped>
.router-link-exact-active {
  background-color: rgba(20, 109, 30, 0.8);
  color: white;
}
</style>
