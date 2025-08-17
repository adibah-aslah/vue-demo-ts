import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import Input from '../Input.vue';
import { Icon } from '@iconify/vue';

describe('Input.vue', () => {
    const createWrapper = (props = {}) => {
        return mount(Input, {
            props: {
                modelValue: '',
                label: 'Test Input',
                ...props,
            },
            global: {
                components: {
                    Icon,
                },
            },
        });
    };

    it('renders label', () => {
        const wrapper = createWrapper();
        expect(wrapper.text()).toContain('Test Input');
    });

    it('emits update:modelValue on input', async () => {
        const wrapper = createWrapper();
        const input = wrapper.find('input');
        await input.setValue('test');
        expect(wrapper.emitted('update:modelValue')).toBeTruthy();
        expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['test']);
    });

    it('shows error message when error prop is provided', () => {
        const wrapper = createWrapper({ error: 'This field is required' });
        expect(wrapper.text()).toContain('This field is required');
    });

    it('shows icon when icon prop is provided', () => {
        const wrapper = createWrapper({ icon: 'mdi:search' });
        expect(wrapper.findComponent(Icon).exists()).toBe(true);
    });

    it('shows clear button when clearable and has value', () => {
        const wrapper = createWrapper({
            clearable: true,
            modelValue: 'test',
            icon: 'mdi:search'
        });
        expect(wrapper.find('button').exists()).toBe(true);
        expect(wrapper.find('button svg').exists()).toBe(true);
    });

    it('clears input when clear button is clicked', async () => {
        const wrapper = createWrapper({
            clearable: true,
            modelValue: 'test',
            icon: 'mdi:search'
        });
        await wrapper.find('button').trigger('click');
        expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['']);
    });

    it('positions icon on left by default', () => {
        const wrapper = createWrapper({ icon: 'mdi:search' });
        const icon = wrapper.findComponent(Icon);
        expect(icon.classes()).toContain('left-3');
    });

    it('positions icon on right when iconPosition is right', () => {
        const wrapper = createWrapper({
            icon: 'mdi:search',
            iconPosition: 'right'
        });
        const icon = wrapper.findComponent(Icon);
        expect(icon.classes()).toContain('right-3');
    });
});
