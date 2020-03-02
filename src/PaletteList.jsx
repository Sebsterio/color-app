import React, { useState } from "react";
import MiniPalette from "./MiniPalette";
import { Link } from "react-router-dom";
import Dialog from "@material-ui/core/Dialog";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import DialogTitle from "@material-ui/core/DialogTitle";
import { withStyles } from "@material-ui/styles";
import styles from "./styles/PaletteListStyles";
import blue from "@material-ui/core/colors/blue";
import red from "@material-ui/core/colors/red";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { useContext } from "react";
import { PalettesContext, DispatchContext } from "./context/palettes.context";

const PaletteList = props => {
	const { history, classes } = props;
	const palettes = useContext(PalettesContext);
	const dispatch = useContext(DispatchContext);
	const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
	const [deletingId, setDeletingId] = useState("");

	const openDialog = id => {
		setOpenDeleteDialog(true);
		setDeletingId(id);
	};
	const closeDialog = () => {
		setOpenDeleteDialog(false);
		setDeletingId("");
	};
	const goToPalette = id => {
		history.push(`/palette/${id}`);
	};
	const handleDelete = () => {
		dispatch({ type: "DELETE", id: deletingId });
		closeDialog();
	};

	return (
		<div className={classes.root}>
			<div className={classes.container}>
				<nav className={classes.nav}>
					<h1 className={classes.heading}>ColorApp</h1>
					<Link to="/palette/new">New Palette</Link>
				</nav>
				<TransitionGroup className={classes.palettes}>
					{palettes.map(palette => (
						<CSSTransition key={palette.id} classNames="fade" timeout={500}>
							<MiniPalette
								{...palette}
								handleClick={goToPalette}
								openDialog={openDialog}
							/>
						</CSSTransition>
					))}
				</TransitionGroup>
			</div>
			<Dialog
				open={openDeleteDialog}
				aria-labelledby="delete-dialog-title"
				onClose={closeDialog}
			>
				<DialogTitle id="delete-dialog-title">Delete This Palette?</DialogTitle>
				<List>
					<ListItem button onClick={handleDelete}>
						<ListItemAvatar>
							<Avatar style={{ backgroundColor: blue[100], color: blue[600] }}>
								<CheckIcon />
							</Avatar>
						</ListItemAvatar>
						<ListItemText primary="Delete" />
					</ListItem>
					<ListItem button onClick={closeDialog}>
						<ListItemAvatar>
							<Avatar style={{ backgroundColor: red[100], color: red[600] }}>
								<CloseIcon />
							</Avatar>
						</ListItemAvatar>
						<ListItemText primary="Cancel" />
					</ListItem>
				</List>
			</Dialog>
		</div>
	);
};

export default withStyles(styles)(PaletteList);
