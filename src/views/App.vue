<script>
import Header from '@/components/atoms/Header/Header.vue';
import NavBar from '@/components/organisms/NavBar/NavBar.vue';
import FiltersManagement from '@/components/organisms/FiltersManagement/FiltersManagement.vue';
import Dashboard from '@/views/Dashboard/Dashboard.vue';

export default {
	data() {
		const isNavActive = false;
		const comparedCars = [];

		return {
			isNavActive,
			comparedCars,
		};
	},

	components: {
		Header,
		NavBar,
		FiltersManagement,
		Dashboard,
	},
};
</script>

<template>
	<div class="wrapper">
		<Header v-bind:isNavActive="isNavActive" />
		<NavBar v-bind:isNavActive="isNavActive" v-bind:comparedCarsNumber="comparedCars.length" />
		<FiltersManagement />
		<Dashboard />
	</div>
</template>

<style scoped>
@media (min-width: 900px) {
	.wrapper {
		display: grid;
		grid-template-columns: 1fr auto;
		grid-template-rows: auto 1fr;
		height: 100vh;
		height: 100svh;
		overflow: clip;
	}
}

@media (min-width: 1200px) {
	.wrapper {
		grid-template-columns: 300px 1fr auto;
	}
}

@media (min-width: 1400px) {
	.wrapper {
		grid-template-columns: 320px 1fr auto;
	}
}

@media (min-width: 1600px) {
	.wrapper {
		grid-template-columns: 320px 1fr 320px;
	}
}
</style>
