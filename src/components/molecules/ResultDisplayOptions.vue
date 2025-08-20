<script setup lang="ts">
import Select from '@/components/molecules/Select.vue';
import StyledTitle from '@/components/atoms/StyledTitle.vue';

import type { SelectOptionType } from '@/types/types';
import { useCarsContext } from '@/providers/useCars';
import { onMounted, ref, watch } from 'vue';
import { getSortOptions } from '@/services/CarService';

const props = defineProps<{
	page: number;
}>();

const { getCarsData, sortCars } = useCarsContext();

const selectOptions = ref<SelectOptionType[]>([]);
const perPageSelectOptions = ref(['8', '16', '24', '32', '40']);
const selectedSortValue = ref('');
const selectedPerPageValue = ref(Number(perPageSelectOptions.value[0]));

const handleSortSelectValueChange = (e: Event & { target: HTMLSelectElement }) => {
	const selectedValue = e.target.value;
	selectedSortValue.value = selectedValue;
	sortCars(selectedValue);
};

const handlePerPageSelectValueChange = (e: Event & { target: HTMLSelectElement }) => {
	const selectedValue = e.target.value;
	selectedPerPageValue.value = Number(selectedValue);
	// sortCars(selectedValue);
};

const getSortOptionsData = async () => {
	try {
		const response = await getSortOptions();
		if (response) selectOptions.value = response.data;
	} catch (err) {
		console.log(err);
	}
};

onMounted(() => getSortOptionsData());

watch(
	() => selectedPerPageValue.value,
	() => {
		getCarsData(props.page, selectedPerPageValue.value);
	}
);
</script>

<template>
	<div class="result-display-options-wrapper">
		<StyledTitle :is-filter-title="true" class="title">Result display options</StyledTitle>
		<div class="select-elements-wrapper">
			<Select
				:label="'sort cars'"
				:options="selectOptions"
				default-option="sort cars"
				:selected-value="selectedSortValue"
				v-on:handle-selected-value-change="handleSortSelectValueChange" />
			<div class="per-page-wrapper">
				<label for="perPage">cars per page</label>
				<Select
					id="perPage"
					:options="perPageSelectOptions"
					:selected-value="selectedPerPageValue"
					v-on:handle-selected-value-change="handlePerPageSelectValueChange" />
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.result-display-options-wrapper {
	display: flex;
	flex-direction: column;
	gap: 1.6rem;

	@media (width >= 640px) {
		display: contents;
	}

	:deep(.select) {
		width: 100%;

		@media (width >= 640px) {
			width: initial;
		}
	}

	.title {
		@media (width >= 640px) {
			display: none;
		}
	}
}

.select-elements-wrapper {
	display: flex;
	flex-direction: column;
	gap: 1.6rem;
	margin-bottom: 3.2rem;

	@media (width >= 640px) {
		display: contents;
	}

	label {
		display: inline-block;
		margin-bottom: 0.8rem;
		font-size: 1.4rem;

		@media (width >= 640px) {
			margin-bottom: 0;
		}
	}
}

.per-page-wrapper {
	font-weight: 600;

	@media (width >= 640px) {
		display: flex;
		flex-direction: row-reverse;
		align-items: center;
		gap: 0.8rem;
		font-weight: initial;
	}
}
</style>
