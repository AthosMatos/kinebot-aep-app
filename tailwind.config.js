const { appColors } = require("./src/constants/colors.config");

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	presets: [require("nativewind/preset")],
	theme: {
		extend: {
			colors: appColors,
		},
	},
	plugins: [],
};
