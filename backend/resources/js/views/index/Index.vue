<script setup>


import AfrCard from '@/components/card/AfrCard.vue';

const props = defineProps({
  forumThemes: { type: Array, default: [] },
});
</script>
<template>
  <div class="index-page">
    <afr-card header="Последние темы" class="index-page">
      Последние темы
    </afr-card>
  </div>
</template>

<style scoped>
.index-page{
  /*@apply flex flex-row gap-0.5;*/
}
</style>
