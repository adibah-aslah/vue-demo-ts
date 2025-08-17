# Vue 3 + Nuxt 3 + TypeScript Demo

A modern web application built with Vue 3, Nuxt 3, and TypeScript, featuring component testing with Vitest and Vue Test Utils.

## Features

- 🚀 Vue 3 with Composition API
- ⚡ Nuxt 3 for SSR and static site generation
- 🎨 Tailwind CSS for styling
- 🧪 Component testing with Vitest and Vue Test Utils
- 🎯 TypeScript support
- 🎨 Dark mode support
- 🔍 Icon integration with Iconify

## Prerequisites

- Node.js 18+ (LTS recommended)
- npm (included with Node.js)

## Project Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Testing

Run unit tests with [Vitest](https://vitest.dev/):

```bash
# Run tests in watch mode
npm run test:dev

# Run tests once
npm test

# Run tests with coverage
npm run test:coverage

# Run tests with UI
npm run test:ui
```

## Project Structure

```
app/
├── assets/          # Static assets
├── components/      # Reusable components
│   ├── __tests__/   # Component tests
│   └── books/       # Book-related components
├── layouts/         # Layout components
└── pages/           # Application pages

test/                # Test setup and utilities
```

## Tech Stack

- [Vue 3](https://vuejs.org/) - Progressive JavaScript Framework
- [Nuxt 3](https://nuxt.com/) - The Intuitive Web Framework
- [TypeScript](https://www.typescriptlang.org/) - Typed JavaScript
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Vitest](https://vitest.dev/) - Next generation testing framework
- [Vue Test Utils](https://test-utils.vuejs.org/) - Official testing utilities for Vue
- [Iconify](https://iconify.design/) - Universal icon framework

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
