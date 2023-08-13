<script setup>
// import HomeSlider from "../components/HomeSlider.vue"
const facilities = [
  {
    title: 'سیستم سرمایشی اسپلیت',
    img: '/src/assets/img/fac/cooling.svg'
  },
  {
    title: 'سیستم گرمایشی شوفاژ',
    img: '/src/assets/img/fac/heating.svg'
  },
  {
    title: 'آشپزخانه مجزا',
    img: '/src/assets/img/fac/kitchen.svg'
  },
  {
    title: 'هزینه مناسب',
    img: '/src/assets/img/fac/best-price.svg'
  },
  {
    title: 'مساحت کم تا حرم مطهر',
    img: '/src/assets/img/fac/masafat.svg'
  }
]
</script>

<template>
  <section>
    <div class="container mx-auto mt-10">
      <!-- slider -->
      <div
        class="bg-maincolor p-10 md:rounded-xl flex-wrap md:flex-nowrap flex-col-reverse md:flex-row flex justify-between relative overflow-hidden"
      >
        <img
          class="absolute w-1/2 top-1/2 -right-20 md:-top-20 md:w-[35%]"
          src="./../assets/img/Header/islamic-patern.svg"
          alt=""
        />
        <div class="w-full md:w-7/12 ml-5 relative mt-5 md:mt-0">
          <h1 class="text-white text-2xl md:text-3xl font-semibold text-center md:text-right">
            سامانه رزرو سوئیت همکاران
          </h1>
          <p class="mt-5 text-justify text-gray-200">
            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک
            است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط
            فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد،
            کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می
            طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و
            فرهنگ پیشرو در زبان.
          </p>
          <div class="mt-5 space-x-2 space-x-reverse">
            <button class="bg-white text-maincolor px-4 py-2 rounded-full font-semibold">
              رزرو سوئیت
            </button>
            <button
              class="border-2 border-white text-white px-4 py-[6px] rounded-full font-semibold"
            >
              درباره ما
            </button>
          </div>
        </div>
        <div class="w-full md:w-96 relative">
          <img src="../assets/img/Header/slider-img.png" class="w-full" alt="" />
        </div>
      </div>
      <!-- facilities -->
      <div class="flex justify-center items-center flex-wrap mt-10 mx-5">
        <div class="w-1/2 md:w-1/3 lg:w-1/5 p-3" v-for="item in facilities" :key="item">
          <div
            class="border-2 border-gray-100 dark:border-slate-800 dark:bg-slate-800 dark:text-white rounded-2xl shadow-lg duration-500 p-4 cursor-pointer facilities_items bg-white transition-all"
          >
            <div class="w-14 mx-auto">
              <img class="dark:brightness-0 dark:invert-[1]" :src="item.img" :alt="item.title" />
            </div>
            <div>
              <p class="text-center mt-6 min-h-[50px]">{{ item.title }}</p>
            </div>
          </div>
        </div>
      </div>

      <div
        class="flex relative bg-[#FBFBFB] dark:bg-slate-800 dark:shadow-gray-500/25 dark:border-slate-900 shadow-lg mt-10 border rounded-3xl overflow-hidden w-full p-5 md:p-10"
      >
        <img
          src="./../assets/img/Header/patern-poster.svg"
          class="w-48 absolute top-0 left-0 dark:opacity-30"
          alt=""
        />
        <div class="dark:text-white">
          <h2 class="font-semibold text-maincolor dark:text-maintext text-3xl">اطلاعیه ها</h2>
          <div class="mt-5 border-r-2 border-dashed border-green-500 mr-4">
            <h3>
              <span class="-mr-[7px] h-[15px] inline-block bg-white dark:bg-slate-800">
                <span class="inline-block w-3 h-3 bg-green-600 rounded-full"></span>
              </span>
              معرفی نامه
            </h3>
            <p class="mx-10 mt-5 pb-5 text-justify">
              همکار گرامی هنگام پذیرش، تحویل معرفی نامه چاپ شده و کارت شناسایی معتبر فرهنگی الزامی
              است. جهت چاپ معرفی نامه پس از ورود به حساب کاربری خود از قسمت "رزرو اتاق" گزینه "منو"
              را باز کرده و با انتخاب گزینه "چاپ معرفی نامه" معرفی نامه خود را چاپ و در هنگام عزیمت،
              آنرا به مسئول پذیرش تحویل نمایید.
            </p>
          </div>
          <div class="mr-4">
            <h3>
              <span class="-mr-[7px] h-[15px] inline-block bg-white dark:bg-slate-800">
                <span class="inline-block w-3 h-3 bg-green-600 rounded-full"></span>
              </span>
              تعداد رزرو
            </h3>
            <p class="mx-10 mt-5 text-justify">
              رزرو سوئیت برای هر همکار فقط دو مرتبه در سال امکان پذیر می باشد، چنانچه در یک بازه
              زمانی دو اتاق رزرو شود، به منزله استفاده از این فرصت می باشد.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
