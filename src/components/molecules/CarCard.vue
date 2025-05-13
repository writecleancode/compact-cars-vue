<script setup lang="ts">
import CarImage from '@/components/atoms/CarImage.vue';
import CarInfoBox from '@/components/atoms/CarInfoBox.vue';
import CompareButton from '@/components/atoms/CompareButton.vue';
import StyledButton from '@/components/atoms/StyledButton.vue';
import TrashIcon from '@/assets/icons/TrashIcon.vue';

import type { CarType } from '@/types/types';
import { useCarsContext } from '@/providers/useCars';

const { isCompared = false } = defineProps<{
	car: CarType,
	isCompared?: boolean,
	handleRemoveCar?: (clickedCarId: string) => void,
}>();

const { handleCompareStatus, handleRemoveCar } = useCarsContext();
</script>

<template>
	<div class="car-card-wrapper">
		<p class="car-name">{{ car.brand || 'unknown' }} {{ car.model || 'unknown' }}</p>
		<CarImage :imgUrl="car.img" :altText="`${car.brand} ${car.model}`" />
		<div class="car-info-wrapper">
			<CarInfoBox title="Generation" :content="car.generation || 'unknown'" />
			<CarInfoBox title="Production years" :content="`${car.productionStartYear} - ${car.productionEndYear}`" />
			<CarInfoBox title="Facelift" :content="car.facelift || 'unknown'" />
		</div>
		<div class="buttons-wrapper" v-if="car.id">
			<CompareButton :isCompared="isCompared" @click="handleCompareStatus(car.id)" />
			<StyledButton class="delete-button" aria-label="delete car" @click="handleRemoveCar(car.id)">
				<TrashIcon />
			</StyledButton>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.car-card-wrapper {
	position: relative;
	display: flex;
	flex-direction: column;
	padding: 0.8rem;
	border: 1px solid #dddddd;
	background-color: #f1f1f1;
	color: #3e3e3e;
	box-shadow: 0 0 8px rgba(0, 0, 0, 0.18);
	container-type: inline-size;
}

.car-name {
	margin-bottom: 0.6rem;
	font-size: 1.8rem;
	font-weight: bold;
	text-align: center;

	@media (min-width: 1600px) {
		margin-bottom: 0.8rem;
	}
}

.car-info-wrapper {
	display: flex;
	flex-direction: column;
	gap: 1.2rem;
	margin-top: 0.8rem;
}

.buttons-wrapper {
	position: absolute;
	bottom: 0.6rem;
	right: 0.6rem;
	display: grid;
	grid-template-rows: repeat(2, 1fr);
	gap: 0.4rem;

	@container (min-width: 190px) {
		right: 0.8rem;
		bottom: 0.8rem;
		gap: 0.6rem;
	}
}

.delete-button {
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 0.4rem 0.6rem;
	fill: #fff;
	transition: fill 0.3s;

	&:hover,
	&:focus-visible {
		fill: #555;
	}
}
</style>
