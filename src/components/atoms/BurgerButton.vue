<script setup lang="ts">
import { useNavContext } from '@/providers/useNav';

const { isNavActive, handleMobileNav } = useNavContext();
</script>

<template>
	<button
		class="burger-button"
		:class="{ active: isNavActive }"
		:aria-label="`${isNavActive ? 'close navigation' : 'open navigation'}`"
		@click="handleMobileNav">
		<span className="button-line top"></span>
		<span className="button-line middle"></span>
		<span className="button-line bottom"></span>
	</button>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables.scss' as *;

.burger-button {
	position: absolute;
	top: 50%;
	right: 8px;
	translate: 0 -50%;
	display: flex;
	flex-direction: column;
	gap: 5px;
	padding: $burger-button-padding;
	border: none;
	background-color: transparent;

	@media (width >= 900px) {
		display: none;
	}

	.button-line {
		display: inline-block;
		width: $burger-button-width;
		height: 3px;
		background-color: #3b3b3b;

		&.top,
		&.bottom {
			translate: 0 0;
			rotate: none;
			scale: 1 1;
			transition: translate 0.1s 0.1s, rotate 0.1s, scale 0.1s 0.05s;
		}

		&.middle {
			opacity: 1;
			transition-property: opacity;
			transition-delay: 0.1s;
		}
	}
}

.active {
	&.burger-button {
		.button-line {
			&.top,
			&.bottom {
				transition: translate 0.1s, rotate 0.1s 0.1s, scale 0.1s 0.05s;
				scale: 1.05 1;
			}

			&.middle {
				opacity: 0;
				transition-property: opacity;
				transition-delay: 0.1s;
			}

			&.top {
				translate: 0 8px;
				rotate: 45deg;				
			}

			&.bottom {
				translate: 0 -8px;
				rotate: -45deg;
			}
		}
	}
}
</style>
