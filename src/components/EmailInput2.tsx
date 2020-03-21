import React, { useState } from "react";
import Label from "./form/Label";
import Input from "./form/Input";

interface IEmailInputProps {}

const EmailInput2 = (props: IEmailInputProps) => {
	
	const [email, setEmail] = useState("");

	const emailChangedEvent = (email: string): void => 
	{
		setEmail(email);
	}
	
	return (
		<div className="container">
			<div className="text_align_center">
				<div className="col-sm-12 float_left">
					<div className="row">
						<div className="col-sm-18">
							<Label 
								className="block float_left"
								text="Enter Email"
							/>
							<br />
							<Input
								className="block float_left clear_left full_width"
								onChange={emailChangedEvent}
								value={email}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default EmailInput2;