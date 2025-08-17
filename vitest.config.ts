/// <reference types="vitest" />
import { defineVitestConfig } from '@nuxt/test-utils/config';

export default defineVitestConfig({
    test: {
        globals: true,
        environment: 'nuxt',
        setupFiles: ['./test/setup.ts'],
        coverage: {
            provider: 'v8',
            reporter: ['text', 'json', 'html'],
            include: ['app/**/*.{ts,vue}'],
            exclude: [
                '**/node_modules/**',
                '**/.nuxt/**',
                '**/.output/**',
                '**/dist/**',
            ],
        },
    },
});
