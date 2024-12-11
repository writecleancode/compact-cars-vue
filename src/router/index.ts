import { createWebHistory, createRouter } from 'vue-router';

import AddCar from '@/views/AddCar/AddCar.vue';
import CarComparison from '@/views/CarComparison/CarComparison.vue';
import Dashboard from '@/views/Dashboard/Dashboard.vue';

const routes = [
	{ path: '/', component: Dashboard },
	{ path: '/car-comparison', component: CarComparison },
	{ path: '/add-car', component: AddCar },
];

export const router = createRouter({
	history: createWebHistory('/compact-cars-vue/'),
	routes,
});
