import { useReducer, useEffect } from "react";

function useLocalStorageReducer(key, defaultVal, reducer) {
	// init state & dispatch fn from localStorage OR default
	const [state, setState] = useReducer(reducer, defaultVal, () => {
		let value;
		try {
			value = JSON.parse(
				window.localStorage.getItem(key) || String(defaultVal)
			);
		} catch (e) {
			value = defaultVal;
		}
		return value;
	});
	// save to localStorage on state update
	useEffect(() => {
		window.localStorage.setItem(key, JSON.stringify(state));
	}, [state]);

	return [state, setState];
}
export { useLocalStorageReducer };
