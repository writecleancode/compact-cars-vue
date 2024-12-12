<script lang="ts">
import { useCarsContext } from '@/composables/useCars';
import FilterBox from '@/components/molecules/FilterBox.vue';

export default {
	components: {
		FilterBox,
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
	<FilterBox
		title="Choose production year(s):"
		v-bind:options="usersFilterPreferences.years"
		v-on:handle-filter="handleFilterPreferences"
		v-bind:isYears="true" />
</template>
