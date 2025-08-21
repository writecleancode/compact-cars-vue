<script setup lang="ts">
import SearchInput from '@/components/molecules/SearchInput.vue';
import LoadingAnimation from '@/components/atoms/LoadingAnimation.vue';
import CarCard from '@/components/molecules/CarCard.vue';
import Pagination from '@/components/molecules/Pagination.vue';
import Modal from '@/components/organisms/Modal.vue';
import ResultDisplayOptions from '@/components/molecules/ResultDisplayOptions.vue';
import FilterBoxYears from '@/components/molecules/FilterBoxYears.vue';
import FilterBoxBrands from '@/components/molecules/FilterBoxBrands.vue';

import { useCarsContext } from '@/providers/useCars';
import { useViewportWidth } from '@/composables/useViewportWidth';
import { useModal } from '@/composables/useModal';
import { onMounted, ref, watch } from 'vue';
import debounce from 'lodash.debounce';
import Gear from '@/assets/icons/Gear.vue';

const props = defineProps<{
	page: number;
	perPage: number;
}>();

const {
	isLoading,
	cars,
	carsToDisplay,
	comparedCars,
	totalCars,
	usersFilterPreferences,
	findCars,
	filterCars,
	setCarsToDisplay,
	getCarsData,
} = useCarsContext();
const { matchesQuery: isTabletViewport } = useViewportWidth('640px');
const filtersModal = useModal();
const settingsModal = useModal('640px');
const searchPhrase = ref('');

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

onMounted(() => {
	getCarsData(props.page, props.perPage);
	handleDisplayCars();
});

watch(
	[usersFilterPreferences, cars],
	() => {
		handleDisplayCars();
	},
	{ deep: true }
);

watch(
	() => [props.page, props.perPage],
	() => {
		getCarsData(props.page, props.perPage);
		handleDisplayCars();
	}
);
</script>

<template>
	<div class="dashboard-wrapper">
		<div class="controls-wrapper">
			<div class="options-wrapper">
				<ResultDisplayOptions v-if="isTabletViewport" :page :perPage />
				<SearchInput :value="searchPhrase" v-on:handle-input-change="handleSearchInputChange" />
				<button
					v-if="!isTabletViewport"
					class="settings-btn"
					aria-label="ustawienia wyświetlanych wyników"
					@click="settingsModal.handleOpenModel">
					<Gear class="icon" />
				</button>
			</div>
			<div class="filters-wrapper">
				<button class="manage-filters-btn" v-on:click="filtersModal.handleOpenModel">manage filters</button>
			</div>
		</div>
		<LoadingAnimation v-if="isLoading" />
		<template v-else>
			<div class="car-cards-wrapper">
				<template v-if="carsToDisplay.length > 0">
					<CarCard
						v-for="car in carsToDisplay"
						:key="car.id"
						:car
						:is-compared="comparedCars.some(comparedCar => comparedCar.id === car.id)" />
				</template>
				<p class="no-cars-info" v-else>There are no cars to display...</p>
			</div>
			<Pagination v-if="carsToDisplay.length > 0" :current-page="page" :per-page :total-cars />
		</template>
		<Modal :is-open="settingsModal.isModalOpen.value" :close-modal="settingsModal.closeModal" variant="centered">
			<ResultDisplayOptions :page :perPage />
		</Modal>
		<Modal :is-open="filtersModal.isModalOpen.value" :close-modal="filtersModal.closeModal">
			<FilterBoxYears />
			<FilterBoxBrands />
		</Modal>
	</div>
</template>

<style lang="scss" scoped>
.controls-wrapper {
	@media (width >= 900px) {
		background-color: initial;
		padding: 1.6rem 2.4rem;
	}

	@media (width >= 1600px) {
		padding: 2.4rem 3.2rem;
	}
}

.options-wrapper {
	display: flex;
	gap: 1.6rem;
	padding: 0.8rem;
	background-color: #d9d9d9;

	@media (width >= 440px) {
		justify-content: space-between;
	}

	@media (width >= 640px) {
		position: relative;
		flex-direction: row-reverse;
		padding-inline: 1.2rem;
	}

	@media (width >= 900px) {
		background-color: initial;
		margin-bottom: 1.6rem;
		padding: 0;
	}
}

.settings-btn {
	display: flex;
	justify-content: center;
	align-items: center;
	margin-left: auto;
	padding: 0.5rem;
	border: none;
	background-color: #f6f6f6;

	.icon {
		width: 2rem;
		height: 2rem;
		fill: #464646;
	}
}

.filters-wrapper {
	padding: 0.8rem 0.8rem 0.4rem;

	@media (width >= 640px) {
		padding-inline: 1.2rem;
	}

	@media (width >= 900px) {
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

	@media (width >= 640px) {
		padding: 0.4rem 1.2rem;
		width: auto;
		height: 100%;
	}
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
