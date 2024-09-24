// tailwind.config.js
module.exports = {
	content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				special: "Bebas Neue, Sans-serif",
				head: "Madimi One, Sans-serif",
				curved: "Caveat, cursive",
				body: "Nunito, sans-serif",
			},
			colors: {
				accentPrimary: "#F652A0",
				primary: "#16213E",
			},
			backgroundColor: {
				accentPrimary: "#F652A0",
				primary: "#16213E",
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
};
