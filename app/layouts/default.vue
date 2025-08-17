<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const isDark = ref(false);

const isHomePage = computed(() => route.path === '/');

function toggleTheme() {
  isDark.value = !isDark.value;
  updateTheme();
}

function updateTheme() {
  if (isDark.value) {
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  } else {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  }
}

// Check for saved theme preference or use system preference
onMounted(() => {
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedTheme) {
    isDark.value = savedTheme === 'dark';
  } else {
    isDark.value = systemPrefersDark;
  }
  
  updateTheme();
  
  // Watch for system theme changes
  const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  const handleChange = (e: MediaQueryListEvent) => {
    if (!localStorage.getItem('theme')) {
      isDark.value = e.matches;
      updateTheme();
    }
  };
  
  darkModeMediaQuery.addEventListener('change', handleChange);
  
  return () => {
    darkModeMediaQuery.removeEventListener('change', handleChange);
  };
});

const pageTitle = computed(() => {
  const path = route.path
  const titles: Record<string, string> = {
    '/': 'Vue Typescript Demo App',
    '/todo': 'Todo App',
    '/books': 'Books Collection'
  }
  return titles[path] || 'Vue Typescript Demo App'
})

</script>

<template>
  <div class="grid h-screen grid-rows-[auto_1fr_auto] bg-gray-50 dark:bg-gray-900">
    <!-- Header -->
    <header class="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 sticky top-0 z-30 shadow-sm">
      <div class="container mx-auto px-4 py-4">
        <div class="flex justify-between items-center">
          <div class="flex items-center gap-4">
            <NuxtLink 
              v-if="!isHomePage" 
              to="/" 
              class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
              aria-label="Go back to home"
            >
              <Icon icon="ep:back" class="text-2xl"/>
            </NuxtLink>
            <h1 class="text-xl font-bold">{{ pageTitle }}</h1>
          </div>
          <button 
            @click="toggleTheme" 
            class="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
          >
            {{ isDark ? '☀️' : '🌙' }}
          </button>
        </div>
      </div>
    </header>

    <!-- Main -->
    <main class="overflow-y-auto">
      <div class="container mx-auto px-4">
        <slot />
      </div>
    </main>

    <!-- Footer -->
    <footer class="bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
      <div class="container mx-auto px-4 py-6 text-center text-sm text-gray-500 dark:text-gray-400">
        {{ new Date().getFullYear() }} Vue ts demo app. All rights reserved.
      </div>
    </footer>
  </div>
</template>