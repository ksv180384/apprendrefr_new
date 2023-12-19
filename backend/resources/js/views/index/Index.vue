<script setup>
import { computed } from 'vue';
import { usePageStore } from '@/store/page.js';

import AfrCard from '@/components/card/AfrCard.vue';
import AfrWords from '@/views/index/components/AfrWords.vue';
import AfrPlayer from '@/views/index/components/AfrPlayer.vue';

const page = usePageStore();

const words = computed(() => page.words_list);
const proverb = computed(() => page.proverb);
</script>
<template>
  <div class="index-page">
    <div class="left-container">

      <afr-card header="Плеер">
        <afr-player/>
      </afr-card>

      <afr-card>
        проверь себя
      </afr-card>

      <afr-card header="Слова">
        <afr-words :words="words"/>
      </afr-card>

      <afr-card header="Анекдот">
        Анекдот
      </afr-card>

    </div>
    <div class="content-container">
      <afr-card header="Пословица">
        <div class="text-center">
          {{ proverb.text }}
        </div>
        <div class="text-center text-green-600">
          {{ proverb.translation }}
        </div>
      </afr-card>
      <afr-card header="Последние темы">
        Последние темы
      </afr-card>
    </div>
  </div>
</template>

<style scoped>
.index-page{
  @apply flex flex-row gap-0.5;
}

.left-container{
  @apply flex flex-col gap-0.5;
  width: 280px;
}

.content-container{
  @apply flex-grow flex  flex-col gap-0.5;
}
</style>
