<template>
  <button
    :class="[
      'p-4 rounded-md font-bold',
      variantClass,
      { 'opacity-50 cursor-not-allowed': disabled }
    ]"
    :disabled="disabled"
    @click="handleClick"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  variant: {
    type: String,
    default: 'primary',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['click']);

const variantClass = computed(() => {
  switch (props.variant) {
    case 'secondary':
      return 'bg-gray-300 text-gray-900 hover:bg-gray-400';
    case 'danger':
      return 'bg-red-600 text-white hover:bg-red-700';
    case 'primary':
    default:
      return 'bg-blue-900 text-white hover:bg-blue-700';
  }
});

function handleClick(event: MouseEvent) {
  if (!props.disabled) {
    emit('click', event);
  }
}
</script>
