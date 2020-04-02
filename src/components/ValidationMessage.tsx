import React from "react";
import { ValidationType } from "../types/ValidationType";
import { red, green } from "../styles/sass.scss";

interface ValidationMessageProps {
	validationType: ValidationType,
	validationMessage?: string
}

/**
 * Renders a validation message that is either a success or error
 * message depending on the value of validation type passed in.
 */
const ValidationMessage = (props: ValidationMessageProps) => (
	<p 
		/**
		 * Normally I would do this kind of styling with classes but I
		 * wanted to show how I can access sass variables from react.
		 */
		style={{
			color: props.validationType === ValidationType.Success ? 
			green : red
		}}
		className="block full_width margin_top_small bold">
		{props.validationMessage}
	</p>
)

export default ValidationMessage;