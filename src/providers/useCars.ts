import type { CarType, UsersFilterPreferencesType } from '@/types/types';
import { createProvider } from '@/utils/createProvider';
import { onMounted, ref } from 'vue';
import axios from 'axios';

const useCars = () => {
	let filteredCars: CarType[] = [];

	const getCarName = (car: CarType) => `${car.brand} ${car.model}`;
	const getCarProductionYear = (car: CarType) => car.productionStartYear;

	const cars = ref<CarType[]>([]);
	const carsToDisplay = ref<CarType[]>([]);
	const comparedCars = ref<CarType[]>([]);
	const usersFilterPreferences = ref<UsersFilterPreferencesType>({ brands: [], years: [] });

	const removeCar = (clickedCarId: string) => {
		const filteredCars = cars.value.filter(car => car.id !== clickedCarId);
		cars.value = filteredCars;
	};

	const removeCarFromComparison = (clickedCarId: string) => {
		const filteredCars = comparedCars.value.filter(car => car.id !== clickedCarId);
		comparedCars.value = filteredCars;
	};

	const handleRemoveCar = (clickedCarId: string) => {
		removeCar(clickedCarId);
		removeCarFromComparison(clickedCarId);
	};

	const handleCompareStatus = (clickedCarId: string) => {
		if (comparedCars.value.some(car => car.id === clickedCarId)) {
			removeCarFromComparison(clickedCarId);
		} else {
			const clickedCar = cars.value.find(car => car.id === clickedCarId);
			clickedCar && comparedCars.value.push(clickedCar);
		}
	};

	const findCars = (inputValue: string) => {
		const carsToCheck = cars.value === filteredCars ? cars.value : filteredCars;

		const matchingCars = inputValue
			? carsToCheck.filter(car => `${car.brand} ${car.model}`.toLowerCase().includes(inputValue.toLowerCase().trim()))
			: carsToCheck;

		return matchingCars;
	};

	const filterCars = () => {
		filteredCars = cars.value;

		if (usersFilterPreferences.value.brands.some(option => option.isActive)) {
			const filteredByBrand: CarType[] = [];
			const activeFilterClasses = usersFilterPreferences.value.brands.filter(option => option.isActive);

			cars.value.forEach(car => {
				activeFilterClasses.forEach(option => option.value === car.brand && filteredByBrand.push(car));
			});

			filteredCars = filteredByBrand;
		}

		if (usersFilterPreferences.value.years.some(option => option.isActive)) {
			usersFilterPreferences.value.years.forEach(option => {
				if (option.isActive) {
					filteredCars = filteredCars.filter(
						car => option.value >= car.productionStartYear && option.value <= car.productionEndYear && car
					);
				}
			});
		}

		return filteredCars;
	};

	const setCarsToDisplay = (cars: CarType[]) => {
		carsToDisplay.value = cars;
	};

	const addCar = (newCar: CarType) => {
		cars.value.unshift(newCar);
	};

	const sortCars = (sortCriteria = 'byAlphabet') => {
		cars.value.sort((carA: CarType | string | number, carB: CarType | string | number) => {
			if (sortCriteria.toLowerCase().includes('alphabet')) {
				carA = getCarName(carA as CarType);
				carB = getCarName(carB as CarType);
			} else if (sortCriteria.toLowerCase().includes('year')) {
				carA = getCarProductionYear(carA as CarType);
				carB = getCarProductionYear(carB as CarType);
			}

			if (sortCriteria.toLowerCase().includes('reverse')) {
				[carA, carB] = [carB, carA];
			}

			if (carA < carB) {
				return -1;
			} else if (carA > carB) {
				return 1;
			} else {
				return 0;
			}
		});
	};

	const handleFilterPreferences = (clickedOption: number | string) => {
		const optionType = typeof clickedOption === 'number' ? 'years' : 'brands';
		const clickedOptionIndex = usersFilterPreferences.value[optionType].map(option => option.value).indexOf(clickedOption);

		usersFilterPreferences.value[optionType][clickedOptionIndex].isActive =
			!usersFilterPreferences.value[optionType][clickedOptionIndex].isActive;
	};

	const getCars = async () => {
		try {
			const response = await axios.get('https://my-json-server.typicode.com/writecleancode/compact-cars-vue/cars')
			cars.value = response.data
		} catch (err) {
			console.log(err);
		}
	}

	const getFilterOptions = async () => {
		try {
			const [responseYears, responseBrands] = await Promise.all([axios.get<number[]>('https://my-json-server.typicode.com/writecleancode/compact-cars-vue/filterYears'), axios.get<string[]>('https://my-json-server.typicode.com/writecleancode/compact-cars-vue/filterBrands')])
			
			const filterYearsData = responseYears.data.map(option => ({ value: option, isActive: false }));
			const filterBrandsData = responseBrands.data.map(option => ({ value: option, isActive: false }));

			usersFilterPreferences.value = { brands: filterBrandsData, years: filterYearsData }
		} catch (err) {
			console.log(err);
		}
	}

	onMounted(() => {
		getCars()
		getFilterOptions()
	});

	return {
		cars,
		carsToDisplay,
		comparedCars,
		usersFilterPreferences,
		handleCompareStatus,
		handleRemoveCar,
		findCars,
		filterCars,
		setCarsToDisplay,
		sortCars,
		handleFilterPreferences,
		addCar,
	};
};

export const [useCarsProvider, useCarsContext] = createProvider('Cars', useCars);
