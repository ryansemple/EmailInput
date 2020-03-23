import React, { useState, useEffect, useRef } from "react";
import EmailValidationForm from "./EmailValidationForm";
import EmailSuggestions from "./suggestions/Suggestions";
import Label from "./form/Label";
import axios, { AxiosError } from "axios";
import { KickBoxResponse } from "../utility/Kickbox";
import { brandOrange, green } from "../styles/sass.scss";
import InformationDisplay from "./InformationDisplay";
import { isNetworkError } from "../utility/Network";
import { returnNewUuid } from "../utility/Uuid";
import usePrevious from "../hooks/usePrevious";
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
	const previousProps = usePrevious({notifications});
	const notificationsReference: 
	React.MutableRefObject<NotificationInstance[]> = useRef(notifications);

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
					uuid: returnNewUuid(),
					notificationType: NotificationType.Error
				}

				setNotifications([
					...notifications,
					notificationInstance
				]);
			}
    });
	}

	const testButtonClick = (event: any) => 
	{
		const newNotificationInstance: NotificationInstance = {
			text: "There was a network error, please check your internet connection and try again.",
			uuid: returnNewUuid(),
			notificationType: NotificationType.Error
		};

		console.log(`new notification uuid: ${newNotificationInstance.uuid}`);

		setNotifications([
			...notifications,
			newNotificationInstance
		]);

		setTimeout(() => 
		{
			console.log(`notification uuid to be removed: ${newNotificationInstance.uuid}`);
			
			// const notificationsWithNewNotificationRemoved: NotificationInstance[] =
			// notificationsReference.current
			// .filter((notificationInstance: NotificationInstance) => 
			// 		notificationInstance.uuid !== newNotificationInstance.uuid
			// );

			setNotifications(notifications => {

				const notificationsWithNewNotificationRemoved: NotificationInstance[] =
				notifications
				.filter((notificationInstance: NotificationInstance) => 
						notificationInstance.uuid !== newNotificationInstance.uuid
				);

				return notificationsWithNewNotificationRemoved;
				//notificationsWithNewNotificationRemoved
			});
		}, 7000);
	};

	// useEffect(() => 
	// {
	// 	if(previousProps?.notifications.length !== notifications.length) 
	// 	{
	// 		const newNotifications = notifications
	// 		.filter((notificationInstance: NotificationInstance) => {

	// 			return previousProps?.notifications
	// 			.findIndex((perviousNotificationInstance: NotificationInstance) =>
	// 				perviousNotificationInstance.uuid === notificationInstance.uuid
	// 			) === -1;

	// 			//return notificationInstance.uuid !== null;
	// 		});

	// 		for (let i: number = 0; i < newNotifications.length; i++)
	// 		{
	// 			const newNotificationInstance: NotificationInstance = newNotifications[i];

	// 			setTimeout(() => 
	// 			{
	// 				console.log(`notification uuid to be removed: ${newNotificationInstance.uuid}`);
					
	// 				const notificationsWithNewNotificationRemoved: NotificationInstance[] = notificationsReference.current
	// 				.filter((notificationInstance: NotificationInstance) => 
	// 						notificationInstance.uuid !== newNotificationInstance.uuid
	// 				);
		
	// 				setNotifications(notificationsWithNewNotificationRemoved);
	// 			}, 5000);
	// 		}
	// 	}
	// }, [notifications]);

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
				<Notifications 
					notifications={notifications}
				/>
			</div>
		</div>
	)
}

export default MainContent;