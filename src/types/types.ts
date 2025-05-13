type CarImageType = {
	small: string;
	medium: string;
	big?: string;
};

export type CarType = {
	id?: string;
	brand: string;
	model: string;
	generation: string;
	productionStartYear: number;
	productionEndYear: number;
	facelift: string;
	img: CarImageType;
};

export type FilterValueType<T> = {
	value: T,
	isActive: boolean
}

export type FormValuesType = {
	brand: string;
	model: string;
	generation: string;
	productionStartYear: number;
	productionEndYear: number;
	facelift: string;
	img: CarImageType;
};

export type UsersFilterPreferencesType = {
	brands: FilterValueType<string>[]
	years: FilterValueType<number>[]
}