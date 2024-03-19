<script setup>
import { computed, ref } from 'vue';
import { useAuthUserStore } from '@/store/auth_user.js';

import AfrButton from '@/components/form/AfrButton.vue';
import ModalAuth from '@/views/index/components/ModalAuth.vue';
import ProfileControl from '@/components/header/authentification/ProfileControl.vue';

const isShowDialogAuth = ref(false);
const authUser = computed(() => useAuthUserStore());

const click = () => {
  isShowDialogAuth.value = true;
}
</script>

<template>
  <div>
    <template v-if="!authUser.is_auth">
      <afr-button size="small" type="primary" text @click="click">
        Войти
      </afr-button>

      <ModalAuth v-model="isShowDialogAuth"/>
    </template>
    <template v-else>
      <ProfileControl :user="authUser"/>
    </template>
  </div>
</template>

