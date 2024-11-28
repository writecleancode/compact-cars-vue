import { ref, watch } from 'vue';

export const useModal = () => {
	const isModalOpen = ref(false);

	const openModal = () => (isModalOpen.value = true);
	const closeModal = () => (isModalOpen.value = false);

	watch(isModalOpen, () => {
		isModalOpen.value ? document.body.classList.add('preventScroll') : document.body.classList.remove('preventScroll');
	});

	return {
		isModalOpen,
		openModal,
		closeModal,
	};
};
