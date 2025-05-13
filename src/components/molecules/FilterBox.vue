<script setup lang="ts">
import StyledTitle from '@/components/atoms/StyledTitle.vue';
import type { SelectOptionType } from '@/types/types'

const { isYears = false } = defineProps<{
	title: string,
	options: SelectOptionType[],
	isYears: boolean,
}>();
</script>

<template>
	<div class="wrapper">
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
.wrapper {
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	margin-bottom: 4.8rem;
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

@media (min-width: 1200px) {
	.wrapper {
		margin-bottom: 0;
	}
}
</style>
