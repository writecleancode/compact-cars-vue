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
        <RouterLink :to="{ name: 'dashboard', query: { page: currentPage - 1 }}" rel="prev" :tabindex="currentPage <= 1 ? -1 : 0">
            <span class="arrow-icon-wrap" aria-label="previous page" :disabled="currentPage <= 1"><ChevronLeft class="icon" /></span>
        </RouterLink>

        <RouterLink v-for="n in pagesTotal" :to="{ name: 'dashboard', query: { page: n } }" :tabindex="n === currentPage ? -1 : 0">
            <span class="current-page-number" :class="{ active: n === currentPage }">{{ n }}</span>
        </RouterLink>

        <RouterLink :to="{ name: 'dashboard', query: { page: currentPage + 1 }}" rel="next" :disabled="isLastPage" :tabindex="isLastPage ? -1 : 0">
            <span class="arrow-icon-wrap" aria-label="next page" :disabled="isLastPage"><ChevronRight class="icon" /></span>
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
        padding: 0.8rem 1.6rem;
	border: 2px solid #555555;
	background-color: #555555;
	color: #fff;
	font-size: 1.6rem;
	font-weight: bold;
	transition: background-color 0.3s, color 0.3s;

	&:hover,
	&:focus-visible {
		&:not([disabled]) {
			background-color: transparent;
			color: #555555;
		}
	}

	&[disabled] {
		opacity: .15;
		cursor: default;
	}
        padding: 0.8rem;

        &:hover,
        &:focus-visible {
            &:not([disabled]) {
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

    .current-page-number {
        display: flex;
        justify-content: center;
        margin: -0.4rem -.8rem;
        padding: 0.8rem 1.6rem;
        width: 1ch;
        font-size: 1.6rem;

        &.active {
             font-weight: 700;
            cursor: default;
        }
    }
}
</style>