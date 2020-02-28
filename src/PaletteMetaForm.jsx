import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { Picker } from "emoji-mart";

const PaletteMetaForm = props => {
	const { palettes, hideForm, handleSubmit } = props;
	const [stage, setStage] = useState("form");
	const [newPaletteName, setNewPaletteName] = useState("");

	// Set validation rules on mount
	useEffect(() => {
		ValidatorForm.addValidationRule("isPaletteNameUnique", value =>
			palettes.every(
				({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
			)
		);
	}, []);

	const savePalette = emoji => {
		handleSubmit({
			paletteName: newPaletteName,
			emoji: emoji.native
		});
		setStage("");
	};

	return (
		<div>
			<Dialog open={stage === "emoji"} onClose={hideForm}>
				<DialogTitle id="emoji-dialog-title">
					Choose a Palette Emoji
				</DialogTitle>
				<Picker onSelect={savePalette} title="Palette Emoji" />
			</Dialog>

			<Dialog
				open={stage === "form"}
				onClose={hideForm}
				aria-labelledby="form-dialog-title"
			>
				<DialogTitle id="form-dialog-title">Choose a Palette Name</DialogTitle>
				<ValidatorForm onSubmit={() => setStage("emoji")}>
					<DialogContent>
						<DialogContentText>
							Please enter a name for your new beautiful palette. Make sure it's
							unique!
						</DialogContentText>

						<TextValidator
							label="Palette Name"
							value={newPaletteName}
							name="newPaletteName"
							onChange={e => setNewPaletteName(e.target.value)}
							fullWidth
							margin="normal"
							validators={["required", "isPaletteNameUnique"]}
							errorMessages={["Enter Palette Name", "Name already used"]}
						/>
					</DialogContent>
					<DialogActions>
						<Button onClick={hideForm} color="primary">
							Cancel
						</Button>
						<Button variant="contained" color="primary" type="submit">
							Save Palette
						</Button>
					</DialogActions>
				</ValidatorForm>
			</Dialog>
		</div>
	);
};

export default PaletteMetaForm;
