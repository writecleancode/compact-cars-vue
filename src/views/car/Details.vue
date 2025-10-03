<script setup lang="ts">
import CarImage from '@/components/atoms/CarImage.vue';
import CarInfoBox from '@/components/atoms/CarInfoBox.vue';
import StyledButton from '@/components/atoms/StyledButton.vue';
import { getCarDetails } from '@/services/CarService';
import { onMounted, ref } from 'vue';

const props = defineProps<{
  id: string
}>()

const carData = ref(null)

const getData = async () => {
  try {
    const response = await getCarDetails(props.id)
    carData.value = response.data
  } catch (error) {
    console.log(error);
  }
}

onMounted(() => getData())
</script>

<template>
  <div class="car-details-wrapper">
    <div class="mobile-introduction-image">
      <CarImage :imgUrl="carData?.img" :altText="`${carData?.brand} ${carData?.model}`" />
    </div>
    <div class="car-data">
      <p class="car-name">{{ carData?.brand || 'unknown' }} {{ carData?.model || 'unknown' }}</p>
      <!-- <div class="car-info-wrapper"> -->
        <CarInfoBox title="Generation" :content="carData?.generation || 'unknown'" />
        <CarInfoBox title="Production years" :content="`${carData?.productionStartYear} - ${carData?.productionEndYear}`" />
        <CarInfoBox title="Facelift" :content="carData?.facelift || 'unknown'" />
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
        <StyledButton class="show-list-btn">Edit car details</StyledButton>
        <StyledButton class="show-list-btn">Hide car</StyledButton>
      </div>
    </div>
    <div class="car-gallery">
        <CarImage :imgUrl="carData?.img" :altText="`${carData?.brand} ${carData?.model}`" />
        <CarImage :imgUrl="carData?.img" :altText="`${carData?.brand} ${carData?.model}`" />
        <CarImage :imgUrl="carData?.img" :altText="`${carData?.brand} ${carData?.model}`" />
        <CarImage :imgUrl="carData?.img" :altText="`${carData?.brand} ${carData?.model}`" />
    </div>
  </div>
</template>

<style scoped>
.car-details-wrapper {
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  padding: 1.2rem;

  .mobile-introduction-image {
    margin-top: -12px;
    margin-inline: -12px;
  }

  .car-data {
    display: flex;
    flex-direction: column;
    gap: 1.6rem;

    .car-name {
      font-size: 2rem;
      text-align: center;
      font-weight: bold;
  
      @media (width >= 1600px) {
        margin-bottom: 0.8rem;
      }
    }

    .competitors-details {
      summary {
        font-size: 1.6rem;
        font-weight: bold;
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
  }

  /* .image-wrap {
    background-color: #ddd;
    aspect-ratio: 4 / 3;
  } */
}
</style>