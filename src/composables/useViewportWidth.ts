import { onMounted, onUnmounted, ref } from 'vue';

export const useViewportWidth = (minWidth = '900px') => {
	const isDesktopViewport = ref(window.matchMedia(`(min-width: ${minWidth})`).matches);

	const updateViewport = () => {
		isDesktopViewport.value = window.matchMedia(`(min-width: ${minWidth})`).matches;
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
		isDesktopViewport,
	};
};
