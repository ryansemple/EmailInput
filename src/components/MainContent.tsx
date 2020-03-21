import React, { useState } from "react";
import EmailValidationForm from "./EmailValidationForm";
import EmailSuggestions from "./Suggestions2";
import Label from "./form/Label";
import axios, { AxiosError } from "axios";
import { KickBoxResponse } from "../repository/Kickbox";

interface IMainContentProps {}

const MainContent = (props: IMainContentProps) => 
{
	const [email, setEmail] = useState("");
	const [emailIsVerified, setEmailIsVerified] = useState(false);
	const [emailMessage, setEmailMessage] = useState("");

	const checkEmail = () => 
	{
		axios.get
		(
			`http://localhost:3001/VerifyEmail?email=${email}`
		)
		.then((response: KickBoxResponse) =>
		{
			const successfullySent: boolean = response.data.success;	
			setEmailIsVerified(successfullySent);
			setEmailMessage(successfullySent ? "" : response.data.reason);

			// this.setState({
			// 	isEmailVerified: successfullySent,
			// 	emailMessage: successfullySent ? "" : response.data.reason
			// })
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
								{/* <label className="block">
									&nbsp;
								</label> */}
								<Label 
									className="block"
									text="&nbsp;"
								/>
								{/* <button
									onClick={checkEmail}
									disabled={(
										this.state.emailMessage !== null && 
										this.state.emailMessage !== undefined && 
										this.state.emailMessage !== "" && 
										this.state.emailMessage.length > 0
									)}
									style={{
										background: this.state.isEmailVerified ? "green" : "#FF6600"
									}}
									className="Button">    
									{this.state.isEmailVerified ? "Verified!" : "Verify"}
								</button> */}
							</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default MainContent;