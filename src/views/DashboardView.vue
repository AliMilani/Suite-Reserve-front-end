<script setup>
import { RouterView } from 'vue-router';
import DashboardMenu from '../components/DashboardMenu.vue';
</script>
<template>
    <div class="container mx-auto mt-10 px-2">
        <div
            class="flex flex-wrap w-full bg-white dark:bg-slate-900 dark:border-none dark:text-white shadow-lg border  rounded-xl p-4 overflow-hidden">
            <div class="w-full md:w-1/4 p-3">
                <DashboardMenu />
            </div>
            <div class="w-full md:w-3/4 p-3 ">
                <RouterView v-slot="{ Component }">
                    <Transition name="route" mode="out-in">
                        <component :is="Component"></component>
                    </Transition>
                </RouterView>
            </div>
        </div>
    </div>
</template>
  
<style>
/* route transition */
.route-enter-from {
    opacity: 0;
    transform: translateY(50px);
}

.route-enter-active {
    transition: all .3s ease-out;
}

.route-leave-to {
    opacity: 0;
    transform: translateY(-50px);
}

.route-leave-active {
    transition: all .3s ease-in;
}
</style>
  