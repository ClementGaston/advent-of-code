import { printSolution } from "../../_helpers/printSolution";
import { get2dInput } from "../../_helpers/readInput";

// Get inputs
const inputs = get2dInput(__dirname, ",").map((point) =>
	point.map((coord) => parseInt(coord)),
);

function distanceBetweenPoints(point1: number[], point2: number[]) {
	return Math.sqrt(
		(point1[0] - point2[0]) ** 2 +
			(point1[1] - point2[1]) ** 2 +
			(point1[2] - point2[2]) ** 2,
	);
}

const distances: { point1: number; point2: number; distance: number }[] = [];

for (let point1Idx = 0; point1Idx < inputs.length; point1Idx++) {
	for (
		let point2Idx = point1Idx + 1;
		point2Idx < inputs.length;
		point2Idx++
	) {
		distances.push({
			point1: point1Idx,
			point2: point2Idx,
			distance: distanceBetweenPoints(
				inputs[point1Idx],
				inputs[point2Idx],
			),
		});
	}
}
const sortedDistance = [...distances].sort((a, b) => a.distance - b.distance);

function getGroup(n?: number) {
	const group = {
		[sortedDistance[0].point1.toString()]: 1,
		[sortedDistance[0].point2.toString()]: 1,
	};
	const groupSize: { [groupId: number]: number } = {
		1: 2,
	};
	let groupNumber = 1;

	for (let i = 1; i < (n || sortedDistance.length); i++) {
		const link = sortedDistance[i];
		if (
			group[link.point1] &&
			group[link.point2] &&
			group[link.point1] === group[link.point2]
		) {
			continue;
		}

		if (
			(groupSize[group[link.point1]] || 1) +
				(groupSize[group[link.point2]] || 1) ===
			inputs.length
		) {
			return {
				group: Object.entries(groupSize).sort((a, b) => b[1] - a[1]),
				lastLink: link,
			};
		}

		// ! Could be way cleaner
		if (group[link.point1] && group[link.point2]) {
			const newGroup = group[link.point1];
			const oldGroup = group[link.point2];

			for (const [key, value] of Object.entries(group)) {
				if (value === oldGroup) group[key] = newGroup;
			}

			groupSize[newGroup] += groupSize[oldGroup];
			delete groupSize[oldGroup];
			continue;
		}

		const existingGroupId = group[link.point1] || group[link.point2];
		if (existingGroupId) {
			groupNumber++;
			group[link.point1] = existingGroupId;
			group[link.point2] = existingGroupId;
			groupSize[existingGroupId] += 1;
			continue;
		}

		groupNumber++;
		group[link.point1] = groupNumber;
		group[link.point2] = groupNumber;
		groupSize[groupNumber] = 2;
	}

	return {
		group: Object.entries(groupSize).sort((a, b) => b[1] - a[1]),
		lastLink: null,
	};
}
const result = getGroup(1000);

let linkSize = 1;
for (let i = 0; i < 3; i++) {
	linkSize = linkSize * result.group[i][1];
}

const result2 = getGroup();
let lastLinkMultiplication = 0;
if (result2.lastLink) {
	lastLinkMultiplication =
		inputs[result2.lastLink.point1][0] * inputs[result2.lastLink.point2][0];
}

printSolution(
	"The sum of the 3 largest circuits are $$ and they reassemble at $$",
	[linkSize, lastLinkMultiplication],
);
