const colors = require('tailwindcss/colors');
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
	content: ['./src/**/*.{svelte,html,ts,js}'],
	theme: {
		extend: {},
		screens: {
			xs: '320px',
			...defaultTheme.screens,
			standalone: { raw: 'all and (display-mode: standalone)' }
		},
		colors: {
			...colors,
			primary: colors.stone
		}
	},
	plugins: [require('tailwindcss-safe-area')]
};
