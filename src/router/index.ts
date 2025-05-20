import { createWebHistory, createRouter, type RouteLocationNormalized } from 'vue-router';
import { basePath } from '@/utils/base-path';

import AddCar from '@/views/AddCar.vue';
import CarComparison from '@/views/CarComparison.vue';
import Dashboard from '@/views/Dashboard.vue';

const routes = [
	{ path: '/', name: 'dashboard', component: Dashboard, props: (route: RouteLocationNormalized) => ({ page: parseInt(route.query.page as string) || 1, perPage: parseInt(route.query.limit as string) | 8}) },
	{ path: '/car-comparison', name: 'car-comparison', component: CarComparison },
	{ path: '/add-car', name: 'add-car', component: AddCar },
	{ path: '/:pathPatch(.*)*', redirect: '/' },
];

export const router = createRouter({
	history: createWebHistory(basePath),
	routes,
});
