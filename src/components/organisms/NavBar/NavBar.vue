<script>
export default {
	props: {
		isNavActive: {
			type: Boolean,
		},
		comparedCarsNumber: {
			type: Number,
			default: 0,
		},
		closeMobileNav: {
			type: Function,
		},
	},
};
</script>

<template>
	<nav class="wrapper" v-bind:class="{ active: isNavActive }">
		<ul class="nav-links-list">
			<li>
				<RouterLink to="/" class="nav-link">Dashboard</RouterLink>
			</li>
			<li>
				<RouterLink to="/car-comparison" class="nav-link"
					>Comparison {{ comparedCarsNumber > 0 ? `(${comparedCarsNumber})` : ' ' }}</RouterLink
				>
			</li>
			<li>
				<RouterLink to="/add-car" class="nav-link">Add car</RouterLink>
			</li>
		</ul>
	</nav>
	<div class="background-tint" v-on:click="closeMobileNav"></div>
</template>

<style lang="scss" scoped>
.wrapper {
	position: absolute;
	z-index: 2;
	translate: -100%;
	padding: 2.4rem;
	padding-right: 3.2rem;
	border-right: 1px solid #d8d8d8;
	height: 100%;
	min-height: 100vh;
	min-height: 100svh;
	background-color: #fff;
	visibility: hidden;
	transition: translate 0.2s, visibility 0.2s 0.2s;
}

.nav-links-list {
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	gap: 0.8rem;
	list-style: none;
}

.nav-link {
	display: inline-block;
	position: relative;
	padding: 0.4rem 0.8rem;
	min-width: 14ch;
	color: #3e3e3e;
	font-size: 2rem;
	font-weight: bold;
	text-decoration: none;
	opacity: 0.7;
	transition: opacity 0.3s;

	&::before {
		content: '';
		position: absolute;
		top: 50%;
		translate: 0 -50%;
		left: -24px;
		width: 24px;
		height: 3px;
		background-color: #767676;
		opacity: 0.4;
		transition: opacity 0.3s;
	}

	&.active,
	&.active::before {
		opacity: 1;
	}
}

.background-tint {
	position: absolute;
	left: 0;
	right: 0;
	z-index: 1;
	height: 100%;
	min-height: 100vh;
	min-height: 100svh;
	background-color: rgba(0, 0, 0, 0.3);
	opacity: 0;
	visibility: hidden;
	transition: opacity 0.1s, visibility 0.2s 0.2s;
}

.active {
	&.wrapper {
		translate: 0;
		visibility: visible;
		transition: translate 0.2s;
	}

	+ .background-tint {
		opacity: 1;
		visibility: visible;
		transition: opacity 0.1s;
	}
}

@media (min-width: 900px) {
	.wrapper {
		position: static;
		z-index: initial;
		translate: initial;
		grid-column: 2 / 3;
		grid-row: 2 / 3;
		padding-right: 0.8rem;
		border-left: 1px solid #d8d8d8;
		height: auto;
		min-height: initial;
		visibility: visible;
		transition: initial;
	}

	.background-tint {
		display: none;
	}
}

@media (min-width: 1200px) {
	.wrapper {
		grid-column: 3 / 4;
	}
}
</style>
