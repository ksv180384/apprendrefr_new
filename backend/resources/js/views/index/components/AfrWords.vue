<script setup>
import { ref, computed } from 'vue';
import { Icon } from '@iconify/vue';
import AfrDialog from "@/components/dialog/AfrDialog.vue";
import AfrPlayerWord from "@/components/AfrPlayerWord.vue";

const props = defineProps({
  words: { type: Array, default: [] },
});

const activeWordId = ref(0);
const activeWord = computed(() => props.words.find(item => item.id === activeWordId.value));
const isShowModal = ref(false);

const showInfo = (id) => {
  isShowModal.value = !isShowModal.value;
  activeWordId.value = id;
}
</script>

<template>
  <div class="afr-words">
    <ul>
      <li
        v-for="word in words"
        :key="word.id"
        class="afr-words-item"
        @click="showInfo(word.id)"
      >
        <afr-player-word :word="word?.word" class="me-3" @click.stop="() => false"/>
        <div :title="word.transcription">{{ word.word }} - <span class="Pervod">{{ word.translation }}</span></div>
      </li>
    </ul>

    <afr-dialog
      v-model="isShowModal"
    >
      <template #header>
        <div class="uppercase font-bold">{{ activeWord?.word }}</div>
      </template>

      <div class="max-w-[800px]">
        <div class="flex flex-row">
          <div class="afr-word-modal-item">
            <afr-player-word :word="activeWord?.word" class="me-3"/> {{ activeWord?.word }}
          </div>
          <div class="afr-word-modal-item">{{ activeWord?.transcription }}</div>
          <div class="afr-word-modal-item Pervod">{{ activeWord?.translation }}</div>
        </div>
        <div class="p-4 pt-0">
          <div v-html="activeWord?.example" class="leading-8"></div>
        </div>
      </div>
    </afr-dialog>

  </div>
</template>

<style scoped>
.afr-words{
  @apply text-sm -mx-2;
}

.afr-words ul{

}

li.afr-words-item{
  @apply flex items-center cursor-pointer py-1.5 px-2 hover:bg-sky-100;
}

.afr-word-modal-item{
  @apply flex-grow flex justify-center py-6 px-2 w-1/3;
}
</style>
