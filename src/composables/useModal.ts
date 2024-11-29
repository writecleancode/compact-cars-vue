import { nextTick, ref, watch } from 'vue';

export const useModal = () => {
	const isModalOpen = ref(false);
	const appRootElement = document.getElementById('app');
	const openModalBtn = ref<HTMLElement | null>(null);

	const openModal = () => (isModalOpen.value = true);
	const closeModal = () => (isModalOpen.value = false);

	const handleOpenModel = (e: MouseEvent & { target: HTMLElement }) => {
		openModalBtn.value = e.target;
		openModal();
	};

	const handleEscapeKey = (e: KeyboardEvent) => e.key === 'Escape' && closeModal();

	const handleModalAccessibility = () => {
		if (isModalOpen.value) {
			document.body.classList.add('prevent-scroll');
			document.addEventListener('keydown', handleEscapeKey);
			appRootElement?.setAttribute('inert', '');
			(async () => {
				await nextTick();
				document.getElementById('close-modal-btn')?.focus();
			})();
		} else {
			document.body.classList.remove('prevent-scroll');
			document.removeEventListener('keydown', handleEscapeKey);
			appRootElement?.removeAttribute('inert');
			openModalBtn.value?.focus();
			openModalBtn.value = null;
		}
	};

	watch(isModalOpen, () => {
		handleModalAccessibility();
	});

	return {
		isModalOpen,
		handleOpenModel,
		closeModal,
	};
};
