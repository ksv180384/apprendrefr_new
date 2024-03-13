<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { usePageStore } from '@/store/page';

// TODO Книги [Маленький принц, Синяя борода]

const route = useRoute();
const pageStore = usePageStore();

pageStore.$subscribe((mutation, state) => {
  document.title = state.title;
  document.querySelector('meta[name="description"]').content = state.description;
  if(state.keywords){
    document.querySelector('meta[name="keywords"]').content = state.keywords;
  }
});

const layout = computed(() => {
  const layout = route?.meta?.layout;

  if (layout) {
    return layout;
  }
  return 'div';
});

const glasnie = ['a', 'à', 'â', 'e', 'ë', 'ê', 'è', 'é', 'i', 'î', 'o', 'ô', 'u', 'û', 'ù', 'y'];
const soglasnie = ['b', 'c', 'ç', 'd', 'g', 'k', 'm', 'n', 'p', 'q', 't', 'j', 'l', 'r', 's', 'v', 'w', 'x', 'z'];
</script>

<template>
  <component :is="layout">
    <router-view/>
  </component>
</template>
