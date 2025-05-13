import type { SelectOptionType } from "@/types/types";
import axios from "axios";

const instance = axios.create({
    baseURL: 'https://my-json-server.typicode.com/writecleancode/compact-cars-vue',
    timeout: 1000,
})

export const getCars = async () => {
    try {
        return await instance.get('/cars')
    } catch (error) {
        console.log(error);
    }
}

export const getFilterOptions = async () => {
    try {
        return await Promise.all([instance.get<number[]>('/filterYears'), instance.get<string[]>('/filterBrands')])
    } catch (err) {
        console.log(err);
        return []
    }
}

export const getSortOptions = async () => {
	try {
		return await instance.get<SelectOptionType[]>('/selectOptions')
	} catch (err) {
		console.log(err)
	}
}
