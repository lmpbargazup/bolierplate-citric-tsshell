import faker from 'faker'
import constants from '../constants/constants'
import PlatformApi from './platform-api'
import userManagerService from './user-manager-service'

const { BASE_PATH, CURRENT_USER } = constants.URL.USER_MANAGER

describe('User Manager Service', () => {
  test('should call platformApi correctly to fetch current user', async () => {
    const platformApiSpy = jest.spyOn(PlatformApi, 'get').mockResolvedValue({
      statusCode: faker.random.number()
    })
    await userManagerService.getCurrentUser()
    expect(platformApiSpy).toHaveBeenCalledWith(
      `${BASE_PATH}${CURRENT_USER}`
    )
  })
})
