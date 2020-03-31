import React from "react";
import clsx from "clsx";

interface LabelProps {
	className?: string,
	text: string,
	htmlFor?: string
}

const Label = (props: LabelProps) => (
	<label
		htmlFor={props.htmlFor}
		className={clsx("form_label", props.className && props.className)}>
		{props.text}
	</label>
)

export default Label;