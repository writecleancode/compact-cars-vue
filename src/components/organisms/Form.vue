<script setup lang="ts">
import type { FormValuesType } from '@/types/types';
import FormField from '@/components/molecules/FormField.vue';
import StyledButton from '@/components/atoms/StyledButton.vue';

defineProps<{
	formValues: FormValuesType,
	handleInputChange: (e: InputEvent) => void;
	handleSubmitForm?: () => void;
}>();
</script>

<template>
	<form class="form-wrapper">
		<FormField label="Brand" name="brand" id="brand" :value="formValues.brand" :handleInputChange />
		<FormField label="Model" name="model" id="model" :value="formValues.model" :handleInputChange />
		<FormField label="Generation" name="generation" id="generation" :value="formValues.generation" :handleInputChange />
		<FormField
			label="Start of production (year)"
			name="productionStartYear"
			id="productionStartYear"
			type="number"
			:min="1886"
			:value="formValues.productionStartYear"
			:handleInputChange />
		<FormField
			label="End of production (year)"
			name="productionEndYear"
			id="productionEndYear"
			type="number"
			:min="1886"
			:value="formValues.productionEndYear"
			:handleInputChange />
		<FormField label="Year of facelift" name="facelift" id="facelift" :value="formValues.facelift" :handleInputChange />
		<FormField label="Photo url" name="img" id="imgUrl" :value="formValues.img.small" :handleInputChange />
		<StyledButton class="margin-top" type="submit">Add car</StyledButton>
	</form>
</template>

<style lang="scss" foped>
.form-wrapper {
	display: flex;
	flex-direction: column;
	gap: 2.4rem;
	padding: 1.6rem;
	border: 1px solid #f1f1f1;
	box-shadow: -2px 2px 8px rgba(0, 0, 0, 0.128);

	@media (min-width: 900px) {
		flex-grow: 1;
		max-width: 360px;
	}
}

.margin-top {
	margin-top: 1.6rem;
}
</style>
