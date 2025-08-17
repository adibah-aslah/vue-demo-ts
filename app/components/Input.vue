<script setup lang="ts">
import { Icon } from '@iconify/vue'

const props = defineProps<{
  modelValue: string
  label: string
  icon?: string
  iconPosition?: 'left' | 'right'
  type?: string
  clearable?: boolean
}>()

const emit = defineEmits(['update:modelValue'])

const handleInput = (event: Event) => {
  emit('update:modelValue', (event.target as HTMLInputElement).value)
}
</script>

<template>
  <div class="relative w-full">
    <!-- Input -->
    <input
      :type="type || 'text'"
      :value="modelValue"
      @input="handleInput($event)"
      placeholder=" "
      class="peer w-full border rounded-lg pt-4 pb-2
             focus:border-blue-500 dark:focus:border-blue-400
             dark:bg-gray-800 dark:text-white
             transition placeholder-transparent"
      :class="{
        'pl-10 pr-8': icon && iconPosition === 'left',
        'pl-3 pr-10': icon && iconPosition === 'right',
        'pl-3 pr-8': !icon && clearable,
        'px-3': !icon && !clearable
      }"
    />

    <!-- Floating Label -->
    <label
      class="absolute text-gray-500 text-base transition-all duration-200
             peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base
             peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2
             peer-focus:text-sm peer-focus:text-blue-500
             peer-not-placeholder-shown:text-sm peer-not-placeholder-shown:top-2"
      :class="{
        'left-10': icon && iconPosition === 'left',
        'left-3': !icon || iconPosition === 'right'
      }"
    >
      {{ label }}
    </label>

    <!-- Left Icon -->
    <Icon
      v-if="icon && iconPosition === 'left'"
      :icon="icon"
      class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 peer-focus:text-blue-500"
    />

    <!-- Right Icon -->
    <Icon
      v-if="icon && iconPosition === 'right'"
      :icon="icon"
      class="absolute right-8 top-1/2 -translate-y-1/2 text-gray-400 peer-focus:text-blue-500"
    />

    <!-- Clear Button -->
    <button
      v-if="clearable && modelValue"
      type="button"
      class="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
      @click="emit('update:modelValue', '')"
    >
      <Icon icon="mdi:close-circle" class="w-5 h-5" />
    </button>
  </div>
</template>
