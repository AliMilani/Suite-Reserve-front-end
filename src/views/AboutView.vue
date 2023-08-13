<template>
  <div class="container mx-auto">
    <div
      class="rounded-xl bg-[#fbfbfb] dark:text-white dark:bg-slate-800 dark:border-none border shadow-lg p-10 mt-10 flex flex-col-reverse md:flex-row flex-wrap md:flex-nowrap justify-center items-center">
      <div class="w-full ml-0 md:ml-14">
        <div class="text-center md:text-right">
          <h2
            class="text-2xl font-semibold text-maincolor dark:text-maintext mx-8 relative inline 
         before:contents-[''] before:absolute before:w-8 before:h-8 before:-right-10 before:bg-[url('/src/assets/img/Header/title-patern.svg')]
         before:contents-[''] after:absolute after:rotate-180 after:w-8 after:h-8 after:-left-10 after:bg-[url('/src/assets/img/Header/title-patern.svg')]">
            دربـــاره مـا
          </h2>
        </div>
        <p class="text-justify mt-5 font-light">
          مرکز آموزشی و رفاهی جوادالائمه(ع) مشهد مقدس با ظرفیت 18 اتاق و 85 تخت جهت پذیرش همکاران گرامی و خانواده های
          محترمشان و دانش آموزان عزیز با ارائه مجوزهای لازم آماده شده است. هدف از راه اندازی مرکز تشرف همکاران محترم به
          پابوسی آقا علی بن موسی الرضا (علیه السلام) می باشد.
        </p>
        <h3 class="mt-5 text-lg">امکانات مرکز</h3>
        <ul class="space-y-2 mt-3 font-light">
          <li
            class="mr-8 relative before:contents-[''] text-justify before:block before:absolute before:-right-5 before:top-2 before:w-3 before:h-3 before:rounded-full before:bg-maincolor">
            سوئیت ها دارای
            تلویزیون، یخچال،
            کابینت، سرویس بهداشتی،
            حمام، رخت آویز، جاکفشی، فرش و سیستم سرمایشی و گرمایشی
          </li>
          <li
            class="mr-8 relative before:contents-[''] text-justify before:block before:absolute before:-right-5 before:top-1 before:w-3 before:h-3 before:rounded-full before:bg-maincolor">
            آشپزخانه مرکزی جهت طبخ غذا توسط همکاران داخل محوطه</li>
          <li
            class="mr-8 relative before:contents-[''] text-justify before:block before:absolute before:-right-5 before:top-1 before:w-3 before:h-3 before:rounded-full before:bg-maincolor">
            پارکینگ خودرو در محوطه </li>
          <li
            class="mr-8 relative before:contents-[''] text-justify before:block before:absolute before:-right-5 before:top-1 before:w-3 before:h-3 before:rounded-full before:bg-maincolor">
            فاصله مرکز تا حرم مطهر حدود 5 دقیقه</li>
        </ul>
      </div>
      <div class="w-full md:w-80">
        <img src="./../assets/img/Header/about-poster.png" class="w-2/3 mx-auto md:w-full" alt="">
      </div>
    </div>
  </div>
</template>

<style>
/* @media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
} */
</style>
