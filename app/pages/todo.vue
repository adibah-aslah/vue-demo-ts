<template>
  <div class="w-full py-4 md:py-8">
    <div class="w-full max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
      <!-- Header -->
      <div class="p-4 md:p-6 border-b border-gray-200 dark:border-gray-700">
        <h1 class="text-xl md:text-2xl font-bold text-gray-800 dark:text-white">My Todo List</h1>
        <p class="text-sm md:text-base text-gray-600 dark:text-gray-300">Stay organized and get things done</p>
      </div>
      
      <!-- Add Todo Form -->
      <div class="p-4 md:p-6 border-b border-gray-100 dark:border-gray-700">
        <div class="flex flex-col sm:flex-row gap-3">
          <input
            v-model="newTodo"
            @keyup.enter="addTodo"
            placeholder="What needs to be done?"
            class="flex-1 px-4 py-2 md:py-3 border border-gray-300 dark:border-gray-600 rounded-lg 
                   focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          />
          <Button 
            variant="primary" 
            @click="addTodo" 
            class="w-full sm:w-auto whitespace-nowrap px-4 md:px-6" 
            :disabled="!newTodo.trim()"
          >
            Add Task
          </Button>
        </div>
      </div>

      <div class="divide-y divide-gray-100 dark:divide-gray-700">
        <div 
          v-for="(todo, index) in todos" 
          :key="index"
          class="p-3 md:p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          <div class="flex gap-3 justify-between items-center">
            <input 
              type="checkbox" 
              v-model="todo.done" 
              class="h-5 w-5 mt-0.5 flex-shrink-0 text-blue-600 rounded" 
            />
            <span 
              class="flex-1 text-sm md:text-base text-gray-800 dark:text-gray-200 break-words" 
              :class="{ 'line-through text-gray-400 dark:text-gray-500': todo.done }"
            >
              {{ todo.text }}
            </span>
            <Button 
              variant="danger" 
              @click="askToDelete(index)" 
              class="p-1.5 md:p-2 hover:bg-red-100 dark:hover:bg-red-900/50 rounded-full flex-shrink-0"
              aria-label="Delete todo"
            >
              <Icon icon="streamline-ultimate:bin-1" />
            </Button>
          </div>
        </div>

        <div v-if="todos.length === 0" class="p-6 md:p-8 text-center text-gray-500">
          <Icon icon="mdi:clipboard-text-outline" class="h-10 w-10 md:h-12 md:w-12 mx-auto mb-2" />
          <p class="text-sm md:text-base">No tasks yet. Add one above!</p>
        </div>
      </div>

      <!-- Footer Stats -->
      <div v-if="todos.length > 0" class="p-3 md:p-4 bg-gray-50 dark:bg-gray-700/50 text-xs md:text-sm text-gray-500 dark:text-gray-400">
        <div class="flex flex-col sm:flex-row justify-between items-center gap-2">
          <span>{{ todos.filter(t => !t.done).length }} items left</span>
          <span>{{ todos.filter(t => t.done).length }} completed</span>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <Modal :show="showModal" @close="cancelDelete">
      <template #title>Delete Todo</template>
      
      <p class="text-gray-600 dark:text-gray-300 text-sm md:text-base">
        Are you sure you want to delete this todo? This action cannot be undone.
      </p>

      <template #footer>
        <div class="flex flex-col sm:flex-row gap-3 w-full">
          <Button 
            @click="cancelDelete" 
            variant="secondary"
            class="w-full sm:w-auto"
          >
            Cancel
          </Button>
          <Button 
            @click="confirmDelete" 
            variant="danger"
            class="w-full sm:w-auto"
          >
            Confirm
          </Button>
        </div>
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