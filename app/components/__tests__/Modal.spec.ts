import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import Modal from '../Modal.vue';

describe('Modal.vue', () => {
    const createWrapper = (props = {}, slots = {}) => {
        return mount(Modal, {
            props: {
                show: true,
                ...props,
            },
            slots: {
                default: '<p>Modal content</p>',
                title: 'Test Title',
                ...slots,
            },
        });
    };

    it('is not visible when show is false', () => {
        const wrapper = createWrapper({ show: false });
        expect(wrapper.find('.fixed').exists()).toBe(false);
    });

    it('is visible when show is true', () => {
        const wrapper = createWrapper({ show: true });
        expect(wrapper.find('.fixed').exists()).toBe(true);
    });

    it('displays the title when provided in slot', () => {
        const wrapper = createWrapper({}, { title: 'Test Title' });
        expect(wrapper.text()).toContain('Test Title');
    });

    it('emits close event when close button is clicked', async () => {
        const wrapper = createWrapper();
        const closeButton = wrapper.find('button[aria-label="Close modal"]');
        await closeButton.trigger('click');
        expect(wrapper.emitted('close')).toBeTruthy();
    });

    it('closes when clicking outside the modal', async () => {
        const wrapper = createWrapper();
        const overlay = wrapper.find('.fixed');
        await overlay.trigger('click');
        expect(wrapper.emitted('close')).toBeTruthy();
    });

    it('does not close when clicking inside the modal content', async () => {
        const wrapper = createWrapper();
        const modalContent = wrapper.find('.bg-white');
        await modalContent.trigger('click');
        expect(wrapper.emitted('close')).toBeFalsy();
    });

    it('renders default slot content', () => {
        const wrapper = createWrapper({}, { default: '<div class="test-content">Test Content</div>' });
        expect(wrapper.find('.test-content').exists()).toBe(true);
        expect(wrapper.find('.test-content').text()).toBe('Test Content');
    });

    it('renders footer slot when provided', () => {
        const wrapper = createWrapper(
            {},
            { footer: '<button class="test-button">Save</button>' }
        );
        expect(wrapper.find('.test-button').exists()).toBe(true);
        expect(wrapper.find('.test-button').text()).toBe('Save');
    });
});
