<script setup>
import Table from '../../components/BaseTable.vue'
import { PencilSquareIcon, TrashIcon } from '@heroicons/vue/24/outline'
import { ref, inject, onMounted } from 'vue'
import AddCompanions from '../../components/AddCompanions.vue'
import axios from 'axios'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { checkStatus } from '@/assets/js/_erHandler.js'
import { toSolar } from '@/assets/js/init.js'

const vuesax = inject('$vs')

defineEmits(['sl'])
const store = useStore()
const router = useRouter()

let head_item = [
  {
    headText: 'نام و نام خانوادگی',
    minshow: true
  },
  {
    headText: 'کد ملی',
    minshow: true
  },
  {
    headText: 'نسبت',
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

let companions = ref([])

let popupActivo = ref(false)

const LoadDate = () => {
  setLoading()
  axios
    .get('/travel-companions/self')
    .then((response) => {
      if (response.status === 200 && response.data.msgCode === 200) {
        companions.value = response.data.data
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

let isLoaded = ref(false)

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

const deleteCompanion = (companionId, title) => {
  vuesax.dialog({
    type: 'confirm',
    color: 'warning',
    title: `هشدار`,
    acceptText: 'حدف شود',
    cancelText: 'خیر',
    text: `آیا میخواهید  ${title} را حدف نمایید ؟`,
    accept: () => {
      deleteCompanionReq(companionId)
    }
  })
}

const deleteCompanionReq = (companionId) => {
  store.dispatch('setTokenHeadder')
  axios
    .delete(`/travel-companions/${companionId}`)
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
        LoadDate()
      }
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
    })
}

onMounted(() => {
  LoadDate()
})
</script>

<template>
  <div>
    <div class="mb-4 space-x-2 space-x-reverse">
      <vs-button color="#146d1e" type="filled" :disabled="!isLoaded" @click="popupActivo = true"
        >ثبت همراه جدید</vs-button
      >
      <vs-button color="#003a36" type="filled" :disabled="!isLoaded" @click="LoadDate"
        >به روزرسانی</vs-button
      >
    </div>
    <div class="relative w-full min-h-[12rem]">
      <span id="loading"></span>
      <Transition name="fade">
        <Table
          @selected-item="(input) => $emit('sl', input)"
          :head-item="head_item"
          :items="companions"
          v-slot="props"
          v-if="isLoaded"
          @loaded="LoadDate"
        >
          <vs-td :data="props.dataitem.fullName">{{ props.dataitem.fullName }}</vs-td>
          <vs-td :data="props.dataitem.nationalCode">{{ props.dataitem.nationalCode }}</vs-td>
          <vs-td :data="props.dataitem.familyRelationship">{{
            props.dataitem.familyRelationship
          }}</vs-td>
          <vs-td :data="props.dataitem.createdAt">{{ toSolar(props.dataitem.createdAt) }}</vs-td>
          <vs-td>
            <vs-tooltip color="#146d1e" text="ویرایش همراه" position="right">
              <PencilSquareIcon
                @click="props.companionsmodal(props.dataitem)"
                class="w-5 h-5 cursor-pointer ml-2"
              />
            </vs-tooltip>
            <vs-tooltip color="#146d1e" text="حذف همراه" position="left">
              <TrashIcon
                class="w-5 h-5 cursor-pointer text-red-600"
                @click="deleteCompanion(props.dataitem._id, props.dataitem.fullName)"
              />
            </vs-tooltip>
          </vs-td>
        </Table>
      </Transition>
    </div>
    <vs-popup class="holamundo !z-[300000]" title="افزودن همراه جدید" v-model:active="popupActivo">
      <AddCompanions @isLoaded="LoadDate" v-if="popupActivo" />
    </vs-popup>
  </div>
</template>
