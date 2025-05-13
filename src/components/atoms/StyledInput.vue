<script setup lang="ts">
const { type = 'text' } = defineProps<{
	name: string,
	id: string,
	type: string,
	min?: number,
	value: string | number,
}>();
</script>

<template>
	<input class="styled-input" :name :id :type :min :value />
</template>

<style lang="scss" scoped>
.styled-input {
	padding: 0.6rem 0.8rem;
	border: none;
	background-color: #f6f6f6;
	color: rgba(62, 62, 62, 0.75);
	font-size: 1.4rem;
}
</style>
