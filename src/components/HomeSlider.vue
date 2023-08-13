<script setup>
// If you are using PurgeCSS, make sure to whitelist the carousel CSS classes
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'
import { defineComponent, ref } from 'vue'
defineComponent({
    Carousel,
    Slide,
    Pagination,
    Navigation,
})

let sliderSrc = ref([
    {
        src: "./src/assets/img/slider/slider-1.jpg",
        alt: "تصویر اول"
    },
    {
        src: "./src/assets/img/slider/slider-2.jpg",
        alt: "تصویر دوم"
    }
])
</script>

<template>
    <carousel dir="rtl" :pause-autoplay-on-hover="true" :autoplay="8000">
        <slide v-for="item in sliderSrc" :key="item">
            <div>
                <img :src="item.src" :alt="item.alt" class="rounded-md">
            </div>
        </slide>
        <template #addons>
            <navigation />
            <pagination />
        </template>
    </carousel>
</template>
