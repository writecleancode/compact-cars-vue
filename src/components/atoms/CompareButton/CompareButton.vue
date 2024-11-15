<script>
export default {
	props: {
		isCompared: Boolean,
	},
};
</script>

<template>
	<button
		v-bind:class="`wrapper ${isCompared ? 'is-compared' : ''}`"
		v-bind:title="isCompared ? 'remove car from comparison' : 'add car to comparison'"
		v-bind:aria-label="isCompared ? 'remove car from comparison' : 'add car to comparison'">
		<span class="button-bar button-bar--vertical"></span>
		<span class="button-bar button-bar--horizontal"></span>
	</button>
</template>

<style scoped>
.wrapper {
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 0.4rem 0.6rem;
	border: 2px solid #555555;
	background-color: #555555;
	color: #fff;
	font-size: 1.6rem;
	font-weight: bold;
	transition: background-color 0.3s, color 0.3s;

	&:hover {
		background-color: transparent;
		color: #555555;
	}

	&:hover .button-bar {
		background-color: #555;
	}
}

.button-bar {
	position: absolute;
	border-radius: 100px;
	background-color: #fff;
	transition: background-color 0.3s, rotate 0.3s;

	&--vertical {
		display: inline-block;
		width: 2px;
		height: 16px;
		rotate: 0;
	}

	&--horizontal {
		display: inline-block;
		width: 16px;
		height: 2px;
		rotate: 0;
	}
}

.is-compared {
	.button-bar {
		&--vertical {
			rotate: 630deg;
		}

		&--horizontal {
			rotate: 360deg;
		}
	}
}
</style>
