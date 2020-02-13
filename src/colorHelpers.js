import chroma from "chroma-js";

const levels = Array.from({ length: 10 }, (x, i) => i * 100);

function generatePalette(starterPalette) {
	//// ---- Tutorial solution: ----
	// let newPalette = {
	// 	paletteName: starterPalette.paletteName,
	// 	id: starterPalette.id,
	// 	emoji: starterPalette.emoji,
	// 	colors: {}
	// };
	let newPalette = { ...starterPalette, colors: {} };

	for (let level of levels) {
		newPalette.colors[level] = [];
	}
	for (let color of starterPalette.colors) {
		let scale = generateScale(color.color, 10).reverse();
		for (let i in scale) {
			newPalette.colors[levels[i]].push({
				name: `${color.name} ${levels[i]}`,
				id: color.name.toLowerCase().replace(/ /g, "-"),
				hex: scale[i],
				rgb: chroma(scale[i]).css(),
				rgba: chroma(scale[i])
					.css()
					.replace("rgb", "rgba")
					.replace(")", ",1)")
			});
		}
	}
	return newPalette;
}

function getRange(hexColor) {
	return [
		chroma(hexColor)
			.darken(1.4)
			.hex(),
		hexColor,
		"#fff"
	];
}

function generateScale(hexColor, numOfColors) {
	return chroma
		.scale(getRange(hexColor))
		.mode("lab")
		.colors(numOfColors);
}

export { generatePalette };
