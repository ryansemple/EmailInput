import React from "react";

interface HeaderProps {
	title: string
}

/**
 * Renders the header of the App.
 */
const Header = (props: HeaderProps) => (
	<header className="Header">
		<h1 className="Header_Title">{props.title}</h1>
	</header>     
)

export default Header;