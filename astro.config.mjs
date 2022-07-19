import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';
import unlighthouse from '@unlighthouse/vite';
import prefetch from '@astrojs/prefetch';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import image from '@astrojs/image';

// https://astro.build/config
export default defineConfig({
	site: 'https://blogeusz.pl',
	integrations: [vue(), prefetch(), sitemap(), tailwind(), image()],
	vite: {
		plugins: [
			unlighthouse({
				site: 'localhost:3000',
				apiPrefix: '/',
				routerPrefix: '/',
				debug: true,
				scanner: {
					device: 'desktop',
				},
			}),
		],
	},
});
