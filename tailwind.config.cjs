const colors = require('tailwindcss/colors');

module.exports = {
	content: ['./src/**/*.{svelte,html}'],
	theme: {
		extend: {},
		colors: {
			...colors,
			primary: colors.stone
		}
	},
	plugins: []
};
