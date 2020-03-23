import React, { useState } from "react";
import EmailValidationForm from "./EmailValidationForm";
import EmailSuggestions from "./suggestions/Suggestions";
import Label from "./form/Label";
import axios, { AxiosError } from "axios";
import { KickBoxResponse } from "../utility/Kickbox";
import { brandOrange, green } from "../styles/sass.scss";
import InformationDisplay from "./InformationDisplay";
import { isNetworkError } from "../utility/Network";
import { returnNewUuid } from "../utility/Uuid";
import { 
	NotificationInstance, 
	NotificationType
} from "../types/Notification";
import Notifications from "./notifications/Notifications";
import Button from "./form/Button";

const serverDomainUrl: string = "http://localhost:3001";

const MainContent = () => 
{
	const [email, setEmail] = useState("");
	const [emailIsVerified, setEmailIsVerified] = useState(false);
	const [emailMessage, setEmailMessage] = useState("");
	const [emailIsValid, setEmailIsValid] = useState(false);
	const [notifications, setNotifications] = useState<NotificationInstance[]>([]);
	const [testCount, setTestCount] = useState(1);

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
			if(isNetworkError(error))
			{
				const notificationInstance: NotificationInstance = {
					text: "There was a network error, please check your internet connection and try again.",
					id: returnNewUuid(),
					notificationType: NotificationType.Error
				}

				setNotifications([
					...notifications,
					notificationInstance
				]);
			}
    });
	}

	//`~TEST
	const testButtonClick = (event: any) => 
	{
		const newNotificationInstance: NotificationInstance = {
			text: `${testCount} There was a network error, please check your internet connection and try again.`,
			id: returnNewUuid(),
			notificationType: NotificationType.Success
		};

		console.log(`new notification uuid: ${newNotificationInstance.id}`);

		setTestCount(testCount + 1);

		setNotifications([
			...notifications,
			newNotificationInstance
		]);
	};

	return (
		<div className="container">
			<div className="row">
				<div className="col-sm-12">
					<div className="row">
						<div className="col-sm-18">
							<EmailValidationForm
								setEmail={(email: string) => setEmail(email)}
								email={email}
								setEmailMessage={(emailMessage: string) => setEmailMessage(emailMessage)}
								setEmailIsValid={(emailIsValid: boolean) => setEmailIsValid(emailIsValid)}
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
							<Button 
								onClick={checkEmail}
								disabled={!emailIsValid}
								text={emailIsVerified ? "Verified!" : "Verify"}
								style={{background: emailIsVerified ? green : brandOrange}}
							/>
							<Button 
								onClick={testButtonClick}
								text="Test add notification"
								style={{ marginTop: "20px" }}
							/>
						</div>
					</div>
				</div>
				<div className="col-sm-12">
					<InformationDisplay 
						emailMessage={emailMessage} 
					/>
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