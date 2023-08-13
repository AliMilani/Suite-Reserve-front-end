<script setup>
import { reactive } from 'vue'
const contactInfo = reactive({
  fullname: '',
  phoneNumber: '',
  subject: '',
  des: ''
});
</script>
<template>
  <div class="container mx-auto">
    <div
      class="rounded-xl bg-[#fbfbfb] dark:bg-slate-900 dark:border-none dark:shadow-gray-500/25 dark:text-white border shadow-lg p-10 mt-10 flex justify-center w-full md:w-3/4 mx-auto flex-wrap lg:flex-nowrap">
      <div class="w-full lg:w-1/2">
        <div class="text-center lg:text-right">
          <h2
            class="text-2xl dark:text-maintext font-semibold text-maincolor mx-8 relative inline before:contents-[''] before:absolute before:w-8 before:h-8 before:-right-10 before:bg-[url('/src/assets/img/Header/title-patern.svg')] before:contents-[''] after:absolute after:rotate-180 after:w-8 after:h-8 after:-left-10 after:bg-[url('/src/assets/img/Header/title-patern.svg')]">
            تماس با مـا
          </h2>
        </div>
        <div class="flex flex-wrap mt-5 dark:text-white">
          <div class="w-full md:w-1/2 p-2">
            <vs-input class="!w-full" type="text" val-icon-danger="close" label="نام و نام خانوادگی" color="dark"
              v-model="contactInfo.fullname" />
          </div>
          <div class="w-full md:w-1/2 p-2">
            <vs-input class="!w-full" type="text" val-icon-danger="close" label="تلفن همراه" color="dark"
              v-model="contactInfo.phoneNumber" />
          </div>
          <div class="w-full p-2">
            <vs-input class="!w-full" type="text" val-icon-danger="close" label="موضوع" color="dark"
              v-model="contactInfo.subject" />
          </div>
          <div class="w-full p-2">
            <label class="text-gray-600 text-sm dark:text-white">توضیحات</label>
            <textarea v-model="contactInfo.des"
              class="vs-textarea--input w-full mt-1 dark:border-none bg-white border border-gray-300 rounded p-2 focus:border-gray-800 focus:shadow-md transition-all"
              cols="30" rows="5"></textarea>
          </div>
          <div class="w-full p-2">
            <vs-button color="#146d1e" type="filled">ارسال اطلاعات</vs-button>
          </div>
        </div>
      </div>
      <div class="w-full lg:w-1/2 mr-0 lg:mr-5 mt-10 lg:mt-0">
        <div class="text-center lg:text-right">
          <h2
            class="text-2xl font-semibold dark:text-maintext text-maincolor mx-8 relative inline before:contents-[''] before:absolute before:w-8 before:h-8 before:-right-10 before:bg-[url('/src/assets/img/Header/title-patern.svg')] before:contents-[''] after:absolute after:rotate-180 after:w-8 after:h-8 after:-left-10 after:bg-[url('/src/assets/img/Header/title-patern.svg')]">
            راه های ارتباطی
          </h2>
          <div class="mt-5 mr-0 md:mr-5">
            <p>
              آدرس : مشهد خیابان شهید اندرزگو (خسروی سابق) کوچه 12 «آیت اله سید جواد خامنه ای (ره)»
              نبش کوچه 12/5
            </p>
            <p class="mt-5">تلفن واحد پذیرش: 32222294 - 025</p>
            <p class="mt-5">
              آدرس : قم – خیابان بلوارامین – کوچه 2 - اداره کل آموزش و پرورش استان قم
            </p>
            <p class="mt-5">تلفن: 32938028 - 025 (اداره تعاون و امور رفاهی)</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
