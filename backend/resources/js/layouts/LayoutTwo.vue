<script setup>
import { useRoute } from 'vue-router';

const route = useRoute();

import AfrHeader from '@/components/header/AfrHeader.vue';
import AfrFooter from '@/components/footer/AfrFooter.vue';
</script>
<template>
  <div class="layout-two">
    <afr-header/>
    <div class="container-max">
      <router-view/>
    </div>
    <afr-footer/>
  </div>
</template>

<style scoped>
.layout-two{
  @apply flex min-h-screen pt-[57px] flex-col;
}

.layout-two .container-max{
  @apply flex-1;
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

