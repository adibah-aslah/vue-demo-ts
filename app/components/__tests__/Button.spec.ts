import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import Button from '../Button.vue';

describe('Button.vue', () => {
    const createWrapper = (props = {}) => {
        return mount(Button, {
            props: {
                variant: 'primary',
                ...props,
            },
            slots: {
                default: 'Click me',
            },
        });
    };

    it('renders button text', () => {
        const wrapper = createWrapper();
        expect(wrapper.text()).toContain('Click me');
    });

    it('applies primary variant by default', () => {
        const wrapper = createWrapper();
        expect(wrapper.classes()).toContain('bg-primary-light');
        expect(wrapper.classes()).toContain('dark:bg-primary-dark');
        expect(wrapper.classes()).toContain('text-white');
    });

    it('applies secondary variant styles', () => {
        const wrapper = createWrapper({ variant: 'secondary' });
        expect(wrapper.classes()).toContain('bg-gray-300');
        expect(wrapper.classes()).toContain('text-gray-900');
        expect(wrapper.classes()).toContain('hover:bg-gray-400');
    });

    it('emits click event when clicked', async () => {
        const wrapper = createWrapper();
        await wrapper.trigger('click');
        expect(wrapper.emitted('click')).toBeTruthy();
    });

    it('disables button when disabled prop is true', () => {
        const wrapper = createWrapper({ disabled: true });
        expect(wrapper.attributes('disabled')).toBeDefined();
    });
});
