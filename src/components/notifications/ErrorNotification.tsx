import React from "react";
import Notification from "./Notification";

interface ErrorNotificationProps {
	text: string
}

const ErrorNotification = (props: ErrorNotificationProps) => (
	<Notification 
		text={props.text}
		className="Notification-Error"
	/>
)

export default ErrorNotification;