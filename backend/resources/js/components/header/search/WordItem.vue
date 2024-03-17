<script setup>
const props = defineProps({
  word: { type: Object, default: {} }
});
</script>

<template>
<li :title="word.translation">
  {{ word.word }}
</li>
</template>

<style scoped>

</style>
