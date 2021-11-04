import { fireEvent, RenderResult, waitFor } from '@testing-library/react'
import React from 'react'
import constants from '../../../../constants/constants'
import { NotificationData } from '../../../../data/protocols/data/notification'
import '../../../../jest/mocks'
import renderWithDependencies from '../../../../jest/render-with-dependencies'
import notificationManagerService from '../../../../services/notification-manager-service'
import { formatTime } from '../../../../utils/timestamp'
import { NavbarNotifications } from './navbar-notifications'

const mockNotification1 =
  '{"id":"1","userId":"9de96feb-3958-481c-b041-63ccb14e2253","pluginName":"message-consumer","message":"message test","read":true,"timestamp":"2021-04-07T09:06:27","title":"message title","category":"DEFAULT"}'

const mockNotification2 =
  '{"id":"2","userId":"9de96feb-3958-481c-b041-63ccb14e2253","pluginName":"message-consumer","message":"message test","read":true,"timestamp":"2021-04-07T19:26:27","title":"message title","category":"ALARM"}'

const mockNotification3 =
  '{"id":"3","userId":"9de96feb-3958-481c-b041-63ccb14e2253","pluginName":"message-consumer","message":"message test","read":false,"timestamp":"2021-04-07T19:26:27","title":"message title","category":"WARNING"}'

const mockNotification4 =
  '{"id":"4","userId":"9de96feb-3958-481c-b041-63ccb14e2253","pluginName":"message-consumer","message":"message test","read":false,"timestamp":"2021-04-07T19:26:27","title":"message title","category":"SUCCESS"}'

type SutType = {
  sut: RenderResult
}
jest.mock('../../../keycloak/keycloak', () => ({
  keycloakInstance: { token: '' }
}))
jest.mock('../../../../services/notification-manager-service', () => ({
  getNotifications: jest.fn(() => ({
    statusCode: 200,
    body: {
      message: [
        mockNotification1,
        mockNotification2,
        mockNotification3,
        mockNotification4
      ]
    }
  })),
  postMarkNotificationIsRead: jest.fn()
}))

const makeSut = (): SutType => {
  const sut = renderWithDependencies({
    children: <NavbarNotifications />
  })

  return { sut }
}

const {
  NAVBAR_NOTIFICATIONS_ALERT,
  NAVBAR_NOTIFICATIONS_EMPTY,
  NAVBAR_NOTIFICATIONS_MARK_ALL,
  NAVBAR_NOTIFICATION_TITLE,
  NAVBAR_NOTIFICATION_TIME,
  NAVBAR_NOTIFICATION_MESSAGE
} = constants.DATA_TESTID.CONTAINERS.NAVBAR.NAVBAR_NOTIFICATIONS

describe('NavbarNotifications component', () => {
  test('should render correctly with four notifications', async () => {
    const { sut } = makeSut()

    const notification1 = await sut.findByTestId('1')
    const notification2 = sut.getByTestId('2')
    const notification3 = sut.getByTestId('3')
    const notification4 = sut.getByTestId('4')
    const hasNewNotificationAlert = sut.getByTestId(NAVBAR_NOTIFICATIONS_ALERT)

    expect(sut).toBeTruthy()
    expect(notification1).toBeInTheDocument()
    expect(notification2).toBeInTheDocument()
    expect(notification3).toBeInTheDocument()
    expect(notification4).toBeInTheDocument()
    expect(hasNewNotificationAlert).toBeVisible()
  })

  test('should render correctly empty state', async () => {
    const { sut } = makeSut()
    const empty = await sut.findByTestId(NAVBAR_NOTIFICATIONS_EMPTY)
    expect(sut).toBeTruthy()
    expect(empty).toBeInTheDocument()
  })

  test('should disable alert after check unique new notification', async () => {
    jest
      .spyOn(notificationManagerService, 'postMarkNotificationIsRead')
      .mockResolvedValue({
        statusCode: 200
      })

    jest
      .spyOn(notificationManagerService, 'getNotifications')
      .mockResolvedValue({
        statusCode: 200,
        body: {
          message: [mockNotification3]
        }
      })

    const { sut } = makeSut()

    const notification3 = await sut.findByTestId('3')

    await waitFor(() => fireEvent.click(notification3))

    const alert = sut.queryByTestId(NAVBAR_NOTIFICATIONS_ALERT)

    expect(notification3).toBeInTheDocument()
    expect(alert).not.toBeInTheDocument()
  })

  test('should disable alert after mark all new notifications read', async () => {
    jest
      .spyOn(notificationManagerService, 'postMarkNotificationIsRead')
      .mockResolvedValue({
        statusCode: 200
      })

    jest
      .spyOn(notificationManagerService, 'getNotifications')
      .mockResolvedValue({
        statusCode: 200,
        body: {
          message: [mockNotification3]
        }
      })

    const { sut } = makeSut()

    const markall = await sut.findByTestId(NAVBAR_NOTIFICATIONS_MARK_ALL)

    await waitFor(() => fireEvent.click(markall))

    const alert = sut.queryByTestId(NAVBAR_NOTIFICATIONS_ALERT)

    expect(alert).not.toBeInTheDocument()
  })

  test('should detect sensitive datas ', async () => {
    jest
      .spyOn(notificationManagerService, 'getNotifications')
      .mockResolvedValue({
        statusCode: 200,
        body: {
          message: [mockNotification1]
        }
      })
    const { sut } = makeSut()

    const notification = JSON.parse(mockNotification1) as NotificationData

    const title = await sut.findByTestId(NAVBAR_NOTIFICATION_TITLE)
    const time = sut.getByTestId(NAVBAR_NOTIFICATION_TIME)
    const message = sut.getByTestId(NAVBAR_NOTIFICATION_MESSAGE)

    expect(title.textContent).toBe(notification.title)
    expect(time.textContent).toBe(formatTime(notification.timestamp))
    expect(message.textContent).toBe(notification.message)
  })
})
