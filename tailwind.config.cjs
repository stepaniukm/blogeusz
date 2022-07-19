/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			fontFamily: {
				'source-code-pro': ['Source Code Pro', 'monospace'],
				worksans: ['Work Sans', 'sans-serif'],
			},
			backgroundImage: {
				dark: "url('/background-dark.png')",
				light: "url('/background-light.png')",
				leaves: "url('/leaves.webp')",
			},
			colors: {
				olive: '#062B2B',
			},
			backgroundSize: {
				half: '80%',
			},
		},
	},
	plugins: [],
	darkMode: 'class',
};
