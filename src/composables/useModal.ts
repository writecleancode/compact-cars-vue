import type { PxString } from '@/types/types';

import { nextTick, ref, watch } from 'vue';
import { useViewportWidth } from './useViewportWidth';

export const useModal = (maxViewport: PxString = '1200px') => {
	const isModalOpen = ref(false);
	const appRootElement = document.getElementById('app');
	const openModalBtn = ref<HTMLButtonElement | null>(null);
	const { matchesQuery } = useViewportWidth(maxViewport);

	const openModal = () => (isModalOpen.value = true);
	const closeModal = () => (isModalOpen.value = false);

	const handleOpenModel = (e: MouseEvent) => {
		openModalBtn.value = e.target as HTMLButtonElement;
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

	watch(matchesQuery, () => {
		matchesQuery && closeModal();
	});

	return {
		isModalOpen,
		handleOpenModel,
		closeModal,
	};
};
