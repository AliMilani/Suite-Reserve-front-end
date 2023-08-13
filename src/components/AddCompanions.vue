<script setup>
import { ref, computed, watch, inject } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, helpers } from '@vuelidate/validators'
import { familyRelationship } from '../assets/js/_constant'
import axios from 'axios'
import { checkStatus } from '@/assets/js/_erHandler.js'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
const vuesax = inject('$vs')

const store = useStore()
const router = useRouter()

// Emits

const emits = defineEmits(['isLoaded'])

// Get Props
let props = defineProps({
  inputData: {
    type: Object,
    required: false
  },
  edit: {
    type: Boolean,
    required: false
  }
})

let companionInfo = ref({
  fullName: '',
  nationalCode: '',
  familyRelationship: ''
})

watch(
  () => props.inputData,
  () => {
    companionInfo.value = {
      fullName: props.inputData.fullName,
      nationalCode: props.inputData.nationalCode,
      familyRelationship: props.inputData.familyRelationship
    }
  }
)

// validation rules
const limit_rules = (label) => {
  return {
    required: helpers.withMessage(`لطفا ${label} را وارد کنید.`, required)
  }
}

const checkn_ational_code = helpers.regex(/^(?!(\d)\1{9})\d{10}$/)

const rules = computed(() => {
  return {
    fullName: limit_rules('نام خانوادگی'),
    nationalCode: {
      required: helpers.withMessage(`لطفا کدملی را وارد کنید.`, required),
      check: helpers.withMessage(`کدملی اشتباه است`, checkn_ational_code)
    },
    familyRelationship: limit_rules('نسبت')
  }
})

const submitfunc = async () => {
  const result = await v$.value.$validate()
  if (!result) return false
  props.edit ? updateCompanion() : insertCompanion()
}

const v$ = useVuelidate(rules, companionInfo)

const insertCompanion = () => {
  store.dispatch('setTokenHeadder')
  axios
    .post('/travel-companions/', companionInfo.value)
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
        emits('isLoaded')
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

const updateCompanion = () => {
  store.dispatch('setTokenHeadder')
  axios
    .put(`/travel-companions/${props.inputData._id}`, companionInfo.value)
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
        emits('isLoaded')
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
</script>

<template>
  <div class="flex flex-wrap dark:text-white">
    <div class="w-full sm:w-1/2 md:w-1/3 p-3">
      <vs-input
        class="!w-full"
        v-model="companionInfo.fullName"
        color="dark"
        val-icon-danger="close"
        :danger="v$.fullName.$error"
        :danger-text="v$.fullName.$errors[0]?.$message"
        label="نام و نام خانوادگی :"
      />
    </div>
    <div class="w-full sm:w-1/2 md:w-1/3 p-3">
      <vs-input
        class="!w-full appearance-none"
        type="number"
        v-model="companionInfo.nationalCode"
        color="dark"
        val-icon-danger="close"
        :danger="v$.nationalCode.$error"
        :danger-text="v$.nationalCode.$errors[0]?.$message"
        label="کد ملی :"
      />
    </div>
    <div class="w-full sm:w-1/2 md:w-1/3 p-3">
      <vs-select
        class="selectExample !w-full"
        color="dark"
        label="نسبت :"
        v-model="companionInfo.familyRelationship"
        :danger="v$.familyRelationship.$error"
        :danger-text="v$.familyRelationship.$errors[0]?.$message"
      >
        <vs-select-item modelValue="" de text="انتخاب کنید ..." />
        <vs-select-item
          :key="item"
          :modelValue="item"
          :text="item"
          v-for="item in familyRelationship"
        />
      </vs-select>
    </div>
  </div>
  <div class="flex justify-end">
    <vs-button @click="submitfunc" class="!mt-5" color="#003a36" type="filled">{{
      edit ? 'ویرایش همراه' : 'ثبت همراه'
    }}</vs-button>
  </div>
</template>

<style>
.vs-con-input,
.vs-select--input {
  margin-top: 10px;
  outline: none;
}

.vs-input--input {
  outline: none;
}

.vpd-input-group input {
  width: 100%;
  padding: 3px 10px !important;
  border-radius: 5px !important;
  border: 1px solid #dadada;
}

.vpd-icon-btn {
  display: none !important;
}

.vpd-next,
.vpd-prev {
  display: flex;
  justify-content: center;
  align-items: center;
}

.vpd-container {
  border-radius: 10px;
  overflow: hidden;
}

.text-validation {
  font-size: 0.6rem;
  color: #ff4757;
}

.invavlid-input input {
  border-color: #ff4757 !important;
}

.vs-input--input[type='number'] {
  appearance: textfield;
  -webkit-appearance: textfield;
  -moz-appearance: textfield;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
