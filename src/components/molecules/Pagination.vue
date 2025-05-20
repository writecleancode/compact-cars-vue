<script setup lang="ts">
import StyledButton from '../atoms/StyledButton.vue';
import ChevronLeft from '@/assets/icons/ChevronLeft.vue';
import ChevronRight from '@/assets/icons/ChevronRight.vue';

import { computed } from 'vue';

const props = defineProps<{
    currentPage: number;
    totalCars: number;
}>()

const isLastPage = computed(() => props.totalCars <= props.currentPage * 8)
</script>

<template>
    <div class="pagination-wrapper">
        <RouterLink :to="{ name: 'dashboard', query: { page: currentPage - 1 }}">
            <StyledButton class="arrow-btn" aria-label="previous page" :disabled="currentPage <= 1"><ChevronLeft class="icon" /></StyledButton>
        </RouterLink>
        <span class="current-page-number">{{ currentPage }}</span>
        <RouterLink :to="{ name: 'dashboard', query: { page: currentPage + 1 }}">
            <StyledButton class="arrow-btn" aria-label="next page" :disabled="isLastPage"><ChevronRight class="icon" /></StyledButton>
        </RouterLink>
    </div>
</template>

<style lang="scss" scoped>
.pagination-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1.6rem;
    margin-bottom: 1.2rem;
    padding: .6rem;

    .arrow-btn {
        padding: 0.8rem;

        &:hover:not[disabled] {
            .icon {
                stroke: #555555;
            }
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
        transition: stroke .2s;
    }

    .current-page-number {
        display: flex;
        justify-content: center;
        width: 1ch;
    }
}
</style>