import React, { useEffect } from "react";
import ErrorNotification from "./ErrorNotification";
import SuccessNotification from "./SuccessNotification";
import { 
	NotificationType,
	NotificationInstance
} from "../../types/Notification";
import usePrevious from "../../hooks/usePrevious";
import { 
	returnItemsInArrayNotInAnotherArrayById
} from "../../utility/Array";

interface NotificationsProps {
	notifications: NotificationInstance[],
	setNotifications: React.Dispatch<React.SetStateAction<NotificationInstance[]>>
}

const notificationTimeout: number = 6000;

const Notifications = (props: NotificationsProps) => {

	const previousProps = usePrevious({notifications: props.notifications});
	const previousNotifications: NotificationInstance[] | undefined = previousProps?.notifications;

	const destroyNotificationAfterTimeoutEnds = (noticationToBeDestroyed: NotificationInstance) => 
	{
		setTimeout(() => 
		{
			props.setNotifications(notifications =>	{
				return notifications
				.filter((notificationInstance: NotificationInstance) => 
						notificationInstance.id !== noticationToBeDestroyed.id
				);
			});
		}, notificationTimeout);
	};

	useEffect(() =>
	{	
		const notificationPropsHaveUpdated = previousNotifications?.length !==
		props.notifications.length;
		
		if (notificationPropsHaveUpdated) 
		{
			let newNotifications: NotificationInstance[] = [];

			if(!previousNotifications || previousNotifications.length === 0)
			{
				newNotifications = props.notifications;
			} 
			else 
			{
				newNotifications = returnItemsInArrayNotInAnotherArrayById
				(
					props.notifications,
					previousNotifications!
				);
			}

			for (let i: number = 0; i < newNotifications.length; i++)
			{
				destroyNotificationAfterTimeoutEnds(newNotifications[i]);
			}
		}
	}, 
	[
		props.notifications, 
		previousNotifications, 
		destroyNotificationAfterTimeoutEnds
	]);

	return (
		<div 
			className="Notifications absolute flex horizontal_center_flex full_width">
			{props.notifications
			.map((notificationInstance: NotificationInstance) => 
			{
				switch(notificationInstance.notificationType)
				{
					case NotificationType.Error:
						return (
							<ErrorNotification 
								text={notificationInstance.text}
								key={notificationInstance.id}
							/>
						)
					case NotificationType.Success:
						return (
							<SuccessNotification 
								text={notificationInstance.text}
								key={notificationInstance.id}
							/>
						)
				}
			})}
		</div>
	)
}

export default Notifications;