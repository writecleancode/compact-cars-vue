<script setup lang="ts">
import Header from '@/components/molecules/Header.vue';
import NavBar from '@/components/organisms/NavBar.vue';
import FiltersManagement from '@/components/organisms/FiltersManagement.vue';
import SuccessNotification from '@/components/atoms/SuccessNotification.vue';

import { handlePageReload } from './utils/ghPagesReloadHandler';
import { useNavProvider } from '@/providers/useNav';
import { useCarsProvider } from '@/providers/useCars';
import { useNotificationsProvider } from '@/providers/useNotifications';

handlePageReload();

useNavProvider();
const { comparedCars } = useCarsProvider();
const { successNotifications } = useNotificationsProvider();
</script>

<template>
	<div class="app-wrapper">
		<Header />
		<NavBar :comparedCarsNumber="comparedCars.length" />
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

.app-wrapper {
	@media (min-width: 900px) {
		display: grid;
		grid-template-columns: 1fr auto;
		grid-template-rows: auto 1fr;
		height: 100vh;
		height: 100svh;
		overflow: clip;
	}

	@media (min-width: 1200px) {
		grid-template-columns: 300px 1fr auto;
	}

	@media (min-width: 1400px) {
		grid-template-columns: 320px 1fr auto;
	}

	@media (min-width: 1600px) {
		grid-template-columns: 320px 1fr 320px;
	}
}

.content-wrapper {
	@media (min-width: 900px) { 
		grid-column: 1 / 2;
		grid-row: 2 / 3;
		overflow-x: auto;
	}

	@media (min-width: 1200px) {
		grid-column: 2 / 3;
	}
}
</style>
