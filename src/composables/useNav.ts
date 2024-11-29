import { createProvider } from '@/utils/createProvider';
import { useViewportWidth } from './useViewportWidth';
import { ref, watch } from 'vue';

export const useNav = () => {
	const initialNavState = false;
	const { isDesktopViewport } = useViewportWidth('900px');

	const isNavActive = ref(initialNavState);

	const handleMobileNav = () => (isNavActive.value = !isNavActive.value);

	const closeMobileNav = () => (isNavActive.value = false);

	const handleNavAccessibility = () => {
		const mainElement = document.getElementById('main');

		if (isNavActive.value) {
			document.body.classList.add('prevent-scroll');
			mainElement?.setAttribute('inert', '');
		} else {
			document.body.classList.remove('prevent-scroll');
			mainElement?.removeAttribute('inert');
		}
	};

	watch(isNavActive, () => {
		handleNavAccessibility();
	});

	watch(isDesktopViewport, () => {
		isDesktopViewport && closeMobileNav();
	});

	return {
		isNavActive,
		handleMobileNav,
		closeMobileNav,
	};
};

export const [useNavProvider, useNavContext] = createProvider('Nav', useNav);
