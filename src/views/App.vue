<script lang="ts">
import { cars as carsData } from '@/data/cars.ts';
import { ref } from 'vue';
import debounce from 'lodash.debounce';
import Header from '@/components/atoms/Header/Header.vue';
import NavBar from '@/components/organisms/NavBar/NavBar.vue';
import FiltersManagement from '@/components/organisms/FiltersManagement/FiltersManagement.vue';
import Dashboard from '@/views/Dashboard/Dashboard.vue';
import SuccessNotification from '@/components/atoms/SuccessNotification/SuccessNotification.vue';

export default {
	data() {
		let filteredCars = [];

		const isNavActive = ref(false);
		const cars = ref(carsData);
		// const carsToDisplay = ref([]);
		const carsToDisplay = ref(carsData);
		const comparedCars = ref([]);
		const successNotifications = ref([1]);
		const searchPhrase = ref('');

		const closeMobileNav = () => (isNavActive.value = false);

		const handleMobileNav = () => (isNavActive.value = !isNavActive.value);

		const findCars = inputValue => {
			// const carsToCheck = cars.value === filteredCars ? cars.value : filteredCars;
			const carsToCheck = cars.value;

			const matchingCars = inputValue
				? carsToCheck.filter(car => `${car.brand} ${car.model}`.toLowerCase().includes(inputValue.toLowerCase()))
				: carsToCheck;

			return matchingCars;
		};

		const setCarsToDisplay = cars => {
			carsToDisplay.value = cars;
		};

		const handleSearchCars = debounce(inputValue => {
			setCarsToDisplay(findCars(inputValue));
		}, 500);

		const handleSearchInputChange = e => {
			const inputValue = e.target.value;
			searchPhrase.value = inputValue;
			handleSearchCars(inputValue);
		};

		return {
			isNavActive,
			cars,
			carsToDisplay,
			comparedCars,
			successNotifications,
			searchPhrase,
			closeMobileNav,
			handleMobileNav,
			handleSearchInputChange,
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
			<Dashboard v-bind:cars v-bind:carsToDisplay v-bind:comparedCars v-bind:searchPhrase v-bind:handleSearchInputChange />
		</div>
		<template v-if="successNotifications.length > 0">
			<SuccessNotification v-for="successNotification in successNotifications" :key="successNotification">
				✔ Car added to the list
			</SuccessNotification>
		</template>
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
