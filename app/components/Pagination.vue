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
      class="px-3 py-1 border rounded disabled:opacity-50"
    >
      Prev
    </button>

    <span class="text-sm">
      Page {{ page }} / {{ totalPages }}
    </span>

    <button
      @click="next"
      :disabled="page === totalPages"
      class="px-3 py-1 border rounded disabled:opacity-50"
    >
      Next
    </button>
  </div>
</template>