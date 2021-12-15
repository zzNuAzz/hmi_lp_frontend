import React from "react";
import HomeContent from "./HomeContent";
import { Header } from "@components";

export default function HomePage() {
	return (
		<div className="HomePage">
			<Header isConfig={true} title="Home" />
			<HomeContent />
		</div>
	);
}
