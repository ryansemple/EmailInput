import React from "react";
import clsx from "clsx";

interface NotificationProps {
	text: string,
	className: string
}

/**
 * Renders a notification.
 */
const Notification = (props: NotificationProps) => (
	<div 
		className={clsx("Notifications_Notification", props.className)} 
		role="alert">
		<p>{props.text}</p>
	</div>
)

export default Notification;