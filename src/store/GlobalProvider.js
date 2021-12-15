import { useReducer, createContext } from "react";
import globalReducer, { initGlobalState } from "@reducers/global";

export const GlobalContext = createContext();

export default function GlobalProvider({ children }) {
	const [state, dispatch] = useReducer(globalReducer, initGlobalState);
	return (
		<GlobalContext.Provider value={[state, dispatch]}>
			{children}
		</GlobalContext.Provider>
	);
}
