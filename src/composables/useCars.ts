import { cars as carsData } from '@/data/cars';
import { filterBrands, filterYears } from '@/data/filters';
import { ref } from 'vue';

export const useCars = () => {
	const filterYearsData = filterYears.map(option => ({ value: option, isActive: false }));
	const filterBrandsData = filterBrands.map(option => ({ value: option, isActive: false }));

	let filteredCars = [];

	const getCarName = car => `${car.brand} ${car.model}`;
	const getCarProductionYear = car => car.productionStartYear;

	const cars = ref(carsData);
	const carsToDisplay = ref([]);
	const comparedCars = ref([]);
	const usersFilterPreferences = ref({ brands: filterBrandsData, years: filterYearsData });

	const removeCar = clickedCarId => {
		const filteredCars = cars.value.filter(car => car.id !== clickedCarId);
		cars.value = filteredCars;
	};

	const removeCarFromComparison = clickedCarId => {
		const filteredCars = comparedCars.value.filter(car => car.id !== clickedCarId);
		comparedCars.value = filteredCars;
	};

	const handleRemoveCar = clickedCarId => {
		removeCar(clickedCarId);
		removeCarFromComparison(clickedCarId);
	};

	const handleCompareStatus = clickedCarId => {
		if (comparedCars.value.some(car => car.id === clickedCarId)) {
			removeCarFromComparison(clickedCarId);
		} else {
			const clickedCar = cars.value.find(car => car.id === clickedCarId);
			clickedCar && comparedCars.value.push(clickedCar);
		}
	};

	const findCars = inputValue => {
		const carsToCheck = cars.value === filteredCars ? cars.value : filteredCars;

		const matchingCars = inputValue
			? carsToCheck.filter(car => `${car.brand} ${car.model}`.toLowerCase().includes(inputValue.toLowerCase().trim()))
			: carsToCheck;

		return matchingCars;
	};

	const filterCars = () => {
		filteredCars = cars.value;

		if (usersFilterPreferences.value.brands.some(option => option.isActive)) {
			const filteredByBrand = [];
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

	const setCarsToDisplay = cars => {
		carsToDisplay.value = cars;
	};

	const addCar = newCar => {
		cars.value.unshift(newCar);
	};

	const sortCars = (sortCriteria = 'byAlphabet') => {
		const sortedCars = cars.value.toSorted((carA, carB) => {
			if (sortCriteria.toLowerCase().includes('alphabet')) {
				carA = getCarName(carA);
				carB = getCarName(carB);
			} else if (sortCriteria.toLowerCase().includes('year')) {
				carA = getCarProductionYear(carA);
				carB = getCarProductionYear(carB);
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

		cars.value = sortedCars;
	};

	const handleFilterPreferences = clickedOption => {
		const optionType = typeof clickedOption === 'number' ? 'years' : 'brands';
		const clickedOptionIndex = usersFilterPreferences.value[optionType].map(option => option.value).indexOf(clickedOption);

		usersFilterPreferences.value[optionType][clickedOptionIndex].isActive =
			!usersFilterPreferences.value[optionType][clickedOptionIndex].isActive;
	};

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
