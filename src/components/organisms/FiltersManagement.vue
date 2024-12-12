<script lang="ts">
import FilterBoxYears from '@/components/molecules/FilterBoxYears.vue';
import FilterBoxBrands from '@/components/molecules/FilterBoxBrands.vue';

import { useRoute } from 'vue-router';

export default {
	components: {
		FilterBoxYears,
		FilterBoxBrands,
	},

	setup() {
		const currentRoute = useRoute();

		return {
			currentRoute,
		};
	},
};
</script>

<template>
	<aside class="filters-wrapper">
		<FilterBoxYears />
		<FilterBoxBrands />
		<div class="filters-wrapper-unactive-tint" :class="{ active: currentRoute.fullPath !== '/' }"></div>
	</aside>
</template>

<style lang="scss" scoped>
.filters-wrapper {
	display: none;
}

@media (min-width: 1200px) {
	.filters-wrapper {
		position: relative;
		display: flex;
		flex-direction: column;
		gap: 4.8rem;
		grid-column: 1 / 2;
		grid-row: 2 / 3;
		padding: 2.4rem;
		border-right: 1px solid #d8d8d8;
		overflow-x: auto;
	}

	.filters-wrapper-unactive-tint {
		display: none;
		position: absolute;
		inset: 0;
		background-color: rgba(255, 255, 255, 0.4);
		opacity: 0;
		transition: display 0.15s, opacity 0.15s;
		transition-behavior: allow-discrete;

		&.active {
			display: block;
			opacity: 1;

			@starting-style {
				opacity: 0;
			}
		}
	}
}
</style>
