import { printSolution } from "../../_helpers/printSolution";
import { get1dInput } from "../../_helpers/readInput";

// Get inputs
const inputs = get1dInput(__dirname);

const DEFAULT_ARROW_POSITION = 50;
let currentArrowPosition = DEFAULT_ARROW_POSITION;
let nbOfTimeZeroIsPointed = 0;
let nbOfTimeZeroIsCrossed = 0;

for (const rotation of inputs) {
	// Parse row input
	const match = /(?<direction>\w)(?<distance>\d*)/.exec(rotation);

	if (!match || !match.groups) {
		throw new Error("Invalid rotation format");
	}

	const { direction, distance: distanceStr } = match.groups;
	const distanceNbr = parseInt(distanceStr);

	if (!direction || isNaN(distanceNbr)) {
		throw new Error("Invalid rotation format");
	}

	const fullRotation = Math.floor(distanceNbr / 100);
	nbOfTimeZeroIsCrossed += fullRotation;
	const distance = distanceNbr % 100;

	// Used to avoid counting a rotation if starting rotation from 0
	const oldCurrentArrowPosition = currentArrowPosition;

	// Apply rotation
	if (direction === "L") {
		currentArrowPosition -= distance;

		if (currentArrowPosition < 0) {
			currentArrowPosition += 100;
			if (oldCurrentArrowPosition !== 0 && currentArrowPosition !== 0)
				nbOfTimeZeroIsCrossed += 1;
		}
	} else {
		currentArrowPosition += distance;

		if (currentArrowPosition > 99) {
			currentArrowPosition -= 100;
			if (oldCurrentArrowPosition !== 0 && currentArrowPosition !== 0)
				nbOfTimeZeroIsCrossed += 1;
		}
	}

	if (currentArrowPosition === 0) nbOfTimeZeroIsPointed++;
}

printSolution("After deconding, zero is pointed $$ times", [
	nbOfTimeZeroIsPointed,
]);

printSolution(
	"After deconding using the 0x434C49434B method, zero is pointed $$ times",
	[nbOfTimeZeroIsCrossed + nbOfTimeZeroIsPointed],
);
