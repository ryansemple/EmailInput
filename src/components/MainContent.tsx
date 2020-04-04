import React, { useState } from "react";
import EmailValidationForm from "./EmailValidationForm";
import Label from "./form/Label";
import axios, { AxiosError } from "axios";
import { KickBoxResponse, EmailReasonType } from "../types/Kickbox";
import { isNetworkError } from "../utility/Network";
import Notification from "../types/Notification";
import ValidationType from "../types/ValidationType";
import Notifications from "./notifications/Notifications";
import Button from "./form/Button";

const serverDomainUrl: string = "http://localhost:3001";

/**
 * Renders the content inside the "main" html tag.
 */
const MainContent = () =>
{
	const [email, setEmail] = useState("");
	const [emailValidationMessage, setEmailValidationMessage] = useState("");
	const [emailIsValid, setEmailIsValid] = useState(false);
	const [notifications, setNotifications] = useState<Notification[]>([]);

	/**
	 * Validates the email address with the Kickbox API.
	 * Shows a success notification if it's a valid email,
	 * shows an error notification if it's invalid or there 
	 * was a network error.
	 */
	const checkEmail = () => 
	{
		setEmailValidationMessage("");
		
		axios.get
		(
			`${serverDomainUrl}/VerifyEmail?email=${email}`
		)
		.then((response: KickBoxResponse) =>
		{
			const successfullySent: boolean = response.data.success;
			const emailCouldBeDeliveredTo: boolean = successfullySent &&
			response.data.reason === EmailReasonType.accepted_email;

			let notification: Notification;

			if(!emailCouldBeDeliveredTo)
			{
				notification = new Notification(
					`Email could not be delivered to, it is invalid.`,
					ValidationType.Error
				);
			} 
			else 
			{			
				notification = new Notification(
					"Email could be delivered to, it is valid.",
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

	/**
	 * clears the email input, disables the submit button and
	 * clears the email validation message.
	 */
	const resetEmail = (): void => 
	{
		setEmail("");
		setEmailIsValid(false);
		setEmailValidationMessage("");
	}

	return (
		<div className="container">
			<div className="row horizontal_center_flex">
				<div className="col-md-12 col-sm-24 flex">
					<EmailValidationForm
						setEmail={(email: string) => setEmail(email)}
						email={email}
						setEmailValidationMessage={
							(emailValidationMessage: string) => setEmailValidationMessage(emailValidationMessage)
						}
						setEmailIsValid={(emailIsValid: boolean) => setEmailIsValid(emailIsValid)}
						emailIsValid={emailIsValid}
						emailValidationMessage={emailValidationMessage}
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