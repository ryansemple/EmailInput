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

/**
 * Sets a timeout for newly added notifications that will destroy the newly added 
 * notitications after a given amount of time has passed.
 * @param notifications - the current collection of notifications.
 * @param setNotifications - hook that sets the collection of notifications.
 * @param previousNotifications - the collection of notifications before the last update.
 */
const useDestroyNewNotificationsAfterTimeout =
(
	notifications: NotificationInstance[],
	setNotifications: React.Dispatch<React.SetStateAction<NotificationInstance[]>>,
	previousNotifications: NotificationInstance[] | undefined
): void =>
{
	useEffect(() =>
	{
		const destroyNotificationAfterTimeoutEnds = (noticationToBeDestroyed: NotificationInstance) => 
		{
			setTimeout(() => 
			{
				setNotifications(_notifications =>	{
					return _notifications
					.filter((notificationInstance: NotificationInstance) => 
							notificationInstance.id !== noticationToBeDestroyed.id
					);
				});
			}, notificationTimeout);
		};
		
		const notificationPropsHaveUpdated = previousNotifications?.length !== notifications.length;
		
		if (notificationPropsHaveUpdated) 
		{
			let newNotifications: NotificationInstance[] = [];

			if (!previousNotifications || previousNotifications.length === 0)
			{
				newNotifications = notifications;
			} 
			else 
			{
				newNotifications = returnItemsInArrayNotInAnotherArrayById
				(
					notifications,
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
		notifications,
		setNotifications, 
		previousNotifications
	]);
}

const Notifications = (props: NotificationsProps) => {

	const { notifications, setNotifications } = props;
	const previousProps = usePrevious({ notifications });
	const previousNotifications: NotificationInstance[] | undefined = previousProps?.notifications;

	useDestroyNewNotificationsAfterTimeout(
		notifications,
		setNotifications,
		previousNotifications
	);

	return (
		<div className="Notifications absolute flex horizontal_center_flex full_width">
			{notifications
			.map((notificationInstance: NotificationInstance) => 
			{
				const sharedProperties = {
					text: notificationInstance.text,
					key: notificationInstance.id
				};
				
				switch(notificationInstance.notificationType)
				{
					case NotificationType.Error:
						return <ErrorNotification {...sharedProperties} />;
					case NotificationType.Success:
						return <SuccessNotification {...sharedProperties} />;
					default:
						return <SuccessNotification {...sharedProperties} />;
				}
			})}
		</div>
	)
}

export default Notifications;