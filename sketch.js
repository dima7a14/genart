import canvasSketch from "canvas-sketch";
// import { settings, createSketch } from "./symbols.js";
// import { settings, createSketch } from "./circles.js";
import { settings, createSketch } from "./triangles.js";

const colorPalette = ["#5e2bff", "#c04cfd", "#fc6dab", "#f7f6c5", "#f3fae1"];

// const sketch = createSketch({
// 	symbols: "abcdefghijklmnopqrstuvwxyz".split(""),
// 	colorPalette,
// 	count: 40,
// 	margin: 400,
// 	fontFamily: "Helvetica",
// });
const sketch = createSketch({
	colorPalette,
	count: 6,
	margin: 100,
});

canvasSketch(sketch, settings);
