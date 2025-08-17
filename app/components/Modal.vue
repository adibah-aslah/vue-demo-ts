<template>
  <div 
    v-if="show" 
    class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
    @click.self="$emit('close')"
  >
    <div 
      class="bg-white dark:bg-gray-900 rounded-lg shadow-lg max-w-[60vw] w-full max-h-[70vh] flex flex-col"
    >
      <!-- Header -->
      <div v-if="$slots.title" class="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
        <h2 class="text-xl font-bold">
          <slot name="title" />
        </h2>
        <button
          @click="$emit('close')"
          class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          aria-label="Close modal"
        >
          ✕
        </button>
      </div>

      <!-- Body -->
      <div class="flex-1 overflow-y-auto p-4">
        <slot />
      </div>

      <!-- Footer -->
      <div v-if="$slots.footer" class="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-end gap-3">
        <slot name="footer" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  show: {
    type: Boolean,
    required: true
  }
})
</script>