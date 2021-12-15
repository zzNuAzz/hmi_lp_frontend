import React, { useEffect } from "react";
import { Route } from "react-router-dom";

export default function WithHtmlTitleRoute({ htmlTitle, element: Component, ...props }) {
	useEffect(() => {
		window.document.title = htmlTitle || "Video Subtitle";
	}, []);
	return <Component {...props} />;
}

