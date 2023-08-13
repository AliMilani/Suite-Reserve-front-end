<script setup>
import { inject, ref, watch } from 'vue'
import AddCompanions from './AddCompanions.vue'
import ReserveDetails from './ReserveDetails.vue'
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'

// Get Props
defineProps({
  headItem: {
    type: Array,
    required: true
  },
  items: {
    type: Array,
    required: true
  }
})

let emits = defineEmits(['selectedItem', 'loaded'])

let roomImages = ref(['/src/assets/img/rooms/3-1.png', '/src/assets/img/rooms/3-1.png'])

let reservationData = ref([])
let companionData = ref([])
let sliderImages = ref([])

let popupReservationActive = ref(false)
let popupCompanionActive = ref(false)
let popupSliderActive = ref(false)

const reservationHandler = (data) => {
  popupReservationActive.value = true
  reservationData.value = data
}

const CompanionnHandler = (data) => {
  popupCompanionActive.value = true
  companionData.value = data
}

const sliderHandler = (data) => {
  popupSliderActive.value = true
  sliderImages.value = data
}

const selected = ref([])

watch(
  () => selected.value,
  () => {
    emits('selectedItem', selected.value)
  }
)
</script>

<template>
  <div>
    <div class="dark:!text-white">
      <vs-table
        stripe
        max-items="5"
        pagination
        :data="items"
        :multiple="inject('multipleSelect', false)"
        v-model="selected"
        noDataText="اطلاعاتی پیدا نشد."
      >
        <template #thead>
          <vs-th
            class="whitespace-nowrap"
            v-for="header in headItem.filter((item) => item.minshow)"
            :key="header"
          >
            {{ header.headText }}
          </vs-th>
        </template>
        <template v-slot="{ data }">
          <vs-tr
            :data="tr"
            class="border-t border-[#dfe2e5] dark:border-slate-900"
            :key="indextr"
            v-for="(tr, indextr) in data"
          >
            <slot
              :dataitem="data[indextr]"
              :openmodal="reservationHandler"
              :companionsmodal="CompanionnHandler"
              :slideModal="sliderHandler"
            >
            </slot>
          </vs-tr>
        </template>
      </vs-table>
    </div>

    <vs-popup
      class="holamundo"
      title="اطلاعات تکمیلی رزرو اتاق"
      v-model:active="popupReservationActive"
    >
      <ReserveDetails :data="reservationData" />
    </vs-popup>

    <vs-popup
      class="holamundo !z-[300000]"
      title="ویرایش اطلاعات همراه"
      v-model:active="popupCompanionActive"
    >
      <AddCompanions @isLoaded="emits('loaded')" :input-data="{ ...companionData }" :edit="true" />
    </vs-popup>

    <vs-popup class="holamundo !z-[300000]" title="عکس های اتاق" v-model:active="popupSliderActive">
      <div class="my-2 bg-fgreen rounded-full text-white w-fit px-3 py-2 mx-auto">
        {{ sliderImages.title }}
      </div>
      <carousel dir="rtl" :pause-autoplay-on-hover="true" :autoplay="8000">
        <slide v-for="item in roomImages" :key="item">
          <div>
            <img :src="item" class="rounded-md" />
          </div>
        </slide>
        <template #addons>
          <navigation />
          <pagination />
        </template>
      </carousel>
    </vs-popup>
  </div>
</template>

<style>
.vs-con-tbody {
  overflow-x: scroll;
}

.vs-table--thead th {
  background: #003a36 !important;
  padding: 10px 5px;
  color: white;
}

.vs-table--thead th div {
  justify-content: center;
}

.vs-table--thead th:first-child {
  border-radius: 0 50px 50px 0;
}

.vs-table--thead th:last-child {
  border-radius: 50px 0 0 50px;
}

.vs-table--td span {
  display: flex;
  justify-content: center;
}

.vs-table--td {
  white-space: nowrap;
}

.vs-pagination--li .effect {
  background: #003a36 !important;
}

.v-tooltip {
  background: red !important;
  font-family: 'vazir';
}

.image-hover:hover span {
  opacity: 0;
  visibility: hidden;
}

th.td-check .con-td-check {
  background-color: transparent;
}

.tr-table-state-primary,
.vs-table-primary .is-selected {
  color: #003a36;
  box-shadow: none;
}

.vs-checkbox-primary input:checked + .vs-checkbox {
  background-color: #0db02b !important;
  border-color: #0db02b !important;
}
</style>
