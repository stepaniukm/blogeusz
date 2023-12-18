import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import remarkToc from "remark-toc";
import remarkCollapse from "remark-collapse";
import sitemap from "@astrojs/sitemap";
import theme from "./horizon-italic.json";
import partytown from "@astrojs/partytown";
import qwikdev from "@qwikdev/astro";

// https://astro.build/config
export default defineConfig({
	prefetch: true,
	site: "https://blogeusz.pl/",
	vite: {
		define: {
			"import.meta.env.PUBLIC_VERCEL_ANALYTICS_ID": JSON.stringify(process.env.VERCEL_ANALYTICS_ID),
		},
	},
	integrations: [
		tailwind({
			config: {
				applyBaseStyles: false,
			},
		}),
		sitemap(),
		partytown(),
		qwikdev(),
	],
	markdown: {
		remarkPlugins: [
			remarkToc,
			[
				remarkCollapse,
				{
					test: "Table of contents",
				},
			],
		],
		shikiConfig: {
			theme,
			wrap: true,
		},
		extendDefaultPlugins: true,
	},
});
