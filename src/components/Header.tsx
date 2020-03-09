import React from "react";

interface IHeaderProps {
	title: string
}

const Header = (props: IHeaderProps) => (
	<header className="Header margin_bottom_40">
		<h1>{props.title}</h1>
	</header>     
)

export default Header;