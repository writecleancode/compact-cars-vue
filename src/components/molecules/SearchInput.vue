<script lang="ts">
import SearchIcon from '@/assets/icons/SearchIcon.vue';

export default {
	components: {
		SearchIcon,
	},

	props: {
		value: {
			type: String,
		},
	},
};
</script>

<template>
	<div class="search-input-wrapper">
		<input
			name="search"
			id="search"
			placeholder="find car"
			type="text"
			class="search-input"
			@input="$emit('handleInputChange', $event)" />
		<label for="search" aria-label="find car by name" class="search-icon-wrapper">
			<SearchIcon />
		</label>
	</div>
</template>

<style lang="scss" scoped>
.search-input-wrapper {
	display: flex;
	flex-grow: 1;
	background-color: #f6f6f6;
	min-width: 0;
	max-width: 260px;
}

.search-input {
	position: relative;
	z-index: 1;
	flex-grow: 1;
	padding: 0.8rem 1.6rem;
	border: none;
	border-right: 1px solid #ccc;
	background-color: #f6f6f6;
	font-size: 1.3rem;
	min-width: 0;
}

.search-icon-wrapper {
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 0.8rem;
	background-color: #f6f6f6;

	svg {
		width: 1.6;
		height: 1.6;
		fill: #464646;
	}
}

@media (min-width: 640px) {
	.search-input-wrapper {
		position: absolute;
		left: 50%;
		translate: -50%;
		min-width: 260px;
	}
}
</style>
