// eslint-disable-next-line @typescript-eslint/no-require-imports
const { appColors } = require("./colors.config") as {
	appColors: {
		primary: string;
		neutral: { light: string; medium: string; dark: string };
		text: { primary: string; secondary: string };
		transparent: string;
	};
};

export { appColors };
export type AppColors = typeof appColors;