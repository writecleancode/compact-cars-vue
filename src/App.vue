<script>
import { cars as carsData } from '/src/data/cars.ts';

export default {
	setup() {
		const cars = carsData;

		return { cars };
	},
};
</script>

<template>
	<h1>Segment C Hatchback cars <span>(late 1990's, early 2000's)</span></h1>
	<div>
		<div v-for="car in cars" :key="car.brand">{{ car.brand }} {{ car.model }}</div>
	</div>
</template>
