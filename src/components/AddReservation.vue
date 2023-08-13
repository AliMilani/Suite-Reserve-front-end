<script setup>
import { ref } from 'vue'

// This components will have the content for each stepper step.
import StepOne from './ReservationStep/StepOne.vue'
import StepTwo from './ReservationStep/StepTwo.vue'
import StepThree from './ReservationStep/StepThree.vue'
import StepFour from './ReservationStep/StepFour.vue'
import StepFive from './ReservationStep/StepFive.vue'
import StepSix from './ReservationStep/StepSix.vue'

let steps = ref([
  {
    text: 'اول',
    title: 'قوانین'
  },
  {
    text: 'دوم',
    title: 'اطلاعات'
  },
  {
    text: 'سوم',
    title: 'همراهان'
  },
  {
    text: 'چهارم',
    title: 'بازه زمانی'
  },
  {
    text: 'پنجم',
    title: 'انتخاب اتاق'
  },
  {
    text: 'ششم',
    title: 'پرداخت'
  }
])

let stepActive = ref(3)

const nextStep = () => {
  stepActive.value <= steps.value.length && stepActive.value++
}
const prevStep = () => {
  stepActive.value > 1 && stepActive.value--
}
</script>
<template>
  <div
    class="w-full md:w-2/3 my-6 mx-auto flex justify-between relative before:top-1/2 before:-z-10 before:-translate-y-1/2 before:content-[''] before:absolute before:w-full before:h-[2px] before:rounded-full before:bg-gray-300 dark:before:bg-slate-700"
  >
    <div
      v-for="(step, index) in steps"
      :key="step"
      class="w-10 h-10 flex justify-center items-center rounded-full bg-white dark:bg-slate-800 dark:shadow-gray-500/25 dark:border-none dark:text-white text-black border border-gray-300 shadow-md relative whitespace-nowrap"
      :class="{ '!bg-[#0db02b] !text-white border-none': index + 1 == stepActive }"
    >
      <span
        class="absolute right-1/2 text-xs md:text-base font-semibold translate-x-1/2 -top-7 text-gray-900 dark:text-slate-200"
        :class="{ '!text-[#0db02b]': index + 1 == stepActive }"
        >{{ step.title }}</span
      >
      <span>{{ index + 1 }}</span>
    </div>
  </div>

  <div class="px-1 md:px-5 mt-10 mx-auto">
    <StepOne v-if="stepActive == 1" @change-step="nextStep" />
    <StepTwo v-if="stepActive == 2" @prev="prevStep" @next="nextStep" />
    <StepThree v-if="stepActive == 3" @prev="prevStep" @next="nextStep" />
    <StepFour v-if="stepActive == 4" @prev="prevStep" @next="nextStep" />
    <StepFive v-if="stepActive == 5" @prev="prevStep" @next="nextStep" />
    <StepSix v-if="stepActive == 6" @prev="prevStep" @next="nextStep" />
  </div>
</template>
