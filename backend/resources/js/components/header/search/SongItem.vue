<script setup>
const props = defineProps({
  song: { type: Object, default: {} }
});
</script>

<template>
  <li class="text-nowrap">
    <div class="font-text-xs">
      {{ song.artist_name }}
    </div>
    <div class="font-bold text-sm">
      {{ song.title }}
    </div>
  </li>
</template>

<style scoped>

</style>
