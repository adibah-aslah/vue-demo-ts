<template>
  <button
    :class="[
      'inline-flex items-center justify-center gap-2 rounded-md font-bold transition',
      sizeClass,
      variantClass,
      disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
    ]"
    :disabled="disabled"
    @click="handleClick"
  >
    <!-- Left icon -->
    <Icon
      v-if="icon && iconPosition === 'left'"
      :icon="icon"
      class="w-5 h-5"
    />

    <!-- Label / slot -->
    <slot />

    <!-- Right icon -->
    <Icon
      v-if="icon && iconPosition === 'right'"
      :icon="icon"
      class="w-5 h-5"
    />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Icon } from '@iconify/vue'

const props = defineProps({
  variant: {
    type: String,
    default: 'primary',
  },
  size: {
    type: String as () => 'sm' | 'md' | 'lg',
    default: 'md',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  icon: {
    type: String,
    default: '',
  },
  iconPosition: {
    type: String as () => 'left' | 'right',
    default: 'left',
  },
})

const emit = defineEmits(['click'])

const variantClass = computed(() => {
  switch (props.variant) {
    case 'secondary':
      return 'bg-gray-300 text-gray-900 hover:bg-gray-400'

    case 'danger':
      return 'bg-red-600 text-white hover:bg-red-700'

    case 'outline':
      return 'border border-gray-400 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'

    case 'text':
      return 'bg-transparent text-blue-600 dark:text-blue-400 hover:underline'

    case 'primary':
    default:
      return 'bg-primary-light dark:bg-primary-dark text-white hover:opacity-90'
  }
})

const sizeClass = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'px-3 py-1 text-sm'
    case 'lg':
      return 'px-6 py-3 text-lg'
    case 'md':
    default:
      return 'px-4 py-2 text-base'
  }
})

function handleClick(event: MouseEvent) {
  if (!props.disabled) {
    emit('click', event)
  }
}
</script>