import { printSolution } from "../../_helpers/printSolution";
import { get1dInput } from "../../_helpers/readInput";

// Get inputs
const inputs = get1dInput(__dirname);

function getTotalJoltage(nbOfBatteries: number) {
	let total = 0;

	for (const bank of inputs) {
		const arBank = bank.split("").map((v) => parseInt(v));

		let number = "";
		let idx = 0;

		for (let it = 0; it < nbOfBatteries; it++) {
			const subArray = arBank.slice(
				idx,
				bank.length - nbOfBatteries + 1 + it,
			);
			const maxNumber = Math.max(...subArray);
			idx += subArray.findIndex((v) => v === maxNumber) + 1;
			number += maxNumber.toString();
		}
		total += parseInt(number);
	}

	return total;
}

printSolution(
	"The total output for 2 betteries is $$ joltage, and for 12 is $$",
	[getTotalJoltage(2), getTotalJoltage(12)],
);
