<script setup lang="ts">
import SearchInput from '@/components/molecules/SearchInput.vue';
import SortSelect from '@/components/molecules/SortSelect.vue';
import LoadingAnimation from '@/components/atoms/LoadingAnimation.vue';
import CarCard from '@/components/molecules/CarCard.vue';
import Modal from '@/components/organisms/Modal.vue';
import FilterBoxYears from '@/components/molecules/FilterBoxYears.vue';
import FilterBoxBrands from '@/components/molecules/FilterBoxBrands.vue';

import type { SelectOptionType } from '@/types/types';
import { useCarsContext } from '@/providers/useCars';
import { useModal } from '@/composables/useModal';
import { onMounted, ref, watch } from 'vue';
import debounce from 'lodash.debounce';
import axios from 'axios';

const { cars, carsToDisplay, comparedCars, usersFilterPreferences, findCars, filterCars, setCarsToDisplay, sortCars } = useCarsContext();
const { isModalOpen, handleOpenModel, closeModal } = useModal();
const isLoading = ref(true);
const searchPhrase = ref('');
const selectOptions = ref<SelectOptionType[]>([])
const selectedSortValue = ref('');

const handleDisplayCars = () => {
	let matchingCars;

	matchingCars = filterCars();
	matchingCars = findCars(searchPhrase.value);

	setCarsToDisplay(matchingCars);
};

const handleSearchCars = debounce((inputValue: string) => {
	setCarsToDisplay(findCars(inputValue));
}, 500);

const handleSearchInputChange = (e: InputEvent & { target: HTMLInputElement }) => {
	const inputValue = e.target.value;
	searchPhrase.value = inputValue;
	handleSearchCars(inputValue);
};

const handleSelectedValueChange = (e: Event & { target: HTMLSelectElement }) => {
	const selectedValue = e.target.value;
	selectedSortValue.value = selectedValue;
	sortCars(selectedValue);
};

const getSortOptions = async () => {
	try {
		const response = await axios.get<SelectOptionType[]>('https://my-json-server.typicode.com/writecleancode/compact-cars-vue/selectOptions')
		selectOptions.value = response.data;
	} catch (err) {
		console.log(err)
	}
}

onMounted(() => {
	getSortOptions()
	handleDisplayCars();
	isLoading.value = false;
});

watch(
	[usersFilterPreferences, cars],
	() => {
		handleDisplayCars();
	},
	{ deep: true }
);
</script>

<template>
	<div class="dashboard-wrapper">
		<div class="controls-wrapper">
			<div class="search-wrapper">
				<SearchInput :value="searchPhrase" v-on:handle-input-change="handleSearchInputChange" />
				<SortSelect
					:options="selectOptions"
					defaultOption="sort cars"
					:selectedValue="selectedSortValue"
					v-on:handle-selected-value-change="handleSelectedValueChange" />
			</div>
			<div class="filters-wrapper">
				<button class="manage-filters-btn" v-on:click="handleOpenModel">manage filters</button>
			</div>
		</div>
		<LoadingAnimation v-if="isLoading" />
		<div v-else class="car-cards-wrapper">
			<template v-if="carsToDisplay.length > 0">
				<CarCard
					v-for="car in carsToDisplay"
					:key="car.id"
					:car
					:isCompared="comparedCars.some(comparedCar => comparedCar.id === car.id)" />
			</template>
			<p class="no-cars-info" v-else>There are no cars to display...</p>
		</div>
		<Modal :isOpen="isModalOpen" :closeModal>
			<FilterBoxYears />
			<FilterBoxBrands />
		</Modal>
	</div>
</template>

<style lang="scss" scoped>
.controls-wrapper {
	@media (width >= 640px) {
		position: relative;
		display: flex;
		flex-direction: row-reverse;
		justify-content: space-between;
		padding: 0.8rem;
		background-color: #d9d9d9;
	}

	@media (width >= 900px) {
		background-color: initial;
		padding: 1.6rem 2.4rem;
	}

	@media (width >= 1600px) {
		padding: 2.4rem 3.2rem;
	}
}

.search-wrapper {
	display: flex;
	gap: 1.6rem;
	padding: 0.8rem;
	background-color: #d9d9d9;

	@media (width >= 440px) {
		justify-content: space-between;
	}

	@media (width >= 640px) {
		padding: 0;
	}
}

.filters-wrapper {
	padding: 0.8rem 0.8rem 0.4rem;

	@media (width >= 640px) {
		padding: 0;
	}

	@media (width >= 1200px) {
		display: none;
	}
}

.manage-filters-btn {
	display: block;
	padding: 0.3rem;
	width: 100%;
}

.manage-filters-button {
	display: block;
	padding: 0.3rem;
	width: 100%;

	
	@media (width >= 640px) {
		padding: 0.4rem 1.2rem;
		width: auto;
		height: 100%;
	}
}

.car-cards-wrapper {
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	gap: 1rem;
	padding: 1.2rem;

	@media (width >= 614px) {
		grid-template-columns: repeat(3, 1fr);
	}

	@media (width >= 900px) {
		gap: 1.2rem;
		padding-left: 2.4rem;
		padding-right: 2.4rem;
	}

	@media (width >= 1500px) {
		grid-template-columns: repeat(4, 1fr);
		gap: 1.6rem;
	}

	@media (width >= 1600px) {
		gap: 2rem;
		padding-left: 3.2rem;
		padding-right: 3.2rem;
	}
}

.no-cars-info {
	grid-column: 1 / 3;
	margin-top: 5.6rem;
	text-align: center;

	@media (width >= 614px) {
		grid-column: 1 / 4;
		font-size: 1.7rem;
	}

	@media (width >= 1500px) {
		grid-column: 1 / 5;
		font-size: 1.8rem;
	}
}
</style>
