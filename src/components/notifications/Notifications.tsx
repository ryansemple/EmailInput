import React from "react";
import ErrorNotification from "./ErrorNotification";
import SuccessNotification from "./SuccessNotification";
import { 
	NotificationType,
	NotificationInstance
} from "../../types/Notification";

interface NotificationsProps {
	notifications: NotificationInstance[]
}

const Notifications = (props: NotificationsProps) => {
	return (
		<>
			{props.notifications
			.map((notificationInstance: NotificationInstance) => 
			{
				switch(notificationInstance.notificationType)
				{
					case NotificationType.Error:
						return (
							<ErrorNotification 
								text={notificationInstance.text}
								key={notificationInstance.uuid}
							/>
						)
					case NotificationType.Success:
						return (
							<SuccessNotification 
								text={notificationInstance.text}
								key={notificationInstance.uuid}
							/>
						)
				}
			})}
		</>
	)
}

export default Notifications;