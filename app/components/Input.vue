<script setup lang="ts">
import { Icon } from '@iconify/vue'

const props = withDefaults(defineProps<{
  modelValue: string
  label: string
  icon?: string
  iconPosition?: 'left' | 'right'
  type?: string
  clearable?: boolean
  error?: string
}>(), {
  type: 'text',
  iconPosition: 'left',
  clearable: false
})

const emit = defineEmits(['update:modelValue'])

const handleInput = (event: Event) => {
  emit('update:modelValue', (event.target as HTMLInputElement).value)
}
</script>

<template>
  <div class="relative w-full">
    <div class="relative">
      <input
        :type="type"
        :value="modelValue"
        @input="handleInput($event)"
        placeholder=" "
        class="peer w-full border rounded-lg pt-4 pb-2 px-3
               focus:border-blue-500 dark:focus:border-blue-400
               dark:bg-gray-800 dark:text-white
               transition placeholder-transparent"
        :class="{
          'pl-10': icon && iconPosition === 'left',
          'pr-10': (icon && iconPosition === 'right') || clearable,
          'border-red-500 dark:border-red-500': error,
          'border-gray-300 dark:border-gray-600': !error
        }"
      />

      <Icon
        v-if="icon && iconPosition === 'left'"
        :icon="icon"
        class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 peer-focus:text-blue-500"
        :class="{ 'text-red-500': error }"
      />

      <template v-if="iconPosition === 'right' || clearable">
        <Icon
          v-if="icon && iconPosition === 'right'"
          :icon="icon"
          class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 peer-focus:text-blue-500"
          :class="{ 'text-red-500': error }"
        />
        <button
          v-else-if="clearable && modelValue"
          type="button"
          class="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          @click="$emit('update:modelValue', '')"
        >
          <Icon icon="mdi:close-circle" class="w-5 h-5" />
        </button>
      </template>

      <label
        class="absolute left-3 top-2 text-xs text-gray-500 dark:text-gray-400 transition-all duration-200
               peer-placeholder-shown:text-base peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2
               peer-focus:text-xs peer-focus:top-2 peer-focus:text-blue-500"
        :class="{
          'left-10': icon && iconPosition === 'left',
          'text-red-500': error
        }"
      >
        {{ label }}
      </label>
    </div>

    <p v-if="error" class="mt-1 text-sm text-red-500">
      {{ error }}
    </p>
  </div>
</template>
