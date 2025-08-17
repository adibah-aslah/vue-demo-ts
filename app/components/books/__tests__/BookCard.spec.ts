import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import BookCard from '../BookCard.vue';

describe('BookCard.vue', () => {
    const book = {
        title: 'Test Book',
        author: 'Author 1, Author 2',
        year: 2023,
        thumbnail: 'http://example.com/test.jpg',
    };

    const createWrapper = (props = {}) => {
        return mount(BookCard, {
            props: {
                ...book,
                ...props,
            },
        });
    };

    it('displays book title', () => {
        const wrapper = createWrapper();
        expect(wrapper.find('h3').text()).toBe(book.title);
    });

    it('displays book authors', () => {
        const wrapper = createWrapper();
        expect(wrapper.find('p:nth-of-type(1)').text()).toContain(book.author);
    });

    it('displays book published year', () => {
        const wrapper = createWrapper();
        expect(wrapper.find('p:nth-of-type(2)').text()).toContain(book.year.toString());
    });

    it('displays default image when no thumbnail is provided', () => {
        const wrapper = createWrapper({ thumbnail: null });
        expect(wrapper.find('.text-gray-500').text()).toContain('No Image');
    });

    it('emits open event when clicked', async () => {
        const wrapper = createWrapper();
        await wrapper.trigger('click');
        expect(wrapper.emitted('open')).toBeTruthy();
    });

    it('applies selected class when selected prop is true', () => {
        const wrapper = createWrapper({ selected: true });
        expect(wrapper.classes()).toContain('border-blue-500');
        expect(wrapper.classes()).toContain('dark:border-blue-500');
    });
});
