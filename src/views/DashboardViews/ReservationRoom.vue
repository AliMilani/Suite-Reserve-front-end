<script setup>
import Table from '../../components/BaseTable.vue'
import { curencyFormat, toSolar } from '@/assets/js/init.js'
import { checkStatus } from '@/assets/js/_erHandler.js'
import { DocumentTextIcon } from '@heroicons/vue/24/outline'
import AddReservation from '../../components/AddReservation.vue'
import { ref, inject, onMounted } from 'vue'
import axios from 'axios'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

const store = useStore()
const router = useRouter()

const vuesax = inject('$vs')

let head_item = [
  {
    headText: 'شناسه رزرو',
    minshow: true
  },
  {
    headText: 'هزینه یک شب اتاق (ریال)',
    minshow: false
  },
  {
    headText: 'هزینه کل (ریال)',
    minshow: true
  },
  {
    headText: 'شماره اتاق',
    minshow: true
  },
  {
    headText: 'تعداد تخت',
    minshow: false
  },
  {
    headText: 'تعداد همراهان',
    minshow: false
  },
  {
    headText: 'از تاریخ',
    minshow: true
  },
  {
    headText: 'تا تاریخ',
    minshow: true
  },
  {
    headText: 'تاریخ ثبت',
    minshow: true
  },
  {
    headText: 'عملیات',
    minshow: true
  }
]

let reserves = ref([])

let reservationModal = ref(false)

let isLoaded = ref(false)

const setLoading = (status = true) => {
  if (status) {
    vuesax.loading({
      container: '#loading-wraper',
      scale: 0.45
    })
    isLoaded.value = false
  } else {
    vuesax.loading.close('#loading-wraper > .con-vs-loading')
    isLoaded.value = true
  }
}

const LoadDate = () => {
  setLoading()
  axios
    .get('/reserves/self')
    .then((response) => {
      if (response.status === 200 && response.data.msgCode === 200) {
        console.log(response.data.data)
        reserves.value = response.data.data
        setLoading(false)
      } else throw response
    })
    .catch((er) => {
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
      setLoading(false)
    })
}

onMounted(() => {
  LoadDate()
})
</script>

<template>
  <div>
    <div class="mb-4 space-x-2 space-x-reverse">
      <vs-button color="#146d1e" type="filled" @click="reservationModal = true">
        ثبت رزرو اتاق
      </vs-button>
      <vs-button color="#003a36" type="filled" :disabled="!isLoaded" @click="LoadDate"
        >به روزرسانی</vs-button
      >
    </div>
    <div class="relative w-full min-h-[12rem]">
      <div class="bg-red" id="loading-wraper"></div>
      <Transition name="fade">
        <Table :head-item="head_item" :items="reserves" v-slot="props" v-if="isLoaded">
          <vs-td>{{ props.dataitem._id }}</vs-td>
          <vs-td>{{ curencyFormat(4_500_000) }}</vs-td>
          <vs-td>{{ props.dataitem.suite.roomNumber }}</vs-td>
          <vs-td>{{ toSolar(props.dataitem.startDate, false) }}</vs-td>
          <vs-td>{{ toSolar(props.dataitem.endDate, false) }}</vs-td>
          <vs-td>{{ toSolar(props.dataitem.createdAt) }}</vs-td>
          <vs-td>
            <vs-tooltip color="#146d1e" text="جزئیات رزرو" position="right">
              <DocumentTextIcon
                @click="props.openmodal(props.dataitem)"
                class="w-5 h-5 cursor-pointer ml-2"
              />
            </vs-tooltip>
            <!-- <vs-tooltip color="#146d1e" text="لغو رزرو" position="left">
              <TrashIcon class="w-5 h-5 cursor-pointer text-red-600" />
            </vs-tooltip> -->
          </vs-td>
        </Table>
      </Transition>
    </div>

    <vs-popup
      class="holamundo reservation-modal"
      title="ثبت درخواست رزرو اتاق"
      v-model:active="reservationModal"
    >
      <AddReservation v-if="reservationModal" />
    </vs-popup>
  </div>
</template>

<style>
.reservation-modal .vs-popup {
  width: 100%;
  max-width: 1200px;
}

@media (min-width: 1024px) {
  .reservation-modal .vs-popup {
    width: 70%;
  }
}
</style>
