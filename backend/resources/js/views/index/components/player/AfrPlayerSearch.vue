<script setup>
import { ref } from 'vue';
import api from '@/services/api/index.js';

import AfrInput from '@/components/form/AfrInput.vue';

const searchText = ref('');
const songs = ref([]);
const isLoading = ref(false);

const onInputSearch = async () => {

  if(searchText.value.length < 3){
    songs.value = [];
    return;
  }

  isLoading.value = true;
  try {
    const res = await api.songText.search({ search: searchText.value });

    songs.value = res.songs;
  } catch (e) {
    console.error(e);
  } finally {
    isLoading.value = false;
  }
}
</script>

<template>
<div>
  <afr-input
    v-model="searchText"
    size="small"
    placeholder="Поиск подходящей песни..."
    @input="onInputSearch"
  />

  <div
    v-if="songs.length"
    class="search-result"
  >
    <ul>
      <li v-for="song in songs">
        <div class="font-text-xs">
          {{ song.artist_name }}
        </div>
        <div class="font-bold text-sm">
          {{ song.title }}
        </div>
      </li>
    </ul>
  </div>
</div>
</template>

<style scoped>
.search-result{
  @apply relative mx-1;
}

.search-result ul{
  @apply absolute text-center bg-white rounded-b text-gray-500 shadow-lg overflow-hidden w-full;
  /*width: calc(100% + 1rem);
  transform: translateX(-0.5rem);*/
}

.search-result ul li{
  @apply py-1 cursor-pointer transition duration-300 hover:bg-blue-50 text-start px-4;
}
</style>
