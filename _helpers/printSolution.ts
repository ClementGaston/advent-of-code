export function printSolution(stringTemplate: string, values: any[]): void {
	const splitedTemplate = stringTemplate.split("$$");

	if (splitedTemplate.length - 1 !== values.length) {
		throw new Error("Mismatch between placeholders and values provided.");
	}

	const result = splitedTemplate
		.map((part, index) => {
			// Highlight the values in cyan using ANSI escape codes
			const highlightedValue =
				index < values.length ? `\x1b[36m${values[index]}\x1b[0m` : "";
			return part + highlightedValue;
		})
		.join("");

	console.log(result);
}
