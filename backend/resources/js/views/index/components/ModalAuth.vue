<script setup>
import { reactive, ref, watch } from 'vue';

import AfrDialog from '@/components/dialog/AfrDialog.vue';
import AfrInput from "@/components/form/AfrInput.vue";

const props = defineProps({
  modelValue: { type: Boolean, default: false },
});
const emits = defineEmits(['update:modelValue']);

const isOpen = ref(props.modelValue);
const formData = reactive({
  email: '',
  password: '',
});


watch(
  () => props.modelValue,
  (newVal, oldVal) => {
    isOpen.value = newVal;
    // emits('update:modelValue', newVal);
  }
);


watch(
  () => isOpen.value,
  (newVal, oldVal) => {
    emits('update:modelValue', newVal);
  }
);

</script>

<template>
  <afr-dialog
    v-model="isOpen"
    width="300px"
  >
    <template #header>
      <div class="uppercase text-sm font-bold text-gray-600">Авторизация</div>
    </template>
    <afr-input v-model="formData.email" placeholder="Ваш логин/email"/>
    <afr-input v-model="formData.password" native-type="password" placeholder="Пароль"/>
  </afr-dialog>
</template>

<style scoped>

</style>
