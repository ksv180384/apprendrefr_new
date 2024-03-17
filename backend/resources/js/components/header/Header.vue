<script setup>
import { ref } from 'vue';
import api from '@/services/api';
import menu from '@/store/menu.js';

import Navigation from '@/components/header/navigation/Navigation.vue';
import Search from '@/components/header/search/Search.vue';
import Authentication  from '@/components/header/authentification/Authentication.vue';

const searchHints = ref([]);
</script>

<template>
  <header>
    <div class="container-max mx-auto">
      <div class="header-content">
        <div class="navigation">
          <Navigation :menu="menu"/>
        </div>
        <div class="header-actions">
          <Search/>
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
