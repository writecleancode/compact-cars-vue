<script>
import FilterBox from '@/components/molecules/FilterBox/FilterBox.vue';

export default {
	props: {
		options: {
			type: Object,
		},
		handleFilterPreferences: {
			type: Function,
		},
	},
	components: {
		FilterBox,
	},
};
</script>

<template>
	<FilterBox title="Choose production year(s):" v-bind:options v-bind:handleFilter="handleFilterPreferences" />
</template>
