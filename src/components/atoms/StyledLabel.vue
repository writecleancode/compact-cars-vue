<script setup lang="ts">
defineProps<{
	for: string;
}>();
</script>

<template>
	<label :for class="styled-label">
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
