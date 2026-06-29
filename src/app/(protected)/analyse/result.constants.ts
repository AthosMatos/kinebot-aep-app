export type ResultCategory = {
    key: string;
    label: string;
    color: string;
};

// Níveis de risco fixos que compõem o resultado de uma análise (e o pie chart).
export const RESULT_CATEGORIES: ResultCategory[] = [
    { key: "acceptable", label: "Aceitável", color: "#2EAD4B" },
    { key: "moderate", label: "Moderado", color: "#F5B400" },
    { key: "high", label: "Elevado", color: "#F2711C" },
    { key: "veryHigh", label: "Muito elevado", color: "#E0301E" },
    { key: "severe", label: "Grave e iminente", color: "#7E3FF2" },
];
