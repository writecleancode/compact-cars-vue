<script>
import { useCarsContext } from '@/composables/useCars';
import FilterBoxYears from '@/components/molecules/FilterBoxYears/FilterBoxYears.vue';
import FilterBoxBrands from '@/components/molecules/FilterBoxBrands/FilterBoxBrands.vue';

export default {
	components: {
		FilterBoxYears,
		FilterBoxBrands,
	},

	setup() {
		const { usersFilterPreferences, handleFilterPreferences } = useCarsContext();

		return {
			usersFilterPreferences,
			handleFilterPreferences,
		};
	},
};
</script>

<template>
	<div class="filters-wrapper">
		<FilterBoxYears v-bind:options="usersFilterPreferences.years" v-bind:handleFilterPreferences />
		<FilterBoxBrands v-bind:options="usersFilterPreferences.brands" v-bind:handleFilterPreferences />
	</div>
</template>

<style lang="scss" scoped>
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
