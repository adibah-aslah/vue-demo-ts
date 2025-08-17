<template>
  <div class="w-full py-8">
    <div class="w-full mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
      <!-- Header -->
      <div class="p-6 border-b border-gray-200 dark:border-gray-700">
        <h1 class="text-2xl font-bold text-gray-800 dark:text-white">My Todo List</h1>
        <p class="text-gray-600 dark:text-gray-300">Stay organized and get things done</p>
      </div>

      <!-- Add Todo -->
      <div class="p-6 border-b border-gray-100 dark:border-gray-700">
        <div class="flex gap-3">
          <input
            v-model="newTodo"
            @keyup.enter="addTodo"
            placeholder="What needs to be done?"
            class="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg 
                   focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          />
          <Button variant="primary" @click="addTodo" class="whitespace-nowrap px-6" :disabled="!newTodo.trim()">
            Add Task
          </Button>
        </div>
      </div>

      <!-- Todo List -->
      <div class="divide-y divide-gray-100 dark:divide-gray-700">
        <div 
          v-for="(todo, index) in todos" 
          :key="index"
          class="p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          <div class="flex items-center gap-3">
            <input type="checkbox" v-model="todo.done" class="h-5 w-5 text-blue-600 rounded" />
            <span class="flex-1 text-gray-800 dark:text-gray-200" :class="{ 'line-through text-gray-400 dark:text-gray-500': todo.done }">
              {{ todo.text }}
            </span>
            <Button 
              variant="danger" 
              @click="askToDelete(index)" 
              class="p-2 hover:bg-red-100 dark:hover:bg-red-900/50 rounded-full"
            >
              🗑
            </Button>
          </div>
        </div>

        <!-- Empty State -->
        <div v-if="todos.length === 0" class="p-8 text-center text-gray-500">
          <Icon icon="mdi:clipboard-text-outline" class="h-12 w-12 mx-auto mb-2" />
          No tasks yet. Add one above!
        </div>
      </div>

      <!-- Footer Stats -->
      <div v-if="todos.length > 0" class="p-4 bg-gray-50 dark:bg-gray-700/50 text-sm text-gray-500 dark:text-gray-400">
        <div class="flex justify-between">
          <span>{{ todos.filter(t => !t.done).length }} items left</span>
          <span>{{ todos.filter(t => t.done).length }} completed</span>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <Modal :show="showModal" @close="cancelDelete">
      <template #title>Delete Todo</template>

      <p class="text-gray-600 dark:text-gray-300">
        Are you sure you want to delete this todo? This action cannot be undone.
      </p>

      <template #footer>
        <button 
          @click="cancelDelete" 
          class="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100 dark:border-gray-700"
        >
          Cancel
        </button>
        <button 
          @click="confirmDelete" 
          class="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
        >
          Confirm
        </button>
      </template>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Icon } from '@iconify/vue'

interface Todo { text: string; done: boolean }

const todos = ref<Todo[]>([])
const newTodo = ref('')
const showModal = ref(false)
const todoIndexToDelete = ref<number|null>(null)

function addTodo() {
  if (newTodo.value.trim()) {
    todos.value.push({ text: newTodo.value.trim(), done: false })
    newTodo.value = ''
  }
}

function askToDelete(index: number) {
  todoIndexToDelete.value = index
  showModal.value = true
}

function confirmDelete() {
  if (todoIndexToDelete.value !== null) {
    todos.value.splice(todoIndexToDelete.value, 1)
    todoIndexToDelete.value = null
    showModal.value = false
  }
}

function cancelDelete() {
  todoIndexToDelete.value = null
  showModal.value = false
}
</script>