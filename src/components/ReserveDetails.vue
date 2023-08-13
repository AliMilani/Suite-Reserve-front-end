<script setup>
import { computed, inject } from 'vue'
import { curencyFormat, toSolar } from '@/assets/js/init.js'
// import axios from 'axios'
// import { useStore } from 'vuex'
// import { useRouter } from 'vue-router'
// import { checkStatus } from '@/assets/js/_erHandler.js'

// const store = useStore()
// const router = useRouter()

// const vuesax = inject('$vs')
// const reserveCancel = (id) => {
//   vuesax.dialog({
//     type: 'confirm',
//     color: 'warning',
//     title: `هشدار`,
//     acceptText: 'حدف شود',
//     cancelText: 'خیر',
//     text: 'آیا میخواهد رزرو را لغو کنید؟',
//     accept: () => {
//       deleteReserveReq(id)
//     }
//   })
// }

// const deleteReserveReq = (id) => {
//   store.dispatch('setTokenHeadder')
//   axios
//     .delete(`/travel-companions/${id}`)
//     .then((response) => {
//       let validStatus = checkStatus(response.data, response.status)
//       if (validStatus.status) {
//         vuesax.notify({
//           title: 'اطلاع رسانی',
//           text: validStatus.msg,
//           color: 'success',
//           icon: 'verified_use',
//           position: 'top-right'
//         })
//       }
//     })
//     .catch((er) => {
//       if (!er.response) {
//         vuesax.notify({
//           title: 'خطا',
//           text: 'خطایی رخ داده است لطفا بعدا امتحان کنید.',
//           color: 'danger',
//           icon: 'error',
//           position: 'top-right'
//         })
//         return false
//       }
//       let validStatus = checkStatus(er.response.data, er.response.status)
//       if (validStatus.redirect) {
//         store.commit('logout')
//         router.push({ path: validStatus.redirect })
//         return
//       }
//       vuesax.notify({
//         title: 'خطا',
//         text: validStatus.msg,
//         color: 'danger',
//         icon: 'error',
//         position: 'top-right'
//       })
//     })
// }

let props = defineProps({
  data: {
    type: Object,
    required: false
  }
})

const reservationData = computed(() => props.data)
</script>
<template>
  <div>
    <div class="w-1/3 p-3">
      <div class="flex items-center">
        <span class="w-fit dark:text-white whitespace-nowrap">شناسه رزرو :</span>
        <span class="bg-fgreen text-white w-fit mx-3 px-3 py-1 rounded-full">{{
          reservationData._id
        }}</span>
      </div>
    </div>
    <div class="relative p-3 image-hover">
      <img
        src="@/assets/img/rooms/3-1.png"
        class="w-100 grayscale transition-all duration-1000 brightness-50 rounded-lg hover:brightness-100 hover:grayscale-0"
        alt=""
      />
      <span
        class="top-1/2 whitespace-nowrap right-1/2 font-bold absolute text-4xl transition-all duration-1000 text-gray-200 translate-x-1/2 -translate-y-1/2"
      >
        {{ reservationData.suite?.title }}
      </span>
    </div>
    <div class="flex flex-wrap dark:text-white">
      <div class="w-1/3 p-3">
        <div class="flex flex-col items-center">
          <span class="w-fit">هزینه یک شب اتاق :</span>
          <span class="bg-fgreen text-white w-fit mt-2 px-3 py-1 rounded-full"
            >{{ curencyFormat(1_500_000) }} ریال
          </span>
        </div>
      </div>
      <div class="w-1/3 p-3">
        <div class="flex flex-col items-center">
          <span class="w-fit">هزینه کل :</span>
          <span class="bg-fgreen text-white w-fit mt-2 px-3 py-1 rounded-full"
            >{{ curencyFormat(4_500_000) }} ریال
          </span>
        </div>
      </div>
      <div class="w-1/3 p-3">
        <div class="flex flex-col items-center">
          <span class="w-fit">شماره اتاق :</span>
          <span class="bg-fgreen text-white w-fit mt-2 px-3 py-1 rounded-full">
            اتاق {{ reservationData.suite?.roomNumber }}</span
          >
        </div>
      </div>
      <div class="w-1/3 p-3">
        <div class="flex flex-col items-center">
          <span class="w-fit">تعداد تخت :</span>
          <span class="bg-fgreen text-white w-fit mt-2 px-3 py-1 rounded-full"
            >{{ reservationData.suite?.totalBeds }}
            تخته
          </span>
        </div>
      </div>
      <div class="w-1/3 p-3">
        <div class="flex flex-col items-center">
          <span class="w-fit">تعداد همراهان :</span>
          <span class="bg-fgreen text-white w-fit mt-2 px-3 py-1 rounded-full"
            >{{ reservationData.travelCompanions?.length }}
            همراه
          </span>
        </div>
      </div>
      <div class="w-1/3 p-3">
        <div class="flex flex-col items-center">
          <span class="w-fit">وضعیت :</span>
          <span class="bg-fgreen text-white w-fit mt-2 px-3 py-1 rounded-full">پرداخت شده</span>
        </div>
      </div>
      <div class="w-1/3 p-3">
        <div class="flex flex-col items-center">
          <span class="w-fit">از تاریخ :</span>
          <span class="bg-fgreen text-white w-fit mt-2 px-3 py-1 rounded-full">{{
            toSolar(reservationData.startDate, false)
          }}</span>
        </div>
      </div>
      <div class="w-1/3 p-3">
        <div class="flex flex-col items-center">
          <span class="w-fit">تا تاریخ :</span>
          <span class="bg-fgreen text-white w-fit mt-2 px-3 py-1 rounded-full">{{
            toSolar(reservationData.endDate, false)
          }}</span>
        </div>
      </div>
      <div class="w-1/3 p-3">
        <div class="flex flex-col items-center">
          <span class="w-fit">تاریخ ایجاد :</span>
          <span class="bg-fgreen text-white w-fit mt-2 px-3 py-1 rounded-full">{{
            toSolar(reservationData.createdAt, false)
          }}</span>
        </div>
      </div>
      <div class="w-full flex justify-end">
        <div class="space-x-3 space-x-reverse mt-4">
          <vs-button color="dark" type="filled">چاپ معرفی نامه</vs-button>
          <!-- <vs-button color="danger" type="filled" @click="reserveCancel">لغو رزرو</vs-button> -->
        </div>
      </div>
    </div>
  </div>
</template>
