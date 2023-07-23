import { lerp } from "canvas-sketch-util/math";
import random from "canvas-sketch-util/random";

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
				radius: Math.abs(random.gaussian()) * 0.01,
			});
		}
	}

	return points;
}

export function createSketch({ colorPalette, count, margin }) {
	random.setSeed(random.getRandomSeed());
	console.log("seed:", random.getSeed());

	const points = createGrid(count, colorPalette).filter(
		() => random.value() > 0.5
	);

	return ({ context, width, height }) => {
		context.fillStyle = "white";
		context.fillRect(0, 0, width, height);

		points.forEach(({ position, radius, color }) => {
			const [u, v] = position;
			const x = lerp(margin, settings.dimensions[0] - margin, u);
			const y = lerp(margin, settings.dimensions[1] - margin, v);

			context.beginPath();
			context.arc(x, y, radius * width, 0, Math.PI * 2, false);
			context.fillStyle = color;
			context.fill();
		});
	};
}
