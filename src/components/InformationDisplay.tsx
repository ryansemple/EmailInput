import React from "react";
import Label from "./form/Label";

interface InformationDisplay {
	emailMessage?: string
}

const InformationDisplay = (props: InformationDisplay) => (
	<>
		<Label
			className="block"
			text="Information"
		/>
		<p className="error block full_width padding_small">
			{props.emailMessage}
		</p>
	</>
)

export default InformationDisplay;