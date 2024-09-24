import { GenerateYearRAnge } from "@/utils/utils";

export const searchData = [
	{ text: "Genre", hasDropDown: true, externalText: "" },
	{ text: "Title", hasDropDown: false, externalText: "" },
	{ text: "Year", hasDropDown: true, externalText: "" },
	{ text: "Popularity", hasDropDown: true, externalText: "" },
];

export const GenreList = [
	"Action",
	"Adventure",
	"Comedy",
	"Drama",
	"Thriller",
	"Horror",
	"Science Fiction (Sci-Fi)",
	"Fantasy",
	"Mystery",
	"Romance",
	"Musical",
	"Animation",
	"Documentary",
	"Crime",
	"Family",
	"Historical",
	"Western",
];

export const Years = GenerateYearRAnge(1989, 2024);

export const Popularity = [
	{ item: "Very Popular", value: 2000, valueCap: 10000 },
	{ item: "Popular", value: 1000, valueCap: 2000 },
	{ item: "Under the radar", value: 400, valueCap: 1000 },
	{ item: "Not Popular", value: 50, valueCap: 400 },
];
