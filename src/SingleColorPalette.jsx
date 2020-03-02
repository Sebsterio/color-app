import React, { useState } from "react";
import { withStyles } from "@material-ui/styles";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import ColorBox from "./ColorBox";
import PaletteFooter from "./PaletteFooter";
import styles from "./styles/PaletteStyles";

const SingleColorPalette = props => {
	const { palette, colorId, classes } = props;
	const { paletteName, emoji, id } = palette;
	const [format, setFormat] = useState("hex");

	const gatherShades = (palette, colorToFilterBy) => {
		let shades = [];
		let allColors = palette.colors;
		for (let key in allColors) {
			shades = shades.concat(
				allColors[key].filter(color => color.id === colorToFilterBy)
			);
		}
		return shades.slice(1);
	};

	const shades = gatherShades(palette, colorId);

	return (
		<div className={classes.Palette}>
			<Navbar
				format={format}
				handleChange={setFormat}
				showingAllColors={false}
			/>
			<div className={classes.colors}>
				{shades.map(color => (
					<ColorBox
						key={color.name}
						name={color.name}
						background={color[format]}
						showingFullPalette={false}
					/>
				))}
				<div className={classes.goBack}>
					<Link to={`/palette/${id}`}>GO BACK</Link>
				</div>
			</div>
			<PaletteFooter paletteName={paletteName} emoji={emoji} />
		</div>
	);
};

export default withStyles(styles)(SingleColorPalette);
