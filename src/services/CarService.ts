import type { CarType, SelectOptionType } from '@/types/types';
import axios from 'axios';

const apiClient = axios.create({
	// baseURL: 'https://my-json-server.typicode.com/writecleancode/compact-cars-vue',
	baseURL: 'http://localhost:3000',
	withCredentials: false,
	headers: {
		Accept: 'application/json',
		'Content-Type': 'application/json',
	},
});

export const getCars = (page = 1, perPage = 8, exclude?: string[]) => {
	if (exclude?.length) {
		return apiClient.get(`/cars?_limit=${perPage}&_page=${page}${exclude.map(id => `&id_ne=${id}`).join('')}`);
	} else {
		return apiClient.get(`/cars?_limit=${perPage}&_page=${page}`);
	}
	// return apiClient.get(`/cars?_limit=${perPage}&_page=${page}`);
};

export const getCarsByIds = (ids: string[]) => {
	return apiClient.get(`/cars?id=${ids.join('&id=')}`);
};

export const getCarDetails = (id: string) => {
	return apiClient.get(`/cars/${id}`);
};

export const updateCar = (id: string, carData: CarType) => {
	return apiClient.put(`/cars/${id}`, carData);
};

export const getFilterOptions = () => {
	return Promise.all([apiClient.get<{ value: number }[]>('/filterYears'), apiClient.get<{ value: string }[]>('/filterBrands')]);
};

export const getSortOptions = () => {
	return apiClient.get<SelectOptionType[]>('/selectOptions');
};
