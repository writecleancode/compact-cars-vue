import { createWebHistory, createRouter } from 'vue-router';
import { basePath } from '@/utils/base-path';

import AddCar from '@/views/AddCar.vue';
import CarComparison from '@/views/CarComparison.vue';
import Dashboard from '@/views/Dashboard.vue';

const routes = [
	{ path: '/', component: Dashboard },
	{ path: '/car-comparison', component: CarComparison },
	{ path: '/add-car', component: AddCar },
	{ path: '/:pathPatch(.*)*', redirect: '/' },
];

export const router = createRouter({
	history: createWebHistory(basePath),
	routes,
});
