<script>
export default {
	props: {
		defaultOption: {
			type: String,
		},
	},
};
</script>

<template>
	<div class="wrapper">
		<select aria-label="sort cars" class="styled-select">
			<option value="" disabled>{{ defaultOption }}</option>
			<option value="">@TEMP</option>
			<option value="">@TEMP</option>
			<option value="">@TEMP</option>
			<option value="">@TEMP</option>
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
