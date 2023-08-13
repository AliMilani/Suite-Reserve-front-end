<script setup>
import { provide, inject, computed } from 'vue'
import CompanionsUser from '../../views/DashboardViews/CompanionsUser.vue'
import { useStore } from 'vuex'
provide('multipleSelect', true)

const emit = defineEmits(['prev', 'next'])

const vuesax = inject('$vs')
const store = useStore()

const selectedItems = computed({
  // getter
  get() {
    return store.state.reservationInfo.companions
  },
  // setter
  set(newValue) {
    store.commit('updateCompanions', newValue)
  }
})

const submitfunc = async () => {
  vuesax.dialog({
    type: 'confirm',
    color: 'success',
    title: `اطلاع رسانی`,
    cancelText: 'خیر',
    acceptText: 'بله',
    text: `${selectedItems.value.length} همراه را انتخاب کرده اید، تایید میکنید؟`,
    accept: () => {
      emit('next')
    }
  })
}
</script>
<template>
  <vs-alert active="true" color="primary" icon="info">
    توجه: پس از اضافه کردن همراهان، از جدول زیر و با استفاده از کادر سمت راست افرادی را که میخواهید
    انتخاب کنید، تیک بزنید.
  </vs-alert>

  <div class="mt-5">
    <CompanionsUser @sl="(input) => (selectedItems = input)" />
  </div>
  <div class="mt-5 space-x-3 space-x-reverse">
    <vs-button color="dark" type="filled" @click="$emit('prev')"> مرحله قبل </vs-button>
    <vs-button color="#146d1e" type="filled" @click="submitfunc"> ثبت و مرحله ی بعد </vs-button>
  </div>
</template>

<style>
.vs-dialog-accept-button,
.vs-dialog-cancel-button {
  padding: 8px 20px !important;
  margin: 10px;
}

.vs-dialog-cancel-button {
  color: black;
}
</style>
