<script setup>
import { ref } from 'vue';

const props = defineProps({
  modelValue: { type: Boolean, default: false },
  id: { type: String, default: '' },
  name: { type: String, default: '' },
  value: { type: String, default: '' },
  label: { type: String, default: '' },
});
const emits = defineEmits(['update:modelValue']);

const checked = ref(props.modelValue);

const onChange = () => {
  checked.value = !checked.value;
  emits('update:modelValue', !checked.value);
}
</script>

<template>
  <div class="afr-checkbox" @click="onChange">
    <div>
      <input
        :checked="modelValue"
        :id="id"
        type="checkbox"
        :name="name"
        hidden="hidden"
      />
      <span class="afr-checkbox-icon"></span>
    </div>
    <label v-if="label">{{ label }}</label>
  </div>
</template>

<style scoped>
.afr-checkbox{
  @apply flex gap-2 items-center select-none cursor-pointer;
}

.afr-checkbox label{
  @apply text-xs cursor-pointer;
}

.afr-checkbox-icon{
  @apply flex justify-center items-center w-[12px] h-[12px] border border-gray-500;
}

.afr-checkbox input:checked+.afr-checkbox-icon{
  @apply border-blue-300;
}

.afr-checkbox input:checked+.afr-checkbox-icon:after{
  @apply flex items-center justify-center w-[8px] h-[8px] bg-blue-300;
  content: '';
}
</style>
