import { useContext } from "react";
import { GlobalContext } from "@store/GlobalProvider";

export const useGlobalState = () => {
    const [state, dispatch] = useContext(GlobalContext);
    return [state, dispatch];
}