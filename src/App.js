import React, { Component } from "react";
import PaletteList from "./PaletteList";
import Palette from "./Palette";
import SingleColorPalette from "./SingleColorPalette";
import seedColors from "./seedColors";
import { generatePalette } from "./colorHelpers";
import { Switch, Route } from "react-router-dom";

class App extends Component {
	findPalette(id) {
		return seedColors.find(palette => palette.id === id);
	}
	render() {
		return (
			<Switch>
				<Route
					exact
					path="/palette/:paletteId/:colorId"
					render={routeProps => (
						<SingleColorPalette
							colorId={routeProps.match.params.colorId}
							palette={generatePalette(
								this.findPalette(routeProps.match.params.paletteId)
							)}
						/>
					)}
				/>
				<Route
					exact
					path="/palette/:id"
					render={routeProps => (
						<Palette
							palette={generatePalette(
								this.findPalette(routeProps.match.params.id)
							)}
						/>
					)}
				/>
				<Route
					exact
					path="/"
					render={routeProps => (
						<PaletteList palettes={seedColors} {...routeProps} />
					)}
				/>
			</Switch>
			// <div className="App">
			// 	<Palette palette={generatePalette(seedColors[0])} />
			// </div>
		);
	}
}

export default App;
