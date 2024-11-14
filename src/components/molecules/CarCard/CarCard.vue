<script>
import CarImage from '../../atoms/CarImage/CarImage.vue';
import CarInfoBox from '../../atoms/CarInfoBox/CarInfoBox.vue';

export default {
	props: {
		car: Object,
	},

	components: {
		CarImage,
		CarInfoBox,
	},
};
</script>

<template>
	<div class="wrapper">
		<p class="car-name">{{ car.brand || 'unknown' }} {{ car.model || 'unknown' }}</p>
		<CarImage v-bind:imgUrl="car.img" v-bind:altText="`${brand} ${model}`" />
		<div class="car-info-wrapper">
			<CarInfoBox title="Generation" v-bind:content="car.generation || 'unknown'" />
			<CarInfoBox title="Production years" v-bind:content="`${car.productionStartYear} - ${car.productionEndYear}`" />
			<CarInfoBox title="Facelift" v-bind:content="car.facelift || 'unknown'" />
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

@media (min-width: 1600px) {
	.car-name {
		margin-bottom: 0.8rem;
	}
}
</style>
