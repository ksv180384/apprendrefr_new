<script setup>
import { ref } from 'vue';
import { usePageStore } from '@/store/page.js';

import AfrButton from '@/components/form/AfrButton.vue';
import ModalAuth from '@/views/index/components/ModalAuth.vue';
import ProfileControl from '@/components/header/authentification/ProfileControl.vue';

const pageStore = usePageStore();
const isShowDialogAuth = ref(false);

const click = () => {
  isShowDialogAuth.value = true;
}
</script>

<template>
  <div>
    <template v-if="!pageStore.user">
      <afr-button size="small" type="primary" text @click="click">
        Войти
      </afr-button>

      <ModalAuth v-model="isShowDialogAuth"/>
    </template>
    <template v-else>
      <ProfileControl/>
    </template>
  </div>
</template>

