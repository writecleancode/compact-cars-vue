<script lang="ts">
import type { PropType } from 'vue';
import StyledLabel from '@/components/atoms/StyledLabel.vue';
import StyledInput from '@/components/atoms/StyledInput.vue';

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
			type: Function as PropType<(e: InputEvent) => void>,
			required: true,
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
