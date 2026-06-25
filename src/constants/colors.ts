// eslint-disable-next-line @typescript-eslint/no-require-imports
const appColors = {
	primary: "#2F54EB",
	feedback: {
		danger: '#D13342'
	},
	neutral: {
		light: "#f5f5f5",
		medium: "#747474",
		dark: "#212121",
	},
	text: {
		primary: "#ffffff",
		secondary: "#b3b3b3",
	},

	transparent: "transparent",
}

export { appColors };
export type AppColors = typeof appColors;