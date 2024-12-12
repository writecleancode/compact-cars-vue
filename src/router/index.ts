import { createWebHistory, createRouter } from 'vue-router';

import AddCar from '@/views/AddCar.vue';
import CarComparison from '@/views/CarComparison.vue';
import Dashboard from '@/views/Dashboard.vue';

const basePath = import.meta.env.VITE_BASE_PATH;

const routes = [
	{ path: '/', component: Dashboard },
	{ path: '/car-comparison', component: CarComparison },
	{ path: '/add-car', component: AddCar },
];

export const router = createRouter({
	history: createWebHistory(basePath),
	routes,
});
