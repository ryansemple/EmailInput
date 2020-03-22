import React from "react";
import Label from "./form/Label";

interface IInformationDisplay {
	emailMessage?: string
}

const InformationDisplay = (props: IInformationDisplay) => (
	<>
		<Label
			className="block float_left"
			text="Information:"
		/>
		<p 
			className="error margin_bottom_20 block float_left full_width">
			{props.emailMessage}
		</p>
	</>
)

export default InformationDisplay;