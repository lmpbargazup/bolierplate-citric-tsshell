import faker from 'faker'
import NotificationManagerService from './notification-manager-service'
import PlatformApi from './platform-api'

jest.mock('../containers/keycloak/keycloak', () => ({ keycloakInstance: { token: 'fakeToken' } }))

describe('Notification Manager Service', () => {
  test('should call getNotifications correctly to get notification', async () => {
    const apiHost = process.env.POC_API_HOST
    const spyPlatformApi = jest.spyOn(PlatformApi, 'get').mockResolvedValue({
      statusCode: 200,
      body: {}
    })

    await NotificationManagerService.getNotifications()

    expect(spyPlatformApi).toHaveBeenLastCalledWith(
      `${apiHost}/notification-manager/public/notifications`,
      { headers: { Authorization: `Bearer ${'fakeToken'}` } }
    )
  })

  test('should call platformApi to mark that notification is read', async () => {
    const fakeId = faker.random.word()
    const spyPlatformApi = jest.spyOn(PlatformApi, 'post').mockResolvedValue({
      statusCode: 200,
      body: {}
    })
    await NotificationManagerService.postMarkNotificationIsRead([fakeId])
    expect(spyPlatformApi).toHaveBeenCalledWith(
      '/notification-manager/read',
      {},
      { ids: [fakeId] }
    )
  })
})
