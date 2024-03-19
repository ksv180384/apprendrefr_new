<script setup>
import api from '@/services/api';

import Dropdown from '@/components/dropdown/AfrDropdown.vue';

const props = defineProps({
  user: { type: Object, default: [] },
});

const logout = async () => {
  try{
    await api.auth.logout();
  } catch (e) {
    console.error(e);
  } finally {

  }
}
</script>

<template>
  <div>
    <Dropdown>
      <div class="cursor-pointer" :title="user.login">
        <img class="inline-block h-10 w-10 rounded-full ring-2 ring-white object-cover" :src="user.avatar"/>
      </div>
      <template #dropdown>
        <div class="flex flex-col">
          <div class="text-center text-sm font-bold">{{ user.login }}</div>
          <div class="text-center text-xs">{{ user.rang }}</div>
        </div>

        <div class="h-px my-3 bg-gray-200 border-0"></div>

        <div class="text-sm">
          <div>Профиль</div>
          <div>Ползователи</div>
          <div @click="logout">Выход</div>
        </div>
      </template>
    </Dropdown>
  </div>
</template>

<style scoped>

</style>
