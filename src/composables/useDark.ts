import { useDark } from '@vueuse/core';

export const useDarkLocal = () => {
	const html = document.querySelector('html')!;
	return useDark({
		selector: 'body',
		storageKey: 'dark-mode',
		valueDark: 'dark',
		valueLight: 'light',
		listenToStorageChanges: true,
		onChanged: (mode) => {
			if (mode) {
				html.classList.add('dark');
			} else {
				html.classList.remove('dark');
			}
		},
	});
};
