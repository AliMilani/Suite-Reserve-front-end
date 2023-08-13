<script setup>
import { watch, computed, inject, ref, onMounted } from 'vue'
import ReservationStatus from '../RoomReservationStatus.vue'
import DatePicker from 'vue3-persian-datetime-picker'
import { CalendarDaysIcon } from '@heroicons/vue/24/solid'
import { useVuelidate } from '@vuelidate/core'
import { required, helpers } from '@vuelidate/validators'
import { useStore } from 'vuex'
import { dateRange, carbonPeriod } from '../../assets/js/init'
import axios from 'axios'
import { checkStatus } from '@/assets/js/_erHandler.js'
import { useRouter } from 'vue-router'

const emit = defineEmits(['prev', 'next'])
const store = useStore()
const router = useRouter()

const rangeDate = computed({
  // getter
  get() {
    return store.state.reservationInfo.reservedTime
  },
  // setter
  set(newValue) {
    store.commit('updateReservedTime', newValue)
  }
})

watch(
  () => rangeDate.value.startDate,
  () => (rangeDate.value.endDate = '')
)

const checkDate = (formatted) => {
  if (formatted == rangeDate.value.startDate) return false
  else if (formatted == addDays(rangeDate.value.startDate, 1)) return false
  else if (formatted == addDays(rangeDate.value.startDate, 2)) return false
  else return true
}

function addDays(date, days) {
  var result = new Date(date)
  result.setDate(result.getDate() + days)
  return `${result.getFullYear()}/${(result.getMonth() + 1).toString().padStart(2, '0')}/${result
    .getDate()
    .toString()
    .padStart(2, '0')}`
}

const checkInvalidDate = helpers.regex(
  /^[1-4]\d{3}\/((0[1-6]\/((3[0-1])|([1-2][0-9])|(0[1-9])))|((1[0-2]|(0[7-9]))\/(30|31|([1-2][0-9])|(0[1-9]))))$/
)

// validation rules
const limit_rules = (label) => {
  return {
    required: helpers.withMessage(`لطفا ${label} رزرو را وارد کنید.`, required),
    checkDate: helpers.withMessage(`فرمت تاریخ اشتباه است .`, checkInvalidDate)
  }
}

const rules = computed(() => {
  return {
    startDate: limit_rules('تاریخ شروع'),
    endDate: limit_rules('تاریخ پایان')
  }
})

const vuesax = inject('$vs')

const submitfunc = async () => {
  const result = await v$.value.$validate()
  if (!result) return false

  vuesax.dialog({
    type: 'alert',
    color: 'warning',
    title: `اطلاع رسانی`,
    acceptText: 'متوجه شدم',
    text: `کلیه اتاقهای خالی در بازه زمانی انتخابی شما نمایش داده می شود لطفاً به تعداد تخت اتاق ها دقت بفرمایید`,
    accept: () => {
      emit('next')
    }
  })
}

const getTableData = () => {
  setLoading()
  axios
    .get('/reserves/table')
    .then((response) => {
      if (response.status === 200 && response.data.msgCode === 200) {
        data.value = response.data.data
        monthSelected.value = data.value.avalableReserveTime.start.jalaali.jm
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

let data = ref()

let getMonths = computed(() => {
  return dateRange(
    Object.values(data.value.avalableReserveTime.start.jalaali).join('-'),
    Object.values(data.value.avalableReserveTime.end.jalaali).join('-')
  )
})

let monthSelected = ref()
let tableData = computed(() => {
  return data.value.table[monthSelected.value]
})

const v$ = useVuelidate(rules, rangeDate)

onMounted(async () => {
  getTableData()
})
</script>
<template>
  <div class="relative min-h-[25rem]">
    <span id="loading"></span>
    <Transition name="fade">
      <div v-if="isLoaded">
        <div class="w-min mb-5">
          <ul class="space-y-3">
            <li
              class="dark:text-white text-slate-900 text-right"
              v-for="(item, index) in getMonths"
              :key="index"
            >
              <vs-radio v-model="monthSelected" vs-name="radios1" :vs-value="+item.split('-')[1]">
                <span class="mx-2">بازه زمانی</span><span> {{ item.split('-').join('/') }}</span>
              </vs-radio>
            </li>
          </ul>
        </div>
        <ReservationStatus :table="tableData" :c="carbonPeriod[monthSelected]" />
        <div class="flex flex-wrap md:flex-nowrap mt-5 w-full md:w-3/5 mx-auto dark:text-white">
          <div class="w-full md:w-1/2 p-3">
            <label for="">از تاریخ :</label>
            <div class="relative mt-2">
              <date-picker
                color="#003a36"
                :class="{ invalidInput: v$.startDate.$error }"
                v-model="rangeDate.startDate"
                format="YYYY/MM/DD"
                initial-value=""
                display-format="jYYYY/jMM/jDD"
              />
              <span class="absolute top-1/2 -translate-y-1/2 left-2">
                <CalendarDaysIcon class="w-5 h-5 text-fgreen dark:text-white" />
              </span>
            </div>
            <span class="text-red-600 mt-2 block text-xs">{{
              v$.startDate.$errors[0]?.$message
            }}</span>
          </div>
          <div class="w-full md:w-1/2 p-3">
            <label for="">تا تاریخ :</label>
            <div class="relative mt-2">
              <date-picker
                color="#003a36"
                :class="{ invalidInput: v$.endDate.$error }"
                v-model="rangeDate.endDate"
                :disable="checkDate"
                initial-value=""
                :disabled="rangeDate.startDate == ''"
                format="YYYY/MM/DD"
                display-format="jYYYY/jMM/jDD"
              />
              <span class="absolute top-1/2 -translate-y-1/2 left-2">
                <CalendarDaysIcon class="w-5 h-5 text-fgreen dark:text-white" />
              </span>
            </div>
            <span class="text-red-600 mt-2 block text-xs">{{
              v$.endDate.$errors[0]?.$message
            }}</span>
          </div>
        </div>
        <div class="mt-5 space-x-3 space-x-reverse">
          <vs-button color="dark" type="filled" @click="$emit('prev')"> مرحله قبل </vs-button>
          <vs-button color="#146d1e" type="filled" @click="submitfunc">
            ثبت و مرحله ی بعد
          </vs-button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style>
.invalidInput input {
  border: 1px solid red !important;
}
</style>
