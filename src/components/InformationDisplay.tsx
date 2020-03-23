import React from "react";
import Label from "./form/Label";

interface IInformationDisplay {
	emailMessage?: string
}

const InformationDisplay = (props: IInformationDisplay) => (
	<>
		<Label
			className="block"
			text="Information:"
		/>
		<p 
			className="error margin_bottom_20 block full_width">
			{props.emailMessage}
		</p>
	</>
)

export default InformationDisplay;