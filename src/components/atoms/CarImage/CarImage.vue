<script lang="ts">
export default {
	props: {
		imgUrl: Object,
		altText: String,
	},
};
</script>

<template>
	<a v-bind:href="imgUrl?.big || imgUrl?.medium || undefined" target="_blank" class="car-image-wrapper-link">
		<img
			v-bind:srcset="`${imgUrl?.small || 'src/assets/img/unknown_car.jpg'}, ${imgUrl?.medium || 'src/assets/img/unknown_car.jpg'} 2x`"
			v-bind:src="imgUrl?.small || 'src/assets/img/unknown_car.jpg'"
			v-bind:alt="altText || ''"
			class="car-img" />
	</a>
</template>

<style lang="scss" scoped>
.car-image-wrapper-link {
	&:not([href]) {
		cursor: default;
	}
}

.car-img {
	width: 100%;
	aspect-ratio: 320 / 220;
	object-fit: cover;
}
</style>
