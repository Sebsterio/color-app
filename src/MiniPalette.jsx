import React, { PureComponent } from "react";
import { withStyles } from "@material-ui/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import styles from "./styles/MiniPaletteStyles";

class MiniPalette extends PureComponent {
	render() {
		const {
			classes,
			paletteName,
			emoji,
			colors,
			handleClick,
			openDialog,
			id
		} = this.props;
		const miniColorBoxes = colors.map(color => (
			<div
				className={classes.miniColor}
				style={{ backgroundColor: color.color }}
				key={color.name}
			/>
		));
		return (
			<div className={classes.root} onClick={() => handleClick(id)}>
				<DeleteIcon
					onClick={e => {
						e.stopPropagation();
						openDialog(id);
					}}
					className={classes.deleteIcon}
					style={{ transition: "all .3s ease" }}
				/>
				<div className={classes.colors}>{miniColorBoxes}</div>
				<h5 className={classes.title}>
					{paletteName} <span className={classes.emoji}>{emoji}</span>
				</h5>
			</div>
		);
	}
}

export default withStyles(styles)(MiniPalette);
