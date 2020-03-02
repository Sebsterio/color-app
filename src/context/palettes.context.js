import React, { createContext } from "react";
import { useLocalStorageReducer } from "../hooks/useLocalStorageReducer";
import seedColors from "../seedColors";
import reducer from "../reducers/palettes.reducer";

export const PalettesContext = createContext();
export const DispatchContext = createContext();

export function PalettesProvider(props) {
	// init state & dispatch fn from localStorage OR default; save to localStorage on state update
	const [palettes, dispatch] = useLocalStorageReducer(
		"palettes" /* key */,
		seedColors /* default palettes */,
		reducer
	);
	return (
		<PalettesContext.Provider value={palettes}>
			<DispatchContext.Provider value={dispatch}>
				{props.children}
			</DispatchContext.Provider>
		</PalettesContext.Provider>
	);
}
