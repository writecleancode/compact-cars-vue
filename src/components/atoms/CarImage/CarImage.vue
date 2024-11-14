<script>
export default {
	props: {
		imgUrl: Object,
		altText: String,
	},
};
</script>

<template>
	<a v-bind:href="imgUrl.big || imgUrl.medium || undefined" target="_blank" class="styled-link">
		<img
			v-bind:srcset="`${imgUrl.small || 'src/assets/img/unknown_car.jpg'}, ${imgUrl.medium || 'src/assets/img/unknown_car.jpg'} 2x`"
			v-bind:src="imgUrl.small || 'src/assets/img/unknown_car.jpg'"
			v-bind:alt="altText || ''"
			class="styled-image" />
	</a>
</template>

<style scoped>
.styled-link {
	&:not([href]) {
		cursor: default;
	}
}

.styled-image {
	width: 100%;
	aspect-ratio: 320 / 220;
	object-fit: cover;
}
</style>
