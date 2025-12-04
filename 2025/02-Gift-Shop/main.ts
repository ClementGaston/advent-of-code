import { printSolution } from "../../_helpers/printSolution";
import { getStringInput } from "../../_helpers/readInput";

const inputs = getStringInput(__dirname).split(",");

let sumOfInvalidId = 0;
let sumOfInvalidIdPartTwo = 0;

for (const range of inputs) {
	// Parse row input
	const match = /(?<startRange>\d*)-(?<endRange>\d*)/.exec(range);

	if (!match || !match.groups) {
		throw new Error("Invalid rotation format");
	}

	const { startRange, endRange } = match.groups;
	const nbrStartRange = parseInt(startRange);
	const nbrEndRange = parseInt(endRange);

	if (!startRange || !endRange || nbrStartRange > nbrEndRange) {
		throw new Error("Invalid rotation format");
	}

	// First Part
	for (let id = nbrStartRange; id <= nbrEndRange; id++) {
		const stringifyNumber = id.toString();

		// Pass all odds number as they can't have repeated patterns
		const halfLength = stringifyNumber.length / 2;
		if (stringifyNumber.length % 2 !== 0) continue;

		const firstHalf = stringifyNumber.slice(0, halfLength);
		const secondHalf = stringifyNumber.slice(halfLength);

		if (firstHalf === secondHalf) sumOfInvalidId += id;
	}

	// Second Part
	for (let id = nbrStartRange; id <= nbrEndRange; id++) {
		const stringifyNumber = id.toString();

		const length = stringifyNumber.length;
		const halfLength = Math.floor(length / 2);

		let isIdFlagged = false;

		for (let i = 1; i <= halfLength; i++) {
			if (length % i !== 0 || isIdFlagged) continue;

			let nbOfRepeatPossiblePattern = length / i;
			let patternSize = length / nbOfRepeatPossiblePattern;
			let presentNumbers = new Set();

			for (let j = 0; j < length; j += patternSize) {
				presentNumbers.add(stringifyNumber.slice(j, j + patternSize));
			}

			if (presentNumbers.size === 1) {
				sumOfInvalidIdPartTwo += id;
				isIdFlagged = true;
			}
		}
	}
}

printSolution("The sums of a subset of invalid IDS is $$", [sumOfInvalidId]);
printSolution("The sums of all invalid IDS is $$", [sumOfInvalidIdPartTwo]);
