<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { usePageStore } from "@/store/page.js";
import { useProverbStore } from "@/store/proverb.js";
import { useWordsStore } from "@/store/words.js";
const pageStore = usePageStore();
const proverbStore = useProverbStore();
const wordsStore = useWordsStore();

const words = computed(() => wordsStore.words);
const proverb = computed(() => proverbStore);

import AfrHeader from '@/components/header/AfrHeader.vue';
import AfrFooter from '@/components/footer/AfrFooter.vue';
import AfrCard from '@/components/card/AfrCard.vue';
import AfrPlayer from '@/views/index/components/player/AfrPlayer.vue';
import AfrWords from '@/views/index/components/AfrWords.vue';
import AfrProverb from "@/components/proverb/AfrProverb.vue";
import AfrAnecdote from "@/components/anecdote/AfrAnecdote.vue";


const route = useRoute();
</script>
<template>
  <div class="layout-two">

    <afr-header/>

    <div class="container-max layout-two-center">
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
          <afr-anecdote/>
        </afr-card>

      </div>
      <div class="content-container">

        <afr-card header="Пословица">
          <afr-proverb :proverb="proverb"/>
        </afr-card>

        <router-view/>

      </div>
    </div>

    <afr-footer/>

  </div>
</template>

<style scoped>
.layout-two{
  @apply flex min-h-screen pt-[57px] flex-col;
}

.layout-two-center{
  @apply flex flex-1 gap-0.5;
}

.left-container{
  @apply flex flex-col gap-0.5;
  width: 280px;
}

.content-container{
  @apply flex-grow flex flex-col gap-0.5;
}
</style>

