import { SET_VIDEO_INPUT } from "@constants/";
import { SET_SUBTITLE } from "@constants/";
import { SET_CAPTION } from "@constants/";
import { SET_IS_DARK_THEME } from "@constants/";
import { SET_TEXT_SIZE } from "@constants/";
import store from "store";

export const initGlobalState = {
	isDarkTheme: store.get("theme") === "dark" || false,
	videoInput: null,
	subtitle: [],
	caption: {},
	config: {
		speech: store.get("config_speech") || "medium",
		nonSpeech: store.get("config_nonSpeech") || "medium",
	}
};

export default function globalReducer(state, action) {
	let newState = { ...state };
	const { type, payload } = action;
	switch (type) {
		case SET_IS_DARK_THEME:
			newState.isDarkTheme = payload;
			store.set("theme", payload ? "dark" : "light");
			break;
		case SET_VIDEO_INPUT:
			newState.videoInput = payload;
			break;
		case SET_SUBTITLE:
			newState.subtitle = payload;
			break;
		case SET_CAPTION:
			newState.caption = payload;
			break;
		case SET_TEXT_SIZE:
			const { name, value } = payload;
			newState.config[name] = value;
			store.set(`config_${name}`, value)
			break;
		default:
			throw new Error("Invalid action");
	}
	return newState;
}
