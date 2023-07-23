import { lerp } from "canvas-sketch-util/math";
import random from "canvas-sketch-util/random";

function createGrid(count, symbols, colorPalette) {
	const points = [];

	for (let x = 0; x < count; x++) {
		for (let y = 0; y < count; y++) {
			const u = count <= 1 ? 0.5 : x / (count - 1);
			const v = count <= 1 ? 0.5 : y / (count - 1);
			points.push({
				symbol: random.pick(symbols),
				color: random.pick(colorPalette),
				position: [u, v],
				size: Math.abs(random.noise2D(u, v)) * 0.2,
				rotation: random.noise2D(u, v),
			});
		}
	}

	return points;
}

export function createSketch({
	symbols,
	colorPalette,
	count,
	margin,
	fontFamily,
}) {
	random.setSeed(random.getRandomSeed());
	console.log("seed:", random.getSeed());

	const points = createGrid(count, symbols, colorPalette);

	return ({ context, width, height }) => {
		context.fillStyle = "white";
		context.fillRect(0, 0, width, height);

		points.forEach(({ symbol, position, size, color, rotation }) => {
			const [u, v] = position;
			const x = lerp(margin, width - margin, u);
			const y = lerp(margin, height - margin, v);

			context.globalAlpha = 0.7;
			context.fillStyle = color;
			context.font = `${size * width}px "${fontFamily}"`;
			// context.translate(x, y);
			context.rotate(rotation);
			context.fillText(symbol, x, y);
		});
	};
}

export const settings = {
	dimensions: [2048, 2048],
};
