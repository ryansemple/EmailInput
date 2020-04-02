import React, { useState } from "react";
import EmailValidationForm from "./EmailValidationForm";
import Label from "./form/Label";
import axios, { AxiosError } from "axios";
import { KickBoxResponse } from "../utility/Kickbox";
import { isNetworkError } from "../utility/Network";
import Notification from "../types/Notification";
import ValidationType from "../types/ValidationType";
import Notifications from "./notifications/Notifications";
import Button from "./form/Button";

const serverDomainUrl: string = "http://localhost:3001";

const MainContent = () =>
{
	const [email, setEmail] = useState("");
	const [emailMessage, setEmailMessage] = useState("");
	const [emailIsValid, setEmailIsValid] = useState(false);
	const [notifications, setNotifications] = useState<Notification[]>([]);

	const checkEmail = () => 
	{
		axios.get
		(
			`${serverDomainUrl}/VerifyEmail?email=${email}`
		)
		.then((response: KickBoxResponse) =>
		{
			const successfullySent: boolean = response.data.success;	
			let notification: Notification;

			if(!successfullySent)
			{
				setEmailMessage(response.data.reason);
				notification = new Notification(
					"Email has been successfully verified as being valid.",
					ValidationType.Success
				);
			} 
			else 
			{
				setEmailMessage("");
				notification = new Notification(
					"Email has been successfully verified as being valid.",
					ValidationType.Success
				);
			}

			setNotifications([
				...notifications,
				notification
			]);
		})
		.catch((error: AxiosError) => 
    {
			if(isNetworkError(error))
			{
				const networkErrorNotification: Notification = new Notification(
					"There was a network error, please check your internet connection and try again.",
					ValidationType.Error
				);

				setNotifications([
					...notifications,
					networkErrorNotification
				]);
			}
    });
	}

	const resetEmail = (): void => 
	{
		setEmail("");
		setEmailIsValid(false);
		setEmailMessage("");
	}

	return (
		<div className="container">
			<div className="row horizontal_center_flex">
				<div className="col-md-12 col-sm-24 flex">
					<EmailValidationForm
						setEmail={(email: string) => setEmail(email)}
						email={email}
						setEmailMessage={(emailMessage: string) => setEmailMessage(emailMessage)}
						setEmailIsValid={(emailIsValid: boolean) => setEmailIsValid(emailIsValid)}
						emailIsValid={emailIsValid}
						emailMessage={emailMessage}
						className="full_width"
						resetEmail={resetEmail}
					/>
					<div>
						{/*
						 Dummy Label element so that they "Verify" button is vertically aligned with the email textbox
						*/}
						<Label 
							text="&nbsp;"
							className="block"
						/>
						<Button 
							onClick={checkEmail}
							disabled={!emailIsValid}
							disabledTooltipTitle={"Disabled: email not valid"}
							text={"Verify"}
							className="margin_left_small"
						/>
					</div>
				</div>
			</div>
			<Notifications 
				notifications={notifications}
				setNotifications={setNotifications}
			/>
		</div>
	)
}

export default MainContent;