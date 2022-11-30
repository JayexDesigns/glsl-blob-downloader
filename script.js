// Blob Code Modified From
// https://codepen.io/vcomics/pen/ZwNgvX

window.addEventListener("load", () => {
	createCanvas();
	createBlob();
	animation();
});

const colors = {
	background: "ffffff",
	color1: "3a0ca3",
	color2: "4cc9f0"
};

const position = {
	x: 0,
	y: 0
};

let scene, camera, renderer;
let width, height;
let blob;
let start = Date.now();

const hexToFloat = hex => {
	let r = parseInt(hex.substr(0, 2), 16) / 255;
	let g = parseInt(hex.substr(2, 2), 16) / 255;
	let b = parseInt(hex.substr(4, 2), 16) / 255;
	return [r, g, b];
};

const randomInRange = (min, max) => Math.random() * (max - min) + min;

const lerp = (a, b, t) => (1 - t) * a + t * b;

const createCanvas = () => {
	width = 1000;
	height = 1000;

	scene = new THREE.Scene();
	scene.background = new THREE.Color(parseInt(colors["background"], 16));

	camera = new THREE.PerspectiveCamera(35, width / height, 1, 1000);
	camera.position.set(0, 0, 15);

	renderer = new THREE.WebGLRenderer({
		antialias: true,
		preserveDrawingBuffer: true,
		canvas: document.getElementById("blobCanvas")
	});
	renderer.setSize(width, height);
	renderer.shadowMap.enabled = true;

	window.addEventListener("resize", onWindowResize);
};

const onWindowResize = () => {
	width = 1000;
	height = 1000;
	renderer.setSize(width, height);
	camera.aspect = width / height;
	camera.updateProjectionMatrix();
};

const createBlob = () => {
	blob = {
		material: new THREE.ShaderMaterial({
			uniforms: {
				time: {type: "f", value: 0.1},
				pointscale: {type: "f", value: 1.0},
				decay: {type: "f", value: 1.2},
				size: {type: "f", value: 1.0},
				displace: {type: "f", value: 1.0},
				complex: {type: "f", value: 0.5},
				waves: {type: "f", value: 3.7},
				eqcolor: {type: "f", value: 10.0},
				rcolor1: {type: "f", value: hexToFloat(colors["color1"])[0]},
				gcolor1: {type: "f", value: hexToFloat(colors["color1"])[1]},
				bcolor1: {type: "f", value: hexToFloat(colors["color1"])[2]},
				rcolor2: {type: "f", value: hexToFloat(colors["color2"])[0]},
				gcolor2: {type: "f", value: hexToFloat(colors["color2"])[1]},
				bcolor2: {type: "f", value: hexToFloat(colors["color2"])[2]}
			},
			vertexShader: vshader,
			fragmentShader: fshader
		}),
		geometry: new THREE.IcosahedronBufferGeometry(2, 6),
		wireframe: new THREE.IcosahedronBufferGeometry(2.3, 2),

		shape: null,
		points: null,

		speed: 0.4,

		shapeGroup: new THREE.Group()
	};

	blob.shape = new THREE.Mesh(blob.geometry, blob.material);
	blob.points = new THREE.Points(blob.wireframe, blob.material);

	blob.shapeGroup.add(blob.shape);
	blob.shapeGroup.add(blob.points);
	blob.shapeGroup.position.set(0, 0, 0);

	scene.add(blob.shapeGroup);
};

let prevBackgroundColor = colors["background"];
let prevColor1 = colors["color1"];
let prevColor2 = colors["color2"];
const animation = () => {
	blob.points.visible = false;

	blob.material.uniforms["time"].value =
		(blob.speed / 1000) * (Date.now() - start);

	if (colors["background"] != prevBackgroundColor) {
		scene.background = new THREE.Color(parseInt(colors["background"], 16));
		prevBackgroundColor = colors["background"];
	}
	if (colors["color1"] != prevColor1) {
		let color = hexToFloat(colors["color1"]);
		blob.material.uniforms["rcolor1"].value = color[0];
		blob.material.uniforms["gcolor1"].value = color[1];
		blob.material.uniforms["bcolor1"].value = color[2];
		prevColor1 = colors["color1"];
	}
	if (colors["color2"] != prevColor2) {
		let color = hexToFloat(colors["color2"]);
		blob.material.uniforms["rcolor2"].value = color[0];
		blob.material.uniforms["gcolor2"].value = color[1];
		blob.material.uniforms["bcolor2"].value = color[2];
		prevColor2 = colors["color2"];
	}

	blob.shapeGroup.position.set(position["x"], position["y"], 0);

	requestAnimationFrame(animation);
	renderer.render(scene, camera);
};
