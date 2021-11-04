import { NotificationData } from '../../data/protocols/data/notification'

export type NotificationState = {
  notifications: NotificationData[]
}

export const notificationActionTypes = {
  PUSH_NOTIFICATION: '@notifications/PUSH_NOTIFICATION'
}
