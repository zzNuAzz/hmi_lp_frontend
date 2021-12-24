import { useGlobalState } from "@hooks/";
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import clsx from "clsx";
import ReactPlayer from "react-player";
import Subtitle from "./Subtitle";

export default function PlayPage() {
	const navigate = useNavigate();
	const [
		{
			videoInput,
			config: { speech, nonSpeech },
			subtitle,
			caption,
		},
		dispatch,
	] = useGlobalState();
	const [playedSeconds, setPlayedSecond] = useState(0);

	useEffect(() => {
		if (videoInput === null) {
			navigate("/");
		} else {
		}
	}, []);

	const _parseSubtitle = (subtitle) => {
		let sub = subtitle.filter(e => e.text.length > 0).map(sequence => {
			const { result, text } = sequence;
			const start = result[0].start;
			const end = result[result.length - 1].end;
			return { start, end, text };
		});
		return sub.sort((a, b) => a.start - b.start);
	}
	const _subSpeech = useMemo(() => _parseSubtitle(subtitle), [subtitle]);
	const _parseCaption = (caption) => {
		const timeline = Object.keys(caption);
		const sub = timeline.map(tl => {
			const text = caption[tl];
			const [start, end] = tl.split("-").map(t => +t);
			return { text, start: start / 100, end: end / 100 };
		});
		return sub.sort((a, b) => a.start - b.start);
	}
	const _subNonSpeech = useMemo(() => _parseCaption(caption), [caption]);
	
	const _renderScreen = () => (
		<React.Fragment>
			<div className="PlayPage__Player">
				<ReactPlayer
					url={videoInput.preview}
					width={1280}
					height={720}
					controls={true}
					onProgress={progress => {
						setPlayedSecond(progress.playedSeconds);
					}}
					progressInterval={100}
				/>
			</div>
			<div className={clsx("PlayPage__Subtitle", "sz-" + speech)}>
				{subtitle.length > 0 && (
					<Subtitle
						subClassName="sub-speech"
						subtitle={_subSpeech}
						playedSecond={playedSeconds}
					/>
				)}
			</div>

			<div className={clsx("PlayPage__Sound", "sz-" + nonSpeech)}>
				<Subtitle
					subClassName="sub-non-speech"
					subtitle={_subNonSpeech}
					playedSecond={playedSeconds}
				/>
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
