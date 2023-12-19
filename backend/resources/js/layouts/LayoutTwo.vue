<script setup>
import { useRoute } from 'vue-router';

const route = useRoute();

import Header from '@/components/header/Header.vue';
</script>
<template>
  <div class="layout-two">
    <Header/>
    <div class="container-max">
      <router-view/>
    </div>
  </div>
</template>

<style scoped>
.layout-two{
  @apply min-h-screen;
  padding-top: 57px;
}

.layout-two .container-max{

}
/*
.layout-two{
    @apply flex flex-row bg-blue-100 mx-auto
}

.layout-two .left-block{
    flex: 1 0 280px;
}

.layoutTwo .center-block{
    flex: 100%;
}

body.sidebar-open .layout-two{
    overflow: hidden;
}

@media (max-width: 870px) {
    .layout-two{
        min-height: calc(100vh - 188px);
    }
}*/
</style>

