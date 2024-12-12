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
	<FilterBox title="Choose brand(s):" v-bind:options="usersFilterPreferences.brands" v-on:handle-filter="handleFilterPreferences" />
</template>
