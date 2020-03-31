import ObjectWithId from "../types/ObjectWithId";
import { returnNewUuid } from "../utility/Uuid";
import { ValidationType } from "./ValidationType";

interface NotificationInterface extends ObjectWithId {
	text: string,
	id: string,
	notificationType: ValidationType
}

/**
 * Restricts the way a Notification can be created
 * by encapsulating the logic for creating a new id so that it will
 * always be a new uuid and making the properties readonly so that
 * they can not be modified after the class has been constructed.
 * @constructor
 * @param {string} text - The text that will appear in the notification.
 * @param {id} id - the id that will be used to uniquely identity the notification.
 * @param {ValidationType} notificationType - the type of notification, will
 * change the style of the notification.
 */
export class Notification implements NotificationInterface {

	public readonly text: string;
	public readonly id: string;
	public readonly notificationType: ValidationType;

	constructor(text: string, notificationType: ValidationType) 
	{ 
		this.text = text;
		this.id = returnNewUuid();
		this.notificationType = notificationType;
	}
}