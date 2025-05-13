<script setup lang="ts">
import FilterBox from '@/components/molecules/FilterBox.vue';

import { useCarsContext } from '@/providers/useCars';

const { usersFilterPreferences, handleFilterPreferences } = useCarsContext();
</script>

<template>
	<FilterBox
		v-if="usersFilterPreferences.years.length"
		title="Choose production year(s):"
		:options="usersFilterPreferences.years"
		@handle-filter="handleFilterPreferences"
		:isYears="true" />
</template>
