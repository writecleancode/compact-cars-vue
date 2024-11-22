<script>
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
	<input class="styled-input" v-bind:name v-bind:id v-bind:type v-bind:min v-bind:value />
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
