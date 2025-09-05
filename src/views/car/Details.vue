<script setup lang="ts">

</script>

<template>
  <div class="car-details-wrapper">
    <div class="car-data">
      <p>Car data will be displayed here</p>
      <p>Car data will be displayed here</p>
      <p>Car data will be displayed here</p>
      <p>Car data will be displayed here</p>
      <p>Car data will be displayed here</p>
      <button>Edit button</button>
      <button>Remove button</button>
    </div>
    <div class="car-gallery">
      <div class="image-wrap"></div>
    </div>
  </div>
</template>

<style scoped>
.car-details-wrapper {
  padding: 12px;

  .car-gallery {
    display: grid;
    grid-template-columns: 1fr;
  }

  .image-wrap {
    background-color: #ddd;
    aspect-ratio: 4 / 3;
  }
}
</style>