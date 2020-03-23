import ObjectWithId from "../types/ObjectWithId";

export enum NotificationType {
	Success,
	Error
}

export interface NotificationInstance extends ObjectWithId {
	text: string,
	id: string,
	notificationType: NotificationType
}