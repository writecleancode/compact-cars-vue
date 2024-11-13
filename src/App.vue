<script>
import { cars as carsData } from '/src/data/cars.ts';
import Header from '/src/components/atoms/Header/Header.vue';

export default {
	setup() {
		const cars = carsData;

		return { cars };
	},
	components: {
		Header,
	},
};
</script>

<template>
	<Header />
	<div>
		<div v-for="car in cars" :key="car.brand">{{ car.brand }} {{ car.model }}</div>
	</div>
</template>
