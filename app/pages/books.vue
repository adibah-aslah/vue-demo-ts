<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { fetchBooks } from '../services/books'
import { defineAsyncComponent } from 'vue'

const BookList = defineAsyncComponent(() => import('../components/books/BookList.vue'))
const Pagination = defineAsyncComponent(() => import('../components/Pagination.vue'))
const Filters = defineAsyncComponent(() => import('../components/Filters.vue'))

const searchQuery = ref('')
const year = ref<string[]>([])
const author = ref<string[]>([])
const publisher = ref<string[]>([])
const printType = ref<string[]>([]) 
const page = ref(1)
const pageSize = ref(4)
const books = ref<any[]>([])

const yearOptions = ref<{ label: string; value: string }[]>([])
const authorOptions = ref<{ label: string; value: string }[]>([])
const publisherOptions = ref<{ label: string; value: string }[]>([])
const printTypeOptions = ref<{ label: string; value: string }[]>([])

const filteredBooks = computed(() => {
  return books.value.filter(b => {
    return (
      (year.value.length === 0 || year.value.includes(b.year)) &&
      (author.value.length === 0 || author.value.includes(b.author)) &&
      (publisher.value.length === 0 || publisher.value.includes(b.publisher)) &&
      (printType.value.length === 0 || printType.value.includes(b.printType))
    )
  })
})

const paginatedBooks = computed(() => {
  const start = (page.value - 1) * pageSize.value
  return filteredBooks.value.slice(start, start + pageSize.value)
})

const total = computed(() => filteredBooks.value.length)

async function searchBooks() {
  const res = await fetchBooks({
    q: searchQuery.value || 'clean code',
    maxResults: 40
  })

  books.value = res.items?.map((b: any) => ({
    id: b.id,
    title: b.volumeInfo.title || 'Untitled',
    author: b.volumeInfo.authors?.[0] || 'Unknown',
    publisher: b.volumeInfo.publisher || 'Unknown',
    printType: b.volumeInfo.printType || 'Unknown',
    year: b.volumeInfo.publishedDate?.split('-')[0] || 'N/A',
    thumbnail: b.volumeInfo.imageLinks?.thumbnail || null,
    description: b.volumeInfo.description || ''
  })) || []

  yearOptions.value = Array.from(new Set(books.value.map(b => b.year)))
    .filter(Boolean)
    .map(y => ({ label: y, value: y }))

  authorOptions.value = Array.from(new Set(books.value.map(b => b.author)))
    .filter(Boolean)
    .map(a => ({ label: a, value: a }))

  publisherOptions.value = Array.from(new Set(books.value.map(b => b.publisher)))
    .filter(Boolean)
    .map(p => ({ label: p, value: p }))

  printTypeOptions.value = Array.from(new Set(books.value.map(b => b.printType)))
    .filter(Boolean)
    .map(pt => ({ label: pt, value: pt }))

  page.value = 1
}

function handleSearch() {
  searchBooks()
}

function handleClear() {
  searchQuery.value = ''
  year.value = []
  author.value = []
  publisher.value = []
  printType.value = []
  page.value = 1
  searchBooks()
}

function handlePageChange(newPage: number) {
  page.value = newPage
}

onMounted(searchBooks)
</script>

<template>
  <div class="flex flex-col gap-6 p-4">
    <h1 class="text-2xl font-bold text-gray-800 dark:text-white">Book Library</h1>

    <ClientOnly>
      <Filters
        v-model:searchQuery="searchQuery"
        v-model:year="year"
        v-model:author="author"
        v-model:publisher="publisher"
        v-model:printType="printType"
        :year-options="yearOptions"
        :author-options="authorOptions"
        :publisher-options="publisherOptions"
        :print-type-options="printTypeOptions"
        @search="handleSearch"
        @clear="handleClear"
      />

      <BookList :books="paginatedBooks" />

      <Pagination
        :page="page"
        :page-size="pageSize"
        :total="total"
        @update:page="handlePageChange"
      />
    </ClientOnly>
  </div>
</template>
