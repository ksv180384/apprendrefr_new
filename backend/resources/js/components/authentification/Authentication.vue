<script setup>
import { ref } from 'vue';

import AfrButton from '@/components/form/AfrButton.vue';
import ModalAuth from "@/views/index/components/ModalAuth.vue";

const isShowDialogAuth = ref(true);

const click = () => {
  isShowDialogAuth.value = true;
}
</script>

<template>
  <div>
    <afr-button size="small" type="primary" text @click="click">
      Войти
    </afr-button>

    <ModalAuth v-model="isShowDialogAuth"/>

  </div>
</template>

