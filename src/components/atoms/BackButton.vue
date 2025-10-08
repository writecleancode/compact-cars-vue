<script setup lang="ts">
import ChevronLeft from '@/assets/icons/ChevronLeft.vue';

import { useRouter } from 'vue-router';

const router = useRouter()
</script>

<template>
    <button class="styled-button back-btn" @click="router.back()" aria-label="go back">
        <ChevronLeft class="icon" />
    </button>
</template>

<style scoped>
.back-btn {
    position: fixed;
    top: 3rem;
    left: 1.2rem;
    z-index: 1;
    padding: 0.6rem;
    border: 2px solid #555555;
    background-color: #555555;
    color: #fff;
    transition: background-color 0.3s, color 0.3s;
    

    @media (width >= 335px) {
        top: 2.2rem;
    }

    @media (width >= 640px) {
        top: 1.3rem;
    }

    @media (width >= 900px) {
        position: absolute;
        top: 2rem;
        left: 2rem;
        padding: 0.8rem;
    }

    &:hover,
    &:focus-visible {
        background-color: transparent;
        color: #555555;

        .icon {
            stroke: #555555;
        }
    }

    .icon {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 1.2rem;
        height: 1.2rem;
        stroke-width: 2;
        stroke: #fff;
        transition: stroke 0.2s;
    }
}
</style>