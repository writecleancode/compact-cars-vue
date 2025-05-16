<script setup lang="ts">
import BurgerButton from '@/components/atoms/BurgerButton.vue';
</script>

<template>
	<header class="header-wrapper">
		<h1 class="h1">Segment C Hatchback cars <span>(late 1990's, early 2000's)</span></h1>
		<BurgerButton />
	</header>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables.scss' as *;

.header-wrapper {
	position: relative;
	padding: 1.4rem calc($burger-button-width + $burger-button-padding * 2 + 1.6rem) 1.2rem;
	border-bottom: 1px solid #e4e4e4;
	background-image: linear-gradient(-45deg, rgb(248, 248, 248), rgba(243, 243, 243, 0.48), rgb(248, 248, 248));

	@media (width >= 640px) {
		padding: 1.6rem calc($burger-button-width + $burger-button-padding * 2 + 2.4rem);
	}

	@media (width >= 900px) {
		grid-column: 1 / 3;
		grid-row: 1 / 2;
	}

	@media (width >= 1200px) {
		grid-column: 1 / 4;
	}

	@media (width >= 1500px) {
		padding: 1.8rem;
	}
}

.h1 {
	font-size: 1.9rem;
	font-weight: bold;
	line-height: 1.15;
	text-align: center;

	@media (width >= 640px) {
		line-height: initial;
	}

	span {
		display: inline-block;
		width: max-content;
		font-size: 1.4rem;
		font-weight: normal;

		@media (width >= 520px) {
			display: block;
			width: 100%;
			text-align: center;
		}

		@media (width >= 640px) {
			display: inline-block;
			margin-left: 0.4rem;
			width: auto;
			font-size: 1.5rem;
			text-align: initial;
			line-height: 1.15;
		}

		@media (width >= 1600px) {
			font-size: 1.6rem;
		}
	}
}
</style>
