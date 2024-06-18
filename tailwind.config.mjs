/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			screens: {
				xs: '450px',
			},
			fontFamily: {
				sans: ['Chakra Petch', 'sans-serif'],
				italic: ['Chakra Petch', 'sans-serif']
			},
			fontSize: {
				xs: ['0.6rem', '0.8rem'],
				base: ['1rem', '1.3rem'],
				"text-2xl": ['1.4rem', '1.7rem'],
				heading: ['1.625rem', '1.95rem']
			},
			fontWeight: {
				normal: '400'
			}
		}
	},
	plugins: [
		require('@tailwindcss/forms'),
		function({ addBase }) {
			addBase({
				'h1, h2, h3, h4, h5, h6': { fontFamily: 'Bebas Neue, sans-serif', fontSize: '1.625rem', lineHeight: '1.95rem' },
				'body': { fontFamily: 'Chakra Petch, sans-serif' },
			});
		}
	],
}
