<script setup>
import Table from '../../components/BaseTable.vue'
import { curencyFormat } from '@/assets/js/init.js'
import { ref, inject, onMounted } from 'vue'

const vuesax = inject('$vs')

let head_item = [
  {
    headText: 'توضیحات',
    minshow: true
  },
  {
    headText: 'نوع تراکنش',
    minshow: true
  },
  {
    headText: 'مبلغ (ریال)',
    minshow: true
  },
  {
    headText: 'زمان انجام تراکنش',
    minshow: true
  },
  {
    headText: 'شماره مرجع بانک',
    minshow: true
  },
  {
    headText: 'کد پیگیری',
    minshow: true
  },
  {
    headText: 'تایید شده',
    minshow: true
  }
]

let users = ref([
  {
    status: 'عملیات با موفقیت انجام شد',
    transaction_type: 'رزرو اتاق',
    amount: 7_200_000,
    transaction_time: '1402/03/08 10:33:00',
    bank_reference_number: 327310319669,
    tracking_code: 100818573,
    accepted: 'بله'
  },
  {
    status: 'عملیات با موفقیت انجام شد',
    transaction_type: 'رزرو اتاق',
    amount: 7_200_000,
    transaction_time: '1402/03/08 10:33:00',
    bank_reference_number: 327310319669,
    tracking_code: 100818573,
    accepted: 'بله'
  },
  {
    status: 'عملیات با موفقیت انجام شد',
    transaction_type: 'رزرو اتاق',
    amount: 7_200_000,
    transaction_time: '1402/03/08 10:33:00',
    bank_reference_number: 327310319669,
    tracking_code: 100818573,
    accepted: 'بله'
  }
])

let isLoaded = ref(false)

const setLoading = (status = true) => {
  if (status) {
    vuesax.loading({
      container: '#loading',
      scale: 0.45
    })
    isLoaded.value = false
  } else {
    vuesax.loading.close('#loading')
    isLoaded.value = true
  }
}

onMounted(() => {
  setLoading()
  setTimeout(() => {
    setLoading(false)
  }, 1000)
})
</script>

<template>
  <div class="h-full">
    <div class="mb-4 space-x-2 space-x-reverse">
      <vs-button color="#003a36" type="filled" :disabled="!isLoaded">به روزرسانی</vs-button>
    </div>
    <div class="relative w-full min-h-[12rem]">
      <span id="loading"></span>
      <Transition name="fade">
        <Table :head-item="head_item" :items="users" v-slot="props" v-if="isLoaded">
          <vs-td>{{ props.dataitem.status }}</vs-td>
          <vs-td>{{ props.dataitem.transaction_type }}</vs-td>
          <vs-td>{{ curencyFormat(props.dataitem.amount) }}</vs-td>
          <vs-td>{{ props.dataitem.transaction_time }}</vs-td>
          <vs-td>{{ props.dataitem.bank_reference_number }}</vs-td>
          <vs-td>{{ props.dataitem.tracking_code }}</vs-td>
          <vs-td>{{ props.dataitem.accepted }}</vs-td>
        </Table>
      </Transition>
    </div>
  </div>
</template>

<style></style>
