<script>
import StyledTitle from '@/components/atoms/StyledTitle/StyledTitle.vue';

export default {
	props: {
		title: {
			type: String,
		},
		options: {
			type: Object,
		},
	},
	components: {
		StyledTitle,
	},
};
</script>

<template>
	<div class="wrapper">
		<StyledTitle>{{ title }}</StyledTitle>
		<ul class="filter-items">
			<li v-bind:class="`filter-item ${option.isActive ? 'active-option' : ''}`" v-for="option in options" :key="option.value">
				{{ option.value }}
			</li>
		</ul>
	</div>
</template>

<style scoped>
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
	/* min-width: ${({ $isYears }) => ($isYears ? '72px' : 'unset')}; */
	background-color: #d9d9d9;
	font-size: 1.6rem;
	cursor: pointer;

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
