import type { PxString } from '@/types/types';

import { onMounted, onUnmounted, ref } from 'vue';

export const useViewportWidth = (minWidth: PxString = '900px') => {
	const matchesQuery = ref(window.matchMedia(`(min-width: ${minWidth})`).matches);

	const updateViewport = () => {
		matchesQuery.value = window.matchMedia(`(min-width: ${minWidth})`).matches;
	};

	onMounted(() => {
		const mediaQuery = window.matchMedia(`(min-width: ${minWidth})`);
		mediaQuery.addEventListener('change', updateViewport);
	});

	onUnmounted(() => {
		const mediaQuery = window.matchMedia(`(min-width: ${minWidth})`);
		mediaQuery.removeEventListener('change', updateViewport);
	});

	return {
		matchesQuery,
	};
};
