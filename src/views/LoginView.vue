<script setup>
import { ArrowPathIcon } from '@heroicons/vue/24/outline'
import useVuelidate from '@vuelidate/core'
import { helpers, required } from '@vuelidate/validators'
import { responeHandeler } from '../assets/js/init'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { computed, inject, reactive, ref } from 'vue'

const vuesax = inject('$vs')
const store = useStore()
const router = useRouter()

const loginHandler = async () => {
  let result = await v$.value.$validate()
  if (!result) return
  if (!_isSubmit.value) {
    vuesax.dialog({
      type: 'confirm',
      color: 'success',
      title: `اطلاع رسانی`,
      cancelText: 'خیر',
      acceptText: 'بله',
      text: `آیا شماره ${loginInfo.phoneNumber} را تایید میکنید؟`,
      accept: () => {
        _isSubmit.value = true
        submitCounter()
        sendRequestCode()
      }
    })
  } else {
    let result = await v2$.value.$validate()
    if (!result) return
    verifyRequest()
  }
}

const resendCode = () => {
  submitCounter()
  sendRequestCode()
}

const sendRequestCode = () => {
  axios
    .post('/auth/user/otp/request', {
      phoneNumber: loginInfo.phoneNumber
    })
    .then(() => {})
    .catch((error) => {
      if (error.response) {
        let errRes = error.response?.data?.msgCode
        if (errRes)
          vuesax.notify({
            title: 'خطا',
            text: responeHandeler(error.response.data.msgCode).mes,
            color: 'danger',
            icon: 'error',
            position: 'top-right'
          })
      } else if (error.request) {
        console.log(error.request)
      } else {
        console.log('Error', error.message)
      }
      changeNumber()
    })
}

const verifyRequest = () => {
  vuesax.loading({
    container: '#loadingBtn',
    scale: 0.45
  })

  axios
    .post('/auth/user/otp/verify', {
      code: loginInfo.acceptCode,
      phoneNumber: loginInfo.phoneNumber
    })
    .then((response) => {
      if (response.status == 200 && response.data.msgCode == 200) {
        store.commit('login', response.data.data.accessToken)
        vuesax.notify({
          title: 'اطلاع رسانی',
          text: 'سلام همکار گرامی خوش اومدی',
          color: 'success',
          icon: 'verified_user',
          position: 'top-right'
        })
        router.push('/dashboard')
      }
      vuesax.loading.close('#loadingBtn > .con-vs-loading')
    })
    .catch((error) => {
      if (error.response) {
        let errRes = error.response?.data?.msgCode
        if (errRes)
          vuesax.notify({
            title: 'خطا',
            text: responeHandeler(error.response.data.msgCode).mes,
            color: 'danger',
            icon: 'error',
            position: 'top-right'
          })
      } else if (error.request) {
        console.log(error.request)
      } else {
        console.log('Error', error.message)
      }

      vuesax.loading.close('#loadingBtn > .con-vs-loading')
    })
}

const checkMobileRegex = helpers.regex(/^09(1[0-9]|3[1-9]|2[1-9])-?[0-9]{3}-?[0-9]{4}$/)

const rules = computed(() => {
  return {
    phoneNumber: {
      required: helpers.withMessage(`لطفا تلفن همراه را وارد کنید.`, required),
      regex: helpers.withMessage(`تلفن همراه نادرست هست.`, checkMobileRegex)
    },
    captcha: {
      required: helpers.withMessage(`لطفا کد کپچا را وارد کنید.`, required)
    }
  }
})
const rules2 = computed(() => {
  return {
    acceptCode: {
      required: helpers.withMessage(`لطفا کد تایید را وارد کنید.`, required),
      regex: helpers.withMessage(`کد تایید نادرست هست.`, helpers.regex(/^\d{4,6}$/))
    }
  }
})

let loginInfo = reactive({
  phoneNumber: '',
  acceptCode: '',
  captcha: ''
})

const v$ = useVuelidate(rules, loginInfo)
const v2$ = useVuelidate(rules2, loginInfo)

let counter = ref(200)
let timer = null
const submitCounter = () => {
  counter.value = 200
  timer = setInterval(() => {
    --counter.value
    if (counter.value <= 0) {
      counter.value = 0
      _showResend.value = true
      clearInterval(timer)
    }
  }, 1000)
  _showResend.value = false
}

const changeNumber = () => {
  clearInterval(timer)
  _isSubmit.value = false
}

let _showResend = ref(false)
let _isSubmit = ref(false)
</script>
<template>
  <div class="container mx-auto flex justify-center">
    <div class="mt-10">
      <h2 class="text-2xl text-center text-maincolor font-semibold">ورود به حساب کاربری</h2>
      <div
        class="w-full lg:w-80 pb-3 bg-white dark:bg-slate-900 rounded-xl shadow-2xl mt-5 z-10 relative before:absolute before:top-1/2 before:-right-3 before:rounded-r-xl -xl before:-translate-y-1/2 before:content-[''] before:w-3 before:h-2/3 before:bg-maincolor after:absolute after:top-1/2 after:-left-3 after:rounded-l-xl after:-translate-y-1/2 after:content-[''] after:w-3 after:h-2/3 after:bg-maincolor"
      >
        <div class="p-3 mt-5">
          <p
            class="p-3 text-justify bg-gray-100 dark:bg-slate-700 dark:text-white text-sm rounded-md"
          >
            همکار گرامی (شاغل و بازنشسته) لطفا شماره همراه خودتان را ثبت و سپس کد ارسال شده را وارد
            نمایید.
          </p>
        </div>
        <div class="mx-5 my-2 loginPage relative">
          <div class="username relative">
            <vs-input
              label="شماره تلفن :"
              val-icon-danger="close"
              color="dark"
              :disabled="_isSubmit"
              class="!w-full space-input"
              v-model="loginInfo.phoneNumber"
              :danger="v$.phoneNumber.$error"
              :danger-text="v$.phoneNumber.$errors[0]?.$message"
            />
            <span
              v-if="_isSubmit"
              @click="changeNumber"
              class="absolute top-0 left-0 text-sm rounded-full bg-maincolor px-1 text-white cursor-pointer"
            >
              تغییر شماره تلفن
            </span>
          </div>
          <div class="mt-3 password" v-if="_isSubmit">
            <vs-input
              label="کد تایید : "
              val-icon-danger="close"
              color="dark"
              class="!w-full space-input"
              v-model="loginInfo.acceptCode"
              :danger="v2$.acceptCode.$error"
              :danger-text="v2$.acceptCode.$errors[0]?.$message"
            />
            <span class="text-sm text-gray-500" v-if="!_showResend"
              >کد تایید برای شما پیامک شد.
              <span>( {{ counter }} )</span>
            </span>
            <span
              class="text-sm text-maincolor cursor-pointer"
              v-if="_showResend"
              @click="resendCode"
              >ارسال مجدد کد تایید</span
            >
          </div>
          <div class="mt-3">
            <div class="flex items-start">
              <div class="w-1/2">
                <vs-input
                  label="کپچا :"
                  val-icon-danger="close"
                  color="dark"
                  class="!w-full captcha space-input"
                  v-model="loginInfo.captcha"
                  :danger="v$.captcha.$error"
                  :danger-text="v$.captcha.$errors[0]?.$message"
                />
              </div>
              <div class="w-1/2 flex items-end justify-end mt-8">
                <button class="flex h-10 items-center p-1">
                  <ArrowPathIcon class="w-5 h-5 dark:text-white" />
                </button>
                <img class="h-10 rounded-md" src="../assets/img/captchas.png" alt="" />
              </div>
            </div>
          </div>
          <div class="mt-3" id="loadingBtn">
            <vs-button color="#146d1e" class="!w-full" type="filled" @click="loginHandler"
              >ورود</vs-button
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
.vs-con-input {
  margin-top: 10px;
}

.username .vs-input--input,
.password .vs-input--input,
.captcha .vs-input--input {
  text-align: left;
}
</style>
