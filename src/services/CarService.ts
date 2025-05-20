import type { SelectOptionType } from '@/types/types';
import axios from 'axios';

const apiClient = axios.create({
	baseURL: 'https://my-json-server.typicode.com/writecleancode/compact-cars-vue',
	withCredentials: false,
	headers: {
		Accept: 'application/json',
		'Content-Type': 'application/json',
	},
});

export const getCars = (page = 1, perPage = 8) => {
	return apiClient.get(`/cars?_limit=${perPage}&_page=${page}`);
};

export const getFilterOptions = () => {
	return Promise.all([apiClient.get<number[]>('/filterYears'), apiClient.get<string[]>('/filterBrands')]);
};

export const getSortOptions = () => {
	return apiClient.get<SelectOptionType[]>('/selectOptions');
};
