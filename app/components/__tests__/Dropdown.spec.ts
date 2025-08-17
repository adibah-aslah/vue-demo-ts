import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import Dropdown from '../Dropdown.vue';

describe('Dropdown.vue', () => {
    const options = [
        { label: 'Option 1', value: '1' },
        { label: 'Option 2', value: '2' },
        { label: 'Option 3', value: '3' },
    ];

    const createWrapper = (props = {}) => {
        return mount(Dropdown, {
            props: {
                options,
                label: 'Select an option',
                modelValue: [],
                ...props,
            },
        });
    };

    it('renders label when no value is selected', () => {
        const wrapper = createWrapper();
        expect(wrapper.text()).toContain('Select an option');
    });

    it('shows selected options', () => {
        const wrapper = createWrapper({ modelValue: ['1'] });
        expect(wrapper.text()).toContain('Option 1');
    });

    it('emits update:modelValue when an option is selected', async () => {
        const wrapper = createWrapper();
        await wrapper.find('.cursor-pointer').trigger('click');

        const options = await wrapper.findAll('.cursor-pointer');
        expect(options).toHaveLength(4);

        const firstOption = options[1]!;
        expect(firstOption).toBeDefined();

        await firstOption.trigger('click');

        expect(wrapper.emitted('update:modelValue')).toBeTruthy();
        expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([['1']]);
    });

    it('allows multiple selection when modelValue is an array', async () => {
        const wrapper = createWrapper({ modelValue: ['1'] });
        await wrapper.find('.cursor-pointer').trigger('click');

        const options = await wrapper.findAll('.cursor-pointer');
        expect(options).toHaveLength(4);

        const secondOption = options[2]!;
        expect(secondOption).toBeTruthy();
        await secondOption.trigger('click');

        expect(wrapper.emitted('update:modelValue')).toBeTruthy();
        expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([['1', '2']]);
    });

    it('clears selection when clear button is clicked', async () => {
        const wrapper = createWrapper({
            modelValue: ['1'],
            clearable: true
        });
        await wrapper.find('button[aria-label="Clear selection"]').trigger('click');
        expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([[]]);
    });

    it('shows "+X more" when more than 2 options are selected', async () => {
        const wrapper = createWrapper({
            modelValue: ['1', '2', '3']
        });
        expect(wrapper.text()).toContain('+1 more');
    });
});
