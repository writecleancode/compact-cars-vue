<script setup lang="ts">
import StyledTitle from '@/components/atoms/StyledTitle.vue';
import type { FilterValueType } from '@/types/types';

const { isYears = false } = defineProps<{
	title: string;
	options: FilterValueType<string | number>[];
	isYears?: boolean;
}>();
</script>

<template>
	<div class="filter-box-wrapper">
		<StyledTitle :isFilterTitle="true">{{ title }}</StyledTitle>
		<ul class="filter-items">
			<li v-for="option in options" :key="option.value">
				<button
					class="filter-item-btn"
					:class="{ 'active-option': option.isActive, 'min-width': isYears }"
					@click="$emit('handleFilter', option.value)">
					{{ option.value }}
				</button>
			</li>
		</ul>
	</div>
</template>

<style lang="scss" scoped>
.filter-box-wrapper {
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	margin-bottom: 4.8rem;

	@media (width >= 1200px) {
		margin-bottom: 0;
	}
}

.filter-items {
	display: flex;
	flex-wrap: wrap;
	gap: 1.6rem;
	list-style: none;
}

.filter-item-btn {
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 0.4rem 1.6rem;
	border: none;
	background-color: #d9d9d9;
	font-size: 1.6rem;

	&.min-width {
		min-width: 72px;
	}

	&.active-option {
		background-color: #bdeeb1;
	}
}
</style>
