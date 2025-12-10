import { printSolution } from "../../_helpers/printSolution";
import { get2dInput } from "../../_helpers/readInput";

// Get inputs
const inputs = get2dInput(__dirname, ",").map((point) =>
	point.map((coord) => parseInt(coord)),
);

let maxDist = 0;

for (let pointIdx = 0; pointIdx < inputs.length - 1; pointIdx++) {
	for (
		let sndPointIdx = pointIdx + 1;
		sndPointIdx < inputs.length;
		sndPointIdx++
	) {
		const firstPoint = inputs[pointIdx];
		const secondPoint = inputs[sndPointIdx];

		const xDist = Math.abs(firstPoint[0] - secondPoint[0]) + 1;
		const yDist = Math.abs(firstPoint[1] - secondPoint[1]) + 1;
		const area = xDist * yDist;

		if (area > maxDist) maxDist = area;
	}
}

printSolution("The max area of a square between 2 red dots is $$", [maxDist]);
