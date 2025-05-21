<script setup lang="ts">
import ChevronLeft from '@/assets/icons/ChevronLeft.vue';
import ChevronRight from '@/assets/icons/ChevronRight.vue';

import { computed } from 'vue';

const props = defineProps<{
    currentPage: number;
    perPage: number;
    totalCars: number;
}>()

const pagesTotal = computed(() => Math.ceil(props.totalCars / props.perPage))
const isLastPage = computed(() => props.totalCars <= props.currentPage * props.perPage)
</script>

<template>
    <div class="pagination-wrapper">
        <div v-if="currentPage === 1" class="arrow-icon-wrap placeholder">
            <ChevronLeft class="icon" />
        </div>
        <RouterLink v-else :to="{ name: 'dashboard', query: { page: currentPage - 1 }}" class="arrow-icon-wrap link" rel="prev" aria-label="previous page">
            <ChevronLeft class="icon" />
        </RouterLink>

        <template v-for="n in pagesTotal">
            <div v-if="n === currentPage" class="page-number placeholder" aria-hidden="true">{{ n }}</div>
            <RouterLink v-else :to="{ name: 'dashboard', query: { page: n } }" class="page-number link">{{ n }}</RouterLink>
        </template>

        <div v-if="isLastPage" class="arrow-icon-wrap placeholder">
            <ChevronRight class="icon" />
        </div>
        <RouterLink v-else :to="{ name: 'dashboard', query: { page: currentPage + 1 }}" class="arrow-icon-wrap link" rel="next" aria-label="next page">
            <ChevronRight class="icon" />
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

    .arrow-icon-wrap {
        padding: 0.8rem;
        border: 2px solid #555555;
        background-color: #555555;
        color: #fff;

        &.placeholder {
            opacity: .15;
            cursor: default;
        }

        &.link {
            transition: background-color 0.3s, color 0.3s;

            &:hover,
            &:focus-visible {
                background-color: transparent;
                color: #555555;

                .icon {
                    stroke: #555555;
                }
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

    .page-number {
        display: flex;
        justify-content: center;
        margin: -0.4rem -.8rem;
        padding: 0.8rem 1.6rem;
        width: 1ch;
        font-size: 1.6rem;

        &.placeholder {
            font-weight: 700;
        }
    }
}
</style>