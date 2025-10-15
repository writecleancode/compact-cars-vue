import { createWebHistory, createRouter, type RouteLocationNormalized, type RouteLocation } from 'vue-router';
import { basePath } from '@/utils/base-path';

import Dashboard from '@/views/Dashboard.vue';
import Details from '@/views/car/Details.vue';
import Edit from '@/views/car/Edit.vue';
import CarComparison from '@/views/CarComparison.vue';
import HiddenCars from '@/views/HiddenCars.vue';
import AddCar from '@/views/AddCar.vue';
import NotFound from '@/views/car/NotFound.vue';
import NetworkError from '@/views/NetworkError.vue';

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
	{ path: '/car-comparison', name: 'car-comparison', component: CarComparison },
	{ path: '/add-car', name: 'add-car', component: AddCar },
	{ path: '/hidden-cars', name: 'hidden-cars', component: HiddenCars },
	// { path: '/:pathPatch(.*)*', redirect: '/' },
	{ path: '/404/:resource', name: '404-resource', component: NotFound, props: true },
	{ path: '/:catchAll(.*)', name: 'not-found', component: NotFound },
	{ path: '/network-error', name: 'network-error', component: NetworkError },
];

export const router = createRouter({
	history: createWebHistory(basePath),
	routes,
});
