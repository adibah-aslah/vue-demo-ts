<template>
  <ClientOnly>
    <div class="grid gap-6 grid-cols-1">
      <BookCard
        v-for="book in books"
        :key="book.id"
        :title="book.title"
        :author="book.author"
        :year="book.year"
        :thumbnail="book.thumbnail"
        @open="openBook(book)"
      />
    </div>

    <Modal :show="showModal" @close="closeModal">
      <template #title>
        <div class="line-clamp-2">
          {{ selectedBook?.title }}
        </div>
      </template>

      <template #default>
        <div class="flex flex-col gap-4">
          <img
            v-if="selectedBook?.thumbnail"
            :src="selectedBook.thumbnail"
            :alt="selectedBook.title"
            class="w-32 h-44 object-cover rounded mx-auto"
          />
          <p class="text-gray-600 dark:text-gray-300"><strong>Author:</strong> {{ selectedBook?.author }}</p>
          <p class="text-gray-600 dark:text-gray-300"><strong>Publisher:</strong> {{ selectedBook?.publisher }}</p>
          <p class="text-gray-600 dark:text-gray-300"><strong>Print Type:</strong> {{ selectedBook?.printType }}</p>
          <p class="text-gray-600 dark:text-gray-300"><strong>Year:</strong> {{ selectedBook?.year }}</p>
          <p class="text-sm text-gray-600 dark:text-gray-300">
            {{ selectedBook?.description || 'No description available.' }}
          </p>
        </div>
      </template>
    </Modal>
  </ClientOnly>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { defineAsyncComponent } from 'vue'

const BookCard = defineAsyncComponent(() => import('./BookCard.vue'))
const Modal = defineAsyncComponent(() => import('../Modal.vue'))

const props = defineProps<{
  books: {
    id: string
    title: string
    author: string
    year: string
    publisher?: string
    printType?: string
    description?: string
    thumbnail?: string | null
  }[]
}>()

const selectedBook = ref<any>(null)
const showModal = ref(false)

function openBook(book: any) {
  selectedBook.value = book
  showModal.value = true
}

function closeModal() {
  showModal.value = false
  selectedBook.value = null
}
</script>
