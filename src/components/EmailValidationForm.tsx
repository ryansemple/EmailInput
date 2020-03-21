import React, { useState } from "react";
import Label from "./form/Label";
import Input from "./form/Input";

interface IEmailValidationForm {
	setEmail: (email: string) => void,
	email: string
}

const EmailValidationForm = (props: IEmailValidationForm) => {
	
	//const [email, setEmail] = useState("");

	const emailChangedEvent = (email: string): void => 
	{
		props.setEmail(email);
	}
	
	return (
		<>
			<Label 
				className="block float_left"
				text="Enter Email"
			/>
			<br />
			<Input
				className="block float_left clear_left full_width"
				onChange={emailChangedEvent}
				value={props.email}
			/>
		</>
	)
}

export default EmailValidationForm;