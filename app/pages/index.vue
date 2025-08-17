<template>
  <div class="container mx-auto px-4 py-12">
    <div class="max-w-3xl mx-auto text-center">
      <h1 class="text-4xl font-bold mb-8 text-gray-900 dark:text-white">
        Welcome to my Vue Typescript Demo App
      </h1>
      
      <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
        <AppCard
          to="/todo"
          title="Todo App"
          description="Manage your tasks and stay organized"
          icon="📝"
          link-text="Open Todo App"
        />

        <AppCard
          to="/books"
          title="Books Collection"
          description="Browse and manage your book collection"
          icon="📚"
          link-text="View Books"
        />
      </div>
    </div>
  </div>
</template>