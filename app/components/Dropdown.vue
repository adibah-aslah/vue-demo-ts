<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { Icon } from '@iconify/vue'

const props = defineProps<{
  options: { label: string; value: string }[]
  modelValue?: string[]
  label: string
  clearable?: boolean
}>()

const emit = defineEmits(['update:modelValue'])
const isOpen = ref(false)
const dropdownRef = ref<HTMLElement | null>(null)

function toggleDropdown() {
  isOpen.value = !isOpen.value
}

function selectOption(value: string) {
  const current = props.modelValue ? [...props.modelValue] : []
  const idx = current.indexOf(value)
  if (idx === -1) {
    current.push(value)
  } else {
    current.splice(idx, 1)
  }
  emit('update:modelValue', current)
}

function clearSelection() {
  emit('update:modelValue', [])
}

const selectedLabels = computed(() => {
  return props.options
    .filter(o => props.modelValue?.includes(o.value))
    .map(o => o.label)
})

function handleClickOutside(e: MouseEvent) {
  if (dropdownRef.value && !dropdownRef.value.contains(e.target as Node)) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <div class="relative w-full" ref="dropdownRef">
    <div
      class="w-full border rounded-lg px-3 py-3 flex items-center flex-wrap gap-1 cursor-pointer
             bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200
             focus-within:border-blue-500 dark:focus-within:border-blue-400"
      @click="toggleDropdown"
    >
      <template v-if="selectedLabels.length">
        <span
          v-for="label in selectedLabels.slice(0, 2)"
          :key="label"
          class="bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300 text-xs px-2 py-0.5 rounded-md"
        >
          {{ label }}
        </span>
        <span
          v-if="selectedLabels.length > 2"
          class="text-gray-500 dark:text-gray-400 text-xs"
        >
          +{{ selectedLabels.length - 2 }} more
        </span>
      </template>
      <span v-else class="text-gray-400 dark:text-gray-500 text-sm">{{ label }}</span>

      <div class="ml-auto flex items-center gap-1">
        <button
          v-if="clearable && selectedLabels.length"
          type="button"
          @click.stop="clearSelection"
          class="text-gray-400 hover:text-red-500 dark:text-gray-500 dark:hover:text-red-400"
          aria-label="Clear selection"
        >
          <Icon icon="mdi:close-circle" class="w-4 h-4" />
        </button>

        <Icon
          icon="mdi:chevron-down"
          class="text-gray-500 dark:text-gray-400 transition-transform w-5 h-5"
          :class="{ 'rotate-180': isOpen }"
        />
      </div>
    </div>

    <div
      v-if="isOpen"
      class="absolute z-10 mt-1 w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg max-h-72 overflow-y-auto"
    >
      <div
        v-for="opt in options"
        :key="opt.value"
        class="px-3 py-2 flex items-center gap-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200"
        @click.stop="selectOption(opt.value)"
      >
        <input
          type="checkbox"
          :checked="modelValue?.includes(opt.value)"
          class="h-4 w-4 text-blue-600 dark:text-blue-500 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 rounded focus:ring-blue-500 dark:focus:ring-blue-600"
          readonly
        />
        <span class="text-sm">{{ opt.label }}</span>
      </div>
    </div>
  </div>
</template>