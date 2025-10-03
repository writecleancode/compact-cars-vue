import { createWebHistory, createRouter, type RouteLocationNormalized } from 'vue-router';
import { basePath } from '@/utils/base-path';

import Dashboard from '@/views/Dashboard.vue';
import Details from '@/views/car/Details.vue';
import Edit from '@/views/car/Edit.vue';
import Delete from '@/views/car/Delete.vue';
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
	{ path: '/cars/:id/edit', name: 'car-edit', component: Edit, props: true },
	{ path: '/cars/:id/delete', name: 'car-delete', component: Delete, props: true },
	{ path: '/car-comparison', name: 'car-comparison', component: CarComparison },
	{ path: '/add-car', name: 'add-car', component: AddCar },
	{ path: '/:pathPatch(.*)*', redirect: '/' },
];

export const router = createRouter({
	history: createWebHistory(basePath),
	routes,
});
