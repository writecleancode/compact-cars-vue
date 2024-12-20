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
	<FilterBox title="Choose brand(s):" :options="usersFilterPreferences.brands" v-on:handle-filter="handleFilterPreferences" />
</template>
