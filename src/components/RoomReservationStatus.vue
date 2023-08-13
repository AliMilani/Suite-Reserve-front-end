<script setup>
import { computed } from 'vue'

// Get Props
let props = defineProps({
  table: {
    type: [Array, Object],
    required: true
  },
  c: {
    type: Number,
    required: true,
    default: 30
  }
})

const data = computed(() => props.table)
</script>

<template>
  <!-- {{ data[0].reservedDays.length }} -->
  <div class="w-full overflow-x-scroll dark:text-white">
    <table class="table-fixed">
      <thead>
        <tr>
          <td class="max-w-[100px] border dark:border-slate-700 text-center whitespace-nowrap px-5">
            شماره اتاق
          </td>
          <td
            class="min-w-[23px] border dark:border-slate-700 text-center"
            v-for="counter in c"
            :key="counter"
          >
            {{ counter }}
          </td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in data" :key="index">
          <td class="w-full border dark:border-slate-700 text-center whitespace-nowrap">
            {{ item.name }}
          </td>
          <td
            class="w-full border dark:border-slate-700 text-center"
            :class="{ 'bg-green-500': !col.isReserved, 'bg-red-500': col.isReserved }"
            v-for="(col, index) in item.reservedDays"
            :key="index"
          ></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style></style>
