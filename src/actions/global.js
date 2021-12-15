import { SET_IS_DARK_THEME } from "@constants/";
import { SET_TEXT_SIZE } from "@constants/";
import { SET_VIDEO_INPUT } from "@constants/";
import { SET_SUBTITLE } from "@constants/";

export const setIsDarkTheme = isDarkTheme => ({
	type: SET_IS_DARK_THEME,
	payload: isDarkTheme,
});

export const setVideoInput = video => ({
	type: SET_VIDEO_INPUT,
	payload: video,
});

export const setSubtitle = subtitle => ({
	type: SET_SUBTITLE,
	payload: subtitle,
});

export const setTextSize = (name, value) => ({
	type: SET_TEXT_SIZE,
	payload: { name, value },
});