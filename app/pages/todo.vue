<script setup lang="ts">
import { ref } from 'vue';

interface Todo {
  text: string;
  done: boolean;
}

const todos = ref<Todo[]>([]);
const newTodo = ref('');

const showModal = ref(false);
const todoIndexToDelete = ref<number | null>(null);

function addTodo() {
  if (newTodo.value.trim()) {
    todos.value.push({ text: newTodo.value.trim(), done: false });
    newTodo.value = '';
  }
}

function askToDelete(index: number) {
  todoIndexToDelete.value = index;
  showModal.value = true;
}

function confirmDelete() {
  if (todoIndexToDelete.value !== null) {
    removeTodo(todoIndexToDelete.value);
    todoIndexToDelete.value = null;
    showModal.value = false;
  }
}

function cancelDelete() {
  todoIndexToDelete.value = null;
  showModal.value = false;
}

function removeTodo(index: number) {
  todos.value.splice(index, 1);
}
</script>

<template>
  <div class="min-h-screen flex flex-col items-center justify-center p-8">
    <div class="w-full max-w-md bg-white rounded-lg shadow-lg p-6 space-y-6">
      <h1 class="text-3xl font-bold text-center">To Do List</h1>

      <div class="flex gap-2">
        <input
          v-model="newTodo"
          @keyup.enter="addTodo"
          placeholder="Add a new todo"
          class="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Button variant="primary" @click="addTodo" class="whitespace-nowrap">Add</Button>
      </div>

      <ul class="space-y-2">
        <li 
          v-for="(todo, index) in todos" 
          :key="index"
          class="flex items-center gap-3 p-3 bg-gray-50 rounded-md hover:bg-gray-100"
        >
          <input 
            type="checkbox" 
            v-model="todo.done" 
            class="h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
          />
          <span 
            class="flex-1 text-left"
            :class="{ 'line-through text-gray-500': todo.done }"
          >
            {{ todo.text }}
          </span>
          <Button 
            variant="danger" 
            @click="() => askToDelete(index)" 
            class="px-2 py-1 text-sm"
          >
            X
          </Button>
        </li>
      </ul>
    </div>
    <Modal :show="showModal" @close="cancelDelete" @confirm="confirmDelete">
      <template #title>Delete Todo</template>
      <p>Are you sure you want to delete this todo?</p>
    </Modal>
  </div>
</template>
