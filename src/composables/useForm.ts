import type { FormValuesType } from '@/types/types';
import { ref } from 'vue';

const initialFormValues = {
	brand: 'Daewoo',
	model: 'Nubira',
	generation: 'I (J100)',
	productionStartYear: 1997,
	productionEndYear: 2003,
	facelift: '1999',
	img: {
		small: 'https://www.datocms-assets.com/112049/1730745382-daewoo_nubira_i_320.jpg',
		medium: 'https://www.datocms-assets.com/112049/1730745382-daewoo_nubira_i_1280.jpg',
		big: 'https://www.datocms-assets.com/112049/1729758737-daewoo_nubira_i.jpg',
	},
};

export const useForm = () => {
	const formValues = ref<FormValuesType>({ ...initialFormValues });

	const handleInputChange = (e: InputEvent & { target: HTMLInputElement }) => {
		const inputName = e.target.name as keyof FormValuesType;
		const inputValue = e.target.type === 'number' ? Number(e.target.value) : e.target.value;

		if (inputName === 'img') {
			formValues.value.img = {
				small: e.target.value,
				medium: e.target.value,
			};
		} else {
			(formValues.value[inputName] as typeof inputValue) = inputValue;
		}
	};

	const clearForm = () => {
		formValues.value = {
			brand: '',
			model: '',
			generation: '',
			productionStartYear: 2000,
			productionEndYear: 2001,
			facelift: '',
			img: {
				small: '',
				medium: '',
			},
		};
	};

	return {
		formValues,
		handleInputChange,
		clearForm,
	};
};
