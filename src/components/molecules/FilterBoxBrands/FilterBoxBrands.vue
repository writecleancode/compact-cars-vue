<script>
import FilterBox from '@/components/molecules/FilterBox/FilterBox.vue';

export default {
	props: {
		options: {
			type: Object,
		},
	},
	components: {
		FilterBox,
	},
};
</script>

<template>
	<FilterBox title="Choose brand(s):" v-bind:options />
</template>
