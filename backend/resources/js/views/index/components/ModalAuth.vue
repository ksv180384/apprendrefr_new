<script setup>
import { ref, reactive } from 'vue';
import api from '@/services/api/api.js';
import { usePageStore } from '@/store/page.js';

import AfrDialog from '@/components/dialog/AfrDialog.vue';
import AfrInput from "@/components/form/AfrInput.vue";
import AfrButton from "@/components/form/AfrButton.vue";
import AfrCheckbox from "@/components/form/AfrCheckbox.vue";

const props = defineProps({
  modelValue: { type: Boolean, default: false },
});
const emits = defineEmits(['update:modelValue']);

const pageStore = usePageStore();
const formData = reactive({
  email: '',
  password: '',
  remember: false,
});
const isSubmitting = ref(false);

const onClose = () => {
  emits('update:modelValue', false);
}

const submit = async () => {

  isSubmitting.value = true;

  try{
    const res = await api.auth.login(formData);
    pageStore.user = res.user;
    emits('update:modelValue', false);
  } catch (e) {
    console.error(e);
  } finally {
    isSubmitting.value = false;
  }
}
</script>

<template>
  <afr-dialog
    :model-value="modelValue"
    width="300px"
    @close="onClose"
  >
    <template #header>
      <div class="uppercase text-sm font-bold text-gray-600">Авторизация</div>
    </template>
    <form
      class="form-auth"
      @submit.prevent="submit"
    >
      <div class="my-2">
        <afr-input
          v-model="formData.email"
          placeholder="Ваш логин/email"
        />
      </div>
      <div>
        <afr-input
          v-model="formData.password"
          native-type="password"
          placeholder="Пароль"
        />
      </div>
      <div class="flex justify-between my-2">
        <afr-checkbox
          v-model="formData.remember"
          id="remember"
          label="Запомнить"
        />
        <afr-button
          type="primary"
          native-type="submit"
          size="small"
          :loading="isSubmitting"
        >
          Вход
        </afr-button>
      </div>
    </form>
  </afr-dialog>
</template>

<style scoped>
.form-auth{
  @apply flex flex-col gap-2;
}
</style>
