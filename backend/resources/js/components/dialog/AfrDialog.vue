<script setup>
import { computed, useSlots, ref, watch } from 'vue';
import ShowEventsTrigger from '@/components/dialog/ShowEventsTrigger.vue';
import AfrCloseBtn from '@/components/form/AfrCloseBtn.vue';

const props = defineProps({
  modelValue: { type: Boolean, default: false },
  width: { type: String, default: null },
});
const emits = defineEmits(['update:modelValue', 'open', 'opened', 'close', 'closed']);

const slots = useSlots();
const showEventsTrigger = ref(props.modelValue);
const styleWidth = computed(() => props.width ? `width: ${props.width};` : '');

watch(
  () => props.modelValue,
  (newVal) => {
    if(newVal){
      showEventsTrigger.value = true;
    }
  }
);

const onOpen = () => {
  emits('open');
}

const onOpened = () => {
  emits('opened');
}

const onClose = () => {
  emits('close');
  emits('update:modelValue', false);
}

const onClosed = () => {
  emits('closed');
}

const close = () => {
  showEventsTrigger.value = false;

}
</script>

<template>
  <Teleport to="body">
    <dialog
      v-if="modelValue"
      class="afr-overlay"
      @click.self="close"
    >

      <ShowEventsTrigger
        v-if="showEventsTrigger"
        @open="onOpen"
        @opened="onOpened"
        @close="onClose"
        @closed="onClosed"
      />

      <div class="afr-dialog" :style="[styleWidth]">
        <div v-if="slots.header" class="afr-dialog-header">
          <slot name="header"/>
          <afr-close-btn class="absolute right-2 top-1/2 transform -translate-y-1/2" @click="close"/>
        </div>
        <div class="afr-dialog-body">
          <slot/>
        </div>
        <div v-if="slots.footer" class="afr-dialog-footer">
          <slot name="footer"/>
        </div>
      </div>
    </dialog>
  </Teleport>
</template>

<style scoped>
.afr-overlay {
  @apply fixed top-0 h-screen left-0 w-screen bg-gray-800 z-50 bg-opacity-20 flex flex-col justify-center items-center;
}

.afr-dialog {
  @apply bg-white rounded overflow-clip shadow-lg;
}

.afr-dialog-header{
  @apply bg-blue-100 text-center py-3 px-2 relative;
}

.afr-dialog-body{
  @apply py-1 px-2;
}

.afr-dialog-footer{
  @apply border-t border-gray-300 py-1 px-2 mt-1;
}
</style>
