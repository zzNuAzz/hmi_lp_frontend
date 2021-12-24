import React, { useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Header({ back, title, isConfig }) {
	const navigate = useNavigate();
	const openSetting = useCallback(() => {
		navigate("/setting");
	}, [navigate]);


	const renderBackButton = () => (
		<span className="Header__back">
			<Link to={back[1]} >{back[0]}</Link>
		</span>
	)

	const renderConfigButton = () => (
		<span className="Header__config" onClick={openSetting}>
			<i className="fas fa-cog"></i>
		</span>
	);

	return <div className="Header">
		{back && Array.isArray(back) && back.length === 2 && renderBackButton()}
		{title && <span className="Header__title">{title}</span>}
		{isConfig && renderConfigButton()}
	</div>;
}
