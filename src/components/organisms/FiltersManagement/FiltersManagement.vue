<script>
import { filterBrands, filterYears } from '@/data/filters';
import FilterBoxYears from '@/components/molecules/FilterBoxYears/FilterBoxYears.vue';
import FilterBoxBrands from '@/components/molecules/FilterBoxBrands/FilterBoxBrands.vue';

export default {
	data() {
		const filterYearsData = filterYears.map(option => ({ value: option, isActive: false }));
		const filterBrandsData = filterBrands.map(option => ({ value: option, isActive: false }));
		const usersFilterPreferences = { brands: filterBrandsData, years: filterYearsData };

		return {
			usersFilterPreferences,
		};
	},
	components: {
		FilterBoxYears,
		FilterBoxBrands,
	},
};
</script>

<template>
	<div class="filters-wrapper">
		<FilterBoxYears v-bind:options="usersFilterPreferences.years" />
		<FilterBoxBrands v-bind:options="usersFilterPreferences.brands" />
	</div>
</template>

<style scoped>
.filters-wrapper {
	display: none;
}

@media (min-width: 1200px) {
	.filters-wrapper {
		display: flex;
		flex-direction: column;
		gap: 4.8rem;
		grid-column: 1 / 2;
		grid-row: 2 / 3;
		padding: 2.4rem;
		border-right: 1px solid #d8d8d8;
		overflow-x: auto;
	}
}
</style>
