<script>
export default {
	props: {
		isFilterTitle: {
			type: Boolean,
			default: false,
		},
	},
};
</script>

<template>
	<p v-bind:class="`styled-title ${isFilterTitle ? 'filter-title' : ''}`">
		<slot />
	</p>
</template>

<style scoped>
.styled-title {
	margin-bottom: 0.8rem;
	color: #3e3e3e;
	font-size: 1.8rem;
	font-weight: bold;
	line-height: 1;
}

.filter-title {
	margin-bottom: 1.2rem;
	line-height: 1.5;
}
</style>
