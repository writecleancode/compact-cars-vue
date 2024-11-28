<script lang="ts">
import { useNavProvider } from '@/composables/useNav';
import { useNotificationsProvider, useNotificationsContext } from '@/composables/useNotifications';
import { useCars } from '@/composables/useCars';
import { onMounted, ref, watch } from 'vue';
import debounce from 'lodash.debounce';
import Header from '@/components/atoms/Header/Header.vue';
import NavBar from '@/components/organisms/NavBar/NavBar.vue';
import FiltersManagement from '@/components/organisms/FiltersManagement/FiltersManagement.vue';
import Dashboard from '@/views/Dashboard/Dashboard.vue';
import SuccessNotification from '@/components/atoms/SuccessNotification/SuccessNotification.vue';

export default {
	setup() {
		useNavProvider();
		const { successNotifications } = useNotificationsProvider();

		const {
			cars,
			carsToDisplay,
			comparedCars,
			usersFilterPreferences,
			handleCompareStatus,
			handleRemoveCar,
			findCars,
			filterCars,
			setCarsToDisplay,
			sortCars,
			handleFilterPreferences,
			addCar,
		} = useCars();
		const isLoading = ref(true);
		const searchPhrase = ref('');
		const selectedSortValue = ref('');

		const handleSearchCars = debounce(inputValue => {
			setCarsToDisplay(findCars(inputValue));
		}, 500);

		const handleDisplayCars = () => {
			let matchingCars;

			matchingCars = filterCars();
			matchingCars = findCars(searchPhrase.value);

			setCarsToDisplay(matchingCars);
		};

		const handleSelectedValueChange = e => {
			const selectedValue = e.target.value;
			selectedSortValue.value = selectedValue;
			sortCars(selectedValue);
		};

		const handleSearchInputChange = e => {
			const inputValue = e.target.value;
			searchPhrase.value = inputValue;
			handleSearchCars(inputValue);
		};

		onMounted(() => {
			handleDisplayCars();
			isLoading.value = false;
		});

		watch(
			usersFilterPreferences,
			() => {
				handleDisplayCars();
			},
			{ deep: true }
		);

		watch(cars, () => {
			handleDisplayCars();
		});

		return {
			isLoading,
			cars,
			carsToDisplay,
			comparedCars,
			usersFilterPreferences,
			successNotifications,
			searchPhrase,
			selectedSortValue,
			handleCompareStatus,
			handleRemoveCar,
			handleSearchInputChange,
			handleSelectedValueChange,
			handleFilterPreferences,
			addCar,
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
	<div class="app-wrapper">
		<Header />
		<NavBar v-bind:comparedCarsNumber="comparedCars.length" />
		<FiltersManagement v-bind:usersFilterPreferences v-bind:handleFilterPreferences />
		<main class="content-wrapper">
			<RouterView
				v-bind:isLoading
				v-bind:cars
				v-bind:carsToDisplay
				v-bind:comparedCars
				v-bind:searchPhrase
				v-bind:handleCompareStatus
				v-bind:handleRemoveCar
				v-bind:handleSearchInputChange
				v-bind:selectedSortValue
				v-bind:handleSelectedValueChange
				v-bind:addCar />
		</main>
		<template v-if="successNotifications.length > 0">
			<SuccessNotification v-for="successNotification in successNotifications" :key="successNotification">
				✔ Car added to the list
			</SuccessNotification>
		</template>
	</div>
</template>

<style lang="scss" scoped>
@media (min-width: 900px) {
	.app-wrapper {
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
	.app-wrapper {
		grid-template-columns: 300px 1fr auto;
	}

	.content-wrapper {
		grid-column: 2 / 3;
	}
}

@media (min-width: 1400px) {
	.app-wrapper {
		grid-template-columns: 320px 1fr auto;
	}
}

@media (min-width: 1600px) {
	.app-wrapper {
		grid-template-columns: 320px 1fr 320px;
	}
}
</style>
