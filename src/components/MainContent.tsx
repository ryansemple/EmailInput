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
	NotificationImplementation as Notification, 
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
	const [notifications, setNotifications] = useState<Notification[]>([]);
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
				NotificationType.Success
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
					NotificationType.Error
				);

				setNotifications([
					...notifications,
					networkErrorNotification
				]);
			}
    });
	}

	//`~TEST
	const testButtonClick = (event: any) => 
	{
		const newNotification: Notification = {
			text: `${testCount} There was a network error, please check your internet connection and try again.`,
			id: returnNewUuid(),
			notificationType: NotificationType.Success
		};

		console.log(`new notification uuid: ${newNotification.id}`);

		setTestCount(testCount + 1);

		setNotifications([
			...notifications,
			newNotification
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
								disabledTooltipTitle={"Disabled: email not valid"}
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