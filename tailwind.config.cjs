const colors = require('tailwindcss/colors');
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
	content: ['./src/**/*.{svelte,html,ts,js}'],
	theme: {
		extend: {},
		screens: {
			iphoneSE: { max: '320px' },
			iphone: { max: '375px' },
			ipnonePlus: { max: '414px' },
			...defaultTheme.screens
		},
		colors: {
			...colors,
			primary: colors.stone
		}
	},
	plugins: [require('tailwindcss-safe-area')]
};
