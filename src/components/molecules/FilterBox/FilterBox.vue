<script>
import StyledTitle from '@/components/atoms/StyledTitle/StyledTitle.vue';

export default {
	components: {
		StyledTitle,
	},

	props: {
		title: {
			type: String,
		},
		options: {
			type: Object,
		},
		isYears: {
			type: Boolean,
		},
	},
};
</script>

<template>
	<div class="wrapper">
		<StyledTitle v-bind:isFilterTitle="true">{{ title }}</StyledTitle>
		<ul class="filter-items">
			<li
				class="filter-item"
				v-bind:class="{ 'active-option': option.isActive, 'min-width': isYears }"
				v-for="option in options"
				:key="option.value"
				v-on:click="$emit('handleFilter', option.value)">
				{{ option.value }}
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

.filter-item {
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 0.4rem 1.6rem;
	background-color: #d9d9d9;
	font-size: 1.6rem;
	cursor: pointer;

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
