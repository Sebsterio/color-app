import uuid from "uuid/v4"; // TODO remove

export default function reducer(state, action) {
	switch (action.type) {
		case "SAVE":
			return [...state, action.palette];
		case "DELETE":
			return state.filter(pal => pal.id !== action.id);
		// case "EDIT":
		// 	return state.map(todo =>
		// 		todo.id === action.id ? { ...todo, task: action.newTask } : todo
		// 	);
		default:
			return state;
	}
}
