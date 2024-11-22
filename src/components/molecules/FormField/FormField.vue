<script>
import StyledLabel from '@/components/atoms/StyledLabel/StyledLabel.vue';
import StyledInput from '@/components/atoms/StyledInput/StyledInput.vue';

export default {
	components: {
		StyledLabel,
		StyledInput,
	},

	props: {
		label: {
			type: String,
		},
		name: {
			type: String,
		},
		id: {
			type: String,
		},
		type: {
			type: String,
		},
		min: {
			type: Number,
		},
		value: {
			type: [String, Number],
		},
		handleInputChange: {
			type: Function,
		},
	},
};
</script>

<template>
	<div class="form-field-wrapper">
		<StyledLabel v-bind:for="name">{{ label }}</StyledLabel>
		<StyledInput v-bind:name v-bind:id v-bind:type v-bind:min v-bind:value v-on:input="handleInputChange" />
	</div>
</template>

<style lang="scss" scoped>
.form-field-wrapper {
	display: flex;
	flex-direction: column;
	gap: 0.4rem;
}
</style>
