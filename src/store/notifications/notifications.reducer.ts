import { NotificationAction } from './notifications.actions'
import { notificationActionTypes, NotificationState } from './notifications.types'

export const notificationsInitialState: NotificationState = {
  notifications: []
}

export const notificationsReducer = (state: NotificationState, action: NotificationAction): NotificationState => {
  if (state === undefined || state.notifications === undefined) {
    state = {
      ...state,
      notifications: []
    }
  }

  const actionTypes = {
    [notificationActionTypes.PUSH_NOTIFICATION]: {
      ...state,
      notifications: state.notifications.concat(action.payload)
    }
  }

  return actionTypes[action.type] || state
}
