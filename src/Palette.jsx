import React, { useState } from "react";
import { withStyles } from "@material-ui/styles";
import PaletteFooter from "./PaletteFooter";
import ColorBox from "./ColorBox";
import Navbar from "./Navbar";
import styles from "./styles/PaletteStyles";

const Palette = props => {
	const { palette, classes } = props;
	const { colors, paletteName, emoji, id } = palette;
	const [level, setLevel] = useState(500);
	const [format, setFormat] = useState("hex");

	return (
		<div className={classes.Palette}>
			<Navbar
				level={level}
				changeLevel={setLevel}
				format={format}
				setFormat={setFormat}
				showingAllColors
			/>
			<div className={classes.colors}>
				{colors[level].map(color => (
					<ColorBox
						background={color[format]}
						name={color.name}
						key={color.id}
						moreUrl={`/palette/${id}/${color.id}`}
						showingFullPalette
					/>
				))}
			</div>
			<PaletteFooter paletteName={paletteName} emoji={emoji} />
		</div>
	);
};

export default withStyles(styles)(Palette);
