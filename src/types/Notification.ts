export enum NotificationType {
	Success,
	Error
}

export interface NotificationInstance {
	text: string,
	uuid: string,
	notificationType: NotificationType
}