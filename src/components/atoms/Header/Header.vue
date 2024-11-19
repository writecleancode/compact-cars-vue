<script>
import BurgerButton from '@/components/atoms/BurgerButton/BurgerButton.vue';

export default {
	props: {
		isNavActive: {
			type: Boolean,
		},
		handleMobileNav: {
			type: Function,
		},
	},

	components: {
		BurgerButton,
	},
};
</script>

<template>
	<div class="header-wrapper">
		<h1 class="h1">Segment C Hatchback cars <span>(late 1990's, early 2000's)</span></h1>
	</div>
	<BurgerButton v-bind:isNavActive v-on:handle-mobile-nav="handleMobileNav" />
</template>

<style lang="scss" scoped>
.header-wrapper {
	position: relative;
	/* padding: ${({ theme }) => `1.4rem calc(${theme.burgerButton.width} + ${theme.burgerButton.padding} * 2 + 1.6rem) 1.2rem`}; */
	border-bottom: 1px solid #e4e4e4;
	background-image: linear-gradient(-45deg, rgb(248, 248, 248), rgba(243, 243, 243, 0.48), rgb(248, 248, 248));
}

.h1 {
	font-size: 1.9rem;
	font-weight: bold;
	line-height: 1.15;
	text-align: center;

	span {
		display: inline-block;
		width: max-content;
		font-size: 1.4rem;
		font-weight: normal;
	}
}

@media (min-width: 520px) {
	.h1 {
		span {
			display: block;
			width: 100%;
			text-align: center;
		}
	}
}

@media (min-width: 640px) {
	.header-wrapper {
		/* padding: ${({ theme }) => `1.6rem calc(${theme.burgerButton.width} + ${theme.burgerButton.padding} * 2 + 2.4rem)`}; */
	}

	.h1 {
		line-height: initial;

		span {
			display: inline-block;
			margin-left: 0.4rem;
			width: auto;
			font-size: 1.5rem;
			text-align: initial;
			line-height: 1.15;
		}
	}
}

@media (min-width: 900px) {
	.header-wrapper {
		grid-column: 1 / 3;
		grid-row: 1 / 2;
	}
}

@media (min-width: 1200px) {
	.header-wrapper {
		grid-column: 1 / 4;
	}
}

@media (min-width: 1500px) {
	.header-wrapper {
		padding: 1.8rem;
	}
}

@media (min-width: 1600px) {
	.h1 {
		span {
			font-size: 1.6rem;
		}
	}
}
</style>
