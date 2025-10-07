<script setup lang="ts">
import FilterBox from '@/components/molecules/FilterBox.vue';

import { useCarsContext } from '@/providers/useCars';

const { usersFilterPreferences, handleFilterPreferences } = useCarsContext();
</script>

<template>
	<FilterBox
		v-if="usersFilterPreferences.brands.length"
		title="Choose brand(s):"
		:options="usersFilterPreferences.brands"
		@handle-filter="handleFilterPreferences" />
</template>
