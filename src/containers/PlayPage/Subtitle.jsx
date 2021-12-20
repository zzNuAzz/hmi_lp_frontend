import React, { useEffect, useState } from "react";
import clsx from "clsx";

export default function Subtile({ subtitle, playedSecond, subClassName }) {
	const [currentSub, setCurrentSub] = useState([]);
	useEffect(() => {
		const _currentSub = subtitle.filter(
			s => s.start <= playedSecond && playedSecond <= s.end
		);
		setCurrentSub(_currentSub);
		return _currentSub
	}, [subtitle, playedSecond]);
	return (
		<>
			{currentSub.map(sub => (
				<div className={clsx("sub", subClassName)}>{sub.text}</div>
			))}
		</>
	);
}
