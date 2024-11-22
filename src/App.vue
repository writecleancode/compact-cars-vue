<script lang="ts">
import { cars as carsData } from '@/data/cars.ts';
import { filterBrands, filterYears } from '@/data/filters';
import { onMounted, ref, watch } from 'vue';
import debounce from 'lodash.debounce';
import Header from '@/components/atoms/Header/Header.vue';
import NavBar from '@/components/organisms/NavBar/NavBar.vue';
import FiltersManagement from '@/components/organisms/FiltersManagement/FiltersManagement.vue';
import Dashboard from '@/views/Dashboard/Dashboard.vue';
import SuccessNotification from '@/components/atoms/SuccessNotification/SuccessNotification.vue';

export default {
	setup() {
		let filteredCars = [];

		const getCarName = car => `${car.brand} ${car.model}`;
		const getCarProductionYear = car => car.productionStartYear;

		const isLoading = ref(true);
		const isNavActive = ref(false);
		const cars = ref(carsData);
		const carsToDisplay = ref([]);
		const comparedCars = ref([]);
		const filterYearsData = filterYears.map(option => ({ value: option, isActive: false }));
		const filterBrandsData = filterBrands.map(option => ({ value: option, isActive: false }));
		const usersFilterPreferences = ref({ brands: filterBrandsData, years: filterYearsData });
		const successNotifications = ref([]);
		const searchPhrase = ref('');
		const selectedSortValue = ref('');

		const closeMobileNav = () => (isNavActive.value = false);

		const handleMobileNav = () => (isNavActive.value = !isNavActive.value);

		const removeCar = clickedCarId => {
			const filteredCars = cars.value.filter(car => car.id !== clickedCarId);
			cars.value = filteredCars;
		};

		const removeCarFromComparison = clickedCarId => {
			const filteredCars = comparedCars.value.filter(car => car.id !== clickedCarId);
			comparedCars.value = filteredCars;
		};

		const handleCompareStatus = clickedCarId => {
			if (comparedCars.value.some(car => car.id === clickedCarId)) {
				removeCarFromComparison(clickedCarId);
			} else {
				const clickedCar = cars.value.find(car => car.id === clickedCarId);
				clickedCar && comparedCars.value.push(clickedCar);
			}
		};

		const handleRemoveCar = clickedCarId => {
			removeCar(clickedCarId);
			removeCarFromComparison(clickedCarId);
		};

		const findCars = inputValue => {
			const carsToCheck = cars.value === filteredCars ? cars.value : filteredCars;

			const matchingCars = inputValue
				? carsToCheck.filter(car => `${car.brand} ${car.model}`.toLowerCase().includes(inputValue.toLowerCase().trim()))
				: carsToCheck;

			return matchingCars;
		};

		const filterCars = () => {
			filteredCars = cars.value;

			if (usersFilterPreferences.value.brands.some(option => option.isActive)) {
				const filteredByBrand = [];
				const activeFilterClasses = usersFilterPreferences.value.brands.filter(option => option.isActive);

				cars.value.forEach(car => {
					activeFilterClasses.forEach(option => option.value === car.brand && filteredByBrand.push(car));
				});

				filteredCars = filteredByBrand;
			}

			if (usersFilterPreferences.value.years.some(option => option.isActive)) {
				usersFilterPreferences.value.years.forEach(option => {
					if (option.isActive) {
						filteredCars = filteredCars.filter(
							car => option.value >= car.productionStartYear && option.value <= car.productionEndYear && car
						);
					}
				});
			}

			return filteredCars;
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

		const handleDisplayCars = () => {
			let matchingCars;

			matchingCars = filterCars();
			matchingCars = findCars(searchPhrase.value);

			setCarsToDisplay(matchingCars);
		};

		const sortCars = (sortCriteria = 'byAlphabet') => {
			const sortedCars = cars.value.toSorted((carA, carB) => {
				if (sortCriteria.toLowerCase().includes('alphabet')) {
					carA = getCarName(carA);
					carB = getCarName(carB);
				} else if (sortCriteria.toLowerCase().includes('year')) {
					carA = getCarProductionYear(carA);
					carB = getCarProductionYear(carB);
				}

				if (sortCriteria.toLowerCase().includes('reverse')) {
					[carA, carB] = [carB, carA];
				}

				if (carA < carB) {
					return -1;
				} else if (carA > carB) {
					return 1;
				} else {
					return 0;
				}
			});

			cars.value = sortedCars;
		};

		const handleSelectedValueChange = e => {
			const selectedValue = e.target.value;
			selectedSortValue.value = selectedValue;
			sortCars(selectedValue);
		};

		const handleFilterPreferences = clickedOption => {
			const optionType = typeof clickedOption === 'number' ? 'years' : 'brands';
			const clickedOptionIndex = usersFilterPreferences.value[optionType].map(option => option.value).indexOf(clickedOption);

			usersFilterPreferences.value[optionType][clickedOptionIndex].isActive =
				!usersFilterPreferences.value[optionType][clickedOptionIndex].isActive;
		};

		onMounted(() => {
			handleDisplayCars();
			isLoading.value = false;
		});

		watch(isNavActive, () => {
			isNavActive.value ? document.body.classList.add('prevent-scroll') : document.body.classList.remove('prevent-scroll');
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
			isNavActive,
			cars,
			carsToDisplay,
			comparedCars,
			usersFilterPreferences,
			successNotifications,
			searchPhrase,
			selectedSortValue,
			closeMobileNav,
			handleMobileNav,
			handleCompareStatus,
			handleRemoveCar,
			handleSearchInputChange,
			handleSelectedValueChange,
			handleFilterPreferences,
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
		<Header v-bind:isNavActive v-bind:handleMobileNav />
		<NavBar v-bind:isNavActive v-bind:comparedCarsNumber="comparedCars.length" v-bind:closeMobileNav />
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
				v-bind:handleSelectedValueChange />
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
