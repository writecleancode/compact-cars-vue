<template>
	<button class="styled-button" v-on:click="$emit('handleClick')">
		<slot />
	</button>
</template>

<style lang="scss" scoped>
.styled-button {
	padding: 0.8rem 1.6rem;
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
}
</style>
