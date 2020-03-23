import React from "react";

interface LabelProps {
	className: string,
	text: string
}

const Label = (props: LabelProps) => (
	<label className={`form_label ${props.className}`}>
		{props.text}
	</label>
)

export default Label;