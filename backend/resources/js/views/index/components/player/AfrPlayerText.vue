<script setup>
import { ref, computed, watchPostEffect } from 'vue';
import AfrPlayerTextBlock from "@/views/index/components/player/AfrPlayerTextBlock.vue";

const props = defineProps({
  fr: { type: String, default: '' },
  ru: { type: String, default: '' },
  transcription: { type: String, default: '' },
  currentTime: { type: Number, default: 0 },
});

const textToArray = (text) => {
  return text.split("\n").map(textRow => textRow.replace(/\[.*?\]/ig, ''))
}

const arTextFr = ref([]);
const arTextRu = ref([]);
const arTextTranscription = ref([]);

watchPostEffect(() => {
  arTextFr.value = textToArray(props.fr);
  arTextRu.value = textToArray(props.ru);
  arTextTranscription.value = textToArray(props.transcription);
});
</script>

<template>
<div class="afr-player-text">
  <AfrPlayerTextBlock :text="props.fr" :current-time="currentTime"/>
  <AfrPlayerTextBlock :text="props.ru" :current-time="currentTime"/>
  <AfrPlayerTextBlock :text="props.transcription" :current-time="currentTime"/>
</div>
</template>

<style scoped>
.afr-player-text{
  @apply w-full mb-2 flex flex-grow gap-2 h-[220px] px-4;
}

</style>
