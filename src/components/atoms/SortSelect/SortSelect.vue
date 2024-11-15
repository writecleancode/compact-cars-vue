<script>
export default {
	props: {
		options: {
			type: Object,
		},
		defaultOption: {
			type: String,
		},
	},
};
</script>

<template>
	<div class="wrapper">
		<select aria-label="sort cars" class="styled-select">
			<option v-if="defaultOption" value="" disabled>{{ defaultOption }}</option>
			<option v-for="option in options" v-bind:value="option.value">{{ option.text }}</option>
		</select>
	</div>
</template>

<style scoped>
.wrapper {
	background-color: #f6f6f6;
}

.styled-select {
	padding: 0.7rem 1.2rem;
	border: none;
	background-color: #f6f6f6;
	font-size: 1.3rem;
}
</style>
