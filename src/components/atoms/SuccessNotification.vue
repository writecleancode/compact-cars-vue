<template>
	<span class="success-notification">
		<slot />
	</span>
</template>

<style lang="scss" scoped>
@keyframes slide-in-out {
	0% {
		transform: translateY(-120%);
	}

	10% {
		transform: translateY(0);
	}

	90% {
		transform: translateY(0);
	}

	100% {
		transform: translateY(-120%);
	}
}

.success-notification {
	position: fixed;
	top: 0.8rem;
	left: 50%;
	translate: -50%;
	transform: translateY(-120%);
	padding: 1.6rem 2.4rem;
	border: 1px solid #cdcdcd;
	width: max-content;
	background-color: #fff;
	box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.22);
	animation: slide-in-out 2s;
}
</style>
