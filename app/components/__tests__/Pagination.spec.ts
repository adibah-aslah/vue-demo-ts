import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import Pagination from '../Pagination.vue';

describe('Pagination.vue', () => {
    const createWrapper = (props = {}) => {
        return mount(Pagination, {
            props: {
                page: 1,
                pageSize: 10,
                total: 50,
                ...props,
            },
        });
    };

    it('renders page info correctly', () => {
        const wrapper = createWrapper();
        expect(wrapper.text()).toContain('Page 1 / 5');
    });

    it('disables prev button on first page', () => {
        const wrapper = createWrapper({ page: 1 });
        const prevButton = wrapper.findAll('button').at(0);
        expect(prevButton?.attributes('disabled')).toBeDefined();
    });

    it('disables next button on last page', () => {
        const wrapper = createWrapper({ page: 5, total: 50 });
        const nextButton = wrapper.findAll('button').at(1);
        expect(nextButton?.attributes('disabled')).toBeDefined();
    });

    it('emits update:page with next page when next button is clicked', async () => {
        const wrapper = createWrapper({ page: 1 });
        const nextButton = wrapper.findAll('button').at(1);
        await nextButton?.trigger('click');
        expect(wrapper.emitted('update:page')).toBeTruthy();
        expect(wrapper.emitted('update:page')?.[0]).toEqual([2]);
    });

    it('emits update:page with previous page when prev button is clicked', async () => {
        const wrapper = createWrapper({ page: 2 });
        const prevButton = wrapper.findAll('button').at(0);
        await prevButton?.trigger('click');
        expect(wrapper.emitted('update:page')).toBeTruthy();
        expect(wrapper.emitted('update:page')?.[0]).toEqual([1]);
    });

    it('updates total pages when total or pageSize changes', async () => {
        const wrapper = createWrapper({ total: 100 });
        expect(wrapper.text()).toContain('Page 1 / 10');

        await wrapper.setProps({ pageSize: 20 });
        expect(wrapper.text()).toContain('Page 1 / 5');

        await wrapper.setProps({ total: 200 });
        expect(wrapper.text()).toContain('Page 1 / 10');
    });
});
