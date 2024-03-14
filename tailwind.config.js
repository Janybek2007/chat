/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {},
		screens: {
			tx: '320px',
			xt: '380px',
			xs: '480px',
			ss: '620px',
			sm: '768px',
			sd: '910px',
			md: '1020px',
			ms: '1130px',
			lm: '1240px',
			lg: '1370px',
			xl: '1500px',
			'2xl': '1630px'
		}
	},

	plugins: []
}
