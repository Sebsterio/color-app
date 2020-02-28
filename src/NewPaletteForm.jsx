import React, { useState } from "react";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { withStyles } from "@material-ui/core/styles";
import { arrayMove } from "array-move";
import classNames from "classnames";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import DraggableColorList from "./DraggableColorList";
import ColorPickerForm from "./ColorPickerForm";
import PaletteFormNav from "./PaletteFormNav";
import styles from "./styles/NewPaletteFormStyles";
import seedColors from "./seedColors";
import "emoji-mart/css/emoji-mart.css";

const NewPaletteForm = props => {
	const { classes, palettes, savePalette, history } = props;
	const maxColors = 20;
	const [open, setOpen] = useState(false);
	const [colors, setColors] = useState(seedColors[0].colors);
	const paletteIsFull = colors.length >= maxColors;

	const addNewColor = newColor => setColors([...colors, newColor]);

	const removeColor = colorName => {
		setColors(colors.filter(color => color.name !== colorName));
	};

	const clearColors = () => setColors([]);

	// pick random color from existing palettes
	const addRandomColor = () => {
		const allColors = palettes.map(p => p.colors).flat();
		let randomColor;
		// avoid duplicates
		let isDuplicateColor = true;
		while (isDuplicateColor) {
			let rand = Math.floor(Math.random() * allColors.length);
			randomColor = allColors[rand];
			isDuplicateColor = colors.some(color => color.name === randomColor.name);
		}
		setColors([...colors, randomColor]);
	};

	// Add newly created palette to App state and navigate to PaletteList (Home)
	const handleSubmit = newPalette => {
		newPalette.id = newPalette.paletteName.toLowerCase().replace(/ /g, "-");
		newPalette.colors = colors;
		savePalette(newPalette);
		history.push("/");
	};

	// Sort colors in array to reflect their position on the grid after dragging
	const onSortEnd = ({ oldIndex, newIndex }) => {
		if (oldIndex === newIndex) return; // TODO: figure why crashes on colorDelete w/out this
		setColors(arrayMove(colors, oldIndex, newIndex));
	};

	return (
		<div className={classes.root}>
			<PaletteFormNav
				open={open}
				palettes={palettes}
				handleSubmit={handleSubmit}
				handleDrawerOpen={() => setOpen(true)}
			/>
			<Drawer
				className={classes.drawer}
				variant="persistent"
				anchor="left"
				open={open}
				classes={{
					paper: classes.drawerPaper
				}}
			>
				<div className={classes.drawerHeader}>
					<IconButton onClick={() => setOpen(false)}>
						<ChevronLeftIcon />
					</IconButton>
				</div>
				<Divider />
				<div className={classes.container}>
					<Typography variant="h4" gutterBottom>
						Design Your Palette
					</Typography>
					<div className={classes.buttons}>
						<Button
							variant="contained"
							color="secondary"
							onClick={clearColors}
							className={classes.button}
						>
							Clear Palette
						</Button>
						<Button
							variant="contained"
							className={classes.button}
							color="primary"
							onClick={addRandomColor}
							disabled={paletteIsFull}
						>
							Random Color
						</Button>
					</div>
					<ColorPickerForm
						paletteIsFull={paletteIsFull}
						addNewColor={addNewColor}
						colors={colors}
					/>
				</div>
			</Drawer>
			<main
				className={classNames(classes.content, {
					[classes.contentShift]: open
				})}
			>
				<div className={classes.drawerHeader} />
				<DraggableColorList
					colors={colors}
					removeColor={removeColor}
					axis="xy"
					onSortEnd={onSortEnd}
				/>
			</main>
		</div>
	);
};

export default withStyles(styles, { withTheme: true })(NewPaletteForm);
