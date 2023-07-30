import * as THREE from "three";
import canvasSketch from "canvas-sketch";
import random from "canvas-sketch-util/random";
import * as eases from "eases";
import BezierEasing from "bezier-easing";

const colorPalette = [
	"#a40e4c",
	"#681d50",
	"#2c2c54",
	"#6c787d",
	"#acc3a6",
	"#d1cdb0",
	"#f5d6ba",
	"#f5ba94",
	"#f49d6e",
];

const settings = {
	dimensions: [512, 512],
	fps: 24,
	duration: 4,
	animate: true,
	context: "webgl",
	attributes: {
		antialias: true,
	},
};

const sketch = ({ context }) => {
	const renderer = new THREE.WebGLRenderer({
		canvas: context.canvas,
	});

	renderer.setClearColor("hsl(0, 0%, 90%)", 1);

	const camera = new THREE.OrthographicCamera();
	const scene = new THREE.Scene();

	for (let i = 0; i < 30; i++) {
		const geometry = new THREE.BoxGeometry(1, 1, 1);
		const material = new THREE.MeshStandardMaterial({
			color: random.pick(colorPalette),
		});
		const mesh = new THREE.Mesh(geometry, material);

		mesh.position.set(
			random.range(-1, 1),
			random.range(-1, 1),
			random.range(-1, 1)
		);
		mesh.scale.set(
			random.range(-1, 1),
			random.range(-1, 1),
			random.range(-1, 1)
		);

		mesh.scale.multiplyScalar(0.5);
		scene.add(mesh);
	}

	scene.add(new THREE.AmbientLight("hsl(0, 0%, 25%)"));

	const light = new THREE.DirectionalLight("white", 1);
	light.position.set(0, 0, 4);
	scene.add(light);

	const easeFn = BezierEasing(0.33, 0.45, 0.03, 0.11);

	// draw each frame
	return {
		// Handle resize events here
		resize({ pixelRatio, viewportWidth, viewportHeight }) {
			renderer.setPixelRatio(pixelRatio);
			renderer.setSize(viewportWidth, viewportHeight, false);

			const aspect = viewportWidth / viewportHeight;

			// Ortho zoom
			const zoom = 2.0;

			// Bounds
			camera.left = -zoom * aspect;
			camera.right = zoom * aspect;
			camera.top = zoom;
			camera.bottom = -zoom;

			// Near/Far
			camera.near = -100;
			camera.far = 100;

			// Set position & look at world center
			camera.position.set(zoom, zoom, zoom);
			camera.lookAt(new THREE.Vector3());

			// Update the camera
			camera.updateProjectionMatrix();
		},
		// Update & render your scene here
		render({ playhead }) {
			const t = Math.sin(playhead * Math.PI);
			// scene.rotation.y = Math.sin(playhead * Math.PI * 2);
			scene.rotation.x = easeFn(t);
			scene.rotation.z = eases.expoInOut(t);
			renderer.render(scene, camera);
		},
		// Dispose of events & renderer for cleaner hot-reloading
		unload() {
			// controls.dispose();
			renderer.dispose();
		},
	};
};

canvasSketch(sketch, settings);
