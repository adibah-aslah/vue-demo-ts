<template>
  <div 
    v-if="show" 
    class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
  >
    <div class="bg-white rounded-lg shadow-lg max-w-sm w-full p-6">
      <h2 class="text-xl font-bold mb-4"><slot name="title">Modal Title</slot></h2>
      <div class="mb-4"><slot>Modal content here</slot></div>
      <div class="flex justify-end gap-3">
        <button 
          @click="$emit('close')" 
          class="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100"
        >
          Cancel
        </button>
        <button 
          @click="$emit('confirm')" 
          class="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
        >
          Confirm
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps({
  show: {
    type: Boolean,
    required: true,
  },
});
</script>
