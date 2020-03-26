import React from "react";

interface LabelProps {
	className: string,
	text: string,
	htmlFor?: string
}

const Label = (props: LabelProps) => (
	<label
		htmlFor={props.htmlFor}
		className={`form_label ${props.className}`}>
		{props.text}
	</label>
)

export default Label;