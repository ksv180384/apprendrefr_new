<script setup>
import { computed } from 'vue';
import { usePageStore } from '@/store/page.js';

import AfrCard from '@/components/card/AfrCard.vue';
import AfrWords from '@/views/index/components/AfrWords.vue';
import AfrPlayer from '@/views/index/components/player/AfrPlayer.vue';

const pageStore = usePageStore();

const words = computed(() => pageStore.words_list);
const proverb = computed(() => pageStore.proverb);
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
        <div class="text-sm">
          Le petit gars <span class="text-green-600">(маленький мальчик)</span> demande à son père
          <span class="text-green-600">(спрашивает у своего отца)</span>: "Papa, quand je suis venu au monde
          <span class="text-green-600">(когда я появился на свет)</span>, qui m'a donné mon intelligence
          <span class="text-green-600">(кто мне дал мой ум /мою сообразительность/)</span>?"
          "C'est sûrement ta mère <span class="text-green-600">(конечно, твоя мама)</span>, car moi, j'ai encore la mienne
          <span class="text-green-600">(так как мой еще при мне: «я имею еще мою»)</span>."
        </div>
        <div class="mt-2 text-xs">
          Отрывок из<br/>
          Французский с улыбкой<br/>
          Автор: Ольга Розенкова
        </div>
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
