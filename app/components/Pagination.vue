<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  page: number
  pageSize: number
  total: number
}>()

const emit = defineEmits(['update:page'])

const totalPages = computed(() => Math.ceil(props.total / props.pageSize))

function prev() {
  if (props.page > 1) emit('update:page', props.page - 1)
}
function next() {
  if (props.page < totalPages.value) emit('update:page', props.page + 1)
}
</script>

<template>
  <div class="flex items-center justify-center gap-4 mt-6">
    <button
      @click="prev"
      :disabled="page === 1"
      class="px-4 py-2 border rounded-md disabled:opacity-50
             text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-600
             hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
    >
      Prev
    </button>

    <span class="text-sm text-gray-700 dark:text-gray-300">
      Page {{ page }} / {{ totalPages }}
    </span>

    <button
      @click="next"
      :disabled="page === totalPages"
      class="px-4 py-2 border rounded-md disabled:opacity-50
             text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-600
             hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
    >
      Next
    </button>
  </div>
</template>