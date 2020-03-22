import React from "react";

interface ButtonProps {
	text: string,
	onClick: Function,
	style?: any,
	disabled?: boolean
}

const Button = (props: ButtonProps) => {

	const onClick = 
	(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => 
	{
		props.onClick();
	};

	return (
		<button
			type="button"
			className="Button"
			onClick={onClick}
			style={props.style}
			disabled={props.disabled}>
			{props.text}
		</button>
	);
}

export default Button;