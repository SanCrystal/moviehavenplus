//@ts-ignore
import ColorThief from "colorthief";
type AverageColor = {
	bgColor: string | `#${string}`;
	textColor: string | `#${string}`;
};
export const getAverageColor = (
	imageString: HTMLImageElement | null
): AverageColor | { bgColor: ""; textColor: "" } => {
	if (!imageString) return { bgColor: "", textColor: "" };
	const thief = new ColorThief();
	const dominantColor = thief.getColor(imageString) as number[];
	//covert to hex string
	const redHex = dominantColor[0].toString(16).padStart(2, "0");
	const greenHex = dominantColor[1].toString(16).padStart(2, "0");
	const blueHex = dominantColor[2].toString(16).padStart(2, "0");
	return {
		bgColor: `bg-[#${redHex}${greenHex}${blueHex}]/60`,
		textColor: `text-[#${redHex}${greenHex}${blueHex}]/60`,
	};
};

export const hexToHSL = (hex: string) => {
	// Convert hex color to RGB
	const r = parseInt(hex.slice(1, 3), 16) / 255;
	const g = parseInt(hex.slice(3, 5), 16) / 255;
	const b = parseInt(hex.slice(5, 7), 16) / 255;

	const max = Math.max(r, g, b);
	const min = Math.min(r, g, b);
	let h,
		s,
		l = (max + min) / 2;

	if (max === min) {
		// Achromatic (gray)
		h = s = 0;
	} else {
		const d = max - min;
		s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
		switch (max) {
			case r:
				h = (g - b) / d + (g < b ? 6 : 0);
				break;
			case g:
				h = (b - r) / d + 2;
				break;
			case b:
				h = (r - g) / d + 4;
				break;
		}
		h! *= 60;
	}

	return [h, s * 100, l * 100];
};

export const hslToHex = (h: number, s: number, l: number) => {
	s /= 100;
	l /= 100;

	let c = (1 - Math.abs(2 * l - 1)) * s;
	let x = c * (1 - Math.abs(((h / 60) % 2) - 1));
	let m = l - c / 2;
	let r, g, b;

	if (h >= 0 && h < 60) {
		r = c;
		g = x;
		b = 0;
	} else if (h >= 60 && h < 120) {
		r = x;
		g = c;
		b = 0;
	} else if (h >= 120 && h < 180) {
		r = 0;
		g = c;
		b = x;
	} else if (h >= 180 && h < 240) {
		r = 0;
		g = x;
		b = c;
	} else if (h >= 240 && h < 300) {
		r = x;
		g = 0;
		b = c;
	} else {
		r = c;
		g = 0;
		b = x;
	}

	r = Math.round((r + m) * 255)
		.toString(16)
		.padStart(2, "0");
	g = Math.round((g + m) * 255)
		.toString(16)
		.padStart(2, "0");
	b = Math.round((b + m) * 255)
		.toString(16)
		.padStart(2, "0");

	return `#${r}${g}${b}`;
};

export const convertHexToAccentColor = (hexColor: string) => {
	// Convert hex to HSL
	const [h, s, l] = hexToHSL(hexColor);

	// Adjust lightness and saturation for accent color
	const accentLightness = Math.min(l! + 15, 100);
	const accentSaturation = Math.min(s! + 15, 100);

	// Convert HSL back to hex
	const accentHexColor = hslToHex(h!, accentSaturation, accentLightness);

	return accentHexColor;
};
export const GenerateYearRAnge = (
	fromYear: number = new Date().getFullYear(),
	toYear: number = new Date().getFullYear()
): number[] => {
	const years = [];
	if (fromYear > toYear) {
		for (let year = toYear; year <= toYear; year++) {
			years.push(year);
		}
	} else {
		for (let year = fromYear; year <= toYear; year++) {
			years.push(year);
		}
	}
	return years;
};

export const createQueryStringFromArray = (
	array: string[],
	key: string
): string => {
	// Map each string in the array to a query parameter
	const queryString = array
		.map((value) => {
			// Encode the key and value to handle special characters
			const encodedKey = encodeURIComponent(key);
			const encodedValue = encodeURIComponent(value);
			return `${encodedKey}=${encodedValue}`;
		})
		.join("&"); // Join all parameters with '&'

	return queryString;
};

export const contructQueryURL = (
	year: number,
	genres: string[],
	title: string,
	popularity: string
): string => {
	return `year=${year}&${createQueryStringFromArray(
		genres,
		"genres"
	)}&title=${title}&popularity=${popularity}`;
};

export const getMyToken = (): string => {
	return `${import.meta.env.VITE_MOVIE_DB_API_KEY}`;
};
