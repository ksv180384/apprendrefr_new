<script setup>

const props = defineProps({
  words: { type: Array, default: [] },
});
</script>

<template>
  <div class="afr-words">
    <ul>
      <li v-for="word in words" :key="word.id">
        {{ word.word }} - <span class="text-green-600">{{ word.translation }}</span>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.afr-words{
  @apply text-sm;
}

.afr-words ul{

}

.afr-words ul li{
  @apply py-1.5;
}
</style>
