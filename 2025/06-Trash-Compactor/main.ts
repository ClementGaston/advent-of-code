import { printSolution } from "../../_helpers/printSolution";
import { get2dInput } from "../../_helpers/readInput";

// Get inputs
const inputs = get2dInput(__dirname, "");
const rebuiltInputs = [];

let rebuildIdx = 0;
const operationRow = inputs[inputs.length - 1];

// --------------- REBUILT ---------------
while (rebuildIdx < inputs[0].length) {
	let searchingMaxIdx = true;
	let maxIdx = rebuildIdx;

	// ! Scary to use while, probably best to create an array before
	// !hand to index all indexes for each operator (which is the start of a problem)
	while (searchingMaxIdx) {
		maxIdx += 1;
		const operation = operationRow[maxIdx];
		if (
			operation === "*" ||
			operation === "+" ||
			maxIdx === inputs[0].length
		) {
			// +1 to avoid modifying the logic to get rid of the leading ' ' after every number except the last one
			if (maxIdx === inputs[0].length) maxIdx++;
			searchingMaxIdx = false;
		}
	}

	for (let row = 0; row < inputs.length - 1; row++) {
		let str = "";

		for (let idx = rebuildIdx; idx < maxIdx - 1; idx++) {
			str += inputs[row][idx];
		}

		if (rebuiltInputs[row]) {
			rebuiltInputs[row].push(str);
		} else {
			rebuiltInputs[row] = [str];
		}
	}

	rebuildIdx += maxIdx - rebuildIdx;
}
rebuiltInputs.push(operationRow.filter((v) => v === "*" || v === "+"));

// --------------- FIRST PART ---------------
const nbOfProblem = rebuiltInputs[0].length;
const problemLength = rebuiltInputs.length - 1;
let total = 0;

for (let problemIdx = 0; problemIdx < nbOfProblem; problemIdx++) {
	const numbers: number[] = [];

	for (let numberIdx = 0; numberIdx < problemLength; numberIdx++) {
		numbers.push(parseInt(rebuiltInputs[numberIdx][problemIdx]));
	}

	const operation = rebuiltInputs[problemLength][problemIdx];

	const problemTotal = numbers.reduce((tot, val) => {
		if (tot === 0) return val;

		if (operation === "*") {
			tot *= val;
		} else {
			tot += val;
		}

		return tot;
	}, 0);

	total += problemTotal;
}

// --------------- SECOND PART ---------------
let cephalopodTotal = 0;

for (let problemIdx = 0; problemIdx < nbOfProblem; problemIdx++) {
	const numbersStr: string[] = [];
	let biggestNbrLength = 0;

	for (let numberIdx = 0; numberIdx < problemLength; numberIdx++) {
		const numberStr = rebuiltInputs[numberIdx][problemIdx];
		if (numberStr.length > biggestNbrLength)
			biggestNbrLength = numberStr.length;

		numbersStr.push(numberStr);
	}

	const operation = rebuiltInputs[problemLength][problemIdx];
	const numbers: number[] = [];

	for (let i = biggestNbrLength - 1; i >= 0; i--) {
		let rebuiltNumberStr: string = "";

		for (const numberStr of numbersStr) {
			rebuiltNumberStr += numberStr?.[i] || "";
		}

		numbers.push(parseInt(rebuiltNumberStr));
	}

	const problemTotal = numbers.reduce((tot, val) => {
		if (tot === 0) return val;

		if (operation === "*") {
			tot *= val;
		} else {
			tot += val;
		}

		return tot;
	}, 0);

	cephalopodTotal += problemTotal;
}

printSolution(
	"The grand total was $$ until we used cephalopod lecture which gave us $$",
	[total, cephalopodTotal],
);
