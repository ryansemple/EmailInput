import ObjectWithId from "../types/ObjectWithId";
import { returnNewUuid } from "../utility/Uuid";

export enum NotificationType {
	Success,
	Error
}

export interface Notification extends ObjectWithId {
	text: string,
	id: string,
	notificationType: NotificationType
}

/**
 * Restricts the way a Notification can be created
 * by encapsulating the logic for creating a new id so that it will
 * always be a new uuid and making the properties readonly so that
 * they can not be modified after the class has been constructed.
 * @constructor
 * @param {string} text - The text that will appear in the notification.
 * @param {id} id - the id that will be used to uniquely identity the notification.
 * @param {NotificationType} notificationType - the type of notification, will
 * change the style of the notification.
 */
export class NotificationImplementation implements Notification {

	public readonly text: string;
	public readonly id: string;
	public readonly notificationType: NotificationType;

	constructor(text: string, notificationType: NotificationType) 
	{ 
		this.text = text;
		this.id = returnNewUuid();
		this.notificationType = notificationType;
	}
}