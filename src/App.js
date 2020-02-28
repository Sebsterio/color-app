import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
import { generatePalette } from "./colorHelpers";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Page from "./Page";
import Palette from "./Palette";
import PaletteList from "./PaletteList";
import NewPaletteForm from "./NewPaletteForm";
import SingleColorPalette from "./SingleColorPalette";
import seedColors from "./seedColors";

const App = () => {
	const savedPalettes = JSON.parse(window.localStorage.getItem("palettes"));
	const [palettes, setPalettes] = useState(savedPalettes || seedColors);

	const syncLocalStorage = () => {
		window.localStorage.setItem("palettes", JSON.stringify(palettes));
	};
	const findPalette = id => {
		return palettes.find(function(palette) {
			return palette.id === id;
		});
	};
	const deletePalette = id => {
		setPalettes(palettes.filter(pal => pal.id !== id));
		syncLocalStorage();
	};
	const savePalette = newPalette => {
		setPalettes([...palettes, newPalette]);
		syncLocalStorage();
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
										<NewPaletteForm
											savePalette={savePalette}
											palettes={palettes}
											{...routeProps}
										/>
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
								path="/"
								render={routeProps => (
									<Page>
										<PaletteList
											palettes={palettes}
											deletePalette={deletePalette}
											{...routeProps}
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
								render={routeProps => (
									<Page>
										<PaletteList
											palettes={palettes}
											deletePalette={deletePalette}
											{...routeProps}
										/>
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
