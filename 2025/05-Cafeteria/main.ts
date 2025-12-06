import { printSolution } from "../../_helpers/printSolution";
import { get1dInput } from "../../_helpers/readInput";

// Get inputs
const inputs = get1dInput(__dirname);

let isCheckingId = false;
let nbOfValidIngredient = 0;
let nbOfValidIds = 0;
const ranges = [];

for (const row of inputs) {
	if (row === "") {
		isCheckingId = true;
		continue;
	}

	// We are preparing a Set of valid ids
	if (!isCheckingId) {
		const newRange = row.split("-").map((v) => parseInt(v));
		let newValidIds = newRange[1] - newRange[0] + 1;

		// ! Not proud of this one, probably a way better way to handle that
		// ? Maybe going multiple time trough all ranges for a cleaner/robust solution?
		for (const range of ranges) {
			const isNewStartInsideOld =
				range[0] <= newRange[0] && newRange[0] <= range[1];
			const isNewEndInsideOld =
				range[0] <= newRange[1] && newRange[1] <= range[1];

			// Invalid current one, because already present
			if (isNewStartInsideOld && isNewEndInsideOld) {
				newValidIds = 0;
				break;
			}

			// Case new start range is inside older range
			if (isNewStartInsideOld) {
				newValidIds -= range[1] - newRange[0] + 1;
				newRange[0] = range[1] + 1;
			}

			// Case new end range is inside older range
			if (isNewEndInsideOld) {
				newValidIds -= newRange[1] - range[0] + 1;
				newRange[1] = range[0] - 1;
			}

			const isOldStartInsideNew =
				newRange[0] <= range[0] && range[0] <= newRange[1];
			const isOldEndInsideNew =
				newRange[0] <= range[1] && range[1] <= newRange[1];

			// Invalid old one, because present in this one
			if (isOldStartInsideNew && isOldEndInsideNew) {
				newValidIds -= range[1] - range[0] + 1;
				continue;
			}
		}

		if (newValidIds > 0) {
			nbOfValidIds += newValidIds;
			ranges.push(newRange);
		}

		continue;
	}

	// We are checking if the ingredient id is fresh or spoiled
	const id = parseInt(row);

	for (const range of ranges) {
		if (range[0] <= id && id <= range[1]) {
			nbOfValidIngredient++;
			break;
		}
	}
}

printSolution(
	"There is $$ fresh ingredients inside the total of $$ possible fresh ingredients!",
	[nbOfValidIngredient, nbOfValidIds],
);
