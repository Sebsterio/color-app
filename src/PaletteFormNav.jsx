import React from "react";
import useToggle from "./hooks/useToggleState";
import PaletteMetaForm from "./PaletteMetaForm";
import { withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import classNames from "classnames";
import { Link } from "react-router-dom";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import styles from "./styles/PaletteFormNavStyles";
import { useContext } from "react";
import { PalettesContext } from "./context/palettes.context";

const PaletteFormNav = props => {
	const { classes, open, handleSubmit, handleDrawerOpen } = props;
	const palettes = useContext(PalettesContext);
	const [formShowing, toggleFormShowing] = useToggle(false);

	return (
		<div className={classes.root}>
			<CssBaseline />
			<AppBar
				position="fixed"
				color="default"
				className={classNames(classes.appBar, {
					[classes.appBarShift]: open
				})}
			>
				<Toolbar disableGutters={!open}>
					<IconButton
						color="inherit"
						aria-label="Open drawer"
						onClick={handleDrawerOpen}
						className={classNames(classes.menuButton, open && classes.hide)}
					>
						<MenuIcon />
					</IconButton>
					<Typography variant="h6" color="inherit" noWrap>
						Create A Palette
					</Typography>
				</Toolbar>
				<div className={classes.navBtns}>
					<Link to="/">
						<Button
							variant="contained"
							color="secondary"
							className={classes.button}
						>
							Go Back
						</Button>
					</Link>
					<Button
						variant="contained"
						color="primary"
						onClick={toggleFormShowing}
						className={classes.button}
					>
						Save
					</Button>
				</div>
			</AppBar>
			{formShowing && (
				<PaletteMetaForm
					palettes={palettes}
					handleSubmit={handleSubmit}
					hideForm={toggleFormShowing}
				/>
			)}
		</div>
	);
};

export default withStyles(styles, { withTheme: true })(PaletteFormNav);
