import React from "react";
import { ValidationType } from "../types/Validation";
import clsx from "clsx";

interface ValidationMessage {
	validationMessage?: string,
	validationType: ValidationType
}

const ValidationMessage = (props: ValidationMessage) => (
	<p 
		className={
			clsx(
				props.validationType === ValidationType.Success && "green",
				props.validationType === ValidationType.Error && "red",
				"block", 
				"full_width",
				"margin_top_small"
			)}>
		{props.validationMessage}
	</p>
)

export default ValidationMessage;