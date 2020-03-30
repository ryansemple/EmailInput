import React from "react";

interface ButtonProps {
	text: string,
	onClick: Function,
	style?: any,
	disabled?: boolean,
	disabledTooltipTitle?: string
}

const Button = (props: ButtonProps) => (
	<button
		type="button"
		className="Button"
		title={props.disabled ? props.disabledTooltipTitle : ""}
		onClick={() => { props.onClick(); }}
		style={props.style}
		disabled={props.disabled}>
		{props.text}
	</button>
);

export default Button;