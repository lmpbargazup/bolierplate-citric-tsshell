import faker from 'faker'
import constants from '../constants/constants'
import PlatformApi from './platform-api'
import menuService from './menu-service'

const { BASE_PATH, MODULES } = constants.URL.MENU

describe('Menu Service', () => {
  test('should call platformApi correctly to fetch menu', async () => {
    const platformApiSpy = jest.spyOn(PlatformApi, 'get').mockResolvedValue({
      statusCode: faker.random.number()
    })
    await menuService.getModules()
    expect(platformApiSpy).toHaveBeenCalledWith(
      `${BASE_PATH}${MODULES}?hasSubmenu=true`
    )
  })
})
