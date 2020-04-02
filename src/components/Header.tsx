import React from "react";

interface HeaderProps {
	title: string
}

const Header = (props: HeaderProps) => (
	<header className="Header">
		<h1 className="Header_Title">{props.title}</h1>
	</header>     
)

export default Header;