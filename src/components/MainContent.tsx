import React, { useState } from "react";
import EmailValidationForm from "./EmailValidationForm";
import EmailSuggestions from "./Suggestions2";
import Label from "./form/Label";
import axios, { AxiosError } from "axios";
import { KickBoxResponse } from "../repository/Kickbox";
import { brandOrange } from "../styles/sass.scss";
import InformationDisplay from "./InformationDisplay";

const serverDomainUrl: string = "http://localhost:3001";

const MainContent = (props: {}) => 
{
	const [email, setEmail] = useState("");
	const [emailIsVerified, setEmailIsVerified] = useState(false);
	const [emailMessage, setEmailMessage] = useState("");

	const checkEmail = () => 
	{
		axios.get
		(
			`${serverDomainUrl}/VerifyEmail?email=${email}`
		)
		.then((response: KickBoxResponse) =>
		{
			const successfullySent: boolean = response.data.success;	
			setEmailIsVerified(successfullySent);
			setEmailMessage(successfullySent ? "" : response.data.reason);
		})
		.catch((error: AxiosError) => 
    {
    });
	}

	return (
		<div className="container">
			<div className="text_align_center">
				<div className="col-sm-12 float_left">
					<div className="row">
						<div className="col-sm-18">
							<EmailValidationForm
								setEmail={(email: string) => setEmail(email)}
								email={email}
							/>
							<br />
							<EmailSuggestions
								email={email}
								setEmail={(email: string) => setEmail(email)}
							/>
						</div>
						<div className="col-sm-6">
								<Label 
									className="block"
									text="&nbsp;"
								/>
								<button
									onClick={checkEmail}
									disabled={(
										emailMessage !== null && 
										emailMessage !== undefined && 
										emailMessage !== "" && 
										emailMessage.length > 0
									)}
									style={{
										background: emailIsVerified ? "green" : brandOrange
									}}
									className="Button">    
									{emailIsVerified ? "Verified!" : "Verify"}
								</button>
							</div>
					</div>
				</div>
				<div className="col-sm-12 float_left">
					<InformationDisplay 
						emailMessage={emailMessage} 
					/>
				</div>
			</div>
		</div>
	)
}

export default MainContent;