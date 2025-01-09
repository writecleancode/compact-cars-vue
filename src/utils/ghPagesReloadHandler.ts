import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { basePath } from './base-path';

export const handlePageReload = () => {
	const router = useRouter();

	onMounted(() => {
		const path = localStorage.getItem('path');
		if (path) {
			localStorage.removeItem('path');
			router.push(path.slice(basePath.length));
		}
	});
};

// fix created thanks to this tutorial:
// https://medium.com/swlh/how-to-host-your-angular-reactjs-vuejs-spa-on-github-pages-2d9ab102ac7b
