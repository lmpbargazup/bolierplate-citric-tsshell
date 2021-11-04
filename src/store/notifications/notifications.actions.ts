import { NotificationData } from '../../data/protocols/data/notification'
import { notificationActionTypes } from './notifications.types'

export type NotificationAction = {
  payload: NotificationData
  type: string
}

export const pushNotification = (
  value: NotificationData
): NotificationAction => ({
  type: notificationActionTypes.PUSH_NOTIFICATION,
  payload: value
})
