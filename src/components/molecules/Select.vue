<script setup lang="ts">
import type { SelectOptionType } from '@/types/types';
import { computed } from 'vue';

const props = defineProps<{
	options: (string | number | SelectOptionType)[];
	selectedValue: string | number;
	defaultOption?: string;
	id?: string;
	label?: string;
}>();

const sortOptions = computed(() =>
	props.options.map(option => (typeof option === 'object' ? option : { value: option, text: option.toString() }))
);
</script>

<template>
	<div class="select-wrapper" v-if="sortOptions?.length">
		<select class="select" :value="selectedValue" @change="$emit('handleSelectedValueChange', $event)" :id="id" :aria-label="label">
			<option v-if="defaultOption" value="" disabled>{{ defaultOption }}</option>
			<option v-for="option in sortOptions" :key="option.value" :value="option.value">{{ option.text }}</option>
		</select>
	</div>
</template>

<style lang="scss" scoped>
.select {
	padding: 0.7rem 1.2rem;
	border: none;
	background-color: #f6f6f6;
	font-size: 1.3rem;
}
</style>
