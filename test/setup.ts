import { config } from '@vue/test-utils';
import { vi } from 'vitest';

// Mock global components and plugins
const mockComponents = {
    'NuxtLink': {
        template: '<a><slot></slot></a>',
        props: ['to']
    },
    'ClientOnly': {
        template: '<div><slot /></div>'
    }
};

// Configure Vue Test Utils for Nuxt
config.global = {
    ...config.global,
    stubs: {
        ...mockComponents,
    },
    mocks: {
        $route: {
            path: '/',
            query: {},
            params: {}
        },
        $router: {
            push: vi.fn(),
            replace: vi.fn(),
            go: vi.fn(),
            back: vi.fn(),
            forward: vi.fn()
        }
    }
};

// Mock browser APIs
const localStorageMock = (() => {
    let store: Record<string, string> = {};
    return {
        getItem: vi.fn((key: string) => store[key] || null),
        setItem: vi.fn((key: string, value: string) => {
            store[key] = value.toString();
        }),
        removeItem: vi.fn((key: string) => {
            delete store[key];
        }),
        clear: vi.fn(() => {
            store = {};
        }),
    };
})();

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
    })),
});

// Mock localStorage
Object.defineProperty(window, 'localStorage', {
    value: localStorageMock,
    configurable: true,
});
