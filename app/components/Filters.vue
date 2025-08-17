<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  searchQuery: string
  year: string[]
  author: string[]
  publisher: string[]
  printType: string[]
  yearOptions: { label: string; value: string }[]
  authorOptions: { label: string; value: string }[]
  publisherOptions: { label: string; value: string }[]
  printTypeOptions: { label: string; value: string }[]
}>()

const emit = defineEmits<{
  (e: 'update:searchQuery', value: string): void
  (e: 'update:year', value: string[]): void
  (e: 'update:author', value: string[]): void
  (e: 'update:publisher', value: string[]): void
  (e: 'update:printType', value: string[]): void
  (e: 'search'): void
  (e: 'clear'): void
}>()

const showFilters = ref(false)
</script>

<template>
  <div class="flex flex-col gap-2">
    <div class="flex flex-wrap gap-2">
      <div class="flex-1 min-w-[200px]">
        <Input 
          v-model="props.searchQuery"
          label="Search books"
          icon="mdi:magnify"
          iconPosition="right"
          @update:modelValue="val => emit('update:searchQuery', val)"
          @keyup.enter="emit('search')"
          @clear="emit('search')"
        />
      </div>

      <div class="flex gap-2 flex-wrap">
        <Button variant="primary" class="whitespace-nowrap px-6" @click="emit('search')">
          Search
        </Button>

        <Button 
          :variant="showFilters ? 'primary' : 'text'"
          class="whitespace-nowrap px-6" 
          icon="mdi:filter-outline"
          @click="showFilters = !showFilters"
        >
          Filter
        </Button>

        <Button variant="text" class="whitespace-nowrap px-6" @click="emit('clear')">
          Clear
        </Button>
      </div>
    </div>

    <transition name="fade">
      <div v-if="showFilters" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-2">
        <div class="w-full">
          <Dropdown
            v-model="props.year"
            label="Year"
            multiple
            clearable
            :options="yearOptions"
            @update:modelValue="val => emit('update:year', val)"
          />
        </div>

        <div class="w-full">
          <Dropdown
            v-model="props.author"
            label="Author"
            multiple
            clearable
            :options="authorOptions"
            @update:modelValue="val => emit('update:author', val)"
          />
        </div>

        <div class="w-full">
          <Dropdown
            v-model="props.publisher"
            label="Publisher"
            multiple
            clearable
            :options="publisherOptions"
            @update:modelValue="val => emit('update:publisher', val)"
          />
        </div>

        <div class="w-full">
          <Dropdown
            v-model="props.printType"
            label="Print Type"
            multiple
            clearable
            :options="printTypeOptions"
            @update:modelValue="val => emit('update:printType', val)"
          />
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>