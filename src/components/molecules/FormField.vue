<script setup lang="ts">
import StyledLabel from '@/components/atoms/StyledLabel.vue';
import StyledInput from '@/components/atoms/StyledInput.vue';

const { type = 'text' } = defineProps<{
	label: string;
	name: string;
	id: string;
	type?: string;
	min?: number;
	value: string | number;
	handleInputChange: (e: InputEvent) => void;
}>();
</script>

<template>
	<div class="form-field-wrapper">
		<StyledLabel :for="name">{{ label }}</StyledLabel>
		<StyledInput :name :id :type :min :value @input="handleInputChange" />
	</div>
</template>

<style lang="scss" scoped>
.form-field-wrapper {
	display: flex;
	flex-direction: column;
	gap: 0.4rem;
}
</style>
