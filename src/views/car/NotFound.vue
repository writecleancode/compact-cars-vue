<script setup lang="ts">
const props = defineProps<{
	resource: string;
}>();
</script>

<template>
	<div class="not-found-wrapper">
		<p class="title">Sorry...</p>
		<p class="subtitle">The {{ props.resource }} you're looking for doesn't exist</p>
		<RouterLink class="styled-button" :to="{ name: 'dashboard' }">Back to the home page</RouterLink>
	</div>
</template>

<style scoped>
.not-found-wrapper {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 0.8rem;
	padding: 1.2rem;
	padding-top: 4rem;
	text-align: center;
	font-weight: 500;

	@media (height >= 800px) {
		padding-top: 12rem;
	}

	.styled-button {
		margin-top: 0.8rem;
	}
}
</style>
