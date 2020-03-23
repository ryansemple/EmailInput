import React from "react";
import Notification from "./Notification";

interface SuccessNotificationProps {
	text: string
}

const SuccessNotification = (props: SuccessNotificationProps) => (
	<Notification 
		text={props.text}
		className="Notifications_Notification-Success"
	/>
)

export default SuccessNotification;