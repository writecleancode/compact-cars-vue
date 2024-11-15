<script>
import FilterBox from '@/components/molecules/FilterBox/FilterBox.vue';

export default {
	props: {
		options: Object,
	},
	components: {
		FilterBox,
	},
};
</script>

<template>
	<FilterBox title="Choose production year(s):" v-bind:options="options" />
</template>
