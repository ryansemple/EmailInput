import React from "react";
import { ValidationType } from "../types/Validation";
import { red, green } from "../styles/sass.scss";

interface ValidationMessage {
	validationMessage?: string,
	validationType: ValidationType
}

const ValidationMessage = (props: ValidationMessage) => (
	<p 
		/* 
			Normally I'd do this kind of styling with classes but	here
			I wanted to show how I can access sass variables from react.
		*/
		style={{
			color: props.validationType === ValidationType.Success ? 
			green : red
		}}
		className="block full_width margin_top_small">
		{props.validationMessage}
	</p>
)

export default ValidationMessage;