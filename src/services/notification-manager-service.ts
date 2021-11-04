import constants from '../constants/constants'
import { HttpResponse } from '../data/protocols/http/http-client'
import platformApi from './platform-api'

const { BASE_PATH, READ, PUBLIC_NOTIFICATIONS } = constants.URL.NOTIFICATION_MANAGER

const getNotifications = async (): Promise<HttpResponse> => {
  return platformApi.get(`${BASE_PATH}${PUBLIC_NOTIFICATIONS}`)
}

const postMarkNotificationIsRead = async (ids: string[]): Promise<HttpResponse> => {
  return platformApi.post(`${BASE_PATH}${READ}`, {}, { ids })
}

const notificationManagerService = {
  getNotifications,
  postMarkNotificationIsRead
}

export default notificationManagerService
