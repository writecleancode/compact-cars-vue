<script lang="ts">
export default {
	props: {
		imgUrl: Object,
		altText: String,
	},

	setup() {
		const basePath = import.meta.env.VITE_BASE_PATH;
		const unknownCarUrl = `${basePath}assets/img/unknown_car.jpg`

		return {
			unknownCarUrl,
		};
	},
};
</script>

<template>
	<a v-bind:href="imgUrl?.big || imgUrl?.medium || undefined" target="_blank" class="car-image-wrapper-link">
		<img
			v-bind:srcset="`${imgUrl?.small || unknownCarUrl}, ${imgUrl?.medium || unknownCarUrl} 2x`"
			v-bind:src="imgUrl?.small || unknownCarUrl"
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
