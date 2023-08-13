<script setup>
import { computed, inject } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, helpers } from '@vuelidate/validators'
import { checkSheba } from '../../assets/js/init'
import { useStore } from 'vuex'

const emit = defineEmits(['prev', 'next'])
const vuesax = inject('$vs')
const store = useStore()

const userInfo = computed({
  // getter
  get() {
    return store.state.reservationInfo.personalInfo
  },
  // setter
  set(newValue) {
    store.commit('updatePersonalInfo', newValue)
  }
})

const rules = computed(() => {
  return {
    mobile_number: {
      required: helpers.withMessage(`لطفا تلفن همراه را وارد کنید.`, required),
      regex: helpers.withMessage(`تلفن همراه نادرست هست.`, checkMobileRegex)
    },
    phone_number: {
      required: helpers.withMessage(`لطفا تلفن ثابت را وارد کنید (با کد استان).`, required),
      regex: helpers.withMessage(`شماره تلفن نادرست هست.`, checkPhoneRegex)
    },
    sheba_number: {
      required: helpers.withMessage(`لطفا شناسه شبا خود را وارد کنید.`, required),
      regex: helpers.withMessage(`شناسه شبا را کامل وارد نمایید.`, checkShebaRegex)
    },
    address: {
      required: helpers.withMessage(`لطفا آدرس را وارد کنید.`, required)
    }
  }
})

const checkShebaRegex = helpers.regex(/^(?=.{24}$)[0-9]*$/)

const checkPhoneRegex = helpers.regex(/^0\d{2}\d{8}$/)

const checkMobileRegex = helpers.regex(/^09(1[0-9]|3[1-9]|2[1-9])-?[0-9]{3}-?[0-9]{4}$/)

const submitfunc = async () => {
  let result = await v$.value.$validate()
  console.log(result)
  if (result) {
    if (!checkSheba(userInfo.value.sheba_number).valid) {
      vuesax.dialog({
        type: 'alert',
        color: 'danger',
        title: `هشدار`,
        acceptText: 'متوجه شدم',
        text: `شناسه شبا نادرست هست.`
      })
    } else {
      emit('next')
    }
  }
}

const checkShebaInput = computed(() => {
  return checkSheba(userInfo.value.sheba_number)
})

const v$ = useVuelidate(rules, userInfo)
</script>
<template>
  <div>
    <div class="flex flex-wrap">
      <div class="w-full sm:w-1/2 md:w-1/4 p-2">
        <vs-input
          class="!w-full"
          max="12"
          type="number"
          val-icon-danger="close"
          label="تلفن همراه"
          :danger="v$.mobile_number.$error"
          :danger-text="v$.mobile_number.$errors[0]?.$message"
          color="dark"
          v-model.lazy="userInfo.mobile_number"
        />
      </div>
      <div class="w-full sm:w-1/2 md:w-1/4 p-2">
        <vs-input
          class="!w-full"
          max="12"
          type="number"
          val-icon-danger="close"
          label="تلفن ثابت"
          :danger="v$.phone_number.$error"
          :danger-text="v$.phone_number.$errors[0]?.$message"
          color="dark"
          v-model="userInfo.phone_number"
        />
      </div>
      <div class="w-full md:w-2/4 p-2 relative">
        <div class="absolute w-6 h-6 left-2"><img :src="checkShebaInput.img" alt="" /></div>
        <vs-input
          class="!w-full"
          max="12"
          type="number"
          val-icon-danger="close"
          label="شناسه شبا (بدون IR)"
          :danger="v$.sheba_number.$error"
          :danger-text="v$.sheba_number.$errors[0]?.$message"
          color="dark"
          v-model="userInfo.sheba_number"
        />
      </div>
      <div class="w-full p-2">
        <label for="" class="text-[rgba(0,0,0,.7)] mr-1 dark:text-white">آدرس :</label>
        <textarea
          :class="{ 'border-red-500 dark:!border-red-500': v$.address.$error }"
          v-model="userInfo.address"
          class="w-full vs-textarea--input border dark:border-slate-800 border-gray-300 p-3 mt-3 rounded-md outline-none transition-all focus:border-black focus:shadow-md"
          cols="30"
          rows="3"
        >
        </textarea>
        <span class="text-xs text-red-500">{{ v$.address.$errors[0]?.$message }}</span>
      </div>
    </div>
    <div class="mt-5 space-x-3 space-x-reverse">
      <vs-button color="dark" type="filled" @click="$emit('prev')"> مرحله قبل </vs-button>
      <vs-button color="#146d1e" type="filled" @click="submitfunc"> ثبت و مرحله ی بعد </vs-button>
    </div>
  </div>
</template>

<style>
.vs-textarea {
  outline: none;
}

.vs-textarea-dark {
  border: 1px solid rgba(0, 0, 0, 0.2) !important;
  /* box-shadow: 0 0 0 0 rgba(0,0,0,.15); */
}

.textarea-invalid {
  border: 1px solid red !important;
}

.textarea-invalid .vs-textarea--count {
  background-color: red;
}
</style>
