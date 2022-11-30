const downloadCanvas = () => {
	html2canvas(document.querySelector("#captureContainer"), {
		scale: 2,
		width: 500,
		height: 500
	}).then(canvas => {
		let aTag = document.getElementById("downloadTag");
		aTag.href = canvas.toDataURL("image/jpeg", 1);
		aTag.click();
	});

	// Old Version (Doesn't Include Text)
	// var canvas = document.getElementById("blobCanvas");
	// let aTag = document.getElementById("download");
	// aTag.href = canvas.toDataURL("image/jpeg", 1);
	// aTag.click();
};

document
	.getElementById("downloadButton")
	.addEventListener("click", downloadCanvas);

document.getElementById("coverText").addEventListener("input", e => {
	document.getElementById("canvasText").innerText = e.target.value;
});

document.getElementById("fontSize").addEventListener("input", e => {
	document.documentElement.style.setProperty(
		"--canvas-font-size",
		`${lerp(0.5, 25, parseInt(e.target.value) / 100)}rem`
	);
});

document.getElementById("backgroundColor").addEventListener("input", e => {
	colors["background"] = e.target.value.substr(1, 6);
	document.documentElement.style.setProperty(
		"--canvas-background-color",
		e.target.value
	);
});
document.getElementById("color1").addEventListener("input", e => {
	colors["color1"] = e.target.value.substr(1, 6);
	document.documentElement.style.setProperty(
		"--canvas-color-1",
		e.target.value
	);
});
document.getElementById("color2").addEventListener("input", e => {
	colors["color2"] = e.target.value.substr(1, 6);
	document.documentElement.style.setProperty(
		"--canvas-color-2",
		e.target.value
	);
});
document.getElementById("textColor").addEventListener("input", e => {
	document.documentElement.style.setProperty(
		"--canvas-text-color",
		e.target.value
	);
});

document.getElementById("blobPositionX").addEventListener("input", e => {
	position["x"] = lerp(-5, 5, parseInt(e.target.value) / 100);
});
document.getElementById("blobPositionY").addEventListener("input", e => {
	position["y"] = lerp(-5, 5, parseInt(e.target.value) / 100);
});

document.getElementById("blobSize").addEventListener("input", e => {
	blob.material.uniforms["size"].value = lerp(
		0.3,
		5,
		1 - parseInt(e.target.value) / 100
	);
});
