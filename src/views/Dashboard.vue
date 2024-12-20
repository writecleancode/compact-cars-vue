<script lang="ts">
import SearchInput from '@/components/molecules/SearchInput.vue';
import SortSelect from '@/components/molecules/SortSelect.vue';
import LoadingAnimation from '@/components/atoms/LoadingAnimation.vue';
import CarCard from '@/components/molecules/CarCard.vue';
import Modal from '@/components/organisms/Modal.vue';
import FilterBoxYears from '@/components/molecules/FilterBoxYears.vue';
import FilterBoxBrands from '@/components/molecules/FilterBoxBrands.vue';

import type { CarType } from '@/types/types';
import { selectOptions } from '@/data/select';
import { useCarsContext } from '@/providers/useCars';
import { useModal } from '@/composables/useModal';
import { onMounted, ref, watch } from 'vue';
import debounce from 'lodash.debounce';

export default {
	components: {
		SearchInput,
		SortSelect,
		LoadingAnimation,
		CarCard,
		Modal,
		FilterBoxYears,
		FilterBoxBrands,
	},

	setup() {
		const { cars, carsToDisplay, comparedCars, usersFilterPreferences, findCars, filterCars, setCarsToDisplay, sortCars } =
			useCarsContext();
		const { isModalOpen, handleOpenModel, closeModal } = useModal();
		const isLoading = ref(true);
		const searchPhrase = ref('');
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

		onMounted(() => {
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

		return {
			cars,
			carsToDisplay,
			comparedCars,
			isLoading,
			searchPhrase,
			handleSearchInputChange,
			selectOptions,
			selectedSortValue,
			handleSelectedValueChange,
			isModalOpen,
			handleOpenModel,
			closeModal,
		};
	},
};
</script>

<template>
	<div>
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
.search-wrapper {
	display: flex;
	gap: 1.6rem;
	padding: 0.8rem;
	background-color: #d9d9d9;
}

.filters-wrapper {
	padding: 0.8rem 0.8rem 0.4rem;
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
}

.car-cards-wrapper {
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	gap: 1rem;
	padding: 1.2rem;
}

.no-cars-info {
	grid-column: 1 / 3;
	margin-top: 5.6rem;
	text-align: center;
}

@media (min-width: 440px) {
	.search-wrapper {
		justify-content: space-between;
	}
}

@media (min-width: 614px) {
	.car-cards-wrapper {
		grid-template-columns: repeat(3, 1fr);
	}

	.no-cars-info {
		grid-column: 1 / 4;
		font-size: 1.7rem;
	}
}

@media (min-width: 640px) {
	.controls-wrapper {
		position: relative;
		display: flex;
		flex-direction: row-reverse;
		justify-content: space-between;
		padding: 0.8rem;
		background-color: #d9d9d9;
	}

	.search-wrapper {
		padding: 0;
	}

	.filters-wrapper {
		padding: 0;
	}

	.manage-filters-btn {
		padding: 0.4rem 1.2rem;
		width: auto;
		height: 100%;
	}
}

@media (min-width: 900px) {
	.controls-wrapper {
		background-color: initial;
		padding: 1.6rem 2.4rem;
	}

	.car-cards-wrapper {
		gap: 1.2rem;
		padding-left: 2.4rem;
		padding-right: 2.4rem;
	}
}

@media (min-width: 1200px) {
	.filters-wrapper {
		display: none;
	}
}

@media (min-width: 1500px) {
	.car-cards-wrapper {
		grid-template-columns: repeat(4, 1fr);
		gap: 1.6rem;
	}

	.no-cars-info {
		grid-column: 1 / 5;
		font-size: 1.8rem;
	}
}

@media (min-width: 1600px) {
	.controls-wrapper {
		padding: 2.4rem 3.2rem;
	}

	.car-cards-wrapper {
		gap: 2rem;
		padding-left: 3.2rem;
		padding-right: 3.2rem;
	}
}
</style>
