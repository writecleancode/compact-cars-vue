<script setup lang="ts">
import type { SelectOptionType } from '@/types/types';

defineProps<{
	options: SelectOptionType[],
	defaultOption: string,
	selectedValue: string,
}>();
</script>

<template>
	<div class="select-wrapper" v-if="options?.length">
		<select class="styled-select" :value="selectedValue" @change="$emit('handleSelectedValueChange', $event)" aria-label="sort cars">
			<option v-if="defaultOption" value="" disabled>{{ defaultOption }}</option>
			<option v-for="option in options" :key="option.value" :value="option.value">{{ option.text }}</option>
		</select>
	</div>
</template>

<style lang="scss" scoped>
.select-wrapper {
	background-color: #f6f6f6;
}

.styled-select {
	padding: 0.7rem 1.2rem;
	border: none;
	background-color: #f6f6f6;
	font-size: 1.3rem;
}
</style>
