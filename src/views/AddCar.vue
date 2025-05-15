<script setup lang="ts">
import Form from '@/components/organisms/Form.vue';
import StyledTitle from '@/components/atoms/StyledTitle.vue';
import CarCard from '@/components/molecules/CarCard.vue';

import { useForm } from '@/composables/useForm';
import { useNotificationsContext } from '@/providers/useNotifications';
import { useCarsContext } from '@/providers/useCars';
import { v4 as uuid } from 'uuid';

const { formValues, handleInputChange, clearForm } = useForm();
const { handleSuccessNotifications } = useNotificationsContext();
const { addCar } = useCarsContext();

const handleSubmitForm = () => {
	const newCar = {
		id: uuid(),
		...formValues.value,
	};
	addCar(newCar);
	clearForm();
	handleSuccessNotifications();
};
</script>

<template>
	<div class="add-car-wrapper">
		<Form :formValues :handleInputChange v-on:submit.prevent="handleSubmitForm" />
		<div class="preview-wrapper">
			<StyledTitle class="preview-title">Live preview</StyledTitle>
			<CarCard :car="formValues" />
		</div>
	</div>
</template>

<style lang="scss" scoped>
.add-car-wrapper {
	padding: 2.4rem;

	@media (width >= 620px) {
		display: flex;
		gap: 3.2rem;

		& > * {
			flex-basis: 100%;
		}
	}

	@media (width >= 900px) {
		justify-content: space-evenly;
		align-items: center;
		margin: 0 auto;
		min-height: 100%;
		max-width: 960px;

		& > * {
			flex-basis: initial;
		}

		.preview-wrapper {
			flex-grow: 1;
			margin-top: 0;
			max-width: 260px;
		}
	}
}

.preview-wrapper {
	margin-top: 5.6rem;
	margin-left: auto;
	margin-right: auto;
	width: 50%;

	@media (width >= 620px) {
		margin-left: 0;
		margin-right: 0;
		width: auto;
	}

	@media (width >= 760px) {
		margin-top: 4rem;
	}

	@media (width >= 1600px) {
		max-width: 290px;
	}
}

.preview-title {
	margin-bottom: 2.4rem;
	color: #3e3e3e;
	text-align: center;
}
</style>
