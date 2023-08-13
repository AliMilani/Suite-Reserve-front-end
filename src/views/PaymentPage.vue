<script setup>
import { inject, ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { checkStatus } from '@/assets/js/_erHandler.js'
import { useStore } from 'vuex'
const vuesax = inject('$vs')

const router = useRouter()
const store = useStore()

const getreservationInfo = computed(() => {
  return {
    startDate: store.state.reservationInfo.reservedTime.startDate,
    endDate: store.state.reservationInfo.reservedTime.endDate,
    suite: store.state.reservationInfo.room._id,
    travelCompanions: store.state.reservationInfo.companions.map((item) => item._id)
  }
})

const isLoading = ref(false)

const paySuccess = () => {
  setLoading()
  axios
    .post('/reserves/new', getreservationInfo.value)
    .then((response) => {
      let validStatus = checkStatus(response.data, response.status)
      if (validStatus.status) {
        vuesax.notify({
          title: 'اطلاع رسانی',
          text: validStatus.msg,
          color: 'success',
          icon: 'verified_use',
          position: 'top-right'
        })
      }
      setLoading(false)
      router.push({ path: '/dashboard' })
    })
    .catch((er) => {
      setLoading(false)
      if (!er.response) {
        vuesax.notify({
          title: 'خطا',
          text: 'خطایی رخ داده است لطفا بعدا امتحان کنید.',
          color: 'danger',
          icon: 'error',
          position: 'top-right'
        })
        return false
      }
      let validStatus = checkStatus(er.response.data, er.response.status)
      if (validStatus.redirect) {
        store.commit('logout')
        router.push({ path: validStatus.redirect })
        return
      }
      vuesax.notify({
        title: 'خطا',
        text: validStatus.msg,
        color: 'danger',
        icon: 'error',
        position: 'top-right'
      })
    })
}

const setLoading = (status = true) => {
  if (status) {
    vuesax.loading({
      container: '#loading',
      scale: 0.45
    })
    isLoading.value = true
  } else {
    vuesax.loading.close('#loading > .con-vs-loading')
    isLoading.value = false
  }
}

const payFailed = () => {
  router.push({ path: '/' })
}

const validReservations = () => {
  if (!getreservationInfo.value.startDate || !getreservationInfo.value.endDate) {
    router.push('/')
  }
}

onMounted(() => {
  validReservations()
})
</script>
<template>
  <div class="container mx-auto px-5">
    <div
      class="rounded-xl relative bg-[#fbfbfb] overflow-hidden mx-auto dark:bg-slate-900 dark:border-none dark:shadow-gray-500/25 dark:text-white border shadow-lg mt-10 w-full md:w-96 flex-wrap lg:flex-nowrap"
    >
      <span id="loading"></span>
      <div class="bg-maincolor/80 text-white w-full p-5 text-lg font-semibold">صفحه پرداخت</div>
      <div class="p-5">
        <p>این صفحه پرداخت برای تست طراحی شده است.</p>
        <div class="flex space-x-5 space-x-reverse mt-10">
          <vs-button color="#146d1e" type="filled" :disabled="isLoading" @click="paySuccess"
            >پرداخت موفق</vs-button
          >
          <vs-button color="danger" type="filled" :disabled="isLoading" @click="payFailed"
            >پرداخت ناموفق</vs-button
          >
        </div>
      </div>
    </div>
  </div>
</template>
