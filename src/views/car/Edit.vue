<script setup lang="ts">
import LoadingAnimation from '@/components/atoms/LoadingAnimation.vue';
import BackButton from '@/components/atoms/BackButton.vue';
import Form from '@/components/organisms/Form.vue';
import StyledTitle from '@/components/atoms/StyledTitle.vue';
import CarCard from '@/components/molecules/CarCard.vue';

import { useForm } from '@/composables/useForm';
import { useNotificationsContext } from '@/providers/useNotifications';
import { onMounted, ref } from 'vue';
import { getCarDetails, updateCar } from '@/services/CarService';
import type { CarType } from '@/types/types';

const { formValues, handleInputChange } = useForm();
const { handleSuccessNotifications } = useNotificationsContext();

const props = defineProps<{
	id: string;
}>();

const isLoading = ref(false);
const carData = ref<CarType | null>(null);

const getData = async () => {
	isLoading.value = true;

	try {
		const response = await getCarDetails(props.id);
		carData.value = response.data;
	} catch (error) {
		console.log(error);
	} finally {
		isLoading.value = false;
	}
};

const handleSubmitForm = async () => {
	if (!carData.value || !carData.value.id) return;

	handleSuccessNotifications('Sorry, this feature is not available yet');
	// try {
	//   await updateCar(carData.value.id, formValues.value);
	//   handleSuccessNotifications('✔ Changes have been saved');
	// } catch (error) {
	//   console.log(error);
	//   handleSuccessNotifications('Sorry, an error occurred. Please try again later.');
	// }
};

onMounted(() => getData());
</script>

<template>
  <div class="edit-car-wrapper">
    <BackButton />
    <div class="content-wrapper">
      <LoadingAnimation v-if="isLoading" />
      <template v-else-if="carData">
        <Form :formValues="carData" :handleInputChange v-on:submit.prevent="handleSubmitForm">
          <button class="styled-button" type="submit">Save changes</button>
        </Form>
        <div class="preview-wrapper">
          <StyledTitle class="preview-title">Live preview</StyledTitle>
          <CarCard :car="carData" />
        </div>
      </template>
    </div>
	</div>
</template>

<style scoped>
.edit-car-wrapper {
  position: relative;

  @media (width > 900px) {
    min-height: 100%;
    align-content: center;
  }

  .content-wrapper {
    padding: 2.4rem;

    @media (width >= 620px) {
      display: flex;
      gap: 3.2rem;

      & > * {
        flex-basis: 100%;
      }
    }

    .form-wrapper {
      .styled-button {
        width: 100%;
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
