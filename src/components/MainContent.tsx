import React, { useState } from "react";
import EmailValidationForm from "./EmailValidationForm";
import EmailSuggestions from "./suggestions/Suggestions";
import Label from "./form/Label";
import axios, { AxiosError } from "axios";
import { KickBoxResponse } from "../utility/Kickbox";
import { brandOrange, green } from "../styles/sass.scss";
import { isNetworkError } from "../utility/Network";
import { Notification } from "../types/Notification";
import { ValidationType } from "../types/Validation";
import Notifications from "./notifications/Notifications";
import Button from "./form/Button";
import ValidationMessage from "./ValidationMessage";

const serverDomainUrl: string = "http://localhost:3001";

const MainContent = () => 
{
	const [email, setEmail] = useState("");
	const [emailIsVerified, setEmailIsVerified] = useState(false);
	const [emailMessage, setEmailMessage] = useState("");
	const [emailIsValid, setEmailIsValid] = useState(false);
	const [notifications, setNotifications] = useState<Notification[]>([]);
	//const [testCount, setTestCount] = useState(1);

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

			if(!successfullySent)
			{
				setEmailMessage(response.data.reason);
			} 
			else 
			{
				setEmailMessage("");
			}

			const successNotification: Notification = new Notification(
				"Email has been successfully verified as being valid.",
				ValidationType.Success
			);

			setNotifications([
				...notifications,
				successNotification
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

	//`~TEST
	// const testButtonClick = (event: any) => 
	// {
	// 	const newNotification: Notification = {
	// 		text: `${testCount} There was a network error, please check your internet connection and try again.`,
	// 		id: returnNewUuid(),
	// 		notificationType: ValidationType.Success
	// 	};

	// 	console.log(`new notification uuid: ${newNotification.id}`);

	// 	setTestCount(testCount + 1);

	// 	setNotifications([
	// 		...notifications,
	// 		newNotification
	// 	]);
	// };

	return (
		<div className="container">
			<div className="row horizontal_center_flex">
				<div className="col-sm-12 col-xs-24 flex">
					<EmailValidationForm
						setEmail={(email: string) => setEmail(email)}
						email={email}
						setEmailMessage={(emailMessage: string) => setEmailMessage(emailMessage)}
						setEmailIsValid={(emailIsValid: boolean) => setEmailIsValid(emailIsValid)}
						emailIsValid={emailIsValid}
						emailMessage={emailMessage}
						className="full_width"
					/>
					{/* <EmailSuggestions
						email={email}
						setEmail={(email: string) => setEmail(email)}
					/> */}
					<div>
						<Label 
							text="&nbsp;"
							className="block"
						/>
					<Button 
						onClick={checkEmail}
						disabled={!emailIsValid}
						disabledTooltipTitle={"Disabled: email not valid"}
						text={"Verify"}
						style={{
							background: emailIsVerified ? green : brandOrange
						}}
						className="margin_left_small"
					/>
					</div>
					{/* <ValidationMessage
						validationMessage={emailMessage}
						validationType={validationType}
					/> */}
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