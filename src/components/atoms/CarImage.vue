<script setup lang="ts">
import type { CarImageType } from '@/types/types';

defineProps<{
	imgUrl: CarImageType,
	altText: string,
}>();

const basePath = import.meta.env.VITE_BASE_PATH;
const unknownCarUrl = `${basePath}assets/img/unknown_car.jpg`;
</script>

<template>
	<a :href="imgUrl?.big || imgUrl?.medium || undefined" target="_blank" class="car-image-wrapper-link">
		<img
			:srcset="`${imgUrl?.small || unknownCarUrl}, ${imgUrl?.medium || unknownCarUrl} 2x`"
			:src="imgUrl?.small || unknownCarUrl"
			:alt="altText || ''"
			class="car-img" />
	</a>
</template>

<style lang="scss" scoped>
.car-image-wrapper-link:not([href]) {
	cursor: default;
}

.car-img {
	width: 100%;
	aspect-ratio: 320 / 220;
	object-fit: cover;
}
</style>
