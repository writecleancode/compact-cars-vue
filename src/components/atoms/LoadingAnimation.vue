<template>
	<div class="loading-animation-wrapper">
		<img src="/assets/img/wheel.webp" alt="" class="spinning-wheel" />
		<p>Loading...</p>
	</div>
</template>

<style lang="scss" scoped>
@keyframes spining {
	0% {
		rotate: 0;
	}

	100% {
		rotate: 360deg;
	}
}

.loading-animation-wrapper {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 1.6rem;
}

.spinning-wheel {
	margin-top: 8rem;
	width: 40px;
	animation: spining 0.3s infinite linear;
}

@media (min-width: 900px) {
	.spinning-wheel {
		width: 48px;
	}
}
</style>
