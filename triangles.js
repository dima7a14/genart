import { lerp } from "canvas-sketch-util/math";
import random from "canvas-sketch-util/random";
import Color from "color";

export const settings = {
	dimensions: [2048, 2048],
};

function createGrid(count, colorPalette) {
	const points = [];

	for (let x = 0; x < count; x++) {
		for (let y = 0; y < count; y++) {
			const u = count <= 1 ? 0.5 : x / (count - 1);
			const v = count <= 1 ? 0.5 : y / (count - 1);
			points.push({
				color: random.pick(colorPalette),
				position: [u, v],
				size: 0.01,
			});
		}
	}

	return points;
}

function transformCoords(originalCoords, dimensions, margin) {
	const coords = originalCoords.map((coord, index) =>
		lerp(margin, dimensions[index] - margin, coord)
	);
	return coords;
}

export function createSketch({ colorPalette, count, margin }) {
	random.setSeed(random.getRandomSeed());
	console.log("seed:", random.getSeed());

	const points = createGrid(count, colorPalette);

	return ({ context, width, height }) => {
		context.fillStyle = "white";
		context.fillRect(0, 0, width, height);

		// points.forEach(({ position, size }) => {
		// 	const [x, y] = transformCoords(
		// 		position,
		// 		settings.dimensions,
		// 		margin
		// 	);

		// 	context.beginPath();
		// 	context.arc(x, y, size * width, 0, Math.PI * 2, false);
		// 	context.fillStyle = "black";
		// 	context.fill();
		// });

		const unUsedPoints = points.slice();

		while (unUsedPoints.length > 2) {
			const indexA = Math.floor(random.range(0, unUsedPoints.length));
			const [pointA] = unUsedPoints.splice(indexA, 1);
			const indexB = Math.floor(random.range(0, unUsedPoints.length));
			const [pointB] = unUsedPoints.splice(indexB, 1);
			const indexC = Math.floor(random.range(0, unUsedPoints.length));
			const [pointC] = unUsedPoints.splice(indexC, 1);

			context.beginPath();
			context.moveTo(
				...transformCoords(pointA.position, settings.dimensions, margin)
			);
			context.lineTo(
				...transformCoords(pointB.position, settings.dimensions, margin)
			);
			context.lineTo(
				...transformCoords(pointC.position, settings.dimensions, margin)
			);
			context.lineTo(
				...transformCoords(pointA.position, settings.dimensions, margin)
			);
			context.fillStyle = Color(pointA.color).alpha(0.5).string();
			context.fill();
			context.strokeStyle = "black";
			context.lineWidth = 10;
			context.stroke();
		}
	};
}
