<script lang="ts">
import { cars as carsData } from '@/data/cars.ts';
import Header from '@/components/atoms/Header/Header.vue';
import NavBar from '@/components/organisms/NavBar/NavBar.vue';
import FiltersManagement from '@/components/organisms/FiltersManagement/FiltersManagement.vue';
import Dashboard from '@/views/Dashboard/Dashboard.vue';
import SuccessNotification from '@/components/atoms/SuccessNotification/SuccessNotification.vue';
import { ref } from 'vue';

export default {
	data() {
		const isNavActive = ref(true);
		const cars = ref(carsData);
		const comparedCars = ref([]);
		const successNotifications = ref([]);

		const closeMobileNav = () => (isNavActive.value = false);

		const handleMobileNav = () => (isNavActive.value = !isNavActive.value);

		return {
			isNavActive,
			cars,
			comparedCars,
			successNotifications,
			closeMobileNav,
			handleMobileNav,
		};
	},

	components: {
		Header,
		NavBar,
		FiltersManagement,
		Dashboard,
		SuccessNotification,
	},
};
</script>

<template>
	<div class="wrapper">
		<Header v-bind:isNavActive v-bind:closeMobileNav />
		<NavBar v-bind:isNavActive v-bind:comparedCarsNumber="comparedCars.length" v-bind:closeMobileNav />
		<FiltersManagement />
		<div class="content-wrapper">
			<Dashboard v-bind:cars v-bind:comparedCars />
		</div>
		<SuccessNotification
			v-if="successNotifications.length > 0"
			v-for="successNotification in successNotifications"
			:key="successNotification">
			✔ Car added to the list
		</SuccessNotification>
	</div>
</template>

<style scoped>
@media (min-width: 900px) {
	.wrapper {
		display: grid;
		grid-template-columns: 1fr auto;
		grid-template-rows: auto 1fr;
		height: 100vh;
		height: 100svh;
		overflow: clip;
	}

	.content-wrapper {
		grid-column: 1 / 2;
		grid-row: 2 / 3;
		overflow-x: auto;
	}
}

@media (min-width: 1200px) {
	.wrapper {
		grid-template-columns: 300px 1fr auto;
	}

	.content-wrapper {
		grid-column: 2 / 3;
	}
}

@media (min-width: 1400px) {
	.wrapper {
		grid-template-columns: 320px 1fr auto;
	}
}

@media (min-width: 1600px) {
	.wrapper {
		grid-template-columns: 320px 1fr 320px;
	}
}
</style>
