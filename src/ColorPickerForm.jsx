import React, { useState, useEffect, useRef } from "react";
import Button from "@material-ui/core/Button";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { ChromePicker } from "react-color";
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles/ColorPickerFormStyles";
import useInputState from "./hooks/useInputState";

const ColorPickerForm = props => {
	const { colors, paletteIsFull, addNewColor, classes } = props;
	const [currentColor, setCurrentColor] = useState("teal");
	// const [newColorName, setNewColorName] = useState("");
	const [newColorName, setNewColorName, resetNewColorName] = useInputState("");

	const handleSubmit = () => {
		addNewColor({
			color: currentColor,
			name: newColorName
		});
		resetNewColorName();
	};

	// onMount: add validation rules to TextValidator
	// TEMP: running on every render as coulnd't find a hooks alternative to ref='form'
	const formRef = useRef(); // no effect
	useEffect(() => {
		ValidatorForm.addValidationRule("isColorNameUnique", value =>
			colors.every(({ name }) => name.toLowerCase() !== value.toLowerCase())
		);
		ValidatorForm.addValidationRule("isColorUnique", value =>
			colors.every(({ color }) => color !== currentColor)
		);
	});

	return (
		<div>
			<ChromePicker
				color={currentColor}
				onChangeComplete={({ hex }) => setCurrentColor(hex)}
				className={classes.picker}
			/>
			{/* removed ref='form' as it's not supported by functional componennts */}
			<ValidatorForm
				onSubmit={handleSubmit}
				ref={formRef}
				instantValidate={false}
			>
				<TextValidator
					value={newColorName}
					className={classes.colorNameInput}
					placeholder="Color Name"
					name="newColorName"
					variant="filled"
					margin="normal"
					onChange={setNewColorName}
					validators={["required", "isColorNameUnique", "isColorUnique"]}
					errorMessages={[
						"Enter a color name",
						"Color name must be unique",
						"Color already used!"
					]}
				/>
				<Button
					variant="contained"
					type="submit"
					color="primary"
					disabled={paletteIsFull}
					className={classes.addColor}
					style={{
						backgroundColor: paletteIsFull ? "grey" : currentColor
					}}
				>
					{paletteIsFull ? "Palette Full" : "Add Color"}
				</Button>
			</ValidatorForm>
		</div>
	);
};

export default withStyles(styles)(ColorPickerForm);
