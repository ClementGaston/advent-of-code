import { printSolution } from "../../_helpers/printSolution";
import { get2dInput } from "../../_helpers/readInput";

// Get inputs
const inputs = get2dInput(__dirname, "");
let beamsX: { [idx: number]: number } = {};
let nbOfSPlit = 0;

// Add starting beam
beamsX[inputs[0].findIndex((v) => v === "S")] = 1;

for (let rowIdx = 1; rowIdx < inputs.length; rowIdx++) {
	for (const [xStr, nbrOfBeam] of Object.entries(beamsX)) {
		const x = parseInt(xStr);
		if (inputs[rowIdx][x] !== "^" || nbrOfBeam === 0) continue;

		nbOfSPlit++;
		beamsX[x + 1] = beamsX[x + 1] ? beamsX[x + 1] + beamsX[x] : beamsX[x];
		beamsX[x - 1] = beamsX[x - 1] ? beamsX[x - 1] + beamsX[x] : beamsX[x];
		delete beamsX[x];
	}
}

const totalBeamPossibilities = Object.values(beamsX).reduce(
	(total, value) => total + value,
	0,
);

printSolution("There is $$ split of beam for a total of $$ possible paths", [
	nbOfSPlit,
	totalBeamPossibilities,
]);
