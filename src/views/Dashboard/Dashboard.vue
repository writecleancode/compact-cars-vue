<script>
import { selectOptions } from '@/data/select';
import SearchInput from '@/components/atoms/SearchInput/SearchInput.vue';
import SortSelect from '@/components/atoms/SortSelect/SortSelect.vue';
import LoadingAnimation from '@/components/atoms/LoadingAnimation/LoadingAnimation.vue';
import CarCard from '@/components/molecules/CarCard/CarCard.vue';

export default {
	setup() {
		const openModal = () => console.log('modal opened');

		return {
			selectOptions,
			openModal,
		};
	},
	components: {
		SearchInput,
		SortSelect,
		LoadingAnimation,
		CarCard,
	},
	props: {
		isLoading: {
			type: Boolean,
			default: true,
		},
		cars: {
			type: Array,
		},
		carsToDisplay: {
			type: Array,
		},
		comparedCars: {
			type: Array,
		},
		searchPhrase: {
			type: String,
		},
		handleSearchInputChange: {
			type: Function,
		},
		selectedSortValue: {
			type: String,
		},
		handleSelectedValueChange: {
			type: Function,
		},
	},
};
</script>

<template>
	<div>
		<div class="controls-wrapper">
			<div class="search-wrapper">
				<SearchInput v-bind:value="searchPhrase" v-on:handle-input-change="handleSearchInputChange" />
				<SortSelect
					v-bind:options="selectOptions"
					defaultOption="sort cars"
					v-bind:selectedValue="selectedSortValue"
					v-on:handle-selected-value-change="handleSelectedValueChange" />
			</div>
			<div class="filters-wrapper">
				<button class="manage-filters-btn" v-on:click="openModal">manage filters</button>
			</div>
		</div>
		<LoadingAnimation v-if="isLoading" />
		<div v-else class="car-cards-wrapper">
			<template v-if="carsToDisplay.length > 0">
				<CarCard
					v-for="car in carsToDisplay"
					:key="car.id"
					v-bind:car
					v-bind:isCompared="comparedCars.some(comparedCar => comparedCar.id === car.id)" />
			</template>
			<p class="no-cars-info" v-else>There are no cars to display...</p>
		</div>

		<!-- 
			<Modal isOpen={isModalOpen} closeModal={closeModal}>
				<FilterBoxYears />
				<FilterBoxBrands />
			</Modal>
		--></div>
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

@media (min-wdith: 640px) {
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
}

.manage-filters-button {
	padding: 0.4rem 1.2rem;
	width: auto;
	height: 100%;
}

@media (min-wdith: 900px) {
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

@media (min-wdith: 1600px) {
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
