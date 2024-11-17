<script>
import CarImage from '@/components/atoms/CarImage/CarImage.vue';
import CarInfoBox from '@/components/atoms/CarInfoBox/CarInfoBox.vue';
import CompareButton from '@/components/atoms/CompareButton/CompareButton.vue';

export default {
	props: {
		car: {
			type: Object,
		},
		isCompared: {
			type: Boolean,
			default: false,
		},
	},

	components: {
		CarImage,
		CarInfoBox,
		CompareButton,
	},
};
</script>

<template>
	<div class="wrapper">
		<p class="car-name">{{ car.brand || 'unknown' }} {{ car.model || 'unknown' }}</p>
		<CarImage v-bind:imgUrl="car.img" v-bind:altText="`${car.brand} ${car.model}`" />
		<div class="car-info-wrapper">
			<CarInfoBox title="Generation" v-bind:content="car.generation || 'unknown'" />
			<CarInfoBox title="Production years" v-bind:content="`${car.productionStartYear} - ${car.productionEndYear}`" />
			<CarInfoBox title="Facelift" v-bind:content="car.facelift || 'unknown'" />
		</div>
		<div class="buttons-wrapper" v-if="car.id">
			<CompareButton v-bind:isCompared="isCompared" />
		</div>
	</div>
</template>

<style scoped>
.wrapper {
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

@media (min-width: 1600px) {
	.car-name {
		margin-bottom: 0.8rem;
	}
}
</style>
