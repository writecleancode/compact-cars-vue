<script>
export default {
	props: {
		isNavActive: {
			type: Boolean,
		},
	},
};
</script>

<template>
	<button
		v-bind:class="`burger-btn ${isNavActive ? 'active' : ''}`"
		v-bind:aria-label="`${isNavActive ? 'close navigation' : 'open navigation'}`">
		<span className="burger-btn-line burger-btn-line--top"></span>
		<span className="burger-btn-line burger-btn-line--middle"></span>
		<span className="burger-btn-line burger-btn-line--bottom"></span>
	</button>
</template>

<style scoped>
.burger-btn {
	position: absolute;
	top: 50%;
	right: 8px;
	translate: 0 -50%;
	display: flex;
	flex-direction: column;
	gap: 5px;
	/* padding: ${({ theme }) => theme.burgerButton.padding}; */
	border: none;
	background-color: transparent;

	.burger-btn-line {
		display: inline-block;
		/* width: ${({ theme }) => theme.burgerButton.width}; */
		height: 3px;
		background-color: #3b3b3b;

		&--top,
		&--bottom {
			transition: translate 0.1s 0.1s, rotate 0.1s, scale 0.1s 0.05s;
		}

		&--middle {
			opacity: 1;
			transition-property: opacity;
			transition-delay: 0.1s;
		}

		&--top {
			translate: 0 0;
			rotate: none;
			scale: 1 1;
		}

		&--bottom {
			translate: 0 0;
			rotate: none;
			scale: 1 1;
		}
	}
}

.active {
	&.burger-btn {
		.burger-btn-line {
			&--top,
			&--bottom {
				transition: translate 0.1s, rotate 0.1s 0.1s, scale 0.1s 0.05s;
			}

			&--middle {
				opacity: 0;
				transition-property: opacity;
				transition-delay: 0.1s;
			}

			&--top {
				translate: 0 8px;
				rotate: 45deg;
				scale: 1.05 1;
			}

			&--bottom {
				translate: 0 -8px;
				rotate: -45deg;
				scale: 1.05 1;
			}
		}
	}
}

@media (min-width: 900px) {
	.burger-btn {
		display: none;
	}
}
</style>
