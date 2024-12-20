import { createProvider } from '@/utils/createProvider';
import { v4 as uuid } from 'uuid';
import { ref } from 'vue';

const useNotifications = () => {
	const successNotifications = ref<string[]>([]);

	const removeSuccessNotification = (id: string) => {
		successNotifications.value = successNotifications.value.filter(el => el !== id);
	};

	const handleSuccessNotifications = () => {
		const id = uuid();
		successNotifications.value.push(id);

		setTimeout(() => removeSuccessNotification(id), 2000);
	};

	return {
		successNotifications,
		handleSuccessNotifications,
	};
};

export const [useNotificationsProvider, useNotificationsContext] = createProvider('Notifications', useNotifications);
