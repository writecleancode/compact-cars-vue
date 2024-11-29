<script lang="ts">
export default {
	props: {
		for: {
			type: String,
		},
	},
};
</script>

<template>
	<label v-bind:for class="styled-label">
		<slot />
	</label>
</template>

<style lang="scss" scoped>
.styled-label {
	margin-left: 0.6rem;
	color: #3e3e3e;
	font-size: 1.5rem;
}
</style>
