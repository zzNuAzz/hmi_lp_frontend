import { useGlobalState } from '@hooks/';
import { setIsDarkTheme, setTextSize } from 'actions/global';
import React from 'react';
import clsx from "clsx";
import imgLightPreview from "./SVG/light-preview.svg"
import imgDarkPreview from "./SVG/dark-preview.svg"

export default function SettingContent() {
  const [{ isDarkTheme, config: { speech, nonSpeech } }, globalDispatch] = useGlobalState();

  const _onSelectChange = e => {
	  const name = e.target.name;
	  const value = e.target.value;
	  globalDispatch(setTextSize(name, value));
  }

  const _renderPreview = () => (
		<div className="SettingPreview">
			<div className="SettingPreview__screen"></div>
			<div className={clsx("SettingPreview__subtitle", "sz-" + speech)}>
				<div className="sub sub-speech">A: Hi, how are you?</div>
				<div className="sub sub-speech">B: Fine.</div>
				<div className="sub sub-speech">
					A: Do you want to hang out tonight?
				</div>
			</div>
			<div className={clsx("SettingPreview__sound", "sz-" + nonSpeech)}>
				<div className="sub sub-non-speech">[bird sound]</div>
				<div className="sub sub-non-speech">[wind sound]</div>
			</div>
		</div>
  );

  const _renderSetting = () => (
		<div className="Setting">
			<div className="Setting__Theme">
				<div className="Setting__Section">Theme</div>
				<div className="Setting__Theme-select">
					<div
						className={clsx("Setting__Theme-option", {
							["active-light"]: !isDarkTheme,
						})}
						onClick={() => globalDispatch(setIsDarkTheme(false))}
					>
						<img src={imgLightPreview} />
						Light
					</div>
					<div
						className={clsx(
							"Setting__Theme-option",
							"dark-option",
							{
								["active-dark"]: isDarkTheme,
							}
						)}
						onClick={() => globalDispatch(setIsDarkTheme(true))}
					>
						<img src={imgDarkPreview} />
						Dark
					</div>
				</div>
			</div>
			<div className="Setting__TextSize">
				<div className="Setting__Section">Text size</div>
				<div className="Setting__TextSize-speech">
					<div className="Setting__TextSize-label">Speech</div>
					<select onChange={_onSelectChange} name="speech" value={speech}>
						<option value="small">Small</option>
						<option value="medium">Medium</option>
						<option value="large">Large</option>
					</select>
				</div>
				<div className="Setting__TextSize-non-speech">
					<div className="Setting__TextSize-label">Non-speech</div>
					<select onChange={_onSelectChange} name="nonSpeech" value={nonSpeech}>
						<option value="small">Small</option>
						<option value="medium">Medium</option>
						<option value="large">Large</option>
					</select>
				</div>
			</div>
		</div>
  );

  return (
		<div className="SettingPage__SettingContent">
			{_renderPreview()}
			{_renderSetting()}
		</div>
  );
}
