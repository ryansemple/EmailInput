import React from "react";
import clsx from "clsx";

interface ButtonProps {
	text: string,
	onClick: Function,
	style?: any,
	disabled?: boolean,
	disabledTooltipTitle?: string,
	notDisabledTooltipTitle?: string,
	className?: string
}

/**
 * Renders a button element.
 */
const Button = (props: ButtonProps) => (
	<button
		type="button"
		className={
			clsx(
				props.className && props.className,
				"Button"
			)
		}
		title={
			props.disabled ? 
			props.disabledTooltipTitle : 
			props.notDisabledTooltipTitle
		}
		onClick={() => { props.onClick(); }}
		style={props.style}
		disabled={props.disabled}>
		{props.text}
	</button>
);

export default Button;