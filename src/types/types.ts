type carImageType = {
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
	img: carImageType;
};
