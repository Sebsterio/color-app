import React, { useState, useContext } from "react";
import { Route, Switch } from "react-router-dom";
import { generatePalette } from "./colorHelpers";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Page from "./Page";
import Palette from "./Palette";
import PaletteList from "./PaletteList";
import NewPaletteForm from "./NewPaletteForm";
import SingleColorPalette from "./SingleColorPalette";
import { PalettesContext } from "./context/palettes.context";

const App = () => {
	const palettes = useContext(PalettesContext);

	const findPalette = id => {
		return palettes.find(function(palette) {
			return palette.id === id;
		});
	};

	return (
		<Route
			render={({ location }) => (
				<TransitionGroup>
					<CSSTransition key={location.key} classNames="page" timeout={500}>
						<Switch location={location}>
							<Route
								exact
								path="/palette/new"
								render={routeProps => (
									<Page>
										<NewPaletteForm {...routeProps} />
									</Page>
								)}
							/>
							<Route
								exact
								path="/palette/:paletteId/:colorId"
								render={routeProps => (
									<Page>
										<SingleColorPalette
											colorId={routeProps.match.params.colorId}
											palette={generatePalette(
												findPalette(routeProps.match.params.paletteId)
											)}
										/>
									</Page>
								)}
							/>
							<Route
								exact
								path="/palette/:id"
								render={routeProps => (
									<Page>
										<Palette
											palette={generatePalette(
												findPalette(routeProps.match.params.id)
											)}
										/>
									</Page>
								)}
							/>
							<Route
								exact
								path="/"
								render={routeProps => (
									<Page>
										<PaletteList {...routeProps} />
									</Page>
								)}
							/>
							<Route
								render={routeProps => (
									<Page>
										<PaletteList {...routeProps} />
									</Page>
								)}
							/>
						</Switch>
					</CSSTransition>
				</TransitionGroup>
			)}
		/>
	);
};

export default App;
