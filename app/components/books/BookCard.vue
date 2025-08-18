<script setup lang="ts">
interface BookCardProps {
  title: string;
  author: string;
  year: number | string;
  thumbnail?: string | null;
  selected?: boolean;
}

const props = withDefaults(defineProps<BookCardProps>(), {
  selected: false,
  thumbnail: null,
});

const emit = defineEmits(['open'])

defineOptions({
  name: 'BookCard',
  inheritAttrs: false
});
</script>

<template>
  <div
    :class="[
      'group flex items-start gap-4 p-4 rounded-xl border-2 transition-all duration-200',
      'hover:shadow-lg dark:bg-gray-800/50',
      props.selected 
        ? 'border-blue-500 dark:border-blue-500' 
        : 'border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500'
    ]"
    @click="emit('open')"
  >
    <div class="w-20 h-28 flex-shrink-0">
      <img
        v-if="props.thumbnail"
        :src="props.thumbnail"
        :alt="props.title"
        class="w-full h-full object-cover rounded-md"
      />
      <div
        v-else
        class="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center rounded-md"
      >
        <span class="text-gray-500 text-xs text-center">No Image</span>
      </div>
    </div>

    <div class="flex flex-col justify-between w-full">
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-1">
        {{ props.title }}
      </h3>
      <p class="text-sm text-gray-600 dark:text-gray-300">
        Author: {{ props.author }}
      </p>
      <p class="text-xs text-gray-500 dark:text-gray-400">
        Published: {{ props.year }}
      </p>
    </div>
  </div>
</template>