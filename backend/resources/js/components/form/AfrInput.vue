<script setup>
import { computed, ref } from 'vue';

const props = defineProps({
  modelValue: { type: String, default: '' },
  size: {
    type: String,
    default: 'default',
    validator(value) {
      return ['large', 'default', 'small'].includes(value);
    }
  },
  nativeType: {
    type: String,
    default: 'text',
    validator(value) {
      return ['text', 'number', 'password'].includes(value);
    }
  },
  label: { type: String, default: null },
  placeholder: { type: String, default: '' },
});
const emits = defineEmits(['update:modelValue']);

// const value = ref(props.modelValue);
const classSize = computed(() => `size-${props.size}`);
const onInput = (e) => {
  emits('update:modelValue', e.target.value);
}
</script>

<template>
  <div class="afr-input" :class="[classSize]">

    <input
      :type="nativeType"
      :placeholder="placeholder"
      :value="modelValue"
      @input="onInput"
    />

  </div>
</template>

<style scoped>
.afr-input{
  @apply border border-gray-300 rounded overflow-clip;
}

.size-large{
  @apply text-xl;
}
.size-default{
  @apply text-base;
}
.size-small{
  @apply text-sm;
}

.afr-input input{
  @apply py-1 px-3 w-full;
}

</style>
