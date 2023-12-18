<script setup>
import { computed, useSlots } from 'vue';
import { Icon } from '@iconify/vue';

const props = defineProps({
  modelValue: { type: Boolean, default: false },
  width: { type: String, default: null },
});
const emits = defineEmits(['update:modelValue']);

const slots = useSlots();

const styleWidth = computed(() => props.width ? `width: ${props.width};` : '');

const onClose = () => {
  emits('update:modelValue', false);
}
</script>

<template>
  <Teleport to="body">
    <div
      v-if="modelValue"
      class="afr-overlay"
      @click.self="onClose"
    >
      <div class="afr-dialog" :style="[styleWidth]">
        <div v-if="slots.header" class="afr-dialog-header">
          <slot name="header"/>
          <div
            class="afr-dialog-header-close"
            @click="onClose"
          >
            <Icon icon="jam:close" />
          </div>
        </div>
        <div class="afr-dialog-body">
          <slot/>
        </div>
        <div v-if="slots.footer" class="afr-dialog-footer">
          <slot name="footer"/>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.afr-overlay {
  @apply fixed top-0 bottom-0 left-0 right-0 bg-gray-800 z-50 bg-opacity-20 flex flex-col justify-center items-center;
}

.afr-dialog {
  @apply bg-white rounded overflow-clip shadow-lg;
}

.afr-dialog-header{
  @apply bg-blue-100 text-center py-3 px-2 relative;
}

.afr-dialog-header-close{
  @apply absolute right-2 top-1/2 flex items-center justify-center cursor-pointer rounded h-full hover:bg-red-500
         transform -translate-y-1/2 transition duration-200 hover:text-red-50;
  font-size: 22px;
  width: 32px;
  height: 32px;
}

.afr-dialog-body{
  @apply py-1 px-2;
}

.afr-dialog-footer{
  @apply border-t border-gray-300 py-1 px-2 mt-1;
}
</style>
