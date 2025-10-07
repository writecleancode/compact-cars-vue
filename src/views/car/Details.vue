<script setup lang="ts">
import LoadingAnimation from '@/components/atoms/LoadingAnimation.vue';
import CarImage from '@/components/atoms/CarImage.vue';
import CarInfoBox from '@/components/atoms/CarInfoBox.vue';
import StyledButton from '@/components/atoms/StyledButton.vue';

import type { CarType } from '@/types/types';
import { getCarDetails } from '@/services/CarService';
import { onMounted, ref } from 'vue';

const props = defineProps<{
  id: string
}>()

const isLoading = ref(false)
const carData = ref<CarType | null>(null)

const getData = async () => {
  isLoading.value = true

  try {
    const response = await getCarDetails(props.id)
    carData.value = response.data
  } catch (error) {
    console.log(error);
  } finally {
    isLoading.value = false
  }
}

onMounted(() => getData())
</script>

<template>
  <LoadingAnimation v-if="isLoading" />
  <div v-else-if="carData" class="car-details-wrapper">
    <div class="mobile-introduction-image">
      <p class="car-name">{{ carData.brand || 'unknown' }} {{ carData.model || 'unknown' }}</p>
      <CarImage :imgUrl="carData.img" :altText="`${carData.brand} ${carData.model}`" />
    </div>
    <div class="car-data">
      <p class="car-name">{{ carData.brand || 'unknown' }} {{ carData.model || 'unknown' }}</p>
      <!-- <div class="car-info-wrapper"> -->
        <CarInfoBox title="Generation" :content="carData.generation || 'unknown'" />
        <CarInfoBox title="Production years" :content="`${carData.productionStartYear} - ${carData.productionEndYear}`" />
        <CarInfoBox title="Facelift" :content="carData.facelift || 'unknown'" />
      <!-- </div> -->
      <div>
        <details class="competitors-details">
          <summary>Early production years competitors</summary>
          <ul class="competitors-list">
          <li>Alfa Romeo 146</li>
          <li>Audi A3 I</li>
          <li>BMW 3 Series Compact (E36)</li>
          <li>Citroen Xsara</li>
          <li>Fiat Brava</li>
          <li>Ford Focus I</li>
          <li>Honda Civic VI</li>
          <li>Lancia Delta II</li>
          <li>Mazda 323 VI</li>
          <li>Nissan Almera I</li>
          <li>Opel Astra II</li>
          <li>Peugeot 306</li>
          <li>Renault Megane I</li>
          <li>Seat Leon I</li>
          <li>Toyota Corolla VIII</li>
        </ul>
        </details>
        <!-- <p class="text-title">Early production years competitors</p>
        <ul class="competitors-list">
          <li>Alfa Romeo 146</li>
          <li>Audi A3 I</li>
          <li>BMW 3 Series Compact (E36)</li>
          <li>Citroen Xsara</li>
          <li>Fiat Brava</li>
          <li>Ford Focus I</li>
          <li>Honda Civic VI</li>
          <li>Lancia Delta II</li>
          <li>Mazda 323 VI</li>
          <li>Nissan Almera I</li>
          <li>Opel Astra II</li>
          <li>Peugeot 306</li>
          <li>Renault Megane I</li>
          <li>Seat Leon I</li>
          <li>Toyota Corolla VIII</li>
        </ul> -->
        <StyledButton class="show-list-btn">Display on the list</StyledButton>
      </div>
      <div>
        <details class="competitors-details">
          <summary>Late production years competitors</summary>
          <ul class="competitors-list">
            <li>Alfa Romeo 147</li>
            <li>Audi A3 I</li>
            <li>BMW 3 Series Compact (E46)</li>
            <li>Citroen Xsara</li>
            <li>Fiat Brava</li>
            <li>Ford Focus I</li>
            <li>Honda Civic VI</li>
            <li>Mazda 323 VI</li>
            <li>Nissan Almera I</li>
            <li>Opel Astra II</li>
            <li>Peugeot 306</li>
            <li>Renault Megane I</li>
          <li>Seat Leon I</li>
          <li>Toyota Corolla VIII</li>
        </ul>
      </details>
        <StyledButton class="show-list-btn">Display on the list</StyledButton>
      </div>
      <div class="buttons-wrapper">
        <RouterLink :to="{ name: 'car-edit', params: { id: carData.id } }" class="styled-button show-list-btn">Edit car details</RouterLink>
        <button class="styled-button show-list-btn" disabled>Hide car</button>
      </div>
    </div>
    <div class="car-gallery">
      <template v-if="carData.pictures?.length">
        <CarImage v-for="picture in carData.pictures" :key="picture.small" :imgUrl="picture" :altText="`${carData.brand} ${carData.model}`" />
      </template>
    </div>
  </div>
</template>

<style scoped>
.car-details-wrapper {
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  padding: 1.2rem;
  position: relative;
  
  @media (width >= 780px) {
    flex-direction: row;
  }

  .car-name {
    font-size: 2rem;
    text-align: center;
    font-weight: bold;

    @media (width >= 1600px) {
      margin-bottom: 0.8rem;
    }
  }

  .mobile-introduction-image {
    margin-top: -12px;
    margin-inline: -12px;

    @media (width >= 480px) {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
    }

    @media (width >= 780px) {
      display: none;
    }

    .car-name {
      display: none;

      @media (width >= 480px) {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 3.2rem;
        background-color: #f5f5f5ee;
      }
    }
  }

  .car-data {
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    gap: 1.6rem;
    /* height: fit-content; */

    @media (width >= 780px) {
      position: sticky;
      top: 1.2rem;
      padding: 1.2rem;
      background-color: #f5f5f5ee;
    }

    .competitors-details {
      summary {
        font-size: 1.6rem;
        font-weight: bold;
      }
    }

    .car-name {
      @media (480px < width < 780px) {
        display: none;
      }
    }

    .text-title {
      margin-bottom: 0.8rem;
      font-size: 1.6rem;
      font-weight: bold;
    }

    .competitors-list {
      margin-top: 0.8rem;

      li {
        margin-left: 1.8rem;
        font-size: 1.4rem;
        padding-block: .3rem;
      }
    }

    .show-list-btn {
      /* width: 100%; */
      /* max-width: 200px; */
      margin-top: 0.4rem;
      padding: 0.4rem 1.6rem;
      font-size: 1.4rem;
      font-weight: 500;
    }

    .buttons-wrapper {
      margin-top: 1.6rem;
      display: flex;
      flex-direction: column;
      gap: 0.4rem;
    }
  }

  .car-gallery {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.2rem;
    height: fit-content;

    @media (width >= 480px) {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  /* .image-wrap {
    background-color: #ddd;
    aspect-ratio: 4 / 3;
  } */
}
</style>