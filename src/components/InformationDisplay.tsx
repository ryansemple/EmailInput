import React from "react";

interface IInformationDisplay {
	emailMessage?: string
}

const InformationDisplay = (props: IInformationDisplay) => (
	<>
		<label className="block float_left">
			Information:
		</label>
		<p 
			className="error margin_bottom_20 block float_left full_width">
		{
			props.emailMessage ? props.emailMessage : null
		}
		</p>
	</>
)

export default InformationDisplay;