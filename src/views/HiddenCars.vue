<script setup lang="ts">
import SearchInput from '@/components/molecules/SearchInput.vue';
import LoadingAnimation from '@/components/atoms/LoadingAnimation.vue';
import CarCard from '@/components/molecules/CarCard.vue';
import ArrowBack from '@/assets/icons/ArrowBack.vue';
import Modal from '@/components/organisms/Modal.vue';
import ResultDisplayOptions from '@/components/molecules/ResultDisplayOptions.vue';
import FilterBoxYears from '@/components/molecules/FilterBoxYears.vue';
import FilterBoxBrands from '@/components/molecules/FilterBoxBrands.vue';

import { useCarsContext } from '@/providers/useCars';
import { useModal } from '@/composables/useModal';
import { onMounted, ref, watch } from 'vue';
import debounce from 'lodash.debounce';
import { getCarsByIds } from '@/services/CarService';
import type { CarType } from '@/types/types';

const {
	hiddenCars,
	findCars,
	setCarsToDisplay,
} = useCarsContext();
const filtersModal = useModal();
const settingsModal = useModal('640px');
const isLoading = ref(false)
const searchPhrase = ref('');
const carsData = ref<CarType[]>([])

const handleSearchCars = debounce((inputValue: string) => {
	setCarsToDisplay(findCars(inputValue));
}, 500);

const handleSearchInputChange = (e: InputEvent & { target: HTMLInputElement }) => {
	const inputValue = e.target.value;
	searchPhrase.value = inputValue;
	handleSearchCars(inputValue);
};

const removeFromHidden = (id?: string) => {
	if (!id) return

	hiddenCars.value = hiddenCars.value.filter(carId => carId !== id)
} 

const getHiddenCars = async () => {
	try {
		isLoading.value = true
		const response = await getCarsByIds(hiddenCars.value)
		carsData.value = response.data;
	} catch (error) {
		console.log(error);
	} finally {
		isLoading.value = false
	}
}

onMounted(() => {
	getHiddenCars();
});

watch(hiddenCars, () => {
	getHiddenCars();
})
</script>

<template>
	<div class="dashboard-wrapper">
		<div class="controls-wrapper">
			<!-- <div class="options-wrapper">
				<SearchInput :value="searchPhrase" v-on:handle-input-change="handleSearchInputChange" />
			</div> -->
			<div class="filters-wrapper">
				<button class="manage-filters-btn" v-on:click="filtersModal.handleOpenModel">manage filters</button>
			</div>
		</div>
		<LoadingAnimation v-if="isLoading" />
		<template v-else>
			<div class="car-cards-wrapper">
				<template v-if="carsData.length > 0">
					<div v-for="car in carsData" class="card-wrapper">
						<CarCard
						class="car-card"						
						:key="car.id"
						:car />
						<button class="styled-button reveal-button" @click="removeFromHidden(car.id)">
							Bring car back to results <ArrowBack />
						</button>
					</div>
				</template>
				<div class="no-cars-info" v-else>
					<p>There are no hidden cars.</p>
					<p>You can hide a car from all the results in the details of the car.</p>
				</div>
			</div>
		</template>
		<Modal :is-open="settingsModal.isModalOpen.value" :close-modal="settingsModal.closeModal" variant="centered">
			<ResultDisplayOptions />
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

	.card-wrapper {
		position: relative;
		
		.car-card {
			pointer-events: none;
			filter: grayscale(30%) opacity(0.5);
		}

		.reveal-button {
			position: absolute;
			z-index: 1;
			top: 50%;
			left: 50%;
			translate: -50% -50%;
			width: max-content;
			max-width: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			gap: 1.2rem;
			font-weight: 500;

			&:hover {
				background-color: #fff;
			}
		}
	}
}

.no-cars-info {
	grid-column: 1 / 3;
	display: flex;
	flex-direction: column;
	gap: 2.4rem;
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
