<script setup lang="ts">
const { isFilterTitle = false } = defineProps<{
	isFilterTitle: boolean,
}>();
</script>

<template>
	<p class="styled-title" :class="{ 'filter-title': isFilterTitle }">
		<slot />
	</p>
</template>

<style lang="scss" scoped>
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
