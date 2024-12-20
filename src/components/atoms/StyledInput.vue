<script lang="ts">
export default {
	props: {
		name: {
			type: String,
		},
		id: {
			type: String,
		},
		type: {
			type: String,
			default: 'text',
		},
		min: {
			type: Number,
		},
		value: {
			type: [String, Number],
		},
	},
};
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
