import fs from "fs";

export function readInput(dirPath: string): string[][] {
	const data = fs.readFileSync(`${dirPath}/input.txt`, "utf-8"); // Read the file synchronously
	const lines = data.split(/\r?\n/); // Split file content into lines (handles Windows and Unix line endings)
	const formattedLines = [];

	for (let idx = 0; idx <= lines.length - 1; idx++) {
		formattedLines.push(lines[idx].split(/\s+/g));
	}
	return formattedLines;
}

export function get1dInput(dirPath: string): string[] {
	const data = fs.readFileSync(`${dirPath}/input.txt`, "utf-8"); // Read the file synchronously
	const lines = data.split(/\r?\n/); // Split file content into lines (handles Windows and Unix line endings)

	return lines;
}

export function formatInputToLetterGrid(lines: string[]): string[][] {
	return lines.map((line: string) => line.split(""));
}
