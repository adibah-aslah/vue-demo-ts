<script setup lang="ts">
import { Icon } from '@iconify/vue'
import Card from './Card.vue'

const props = defineProps({
  to: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  icon: { type: String, default: '📝' },
  linkText: { type: String, default: 'Open App' }
})
</script>

<template>
  <NuxtLink :to="to">
    <Card>
      <div class="text-4xl mb-4 group-hover:text-blue-500 transition-colors">
        {{ icon }}
      </div>
      <h3 class="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
        {{ title }}
      </h3>
      <p class="text-gray-600 dark:text-gray-300">
        {{ description }}
      </p>
      <div class="mt-4 text-sm text-blue-600 dark:text-blue-400 font-medium flex items-center justify-center underline">
        {{ linkText }}
        <Icon icon="mdi:arrow-right" class="ml-2" />
      </div>
    </Card>
  </NuxtLink>
</template>
