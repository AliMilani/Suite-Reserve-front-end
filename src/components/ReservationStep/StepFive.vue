<script setup>
import { ref, inject, computed, onMounted } from 'vue'
import Table from '../../components/BaseTable.vue'
import { PhotoIcon, InformationCircleIcon, CheckCircleIcon } from '@heroicons/vue/24/outline'
import { useStore } from 'vuex'
import axios from 'axios'
import { checkStatus } from '@/assets/js/_erHandler.js'
import { useRouter } from 'vue-router'

const emit = defineEmits(['prev', 'next'])
const vuesax = inject('$vs')
const store = useStore()
const router = useRouter()

let head_item = [
  {
    headText: 'انتخاب',
    minshow: true
  },
  {
    headText: 'عنوان',
    minshow: true
  },
  {
    headText: 'شماره اتاق',
    minshow: true
  },
  {
    headText: 'تعداد تخت',
    minshow: true
  },
  {
    headText: 'متراژ',
    minshow: true
  },
  {
    headText: 'تصاویر',
    minshow: true
  },
  {
    headText: 'امکانات',
    minshow: true
  }
]

let isLoaded = ref(false)

const LoadDate = () => {
  setLoading()
  axios
    .get('/suites')
    .then((response) => {
      if (response.status === 200 && response.data.msgCode === 200) {
        roomsData.value = response.data.data
        setLoading(false)
      } else throw response
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
      setLoading(false)
    })
}

const setLoading = (status = true) => {
  if (status) {
    vuesax.loading({
      container: '#loading',
      scale: 0.45
    })
    isLoaded.value = false
  } else {
    vuesax.loading.close('#loading > .con-vs-loading')
    isLoaded.value = true
  }
}

const selectedItem = computed({
  // getter
  get() {
    return store.state.reservationInfo.room
  },
  // setter
  set(newValue) {
    store.commit('updateRoom', newValue)
  }
})

const roomsData = ref()

const submitfunc = () => {
  if (selectedItem.value.roomNumber) emit('next')
  else
    vuesax.dialog({
      type: 'alert',
      color: 'danger',
      title: `هشدار`,
      acceptText: 'متوجه شدم',
      text: `باید یک اتاق را انتخاب کنید.`
    })
}

onMounted(() => {
  LoadDate()
})
</script>
<template>
  <div class="roomTable dark:text-white">
    <div class="my-3 space-x-3 space-x-reverse">
      <span>اتاق مورد نظر :</span>
      <span
        class="bg-red-600 rounded-full px-2 py-1 text-white font-semibold"
        v-if="selectedItem.length == 0"
      >
        انتخاب نشده
      </span>
      <span
        class="bg-[#0db02b] rounded-full px-2 py-1 text-white font-semibold"
        v-if="selectedItem.roomNumber"
        >اتاق شماره
        {{ selectedItem.roomNumber }}
      </span>
    </div>
    <vs-alert active="true" color="primary" icon="info" class="my-2">
      برای انتخاب اتاق مورد نظر روی ردیف آن کلیک بکنید.
    </vs-alert>
    <div class="relative min-h-[15rem]">
      <span id="loading"></span>
      <Transition name="fade">
        <div v-if="isLoaded">
          <Table
            :head-item="head_item"
            :items="roomsData"
            v-slot="props"
            @selected-item="(input) => (selectedItem = input)"
          >
            <vs-td>
              <CheckCircleIcon class="w-5 h-5 selectedItem hidden" />
            </vs-td>
            <vs-td> {{ props.dataitem.title }}</vs-td>
            <vs-td> {{ props.dataitem.roomNumber }}</vs-td>
            <vs-td>{{ props.dataitem.totalBeds }}</vs-td>
            <vs-td>{{ props.dataitem.Meterage }} متر مربع </vs-td>
            <vs-td>
              <vs-tooltip color="#146d1e" text="تصاویر اتاق" position="right">
                <PhotoIcon
                  @click="props.slideModal(props.dataitem)"
                  class="w-5 h-5 cursor-pointer"
                />
              </vs-tooltip>
            </vs-td>
            <vs-td>
              <vs-tooltip title="امکانات" color="#146d1e" :text="props.dataitem.facilities">
                <InformationCircleIcon class="w-5 h-5 cursor-pointer" />
              </vs-tooltip>
            </vs-td>
          </Table>
        </div>
      </Transition>
    </div>
  </div>
  <div class="mt-5 space-x-3 space-x-reverse">
    <vs-button color="dark" type="filled" @click="$emit('prev')"> مرحله قبل </vs-button>
    <vs-button color="#146d1e" type="filled" @click="submitfunc"> ثبت و مرحله ی بعد </vs-button>
  </div>
</template>
<style>
.vs-tooltip-top {
  text-align: justify !important;
}

.roomTable .is-selected td {
  transition: 0.5s;
  background-color: #0db02b;
  color: white;
}

.vs-table-primary .is-selected td:first-child {
  border: none !important;
  border-radius: 0 20px 20px 0;
}

.vs-table-primary .is-selected td:last-child {
  border: none !important;
  border-radius: 20px 0 0 20px;
}

.vs-table-primary .is-selected .selectedItem {
  display: block;
}
</style>
