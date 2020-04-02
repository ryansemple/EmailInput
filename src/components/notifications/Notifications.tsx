import React, { useEffect } from "react";
import ErrorNotification from "./ErrorNotification";
import SuccessNotification from "./SuccessNotification";
import Notification from "../../types/Notification";
import ValidationType from "../../types/ValidationType";
import usePrevious from "../../hooks/usePrevious";
import { 
	returnItemsInArrayNotInAnotherArrayById
} from "../../utility/Array";

interface NotificationsProps {
	notifications: Notification[],
	setNotifications: React.Dispatch<React.SetStateAction<Notification[]>>
}

/**
 * The time (in milliseconds) it will take for a notification
 * to be destroyed after it is created
 */
const notificationTimeout: number = 7000;

/**
 * Sets a timeout for newly added notifications that will destroy the newly added 
 * notitications after a given amount of time has passed.
 * @param notifications - the current collection of notifications.
 * @param setNotifications - hook that sets the collection of notifications.
 * @param previousNotifications - the collection of notifications before the last update, used to comare to the new notifications.
 */
const useDestroyNewNotificationsAfterTimeout =
(
	notifications: Notification[],
	setNotifications: React.Dispatch<React.SetStateAction<Notification[]>>,
	previousNotifications: Notification[] | undefined
): void =>
{
	useEffect(() =>
	{
		/**
		 * Destroys a collection of notifications after the amount
		 * of time defined by notificationTimeout has passed.
		 * @param noticationToBeDestroyed - the notifications was will
		 * be destroyed.
		 */
		const destroyNotificationAfterTimeoutEnds = (noticationToBeDestroyed: Notification) => 
		{
			setTimeout(() => 
			{
				setNotifications(_notifications =>
					_notifications.filter((notificationInstance: Notification) => 
						notificationInstance.id !== noticationToBeDestroyed.id
					)
				);
			}, notificationTimeout);
		};
		
		const notificationPropsHaveUpdated = previousNotifications?.length !== 
		notifications.length;
		
		if (notificationPropsHaveUpdated) 
		{
			let newNotifications: Notification[] = [];
			const previousNotificationsExist: boolean = 
				previousNotifications! && previousNotifications!.length > 0;

			if (!previousNotificationsExist)
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

/**
 * Renders the notifications.
 */
const Notifications = (props: NotificationsProps) => {

	const { notifications, setNotifications } = props;
	const previousProps = usePrevious({ notifications });
	const previousNotifications: Notification[] | undefined = 
		previousProps?.notifications;

	useDestroyNewNotificationsAfterTimeout(
		notifications,
		setNotifications,
		previousNotifications
	);

	return (
		<div 
			className="Notifications absolute flex horizontal_center_flex full_width">
			{notifications.map((notificationInstance: Notification) => 
			{
				const sharedProperties = {
					text: notificationInstance.text,
					key: notificationInstance.id
				};
				
				switch(notificationInstance.notificationType)
				{
					case ValidationType.Error:
						return <ErrorNotification {...sharedProperties} />;
					case ValidationType.Success:
						return <SuccessNotification {...sharedProperties} />;
					default:
						return <SuccessNotification {...sharedProperties} />;
				}
			})}
		</div>
	)
}

export default Notifications;