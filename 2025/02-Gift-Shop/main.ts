import { printSolution } from "../../_helpers/printSolution";
import { getStringInput } from "../../_helpers/readInput";

const inputs = getStringInput(__dirname).split(",");

let sumOfInvalidId = 0;

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

	for (let i = nbrStartRange; i <= nbrEndRange; i++) {
		const stringifyNumber = i.toString();

		// Pass all odds number as they can't have repeated patterns
		if (stringifyNumber.length % 2 !== 0) continue;

		const halfLength = stringifyNumber.length / 2;
		const firstHalf = stringifyNumber.slice(0, halfLength);
		const secondHalf = stringifyNumber.slice(halfLength);

		if (firstHalf === secondHalf) sumOfInvalidId += i;
	}
}

printSolution("The sums of all invalid IDS is $$", [sumOfInvalidId]);
