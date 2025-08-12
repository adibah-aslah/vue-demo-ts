<script setup lang="ts">
import { useRouter } from 'vue-router';
const router = useRouter();

function goToTodo() {
  router.push('/todo');
}
function goToTable() {
  router.push('/table');
}
</script>

<template>
  <div class="min-h-screen flex flex-col items-center justify-center text-center p-8">
    <h1 class="text-3xl font-bold mb-6">Welcome to my Vue Typescript Demo App</h1>
    <div class="flex gap-4">
      <Button variant="primary" @click="goToTodo">Todo page</Button>
      <!-- <Button variant="primary" @click="goToTable">Table page</Button> -->
    </div>
  </div>
</template>
