import { printSolution } from "../../_helpers/printSolution";
import { get2dInput } from "../../_helpers/readInput";

// Get inputs
const inputs = get2dInput(__dirname);
const colLength = inputs.length;
const rowLength = inputs[0].length;
const PAPER_ROLL_CHAR = "@";

const eightDirections = [
	[-1, 1],
	[0, 1],
	[1, 1],
	[1, 0],
	[1, -1],
	[0, -1],
	[-1, -1],
	[-1, 0],
];

function isInsideTheBbox(x: number, y: number) {
	return y >= 0 && y < colLength && x >= 0 && x < rowLength;
}

function removePaperRoll(input: string[][]) {
	const newInput = [...input.map((r) => [...r])];
	let validPaperRoll = 0;

	for (let y = 0; y < colLength; y++) {
		for (let x = 0; x < rowLength; x++) {
			const currentPosition = input[y][x];
			if (currentPosition !== PAPER_ROLL_CHAR) continue;

			let adjacentsPaperRoll = 0;

			for (const dir of eightDirections) {
				const xToCheck = x + dir[0];
				const yToCheck = y + dir[1];

				if (
					isInsideTheBbox(xToCheck, yToCheck) &&
					input[yToCheck][xToCheck] === PAPER_ROLL_CHAR
				) {
					adjacentsPaperRoll++;
				}
			}

			if (adjacentsPaperRoll < 4) {
				validPaperRoll++;
				newInput[y][x] = ".";
			}
		}
	}

	return { newInput, paperRollRemoved: validPaperRoll };
}

let continueToRemove = true;
let udpatedInput = inputs;
let totalRemoved = 0;
let firstTime = 0;

while (continueToRemove) {
	const { newInput, paperRollRemoved } = removePaperRoll(udpatedInput);
	if (totalRemoved === 0) {
		firstTime = paperRollRemoved;
	}

	udpatedInput = newInput;
	totalRemoved += paperRollRemoved;

	if (paperRollRemoved === 0) continueToRemove = false;
}

printSolution(
	"There is $$ rolls of paper accessible by the forklifts the first time. By the end of all manipulations, we have removed $$ rolls of paper",
	[firstTime, totalRemoved],
);
