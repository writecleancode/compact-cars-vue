<script setup lang="ts">
defineProps<{
	title: string;
	content: string;
}>();
</script>

<template>
	<div class="car-info-box">
		<p class="styled-info-title">{{ title }}</p>
		<p class="styled-info-content">{{ content }}</p>
	</div>
</template>

<style lang="scss" scoped>
.styled-info-title {
	margin-bottom: 0.2rem;
	font-size: 1.6rem;
	font-weight: bold;
}

.styled-info-content {
	font-size: 1.4rem;
}
</style>
