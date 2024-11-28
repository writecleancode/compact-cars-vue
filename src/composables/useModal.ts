import { ref, watch } from 'vue';

export const useModal = () => {
	const isModalOpen = ref(false);

	const openModal = () => (isModalOpen.value = true);
	const closeModal = () => (isModalOpen.value = false);

	watch(isModalOpen, () => {
		isModalOpen.value ? document.body.classList.add('prevent-scroll') : document.body.classList.remove('prevent-scroll');
	});

	return {
		isModalOpen,
		openModal,
		closeModal,
	};
};
