import { Result } from "@/api/endpoints/analyses.endpoints";
import { RESULT_CATEGORIES } from "../../result.constants";

// Casa um result (possivelmente legado) com a categoria canônica por key, label ou cor.
const findCategory = (r: Partial<Result>) =>
	RESULT_CATEGORIES.find(
		(c) =>
			c.key === r.key ||
			c.label.toLowerCase() === r.label?.toLowerCase().trim() ||
			c.color.toLowerCase() === r.color?.toLowerCase()
	);

// Normaliza os results para as keys/labels/cores canônicas, evitando que uma
// categoria já existente (com key legada) seja tratada como "não usada".
export const normalizeResults = (results: Result[]): Result[] =>
	results.map((r) => {
		const category = findCategory(r);
		return category
			? { key: category.key, label: category.label, color: category.color, percentage: r.percentage }
			: r;
	});
