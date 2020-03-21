import React from "react";

interface ILabelProps {
	className: string,
	text: string
}

const Label = (props: ILabelProps) => (
	<label className={`form_label ${props.className}`}>
		{props.text}
	</label>
)

export default Label;