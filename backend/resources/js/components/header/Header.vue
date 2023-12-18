<script setup>
import { ref } from 'vue';
import api from '@/services/api';
import menu from '@/store/menu.js';

import Navigation from '@/components/header/navigation/Navigation.vue';
import Search from '@/components/header/search/Search.vue';
import Authentication  from '@/components/authentification/Authentication.vue';

const searchHints = ref([]);

const loadSearchHints = async (search) => {
  if(search.text.length < 2){
    searchHints.value = [];
    return;
  }
  try{
    const res = await api.search({ text: search.text, type: search.type });
    searchHints.value = res.search;
  } catch (e) {
    console.error(e);
  } finally {

  }
}

const loadSearch = (searchText) => {
  console.log(searchText);
}
</script>

<template>
  <header>
    <div class="container-max mx-auto">
      <div class="header-content">
        <div class="navigation">
          <Navigation :menu="menu"/>
        </div>
        <div class="header-actions">
          <Search
            :hints="searchHints"
            @enter="loadSearch"
            @change="loadSearchHints"
          />
          <Authentication class="ms-5"/>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
header{
  @apply fixed top-0 left-0 flex flex-row justify-between items-center w-full bg-blue-100 text-gray-700 shadow-lg;
  z-index: 2;
}

.header-content{
  @apply flex flex-row justify-between;
}

.header-actions{
  @apply flex flex-row items-center;
}

.navigation{
  @apply flex flex-grow items-center;
}
</style>
