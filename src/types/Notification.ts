import ObjectWithId from "../types/ObjectWithId";
import { returnNewUuid } from "../utility/Uuid";
import { ValidationType } from "./ValidationType";

interface NotificationInterface extends ObjectWithId {
	id: string,
	text: string,
	notificationType: ValidationType
}

/**
 * Restricts the way a Notification can be created
 * by encapsulating the logic for creating a new id so that it will
 * always be a new uuid and making the properties readonly so that
 * they can not be modified after the class has been constructed.
 * 
 * @class Notification
 * @implements {NotificationInterface}
 */
class Notification implements NotificationInterface {

	/**
	 * The id that will be used to uniquely identity the notification.
	 */
	public readonly id: string;

	/**
	 * The text that will appear in the notification.
	 */
	public readonly text: string;

	/**
	 * the type of notification, this will determine the style of the notification.
	 */
	public readonly notificationType: ValidationType;

	constructor(text: string, notificationType: ValidationType)
	{ 
		this.text = text;
		this.id = returnNewUuid();
		this.notificationType = notificationType;
	}
}

export default Notification;