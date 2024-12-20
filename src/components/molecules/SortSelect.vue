<script lang="ts">
export default {
	props: {
		options: {
			type: Object,
		},
		defaultOption: {
			type: String,
		},
		selectedValue: {
			type: String,
		},
	},
};
</script>

<template>
	<div class="select-wrapper">
		<select class="styled-select" :value="selectedValue" v-on:change="$emit('handleSelectedValueChange', $event)" aria-label="sort cars">
			<option v-if="defaultOption" value="" disabled>{{ defaultOption }}</option>
			<option v-for="option in options" :key="option.value" :value="option.value">{{ option.text }}</option>
		</select>
	</div>
</template>

<style lang="scss" scoped>
.select-wrapper {
	background-color: #f6f6f6;
}

.styled-select {
	padding: 0.7rem 1.2rem;
	border: none;
	background-color: #f6f6f6;
	font-size: 1.3rem;
}
</style>
