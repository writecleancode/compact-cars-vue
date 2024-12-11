<script lang="ts">
import { useNavProvider } from '@/composables/useNav';
import { useCarsProvider } from '@/composables/useCars';
import { useNotificationsProvider } from '@/composables/useNotifications';
import Header from '@/components/atoms/Header/Header.vue';
import NavBar from '@/components/organisms/NavBar/NavBar.vue';
import FiltersManagement from '@/components/organisms/FiltersManagement/FiltersManagement.vue';
import Dashboard from '@/views/Dashboard/Dashboard.vue';
import SuccessNotification from '@/components/atoms/SuccessNotification/SuccessNotification.vue';

export default {
	components: {
		Header,
		NavBar,
		FiltersManagement,
		Dashboard,
		SuccessNotification,
	},

	setup() {
		useNavProvider();
		const { comparedCars } = useCarsProvider();
		const { successNotifications } = useNotificationsProvider();

		const basePath = import.meta.env.VITE_BASE_PATH;
		console.log(basePath);

		return {
			comparedCars,
			successNotifications,
		};
	},
};
</script>

<template>
	<div class="app-wrapper">
		<Header />
		<NavBar v-bind:comparedCarsNumber="comparedCars.length" />
		<FiltersManagement />
		<main id="main" class="content-wrapper">
			<RouterView />
		</main>
		<template v-if="successNotifications.length > 0">
			<SuccessNotification v-for="successNotification in successNotifications" :key="successNotification">
				✔ Car added to the list
			</SuccessNotification>
		</template>
	</div>
</template>

<style lang="scss" scoped>
@media (min-width: 900px) {
	.app-wrapper {
		display: grid;
		grid-template-columns: 1fr auto;
		grid-template-rows: auto 1fr;
		height: 100vh;
		height: 100svh;
		overflow: clip;
	}

	.content-wrapper {
		grid-column: 1 / 2;
		grid-row: 2 / 3;
		overflow-x: auto;
	}
}

@media (min-width: 1200px) {
	.app-wrapper {
		grid-template-columns: 300px 1fr auto;
	}

	.content-wrapper {
		grid-column: 2 / 3;
	}
}

@media (min-width: 1400px) {
	.app-wrapper {
		grid-template-columns: 320px 1fr auto;
	}
}

@media (min-width: 1600px) {
	.app-wrapper {
		grid-template-columns: 320px 1fr 320px;
	}
}
</style>
