<script setup>
import { ref } from 'vue';
import { Icon } from '@iconify/vue';

const volumePoint = ref(20);
</script>

<template>
  <div class="afr-player-volume-container">
    <div class="afr-player-volume">
      <Icon icon="mingcute:volume-line" />
    </div>
    <div class="afr-volume-control">
      <div class="afr-volume-progress">
        <div class="afr-volume-point" :style="{ top: `${volumePoint}%` }"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.afr-player-volume-container{
  @apply text-[22px] w-[60px] h-[60px] flex items-center justify-center relative cursor-pointer;
}

.afr-volume-control{
  @apply absolute flex-col w-12 h-[200px] -top-[200px] bg-white rounded-xl shadow-lg py-2;
  display: flex;
}

.afr-player-volume-container:hover .afr-volume-control{
  @apply flex;
}

.afr-volume-progress{
  @apply w-2 bg-blue-200 flex-grow rounded-xl mx-auto relative;
}

.afr-volume-point{
  @apply absolute left-1/2 w-4 h-4 bg-blue-400 shadow-xl rounded-full cursor-pointer;
  transform: translateX(-50%);
}
</style>
