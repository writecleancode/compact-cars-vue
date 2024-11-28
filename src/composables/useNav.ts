import { createProvider } from '@/utils/createProvider';
import { ref, watch } from 'vue';

export const useNav = () => {
	const initialNavState = false;

	const isNavActive = ref(initialNavState);

	const handleMobileNav = () => (isNavActive.value = !isNavActive.value);

	const closeMobileNav = () => (isNavActive.value = false);

	watch(isNavActive, () => {
		isNavActive.value ? document.body.classList.add('prevent-scroll') : document.body.classList.remove('prevent-scroll');
	});

	return {
		isNavActive,
		handleMobileNav,
		closeMobileNav,
	};
};

const [useNavProvider, useNavContext] = createProvider('Nav', useNav);

export { useNavProvider, useNavContext };
