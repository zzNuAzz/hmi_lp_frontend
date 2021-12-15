import { useGlobalState } from "@hooks/";
import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import clsx from "clsx";

export default function PlayPage() {
	const navigate = useNavigate();
	const [
		{
			videoInput,
			config: { speech, nonSpeech },
			subtitle,
		},
		dispatch,
	] = useGlobalState();

	useEffect(() => {
		console.log(videoInput);
		if (videoInput === null) {
			navigate("/");
		} else {
		}
	}, []);

	const _renderScreen = () => (
		<React.Fragment>
			<div className="PlayPage__Player">
				<video width="1280" height="720" controls>
					<source src={videoInput.preview} type={videoInput.type} />
					Your browser does not support the video tag.
				</video>
			</div>
			<div className={clsx("PlayPage__Subtitle", "sz-" + speech)}>
				<div className="sub sub-speech">A: Hi, how are you?</div>
				<div className="sub sub-speech">B: Fine.</div>
				<div className="sub sub-speech">
					A: Do you want to hang out tonight?
				</div>
			</div>

			<div className={clsx("PlayPage__Sound", "sz-" + nonSpeech)}>
				<div className="sub sub-non-speech">[bird sound]</div>
				<div className="sub sub-non-speech">[wind sound]</div>
			</div>
		</React.Fragment>
	);

	return (
		<div className="PlayPage">
			<Link className="PlayPage__back" to="/">
				<i className="fas fa-chevron-left"></i>
				<span>Home</span>
			</Link>
			{videoInput ? _renderScreen() : <div>No video selected</div>}
		</div>
	);
}
