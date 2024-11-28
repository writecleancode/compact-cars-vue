import { ref, watch } from 'vue';

export const useModal = () => {
	const isModalOpen = ref(false);

	const openModal = () => (isModalOpen.value = true);
	const closeModal = () => (isModalOpen.value = false);

	const handleEscapeKey = (e: KeyboardEvent) => e.key === 'Escape' && closeModal();

	const handleModalAccessibility = () => {
		if (isModalOpen.value) {
			document.body.classList.add('prevent-scroll');
			document.addEventListener('keydown', handleEscapeKey);
		} else {
			document.body.classList.remove('prevent-scroll');
			document.removeEventListener('keydown', handleEscapeKey);
		}
	};

	watch(isModalOpen, () => {
		handleModalAccessibility();
	});

	return {
		isModalOpen,
		openModal,
		closeModal,
	};
};
