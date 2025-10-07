import { createWebHistory, createRouter, type RouteLocationNormalized, type RouteLocation } from 'vue-router';
import { basePath } from '@/utils/base-path';

import Dashboard from '@/views/Dashboard.vue';
import Details from '@/views/car/Details.vue';
import Edit from '@/views/car/Edit.vue';
import Hide from '@/views/car/Hide.vue';
import CarComparison from '@/views/CarComparison.vue';
import AddCar from '@/views/AddCar.vue';

const routes = [
	{
		path: '/',
		name: 'dashboard',
		component: Dashboard,
		props: (route: RouteLocationNormalized) => ({
			page: parseInt(route.query.page as string) || 1,
			perPage: parseInt(route.query.limit as string) || 8,
		}),
	},
	{ path: '/cars/:id', name: 'car-details', component: Details, props: true },
	{ path: '/car/:afterCar(.*)', redirect: (to: RouteLocation) => ({ path: `/cars/${to.params.afterCar}` }) },
	{ path: '/cars/:id/edit', name: 'car-edit', component: Edit, props: true },
	{ path: '/cars/:id/hide', name: 'car-hide', component: Hide, props: true },
	{ path: '/car-comparison', name: 'car-comparison', component: CarComparison },
	{ path: '/add-car', name: 'add-car', component: AddCar },
	{ path: '/:pathPatch(.*)*', redirect: '/' },
];

export const router = createRouter({
	history: createWebHistory(basePath),
	routes,
});
