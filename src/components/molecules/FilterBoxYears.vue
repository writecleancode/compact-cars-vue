<script lang="ts">
import FilterBox from '@/components/molecules/FilterBox.vue';

import { useCarsContext } from '@/providers/useCars';

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
		:options="usersFilterPreferences.years"
		@handle-filter="handleFilterPreferences"
		:isYears="true" />
</template>
