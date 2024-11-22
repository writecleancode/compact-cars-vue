<script>
import FormField from '@/components/molecules/FormField/FormField.vue';
import StyledButton from '@/components/atoms/StyledButton/StyledButton.vue';

export default {
	components: {
		FormField,
		StyledButton,
	},

	props: {
		formValues: {
			type: Object,
		},
		handleInputChange: {
			type: Function,
		},
		handleSubmitForm: {
			type: Function,
		},
	},
};
</script>

<template>
	<form class="form-wrapper">
		<FormField label="Brand" name="brand" id="brand" v-bind:value="formValues.brand" />
		<FormField label="Model" name="model" id="model" v-bind:value="formValues.model" />
		<FormField label="Generation" name="generation" id="generation" v-bind:value="formValues.generation" />
		<FormField
			label="Start of production (year)"
			name="productionStartYear"
			id="productionStartYear"
			type="number"
			v-bind:min="1886"
			v-bind:value="formValues.productionStartYear" />
		<FormField
			label="End of production (year)"
			name="productionEndYear"
			id="productionEndYear"
			type="number"
			v-bind:min="1886"
			v-bind:value="formValues.productionEndYear" />
		<FormField label="Year of facelift" name="facelift" id="facelift" v-bind:value="formValues.facelift" />
		<FormField label="Photo url" name="img" id="imgUrl" v-bind:value="formValues.img.small" />
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
}

.margin-top {
	margin-top: 1.6rem;
}

@media (min-width: 900px) {
	.form-wrapper {
		flex-grow: 1;
		max-width: 360px;
	}
}
</style>
