import React from "react";
import clsx from "clsx";

interface LabelProps {
	text: string,
	className?: string,
	htmlFor?: string
}

/**
 * Renders a label element.
 */
const Label = (props: LabelProps) => (
	<label
		htmlFor={props.htmlFor}
		className={clsx("Label", props.className)}>
		{props.text}
	</label>
)

export default Label;