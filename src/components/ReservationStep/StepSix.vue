<script setup>
import { ref, computed, inject } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { toSolar, difrentDate } from '../../assets/js/init'
const store = useStore()
const router = useRouter()

defineEmits(['prev', 'next'])

const getreservationInfo = computed(() => {
  return store.state.reservationInfo
})

const reserveInfo = ref()

reserveInfo.value = {
  startDate: getreservationInfo.value.reservedTime.startDate,
  endDate: getreservationInfo.value.reservedTime.endDate,
  suite: getreservationInfo.value.room._id,
  travelCompanions: getreservationInfo.value.companions.map((item) => item._id)
}
const vuesax = inject('$vs')

const SubmitRequest = () => {
  vuesax.dialog({
    type: 'confirm',
    color: 'success',
    title: `اطلاع رسانی`,
    cancelText: 'خیر',
    acceptText: 'پرداخت',
    text: `آیا از صحت اطلاعات وارد شده اطمینان دارید؟`,
    accept: () => {
      router.push({ path: '/payment' })
    }
  })
}
</script>
<template>
  <vs-alert title="مرحله پرداخت" color="success" active="true">
    <p>
      از تاریخ {{ toSolar(reserveInfo?.startDate, false) }} لغایت
      {{ toSolar(reserveInfo?.endDate, false) }} به مدت
      {{ difrentDate(reserveInfo?.startDate, reserveInfo?.endDate) }}
      شب
    </p>
    <p>
      اتاق شماره {{ getreservationInfo?.room?.roomNumber }} با
      {{ getreservationInfo?.room?.totalBeds }} تخت
    </p>
    <p>مبلغ قابل پرداخت: 2,400,000 ریال</p>
  </vs-alert>
  <div class="mt-5 space-x-3 space-x-reverse">
    <vs-button color="dark" type="filled" @click="$emit('prev')"> مرحله قبل </vs-button>
    <vs-button color="#146d1e" type="filled" @click="SubmitRequest"> ثبت و پرداخت </vs-button>
  </div>
</template>
<style scoped></style>
